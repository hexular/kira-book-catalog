# Generated by Django 3.0.3 on 2020-02-16 23:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='autor',
            new_name='author',
        ),
    ]
