# Generated by Django 5.1.7 on 2025-04-07 06:17

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_deck_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='progress', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'date')},
            },
        ),
        migrations.CreateModel(
            name='ClearedFlashcard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flashcard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.flashcard')),
                ('progress', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cleared_flashcards', to='api.userprogress')),
            ],
            options={
                'unique_together': {('progress', 'flashcard')},
            },
        ),
    ]
