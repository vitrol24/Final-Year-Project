from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.staticfiles.storage import staticfiles_storage
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.urls import reverse

import user.models as user_models
import user.views as user_views
from . import functions

import esoreader

import io, json, math, os, shutil, sqlite3








@login_required(login_url="user:logout")
def _2d_view(request, project_uuid:str):
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
    return render(request, "editor/2d_view.html" , ctx)








@login_required(login_url="user:logout")
def _3d_view(request, project_uuid:str):
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
    return render(request, "editor/3d_view.html" , ctx)










@login_required(login_url="user:logout")
def index(request, project_uuid:str):
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
    return render(request, "editor/index.html" , ctx)








@login_required(login_url="user:logout")
def hvac_editor(request, project_uuid:str):
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
    return render(request, "editor/hvac_editor.html" , ctx)













@login_required(login_url="user:logout")
def run_simulation(request, project_uuid:str):
    user = request.user
    

    # check if project exists
    project = None
    all_user_projects = user.buildingproject_set.filter(uuid=project_uuid)
    if all_user_projects.count() > 0:
        project = all_user_projects.first()
    else:
        messages.error(request, "Given project no longer exists.")
        return redirect(reverse("user:dashboard"))
    








    # INIT GEOMEPPY
    idf = functions.init_geomeppy(project)
    
        

    

    

    # 1. EXTACT ALL ZONES
    zones = functions.extract_zones(project)
    if zones['status'] == "error":
        messages.error(request, "This project has no zones.")
        return redirect(reverse("user:project_details", args=(project_uuid,)))

    
    
    
    # 2. WALLS, FLOORS, ROOFS, ZONES
    functions.create_floor_materials(idf)
    functions.create_roof_materials(idf)
    functions.create_wall_materials(idf)
    functions.create_blocks(idf, project, zones['data'])

    
    

    
    # 3. WINDOWS
    functions.create_window_materials(idf)
    functions.create_windows(idf, project)


    # 4. DOORS
    functions.create_door_materials(idf)
    functions.create_doors(idf, project)

    idf.match()
    #idf.set_default_constructions()
    

    # 5. LIGHTS
    functions.create_lights(idf, project)


    # 6. HVAC
    functions.create_hvac(idf, project)

    
    # 9. OUTPUT VARIABLES
    functions.create_output_variables(idf, project)
    

    

    














    
    output_dir = f"results/{user.id}"
    if not os.path.exists(output_dir):
        os.mkdir(output_dir)

    output_dir = f"{output_dir}/{project.name}"
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.mkdir(output_dir)




    
    #idf.set_wwr(0.6)
    #idf.to_obj(f"{output_dir}/{project.name}.obj")
    #idf.view_model()
    idf.run(output_directory=output_dir, expandobjects=True, readvars=True)
    #idf.run(output_directory=output_dir)

    #idf.save(f"{output_dir}/{project.name}.idf")
    
    
    

   








    # GET RESULTS
    RESULTS = {
        "area": None, # m2
        
        "monthly_lighting":[],
        "total_lighting":None, # kWh
        "lighting_EUI":None, # kWh/m2


        "monthly_heating": [], # kWh each
        "total_heating": None, #kWh
        "heating_EUI":None, # kWh/m2


        "monthly_cooling": [], # kWh each
        "total_cooling": None, # kWh
        "cooling_EUI":None, # kWh/m2


        "monthly_co2_emissions":[],
        "total_co2_emissions":None,


        "total_EUI": None,
        "comfort": [],
    }




    # area
    with open(f"{output_dir}/eplustbl.csv", "r") as f:
        contents = f.read()
    
    for line in contents.split("\n"):
        line = line.split(",")
        i = len(line) -1
        while i >= 0:
            if line[i] == "":
                del line[i]
            else:
                line[i] = line[i].strip()
            i -= 1
        
        if len(line) == 0: continue


        if line[0] == "Total Building Area":
            RESULTS['area'] = float(line[1])
            break
        
    







    
    dd,data = esoreader.read(f"{output_dir}/eplusout.eso")
    def get_monthly_kwh(variable_name):
        j_to_kwh = 3_600_000
        found_vars = dd.find_variable(variable_name)

        monthly_values = [[], [], [], [], [], [], [], [], [], [], [], []]
        
        for var in found_vars:
            for i,val in enumerate(data[dd.index[var]]):
                monthly_values[i].append(round(val,2))
        
        # sum and convert J to KwH
        for i,vals in enumerate(monthly_values):
            monthly_values[i] = round(sum(vals) / j_to_kwh, 2)
        return monthly_values
    


    
    # cooling
    monthly_cooling = get_monthly_kwh("Zone Packaged Terminal Air Conditioner Total Cooling Energy")
    RESULTS['monthly_cooling'] = monthly_cooling
    RESULTS['total_cooling'] = round(sum(monthly_cooling), 2)
    RESULTS['cooling_EUI'] = round(sum(monthly_cooling) / RESULTS['area'], 2)


    # heating
    monthly_heating = get_monthly_kwh("Zone Packaged Terminal Air Conditioner Total Heating Energy")
    RESULTS['monthly_heating'] = monthly_heating
    RESULTS['total_heating'] = round(sum(monthly_heating), 2)
    RESULTS['heating_EUI'] = round(sum(monthly_heating) / RESULTS['area'], 2)


    # lighting
    monthly_lighting = get_monthly_kwh("Lights Electricity Energy")
    RESULTS['monthly_lighting'] = monthly_lighting
    RESULTS['total_lighting'] = round(sum(monthly_lighting), 2)
    RESULTS['lighting_EUI'] = round(sum(monthly_lighting) / RESULTS['area'], 2)
    
    
    # co2 emissions
    # carbon_ems = get_monthly_kwh("Carbon Equivalent:Facility")
    # print(carbon_ems)


    # total eui
    RESULTS['total_EUI'] = round((sum(monthly_cooling) + sum(monthly_heating) + sum(monthly_lighting)) / RESULTS['area'], 2)

    # total energy
    RESULTS['total_energy'] = round(sum(monthly_cooling) + sum(monthly_heating) + sum(monthly_lighting), 2)


    #print(RESULTS)

    


    # comfort






    project.simulation_results = RESULTS
    project.save()
    
    
    
    

    # DELETE FOLDER
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)


    

    messages.success(request, "Simulation completed succesfully.")

    return redirect(reverse("user:project_details", args=(project_uuid,)))














