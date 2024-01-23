# Generated by Django 5.0.1 on 2024-01-21 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bike_type', models.CharField(max_length=50)),
                ('slug', models.SlugField(editable=False, max_length=150, unique=True)),
                ('gps', models.CharField(max_length=150)),
            ],
            options={
                'db_table': 'Bike',
            },
        ),
    ]
