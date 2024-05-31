# Generated by Django 4.2.13 on 2024-05-30 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='broad',
        ),
        migrations.AlterField(
            model_name='notification',
            name='kind',
            field=models.CharField(blank=True, choices=[('NA', 'new available anime in quizes'), ('N', 'new anime to review'), ('R', 'review needed'), ('A', 'question approved'), ('F', 'question rejected')], max_length=2, null=True),
        ),
    ]
