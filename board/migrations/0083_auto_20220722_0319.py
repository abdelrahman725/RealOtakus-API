# Generated by Django 3.1.4 on 2022-07-22 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0082_auto_20220719_0836'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='anime_name',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
