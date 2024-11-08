from django.urls import path,include
from .views import *
from knox import views as knox_views

urlpatterns=[
    # path('getGallery/',GetGallery),
    # path('getGallery/<int:id>',GetGallery)
    path('auth/',include('knox.urls')),
    # path('createUser/',CreateUser.as_view()),
    #  path('UserLogin/',Login.as_view()),
    # path('editUser/',UpdateUser.as_view())
    path('user/', UserAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logout_all/', knox_views.LogoutAllView.as_view(), name='knox_logoutAll'),
    path('register/', RegistrationAPI.as_view()),
    path('gallery/<int:id>',GalleryGetApi.as_view()),
    path('gallery/',GalleryApi.as_view()),
    path('user_gallerys/',GetUserGallerys.as_view()),
    path('arts/<int:galleryId>',GetArtByGallery.as_view()),
    path('add_arts/',ArtsApi.as_view())
]