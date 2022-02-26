# Generated by Django 3.1.4 on 2022-02-26 03:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0032_game'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='game_owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='get_games', to=settings.AUTH_USER_MODEL),
        ),
    ]
