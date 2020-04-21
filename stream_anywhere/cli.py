import multiprocessing

from gunicorn.app.base import BaseApplication

from stream_anywhere.wsgi import application


class StandaloneApplication(BaseApplication):

    def __init__(self, app, options=None):
        self.options = options or {}
        self.application = app
        super().__init__()

    def load_config(self):
        config = {key: value for key, value in self.options.items()
                  if key in self.cfg.settings and value is not None}
        for key, value in config.items():
            self.cfg.set(key.lower(), value)

    def load(self):
        return self.application


def run_server():
    options = {
        'bind': '%s:%s' % ('127.0.0.1', '8080'),
        'workers': 4,
    }
    StandaloneApplication(application, options).run()
