from aiohttp import web, ClientSession
import json
import re
import tempfile
from mat4py import loadmat
import numpy as np
import os
from scipy.signal import butter, lfilter, cwt, morlet2
import matplotlib.pyplot as plt

routes = web.RouteTableDef()
app = web.Application()

TEMP_FILE_DIR = os.getenv('TEMP_FILE_DIR')

chunk_size = 10
sub_con_prog = re.compile('sub-CON[0-9][0-9]')
mat_ext_prog = re.compile(r'FC\.mat$')

dict_kgds_to_container = dict()
dict_kgds_to_container['a696ccc7-e742-4301-8b43-d6814f3e5a44'] = dict(
  container_url='https://object.cscs.ch/v1/AUTH_6ebec77683fb472f94d352be92b5a577/hbp-d000001_TVB_brain_tumor_pub'
)

def get_query_param(request):
  return (request.query.get('kgDatasetId', None), request.query.get('filename', None), request.query.get('dkLabelIndex', None))

def get_container_url_from_kg_id(kg_dataset_id):
  obj = dict_kgds_to_container.get(kg_dataset_id, None)
  if not obj:
    raise Exception(f'kg_dataset_id: {kg_dataset_id} not defined in dict')
  container_url = obj.get('container_url')
  if not container_url:
    raise Exception(f'kg_dataset_id: {kg_dataset_id} container_url not defined in dict')
  return container_url

async def dl_mat_and_return_array(kg_dataset_id, filename):
  container_url = get_container_url_from_kg_id(kg_dataset_id)
  async with ClientSession(raise_for_status=True) as session:
    async with session.get(f'{container_url}/{filename}') as resp:
      with tempfile.NamedTemporaryFile(suffix='.mat', dir=TEMP_FILE_DIR) as fp:
        while True:
          chunk = await resp.content.read(chunk_size)
          if not chunk:
            break
          fp.write(chunk)
        fp.flush()

        FC = loadmat(fp.name)
        match_ROI_DK68 = re.compile('_ROIts_DK68$')
        matched_dk68_key = [key for key in FC.keys() if match_ROI_DK68.search(key)]
        if len(matched_dk68_key) == 0:
          raise Exception('match ROI DK')
        if len(matched_dk68_key) > 1:
          raise Exception('multiple ROI DK68 found')
        return np.array(FC[matched_dk68_key[0]]).T 

async def get_all_files(kg_dataset_id):
  container_url = get_container_url_from_kg_id(kg_dataset_id)
  async with ClientSession() as session:
    async with session.get(container_url, headers={'accept': 'application/json'}) as resp:
      body = await resp.text()
      return json.loads(body)

@routes.get('/')
async def handle_get_root(request):
  list_of_dataset_id = list(dict_kgds_to_container.keys())
  return web.json_response(list_of_dataset_id)

@routes.get('/get_filtered_filenames')
async def handle_get_filenames(request):
  try:
    kg_dataset_id, *rest = get_query_param(request)
    json_body = await get_all_files(kg_dataset_id)
    filtered_list = [item for item in json_body if sub_con_prog.search(item['name']) and mat_ext_prog.search(item['name']) ]
    return web.json_response(filtered_list)
  except Exception as e:
    return web.Response(status=400, text=str(e))

# time frequence parameter
fs = 1 # Hz
tf = 180
t = np.r_[:tf:1/fs]

@routes.get('/get_tf_plot')
async def get_tf_plot(request):
  try:
    kg_dataset_id, filename, dk_label_index = get_query_param(request)
    data = await dl_mat_and_return_array(kg_dataset_id, filename)
    x = data[int(dk_label_index), :].reshape(1, -1)

    '''
    Victor's recommendation was:
    
    fs = 1
    b, a = butter(2, 2*r_[0.01, 1]/fs, 'pass')

    But this resulted in complaining that the arg needs be strictly between 0 and 1
    '''
    # b, a = butter(2, np.r_[0.01, 0.95]/fs, 'pass')
    # x = lfilter(b, a, x)
    # W = np.r_[0.1:150:200j]
    # continuous_w=cwt(x[0], morlet2, W)
    # X = np.abs(continuous_w)

    '''
    Attempt #2

    From Marmaduke/Victor
    '''

    # # Morlet filter design

    f = 0.2

    # M = x.shape[1]
    fs = 1.0
    w = 25
    # # x = morlet2(s.shape[1], s = w*fs / (2*f*np.pi), w=w)
    # F = np.fft.fftfreq(M, d=1.0/fs)

    freqs = np.r_[0.2:0.4:100j]#np.exp(np.r_[-5.0:-0.1:150j])
    # print('filters from', freqs[0], 'Hz to ', freqs[-1], 'Hz')
    widths = [w*fs / (2*f*np.pi) for f in freqs]
    X = cwt(x[0], morlet2, widths, w=w)
    X_ = np.log(np.abs(X))
    with tempfile.TemporaryFile(suffix='.png') as t_file:
      fig = plt.figure()
      plt.imshow(X_, aspect='auto')
      fig.savefig(t_file, format='png')
      t_file.seek(0)
      img_file = t_file.read()
      plt.close()
      headers=dict()
      headers['Content-type']='image/png'
      return web.Response(status=200, headers=headers, body=img_file)

    # return web.Response(status=200, text='hello world')
  except Exception as e:
    return web.Response(status=400, text=str(e))

@routes.get('/get_matrix')
async def handle_get_file(request):
  kg_dataset_id, filename, *rest = get_query_param(request)

  if not filename:
    return web.Response(status=400, text='Filename query param must be defined')
  if not sub_con_prog.search(filename):
    return web.Response(status=400, text='Can only parse sub-CON[0-9][0-9]')
  if not mat_ext_prog.search(filename):
    return web.Response(status=400, text='Can only parse .mat files')
  if not kg_dataset_id:
    return web.Response(status=400, text='kgDatasetId query param is required')

  try:
    arr = await dl_mat_and_return_array(kg_dataset_id, filename)
    return web.json_response(arr.tolist())
  except Exception as e:
    return web.Response(status=400, text=str(e))

app.router.add_routes(routes)

public_path = os.path.join(os.path.dirname(__file__), 'public')

app.router.add_static('/public', public_path)

if __name__ == '__main__':
  web.run_app(app)