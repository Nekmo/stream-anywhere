from django.conf.urls import url, include
from rest_framework import routers

from stream_anywhere.videos.api.viewsets import CollectionViewSet, VideoViewSet, PathViewSet

router = routers.DefaultRouter()

router.register(r'collections', CollectionViewSet)
router.register(r'videos', VideoViewSet)

router_without_slash = routers.DefaultRouter(trailing_slash=False)
router_without_slash.register(r'paths', PathViewSet, base_name='path')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^', include(router_without_slash.urls)),
]
