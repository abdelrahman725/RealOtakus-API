# Generated by Django 3.1.4 on 2022-03-01 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0042_auto_20220301_1528'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='statue',
            field=models.CharField(choices=[('approved', 'approved'), ('declined', 'declined'), ('pending', 'pending')], default='approved', max_length=20),
        ),
    ]
