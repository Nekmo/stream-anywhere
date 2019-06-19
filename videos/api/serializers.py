import os
from pathlib import Path

import magic
from django.conf import settings
from rest_framework import serializers, validators
from rest_framework.reverse import reverse
from videos.models import Collection, Video


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        depth = 1
        fields = (
            'id', 'name', 'path', 'status', 'created_at', 'updated_at', 'recursive',
        )
        read_only_fields = ()


class VideoSerializer(serializers.ModelSerializer):
    created = None
    name = serializers.CharField(required=False)

    def run_validators(self, value):
        for validator in self.validators:
            if isinstance(validator, validators.UniqueTogetherValidator):
                self.validators.remove(validator)
        super().run_validators(value)

    def create(self, validated_data):
        defaults = {
            'name': os.path.splitext(os.path.basename(validated_data['path']))[0]
        }
        instance, self.created = Video.objects.get_or_create(**validated_data, defaults=defaults)
        folder = os.path.dirname(validated_data['path'])
        if folder and self.created:
            defaults = {
                'name': os.path.basename(folder),
            }
            collection, _ = Collection.objects.get_or_create(path=folder, user=validated_data['user'],
                                                             defaults=defaults)
            instance.collection = collection
            instance.save()
        return instance

    class Meta:
        model = Video
        depth = 1
        fields = (
            'id', 'name', 'path', 'status', 'created_at', 'updated_at', 'checksum', 'position', 'duration',
            'collection', 'started_at', 'finished_at', 'played_at',
        )
        read_only_fields = ('checksum', 'duration')


class PathSerializer(serializers.Serializer):
    name = serializers.CharField()
    url = serializers.SerializerMethodField()
    path = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    mimetype = serializers.SerializerMethodField()

    def get_url(self, obj: Path):
        path = self.get_path(obj)
        url = reverse('path-detail', kwargs=dict(pk=path))
        return self.context['request'].build_absolute_uri(url)

    def get_path(self, obj: Path):
        path = str(obj.absolute()).replace(settings.ROOT_PATH, '', 1)
        if obj.is_dir():
            path += '/'
        return path

    def get_type(self, obj: Path):
        if obj.is_dir():
            return 'directory'
        elif obj.is_file():
            return 'file'
        elif obj.is_socket():
            return 'socket'
        elif obj.is_symlink():
            return 'symlink'
        elif obj.is_block_device():
            return 'block_device'
        elif obj.is_reserved():
            return 'reserved'
        elif obj.is_char_device():
            return 'char_device'
        elif obj.is_fifo():
            return 'fifo'
        else:
            return 'unknown'

    def get_mimetype(self, obj: Path):
        if obj.is_dir():
            return 'inode/directory'
        elif obj.is_file():
            return magic.from_file(str(obj.absolute()), mime=True)

#
#
# class DirectorySerializer(serializers.Serializer):
#     name = serializers.CharField()
#
#     children = PathSerializer(many=True, source='get_children')
#
#     def get_children(self):
#         yield
#
