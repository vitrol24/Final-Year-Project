from django.urls import path
from . import views


app_name = "index"
urlpatterns = [
    path("" , views.index , name="index"),
    path("about_us/" , views.about_us , name="about_us"),
    path("contact_us/" , views.contact_us , name="contact_us"),
    path("documentation/" , views.documentation , name="documentation"),
    path("explore_desings/" , views.explore_designs , name="explore_designs"),
]


