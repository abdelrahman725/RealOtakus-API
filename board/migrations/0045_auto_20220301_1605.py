# Generated by Django 3.1.4 on 2022-03-01 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0044_auto_20220301_1600'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='statue',
        ),
        migrations.AddField(
            model_name='question',
            name='status',
            field=models.CharField(choices=[('approved', 'approved'), ('declined', 'declined'), ('pending', 'pending')], default='approved', max_length=20),
        ),
    ]
