from django.urls import path
from . import views




app_name = "editor"
urlpatterns = [
    path("<str:project_uuid>" , views.index , name="index"),
    path("hvac_editor/<str:project_uuid>" , views.hvac_editor , name="hvac_editor"),
    path("2d_view/<str:project_uuid>" , views._2d_view , name="2d_view"),
    path("3d_view/<str:project_uuid>" , views._3d_view , name="3d_view"),
    path("run_simulation/<str:project_uuid>" , views.run_simulation , name="run_simulation")
]