# Generated by Django 5.1.7 on 2025-04-14 06:50

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_customuser_bio_customuser_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='phone',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to=api.models.user_directory_path),
        ),
    ]
