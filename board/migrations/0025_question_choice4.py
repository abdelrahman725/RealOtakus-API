# Generated by Django 3.1.4 on 2021-11-14 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0024_remove_question_choice4'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='choice4',
            field=models.TextField(null=True),
        ),
    ]
