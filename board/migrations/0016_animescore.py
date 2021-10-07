# Generated by Django 3.1.4 on 2021-10-07 11:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0015_auto_20211002_1220'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnimeScore',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0)),
                ('anime', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='board.anime')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
