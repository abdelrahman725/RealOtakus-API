# Generated by Django 3.1.4 on 2022-02-28 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0039_auto_20220228_2126'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='review',
            field=models.TextField(null=True),
        ),
    ]
