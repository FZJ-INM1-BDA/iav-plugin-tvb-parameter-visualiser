from aiohttp import web
import os
import uuid
import urllib.parse
from xml.sax.saxutils import escape
import json

PLUGIN_NAME='fzj.xg.tvb_plugin'
DISPLAY_NAME='TVB Parameter Visualiser (alpha)'
HOSTNAME=os.getenv('HOSTNAME') or 'http://localhost:1234'

template_path = os.path.join(os.path.dirname(__file__), 'res/template.html')
with open(template_path, 'r') as f:
  template = f.read()

script_path = os.path.join(os.path.dirname(__file__), 'res/script.js')
with open(script_path, 'r') as f:
  script = f.read()

routes = web.RouteTableDef()
app = web.Application()

def get_query_param(request):
  selectedDataset = request.query.get('selectedDataset')
  selectedFile = request.query.get('selectedFile')
  selectedTrackIndices = request.query.get('selectedTrackIndices')
  id = request.query.get('uuid')
  return (selectedDataset, selectedFile, selectedTrackIndices, id)

@routes.get('/manifest.json')
async def handle_get_manifest(request):
  selectedDataset, selectedFile, selectedTrackIndices, *rest = get_query_param(request)
  id = str(uuid.uuid4())[:8]
  query_param = dict(uuid=id)

  if selectedDataset is not None:
    query_param['selectedDataset'] = selectedDataset 
  if selectedFile is not None:
    query_param['selectedFile'] = selectedFile 
  if selectedTrackIndices is not None:
    query_param['selectedTrackIndices'] = selectedTrackIndices 

  query_string = urllib.parse.urlencode(query_param)
  return web.json_response(dict(
    name=f'{PLUGIN_NAME}-{id}',
    displayName=DISPLAY_NAME,
    templateURL=f'{HOSTNAME}/frontend/template.html?{query_string}',
    scriptURL=f'{HOSTNAME}/frontend/script.js?{query_string}'
  ))

http_txt_header = {
  'Content-type': 'text/html; charset=utf-8'
}

script_txt_header = {
  'Content-type': 'text/javascript; charset=utf-8'
}

def replace_vars(request, input):
  selectedDataset, selectedFile, selectedTrackIndices, id = get_query_param(request)
  plugin_name = f'{PLUGIN_NAME}-{id}'

  if selectedDataset is not None and selectedFile is not None and selectedTrackIndices is not None:
    attri_string = f'''
  id="{plugin_name}.container"
  static-flag=true
  selected-dataset={escape(selectedDataset)}
  selected-file={escape(selectedFile)}
  selected-track-indices={escape(selectedTrackIndices)}'''
  else:
    attri_string = f'''
  id="{plugin_name}.container"'''
  return input.replace('__PLUGIN_NAME__', json.dumps(plugin_name)).replace('__HOSTNAME__', json.dumps(HOSTNAME)).replace('tvb-param-placeholder', attri_string or '')

@routes.get('/template.html')
async def handle_get_template(request):
  return web.Response(
    text=replace_vars(request, template) if template is not None else '<span>template read not successful</span>',
    headers=http_txt_header)

@routes.get('/script.js')
async def handle_get_script(request):
  return web.Response(
    text=replace_vars(request, script) if script is not None else 'console.error("script read not successful")',
    headers=script_txt_header)

app.router.add_routes(routes)

if __name__ == '__main__':
  web.run_app(app)
