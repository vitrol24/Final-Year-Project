from django.urls import path
from . import views


app_name = "user"
urlpatterns = [
    path("" , views.dashboard , name="dashboard"),
    path("account/" , views.account , name="account"),
    path("create_project/" , views.create_project , name="create_project"),
    path("delete_account/" , views.delete_account , name="delete_account"),
    path("delete_project/<str:project_uuid>" , views.delete_project , name="delete_project"),
    path("login/" , views._login , name="login"),
    path("logout/" , views._logout , name="logout"),
    path("publish_project/<str:project_uuid>" , views.publish_project , name="publish_project"),
    path("project_details/<str:project_uuid>" , views.project_details , name="project_details"),
    path("save_project/<str:project_uuid>" , views.save_project , name="save_project"),
    path("signup/" , views.signup , name="signup"),
    path("unpublish_project/<str:project_uuid>" , views.unpublish_project , name="unpublish_project"),
    path("update_information/" , views.update_information , name="update_information"),
]