# Generated by Django 4.1.7 on 2023-09-04 15:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_user_followers_delete_userfollowing'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='followers',
        ),
        migrations.CreateModel(
            name='UserFollow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to=settings.AUTH_USER_MODEL)),
                ('following', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
