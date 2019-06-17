from django.db import models
from django.utils.translation import gettext as _

# Create your models here.


STATUSES = [
    ('unbegun', _('Not Yet Started')),
    ('started', _('Started')),
    ('finished', _('Finished')),
    ('replayed', _('Watching again')),
]


class LocationBase(models.Model):
    name = models.CharField(max_length=255)
    path = models.CharField(max_length=4096)
    status = models.CharField(max_length=12, choices=STATUSES, db_index=True, default='unbegun')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Collection(LocationBase):
    recursive = models.BooleanField(default=False)


class Video(LocationBase):
    checksum = models.CharField(max_length=64, blank=True)
    position = models.PositiveIntegerField(default=0)
    duration = models.PositiveIntegerField(default=0)
    collection = models.ForeignKey(Collection, null=True, blank=True, on_delete=models.SET_NULL)
    started_at = models.DateTimeField(blank=True, null=True)
    finished_at = models.DateTimeField(blank=True, null=True)
    played_at = models.DateTimeField(blank=True, null=True)
