# Generated by Django 3.1.4 on 2022-03-04 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0053_auto_20220304_0109'),
    ]

    operations = [
        migrations.AddField(
            model_name='anime',
            name='questions_number',
            field=models.IntegerField(default=0),
        ),
    ]
