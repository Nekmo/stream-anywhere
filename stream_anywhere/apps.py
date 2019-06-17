from django.apps import AppConfig


class StreamAnywhereAppConfig(AppConfig):
    name = 'stream_anywhere'

    def ready(self):
        # noinspection PyUnresolvedReferences
        from stream_anywhere import celery  # noqa
