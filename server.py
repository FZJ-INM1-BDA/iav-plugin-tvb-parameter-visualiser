from aiohttp import web
import aiohttp_cors

from frontend.handle import app as frontend_app
from data.handle import app as data_app

app = web.Application()
cors = aiohttp_cors.setup(app, defaults={
  '*': aiohttp_cors.ResourceOptions()
})

app.add_subapp('/frontend', frontend_app)
app.add_subapp('/data', data_app)

for route in list(app.router.routes()):
  cors.add(route)

from mat4py import loadmat
import numpy as np

if __name__ == '__main__':
  web.run_app(app, port=1234)