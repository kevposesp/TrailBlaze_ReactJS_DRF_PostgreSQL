# Generated by Django 5.0.1 on 2024-02-05 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payout', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payout',
            name='id_payment',
            field=models.CharField(editable=False, max_length=36, primary_key=True, serialize=False, unique=True, verbose_name='pi'),
        ),
    ]