# Generated by Django 3.1.4 on 2022-08-18 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0089_question_reviewer_feedback'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='reviewer_feedback',
            field=models.TextField(blank=True, max_length=100, null=True),
        ),
    ]
