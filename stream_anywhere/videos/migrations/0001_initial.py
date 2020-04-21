# Generated by Django 2.2.2 on 2019-06-19 19:02

from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields.json


def add_user(apps, schema_editor):
    User = apps.get_model(*settings.AUTH_USER_MODEL.split('.'))
    User.objects.create(
        username='default',
        password=make_password(None),
    )


def remove_user(apps, schema_editor):
    User = apps.get_model(*settings.AUTH_USER_MODEL.split('.'))
    User.objects.get(username='default').delete()


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RunPython(add_user, remove_user),
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('path', models.CharField(max_length=4096)),
                ('status', models.CharField(choices=[('unbegun', 'Not Yet Started'), ('started', 'Started'), ('finished', 'Finished'), ('replayed', 'Watching again')], db_index=True, default='unbegun', max_length=12)),
                ('score', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('recursive', models.BooleanField(default=False)),
                ('is_bookmark', models.BooleanField(db_index=True, default=False)),
                ('thumb', models.FileField(blank=True, upload_to='')),
                ('description', models.TextField(blank=True)),
                ('options', django_extensions.db.fields.json.JSONField(blank=True, default=dict, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('path', models.CharField(max_length=4096)),
                ('status', models.CharField(choices=[('unbegun', 'Not Yet Started'), ('started', 'Started'), ('finished', 'Finished'), ('replayed', 'Watching again')], db_index=True, default='unbegun', max_length=12)),
                ('score', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('checksum', models.CharField(blank=True, max_length=64)),
                ('position', models.PositiveIntegerField(default=0)),
                ('duration', models.PositiveIntegerField(default=0)),
                ('started_at', models.DateTimeField(blank=True, null=True)),
                ('finished_at', models.DateTimeField(blank=True, null=True)),
                ('played_at', models.DateTimeField(blank=True, null=True)),
                ('collection', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='videos.Collection')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]