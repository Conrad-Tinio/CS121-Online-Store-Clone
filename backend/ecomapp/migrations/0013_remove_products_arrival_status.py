# Generated by Django 5.2.1 on 2025-05-17 06:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecomapp', '0012_tagtype_alter_tag_options_alter_products_tags_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='arrival_status',
        ),
    ]
