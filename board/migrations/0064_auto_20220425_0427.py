# Generated by Django 3.1.4 on 2022-04-25 02:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0063_game_contributions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='anime',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='anime_game', to='board.anime'),
        ),
    ]
