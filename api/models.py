from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Gallery(models.Model):
    name=models.CharField(max_length=50 ,unique=True)
    wallTexture=models.ImageField(upload_to='textures',default='textures/wall.png')
    floorTexture=models.ImageField(upload_to='textures',default='textures/wood.jpg')
    cellingTexture=models.ImageField(upload_to='textures',default='textures/wall.png')
    scale=models.JSONField()
    access=models.CharField(max_length=15,choices=(('PRIVATE','private'),('PUBLIC','public')),default='PUBLIC')
    user=models.ForeignKey(User,models.CASCADE)
    balance=models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.name

class Arts(models.Model):
    name=models.CharField(max_length=50,unique=True)
    art=models.FileField(upload_to='arts')
    description=models.TextField(blank=True)
    price=models.IntegerField()
    author=models.CharField(max_length=50,default='Author')
    owner=models.ForeignKey(User,models.CASCADE)
    gallery=models.ForeignKey(Gallery,models.SET_NULL,null=True)
    position=models.JSONField()
    rotation=models.JSONField()
    # hashtags=models.Choices()

    def __str__(self) -> str:
        return self.name



