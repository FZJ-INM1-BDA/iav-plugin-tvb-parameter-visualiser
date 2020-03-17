from aiohttp import web, ClientSession
import json
import re
import tempfile
from mat4py import loadmat
import numpy as np
import os

routes = web.RouteTableDef()
app = web.Application()

CONTAINER_URL = 'https://object.cscs.ch/v1/AUTH_6ebec77683fb472f94d352be92b5a577/hbp-d000001_TVB_brain_tumor_pub'
TEMP_FILE_DIR = os.getenv('TEMP_FILE_DIR')

chunk_size = 10
sub_con_prog = re.compile('sub-CON[0-9][0-9]')
mat_ext_prog = re.compile(r'FC\.mat$')

async def dl_mat_and_return_array(filename):
  async with ClientSession(raise_for_status=True) as session:
    async with session.get(f'{CONTAINER_URL}/{filename}') as resp:
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

async def get_all_files():
  async with ClientSession() as session:
    async with session.get(CONTAINER_URL, headers={'accept': 'application/json'}) as resp:
      body = await resp.text()
      return json.loads(body)

@routes.get('/')
async def handle_get_root(request):
  json_body = await get_all_files()
  return web.json_response(json_body)

@routes.get('/get_filtered_filenames')
async def handle_get_filenames(request):
  json_body = await get_all_files()
  filtered_list = [item for item in json_body if sub_con_prog.search(item['name']) and mat_ext_prog.search(item['name']) ]
  return web.json_response(filtered_list)

@routes.get('/get_matrix')
async def handle_get_file(request):
  filename = request.query.get('filename')
  if not filename:
    return web.Response(status=400, text='Filename query param must be defined')
  if not sub_con_prog.search(filename):
    return web.Response(status=400, text='Can only parse sub-CON[0-9][0-9]')
  
  if not mat_ext_prog.search(filename):
    return web.Response(status=400, text='Can only parse .mat files')

  arr = await dl_mat_and_return_array(filename)
  return web.json_response(arr.tolist())

app.router.add_routes(routes)

public_path = os.path.join(os.path.dirname(__file__), 'public')

app.router.add_static('/public', public_path)

if __name__ == '__main__':
  web.run_app(app)