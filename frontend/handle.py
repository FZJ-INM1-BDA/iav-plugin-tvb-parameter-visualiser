from aiohttp import web
import os

PLUGIN_NAME='fzj.xg.tvb_plugin'
DISPLAY_NAME='TVB Parameter Visualiser (alpha)'
HOSTNAME=os.getenv('HOSTNAME') or 'http://localhost:1234'

def replace_var(input):
  return input.replace('$$PLUGIN_NAME$$', PLUGIN_NAME).replace('$$HOSTNAME$$', HOSTNAME)

template_path = os.path.join(os.path.dirname(__file__), 'res/template.html')
with open(template_path, 'r') as f:
  template = replace_var(f.read())

script_path = os.path.join(os.path.dirname(__file__), 'res/script.js')
with open(script_path, 'r') as f:
  script = replace_var(f.read())

routes = web.RouteTableDef()
app = web.Application()

@routes.get('/manifest.json')
async def handle_get_manifest(requests):
  return web.json_response(dict(
    name=PLUGIN_NAME,
    displayName=DISPLAY_NAME,
    templateURL=f'{HOSTNAME}/frontend/template.html',
    scriptURL=f'{HOSTNAME}/frontend/script.js'
  ))

http_txt_header = {
  'Content-type': 'text/html; charset=utf-8'
}

script_txt_header = {
  'Content-type': 'text/javascript; charset=utf-8'
}

@routes.get('/template.html')
async def handle_get_template(requests):
  return web.Response(
    text=template if template is not None else '<span>template read not successful</span>',
    headers=http_txt_header)

@routes.get('/script.js')
async def handle_get_script(requests):
  return web.Response(
    text=script if script is not None else 'console.error("script read not successful")',
    headers=script_txt_header)

app.router.add_routes(routes)

if __name__ == '__main__':
  web.run_app(app)
