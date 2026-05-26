import json, uuid, sys

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth .decorators import login_required
from django.shortcuts import redirect, render
from django.urls import reverse, reverse_lazy

from . import managers
from . import models
import editor.models












@login_required(login_url="user:logout")
def account(request):
    ctx = {
        "user" : request.user
    }
    return render(request, "user/account.html" , ctx)








@login_required(login_url="user:logout")
def create_project(request):
    user = request.user

    if request.method == "POST":
        name = request.POST.get("name")
        information = request.POST.get("information")
        location = request.POST.get("location")

        new_project = editor.models.BuildingProject(
            user = user,

            data = {
                "blocks":{
                    "exterior_walls_material":{
                        "layer_1":"Cement Block",
                        "layer_2":None,
                        "layer_3":None,
                        "layer_4":None,
                        "layer_5":None
                    },
                    "interior_walls_material":{
                        "layer_1":"Cement Block",
                        "layer_2":None,
                        "layer_3":None,
                        "layer_4":None,
                        "layer_5":None
                    },  
                    "floor_material": {

                        "layer_1":"Polished Concrete",
                        "layer_2":None,
                        "layer_3":None,
                        "layer_4":None,
                        "layer_5":None
                    },
                    "hvac":[],
                    "roof_material": {
                        "layer_1":"Corrugated Iron Sheets",
                        "layer_2":None,
                        "layer_3":None,
                        "layer_4":None,
                        "layer_5":None
                    },
                    "objects": []
                },
                
                "doors":[],
                "electrical_equipment":[],
                "hvacs":[],
                "lights":[],
                "texts":[],
                "windows":[]
            },


            info = information,
            location = location,
            name=name.replace(";", "_"),
            uuid=str(uuid.uuid4())
        )
        new_project.save()


        messages.success(request, "New project created")
    return redirect(reverse("user:dashboard"))








@login_required(login_url="user:logout")
def dashboard(request):
    ctx = {
        "user" : request.user
    }
    return render(request, "user/dashboard.html" , ctx)






@login_required(login_url="user:logout")
def delete_account(request):
    user = request.user
    user.delete()
    messages.success(request, "Account has been deleted.")

    return redirect(reverse("user:logout"))






@login_required(login_url="user:logout")
def delete_project(request, project_uuid:str):
    user = request.user


    # check if project exists
    project = None
    all_user_projects = user.buildingproject_set.filter(uuid=project_uuid)
    if all_user_projects.count() > 0:
        project = all_user_projects.first()
    else:
        messages.error(request, "Given project no longer exists.")
        return redirect(reverse("user:dashboard"))
    
    project_name = project.name
    project.delete()
    messages.success(request, f"Project \"{project_name}\" deleted")


    return redirect(reverse("user:dashboard"))













def _login(request):

    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect("user:dashboard")
        else:
            messages.error(request, "Incorrect email or password")
        

    ctx = {}
    return render(request, "user/login.html" , ctx)










def _logout(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect("user:login")









@login_required(login_url="user:logout")
def project_details(request, project_uuid:str):
    user = request.user

    
    # check if project exists
    project = None
    all_user_projects = user.buildingproject_set.filter(uuid=project_uuid)
    if all_user_projects.count() > 0:
        project = all_user_projects.first()
    else:
        messages.error(request, "Given project no longer exists.")
        return redirect(reverse("user:dashboard"))
    


    ctx = {
        "user": user,
        "project": project
    }
    return render(request, "user/project_details.html", ctx)










@login_required(login_url="user:logout")
def publish_project(request, project_uuid:str):
    user = request.user


    # check if project exists
    project = None
    all_user_projects = user.buildingproject_set.filter(uuid=project_uuid)
    if all_user_projects.count() > 0:
        project = all_user_projects.first()
    else:
        messages.error(request, "Given project no longer exists.")
        return redirect(reverse("user:dashboard"))
    
    project.published = True
    project.save()
    messages.success(request, f"Project \"{project.name}\" has been publised.")


    return redirect(reverse("user:project_details", args=(project_uuid,)))







# SAVE PROJECT DATA FROM EDITOR
@login_required(login_url="user:logout")
def save_project(request, project_uuid:str):
    user = request.user

    # check if project exists
    project = None
    all_user_projects = user.buildingproject_set.filter(uuid=project_uuid)
    if all_user_projects.count() > 0:
        project = all_user_projects.first()
    else:
        messages.error(request, "Given project no longer exists.")
        return redirect(reverse("user:dashboard"))
    


    if request.method == "POST":
        project_data = json.loads(request.POST['project_data'])
        project.data = project_data
        project.save()

        

        
        

        

    return redirect(reverse("editor:index", args=(project_uuid,)))







def signup(request):

    # SIGNUP REQUEST
    if request.method == "POST":
        firstname = request.POST['firstname']
        lastname = request.POST['lastname']
        email = request.POST['email']
        password = request.POST['password']

        
        
        # ENSURE EMAIL NOT ALREADY IN USE
        if models.User.objects.filter(email=email).exists() == False:
            new_user = models.User(
                first_name=firstname,
                last_name=lastname, 
                email=email
            )
            new_user.set_password(password)
            new_user.save()

            messages.success(request, "Account created successfully, you can now login.")
            return redirect("user:login")
        else:
            messages.error(request, f"Email \"{email}\" already in use, choose another one.")




    # SIGNUP PAGE
    ctx = {}
    return render(request, "user/signup.html" , ctx)







@login_required(login_url="user:logout")
def unpublish_project(request, project_uuid:str):
    user = request.user


    # check if project exists
    project = None
    all_user_projects = user.buildingproject_set.filter(uuid=project_uuid)
    if all_user_projects.count() > 0:
        project = all_user_projects.first()
    else:
        messages.error(request, "Given project no longer exists.")
        return redirect(reverse("user:dashboard"))
    
    project.published = False
    project.save()
    messages.success(request, f"Project \"{project.name}\" has been unpublished.")


    return redirect(reverse("user:project_details", args=(project_uuid,)))







@login_required(login_url="user:logout")
def update_information(request):
    
    user = request.user
    if request.method == "POST":
        firstname = request.POST['firstname']
        lastname = request.POST['lastname']
        email = request.POST['email']

        user.first_name = firstname
        user.last_name = lastname
        user.email = email

        user.save()

    return redirect(reverse("user:account"))





