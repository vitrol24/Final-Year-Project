from collections import defaultdict
import collections.abc
collections.MutableSequence = collections.abc.MutableSequence
import matplotlib.pyplot as plt
from geomeppy import IDF
import geomeppy.geom.polygons


from django.contrib.staticfiles.finders import find
from django.core.files.storage import FileSystemStorage

from shapely.geometry import LineString, Polygon, MultiPolygon, GeometryCollection
from shapely.geometry.polygon import orient
from shapely.ops import linemerge, polygonize, unary_union



import numpy as np
import io, math, os, random, uuid
from datetime import time












# CREATE DOOR OBJECTS
def create_door_objects(idf, project):
    door_height = 5
    door_base = 1
    for door_data in project.data['doors']:
        for wall_data in project.data['walls']:
            if door_data['wall_id'] == wall_data['id']:
                door = idf.newidfobject(
                    'FENESTRATIONSURFACE:DETAILED',
                    Name=f"{door_data['name']} - {door_data['id']}",
                    Surface_Type='Door',
                    Construction_Name='Door_Construction',
                    Building_Surface_Name=f"{wall_data['name']} - {wall_data['id']}",
                    #Number_of_Vertices=4
                )




                if wall_data['alignment'] == "horizontal":
                    if wall_data['direction'] == "north":
                        door.Vertex_1_Xcoordinate=door_data['start']['x'];  door.Vertex_1_Ycoordinate=door_data['start']['y'];  door.Vertex_1_Zcoordinate=door_base
                        door.Vertex_2_Xcoordinate=door_data['end']['x'];    door.Vertex_2_Ycoordinate=door_data['end']['y'];    door.Vertex_2_Zcoordinate=door_base
                        door.Vertex_3_Xcoordinate=door_data['end']['x'];    door.Vertex_3_Ycoordinate=door_data['end']['y'];    door.Vertex_3_Zcoordinate=door_base+door_height
                        door.Vertex_4_Xcoordinate=door_data['start']['x'];  door.Vertex_4_Ycoordinate=door_data['start']['y'];  door.Vertex_4_Zcoordinate=door_base+door_height
                        
                    elif wall_data['direction'] == "south":
                        door.Vertex_1_Xcoordinate=door_data['start']['x'];  door.Vertex_1_Ycoordinate=door_data['start']['y'];  door.Vertex_1_Zcoordinate=door_base
                        door.Vertex_2_Xcoordinate=door_data['end']['x'];    door.Vertex_2_Ycoordinate=door_data['end']['y'];    door.Vertex_2_Zcoordinate=door_base
                        door.Vertex_3_Xcoordinate=door_data['end']['x'];    door.Vertex_3_Ycoordinate=door_data['end']['y'];    door.Vertex_3_Zcoordinate=door_base+door_height
                        door.Vertex_4_Xcoordinate=door_data['start']['x'];  door.Vertex_4_Ycoordinate=door_data['start']['y'];  door.Vertex_4_Zcoordinate=door_base+door_height
                        
                    else:
                        door.Vertex_1_Xcoordinate=door_data['end']['x'];    door.Vertex_1_Ycoordinate=door_data['end']['y'];    door.Vertex_1_Zcoordinate=door_base
                        door.Vertex_2_Xcoordinate=door_data['start']['x'];  door.Vertex_2_Ycoordinate=door_data['start']['y'];  door.Vertex_2_Zcoordinate=door_base
                        door.Vertex_3_Xcoordinate=door_data['start']['x'];  door.Vertex_3_Ycoordinate=door_data['start']['y'];  door.Vertex_3_Zcoordinate=door_base+door_height
                        door.Vertex_4_Xcoordinate=door_data['end']['x'];    door.Vertex_4_Ycoordinate=door_data['end']['y'];    door.Vertex_4_Zcoordinate=door_base+door_height




                elif wall_data['alignment'] == "vertical":
                    if wall_data['direction'] == "west":
                        door.Vertex_1_Xcoordinate=door_data['start']['x'];    door.Vertex_1_Ycoordinate=door_data['start']['y'];    door.Vertex_1_Zcoordinate=door_base
                        door.Vertex_2_Xcoordinate=door_data['end']['x'];  door.Vertex_2_Ycoordinate=door_data['end']['y'];  door.Vertex_2_Zcoordinate=door_base
                        door.Vertex_3_Xcoordinate=door_data['end']['x'];  door.Vertex_3_Ycoordinate=door_data['end']['y'];  door.Vertex_3_Zcoordinate=door_base+door_height
                        door.Vertex_4_Xcoordinate=door_data['start']['x'];    door.Vertex_4_Ycoordinate=door_data['start']['y'];    door.Vertex_4_Zcoordinate=door_base+door_height
                        
                    elif wall_data['direction'] == "east":
                        door.Vertex_1_Xcoordinate=door_data['start']['x'];    door.Vertex_1_Ycoordinate=door_data['start']['y'];    door.Vertex_1_Zcoordinate=door_base
                        door.Vertex_2_Xcoordinate=door_data['end']['x'];  door.Vertex_2_Ycoordinate=door_data['end']['y'];  door.Vertex_2_Zcoordinate=door_base
                        door.Vertex_3_Xcoordinate=door_data['end']['x'];  door.Vertex_3_Ycoordinate=door_data['end']['y'];  door.Vertex_3_Zcoordinate=door_base+door_height
                        door.Vertex_4_Xcoordinate=door_data['start']['x'];    door.Vertex_4_Ycoordinate=door_data['start']['y'];    door.Vertex_4_Zcoordinate=door_base+door_height

                    else:
                        door.Vertex_1_Xcoordinate=door_data['start']['x'];    door.Vertex_1_Ycoordinate=door_data['start']['y'];    door.Vertex_1_Zcoordinate=door_base
                        door.Vertex_2_Xcoordinate=door_data['end']['x'];  door.Vertex_2_Ycoordinate=door_data['end']['y'];  door.Vertex_2_Zcoordinate=door_base
                        door.Vertex_3_Xcoordinate=door_data['end']['x'];  door.Vertex_3_Ycoordinate=door_data['end']['y'];  door.Vertex_3_Zcoordinate=door_base+door_height
                        door.Vertex_4_Xcoordinate=door_data['start']['x'];    door.Vertex_4_Ycoordinate=door_data['start']['y'];    door.Vertex_4_Zcoordinate=door_base+door_height

                        #door.Vertex_1_Xcoordinate=door_data['end']['x'];    door.Vertex_1_Ycoordinate=door_data['end']['y'];    door.Vertex_1_Zcoordinate=door_base
                        #door.Vertex_2_Xcoordinate=door_data['start']['x'];  door.Vertex_2_Ycoordinate=door_data['start']['y'];  door.Vertex_2_Zcoordinate=door_base
                        #door.Vertex_3_Xcoordinate=door_data['start']['x'];  door.Vertex_3_Ycoordinate=door_data['start']['y'];  door.Vertex_3_Zcoordinate=door_base+door_height
                        #door.Vertex_4_Xcoordinate=door_data['end']['x'];    door.Vertex_4_Ycoordinate=door_data['end']['y'];    door.Vertex_4_Zcoordinate=door_base+door_height

                        

                        

                else:
                    door.Vertex_1_Xcoordinate=door_data['start']['x'];    door.Vertex_1_Ycoordinate=door_data['start']['y'];    door.Vertex_1_Zcoordinate=door_base
                    door.Vertex_2_Xcoordinate=door_data['end']['x'];  door.Vertex_2_Ycoordinate=door_data['end']['y'];  door.Vertex_2_Zcoordinate=door_base
                    door.Vertex_3_Xcoordinate=door_data['end']['x'];  door.Vertex_3_Ycoordinate=door_data['end']['y'];  door.Vertex_3_Zcoordinate=door_base+door_height
                    door.Vertex_4_Xcoordinate=door_data['start']['x'];    door.Vertex_4_Ycoordinate=door_data['start']['y'];    door.Vertex_4_Zcoordinate=door_base+door_height
                        

                

                

                
                

                

                

                break
    
    














# CREATE FLOOR MATERIALS
def create_floor_materials(idf):
    idf.newidfobject(
        'MATERIAL',
        Name='Ceramic Tiles',
        Roughness='VerySmooth',
        Thickness=0.01,
        Conductivity=1.30,
        Density=2300,
        Specific_Heat=900
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Granite',
        Roughness='Smooth',
        Thickness=0.02,
        Conductivity=2.80,
        Density=2700,
        Specific_Heat=820
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Hardwood',
        Roughness='MediumSmooth',
        Thickness=0.019,
        Conductivity=0.16,
        Density=700,
        Specific_Heat=1600
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Marble',
        Roughness='MediumSmooth',
        Thickness=0.02,
        Conductivity=2.8,
        Density=2700,
        Specific_Heat=880
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Polished Concrete',
        Roughness='MediumSmooth',
        Thickness=0.01,
        Conductivity=1.70,
        Density=2300,
        Specific_Heat=840
    )
    
    idf.newidfobject(
        'MATERIAL',
        Name='Porcelain Tiles',
        Roughness='VerySmooth',
        Thickness=0.01,
        Conductivity=1.30,
        Density=2400,
        Specific_Heat=900
    )

    idf.newidfobject(
        'MATERIAL',
        Name='PVC/Vinyl Tiles',
        Roughness='Smooth',
        Thickness=0.003,
        Conductivity=0.20,
        Density=1400,
        Specific_Heat=1200
    )




# CREATE FLOOR OBJECTS
def create_floor_objects(idf, project):
    result = {
        "status":None,
        "message":None,
        "logs":[]
    }


    if "floors" in list (project.data.keys()):
        # Add monthly ground temperatures (12 values in Celsius)
        idf.newidfobject(
            'SITE:GROUNDTEMPERATURE:BUILDINGSURFACE',
            January_Ground_Temperature=20.0,
            February_Ground_Temperature=20.0,
            March_Ground_Temperature=21.0,
            April_Ground_Temperature=21.0,
            May_Ground_Temperature=20.0,
            June_Ground_Temperature=19.0,
            July_Ground_Temperature=18.0,
            August_Ground_Temperature=19.0,
            September_Ground_Temperature=21.0,
            October_Ground_Temperature=22.0,
            November_Ground_Temperature=22.0,
            December_Ground_Temperature=21.0
        )


        for floor_data in project.data['floors']['objects']:
            # ensure floor has an outside layer in its materials
            if floor_data['layer_1'] == None:
                result["logs"].append(f"Floor {floor_data['name']} has no material.")
                continue
            

            floor = idf.newidfobject(
                "BUILDINGSURFACE:DETAILED",
                Name=f"{floor_data['name']}_{floor_data['id']}_Floor",
                Surface_Type="Floor",
                Construction_Name=f"{floor_data['name']}_{floor_data['id']}_Construction",
                Outside_Boundary_Condition="Ground",
                Sun_Exposure='NoSun',
                Wind_Exposure='NoWind',
                Zone_Name=f'{project.name}_Zone',
                Number_of_Vertices=4,
                Vertex_1_Xcoordinate=floor_data['end']['x'], Vertex_1_Ycoordinate=floor_data['start']['y'], Vertex_1_Zcoordinate=0,
                Vertex_2_Xcoordinate=floor_data['start']['x'], Vertex_2_Ycoordinate=floor_data['start']['y'], Vertex_2_Zcoordinate=0,
                Vertex_3_Xcoordinate=floor_data['start']['x'], Vertex_3_Ycoordinate=floor_data['end']['y'], Vertex_3_Zcoordinate=0,
                Vertex_4_Xcoordinate=floor_data['end']['x'], Vertex_4_Ycoordinate=floor_data['end']['y'], Vertex_4_Zcoordinate=0
            )


            # materials
            construction = idf.newidfobject(
                'CONSTRUCTION',
                Name=f"{floor_data['name']}_{floor_data['id']}_Construction"
            )
            construction.Outside_Layer = floor_data['layer_1']
            
            if floor_data['layer_2'] != None:
                construction.Layer_2 = floor_data['layer_2']
            
            if floor_data['layer_3'] != None:
                construction.Layer_3 = floor_data['layer_3']
            
            if floor_data['layer_4'] != None:
                construction.Layer_4 = floor_data['layer_4']
            
            if floor_data['layer_5'] != None:
                construction.Layer_5 = floor_data['layer_5']

            






    # model has no floors
    else:
        result['message'] = "No Walls in model"
        result['status'] = "error"



    return result












# CREATE ROOF MATERIALS
def create_roof_materials(idf):
    idf.newidfobject(
        'MATERIAL',
        Name='Corrugated Iron Sheets',
        Roughness='MediumRough',
        Thickness=0.0005,
        Conductivity=47.5,
        Density=7875,
        Specific_Heat=450
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Aluminum Roofing Sheets',
        Roughness='MediumSmooth',
        Thickness=0.0008, # 0.8mm
        Conductivity=210,
        Density=2680,
        Specific_Heat=900,
        Thermal_Absorptance=0.9,
        Solar_Absorptance=0.6,
        Visible_Absorptance=0.6
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Concrete Roof Tiles',
        Roughness='Rough',
        Thickness=0.012, # 12mm
        Conductivity=0.81,
        Density=1900,
        Specific_Heat=1000
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Steel Roofing Tiles',
        Roughness='MediumSmooth',
        Thickness=0.0012, #
        Conductivity=47.5,
        Density=7850,
        Specific_Heat=450
    )



# CREATE FLOOR OBJECTS
def create_roof_objects(idf, project):
    result = {
        "status":None,
        "message":None,
        "logs":[]
    }

    wall_height = 15
    if "walls" in list(project.data.keys()):
        wall_height = project.data['walls']['height']
    

    if "roofs" in list (project.data.keys()):
        for roof_data in project.data['roofs']['objects']:
            # ensure roof has an outside layer in its materials
            if roof_data['layer_1'] == None:
                result["logs"].append(f"Floor {roof_data['name']} has no material.")
                continue

                
            roof = idf.newidfobject(
                "BUILDINGSURFACE:DETAILED",
                Name=f"{roof_data['name']} - {roof_data['id']} Roof",
                Surface_Type="Roof",
                Construction_Name=f"{roof_data['name']}_{roof_data['id']}_Construction",
                Outside_Boundary_Condition="Outdoors",
                Sun_Exposure='SunExposed',
                Wind_Exposure='WindExposed',
                Zone_Name=f'{project.name}_Zone',
                Number_of_Vertices=4,

                #Vertex_1_Xcoordinate=roof_data['end']['x'], Vertex_1_Ycoordinate=roof_data['end']['y'], Vertex_1_Zcoordinate=wall_height,
                #Vertex_2_Xcoordinate=roof_data['start']['x'], Vertex_2_Ycoordinate=roof_data['end']['y'], Vertex_2_Zcoordinate=wall_height,
                #Vertex_3_Xcoordinate=roof_data['start']['x'], Vertex_3_Ycoordinate=roof_data['start']['y'], Vertex_3_Zcoordinate=wall_height,
                #Vertex_4_Xcoordinate=roof_data['end']['x'], Vertex_4_Ycoordinate=roof_data['start']['y'], Vertex_4_Zcoordinate=wall_height

                Vertex_1_Xcoordinate=roof_data['start']['x'], Vertex_1_Ycoordinate=roof_data['start']['y'], Vertex_1_Zcoordinate=wall_height,
                Vertex_2_Xcoordinate=roof_data['end']['x'], Vertex_2_Ycoordinate=roof_data['start']['y'], Vertex_2_Zcoordinate=wall_height,
                Vertex_3_Xcoordinate=roof_data['end']['x'], Vertex_3_Ycoordinate=roof_data['end']['y'], Vertex_3_Zcoordinate=wall_height,
                Vertex_4_Xcoordinate=roof_data['start']['x'], Vertex_4_Ycoordinate=roof_data['end']['y'], Vertex_4_Zcoordinate=wall_height

                #Vertex_1_Xcoordinate=roof_data['end']['x'], Vertex_1_Ycoordinate=roof_data['start']['y'], Vertex_1_Zcoordinate=0,
                #Vertex_2_Xcoordinate=roof_data['start']['x'], Vertex_2_Ycoordinate=roof_data['start']['y'], Vertex_2_Zcoordinate=0,
                #Vertex_3_Xcoordinate=roof_data['start']['x'], Vertex_3_Ycoordinate=roof_data['end']['y'], Vertex_3_Zcoordinate=5,
                #Vertex_4_Xcoordinate=roof_data['end']['x'], Vertex_4_Ycoordinate=roof_data['end']['y'], Vertex_4_Zcoordinate=5
            )


            # materials
            construction = idf.newidfobject(
                'CONSTRUCTION',
                Name=f"{roof_data['name']}_{roof_data['id']}_Construction"
            )
            construction.Outside_Layer = roof_data['layer_1']
            
            if roof_data['layer_2'] != None:
                construction.Layer_2 = roof_data['layer_2']
            
            if roof_data['layer_3'] != None:
                construction.Layer_3 = roof_data['layer_3']
            
            if roof_data['layer_4'] != None:
                construction.Layer_4 = roof_data['layer_4']
            
            if roof_data['layer_5'] != None:
                construction.Layer_5 = roof_data['layer_5']

    


    # model has no roofs
    else:
        result['message'] = "No Walls in model"
        result['status'] = "error"
    return result














# CREATE WALL MATERIALS


# CREATE WALL IDF OBJECTS
def create_wall_objects(idf, project):
    result = {
        "status":None,
        "message":None,
        "logs":[]
    }


    if "walls" in list (project.data.keys()):
        for wall_data in project.data['walls']['objects']:

            # ensure wall has an outside layer in its materials
            if wall_data['layer_1'] == None:
                result["logs"].append(f"Wall {wall_data['name']} has no material.")
                continue

            
            wall = idf.newidfobject(
                'BUILDINGSURFACE:DETAILED',
                Construction_Name=f"{wall_data['name']}_{wall_data['id']}_Construction",
                Name=f"{wall_data['name']}_{wall_data['id']}_Wall",
                Number_of_Vertices=4,
                Surface_Type = 'wall',  
                Zone_Name=f'{project.name}_Zone'
            )


            # determine if interioir or exterior wall
            if wall_data['facing'] == "interioir":
                wall.Outside_Boundary_Condition="Surface"
                wall.Sun_Exposure="NoSun"
                wall.Wind_Exposure="NoWind"
            else:
                wall.Outside_Boundary_Condition='Outdoors'
                wall.Sun_Exposure='SunExposed'
                wall.Wind_Exposure='WindExposed'





            # materials
            construction = idf.newidfobject(
                'CONSTRUCTION',
                Name=f"{wall_data['name']}_{wall_data['id']}_Construction"
            )
            construction.Outside_Layer = wall_data['layer_1']
            
            if wall_data['layer_2'] != None:
                construction.Layer_2 = wall_data['layer_2']
            
            if wall_data['layer_3'] != None:
                construction.Layer_3 = wall_data['layer_3']
            
            if wall_data['layer_4'] != None:
                construction.Layer_4 = wall_data['layer_4']
            
            if wall_data['layer_5'] != None:
                construction.Layer_2 = wall_data['layer_5']

            




            # coordinates
            if wall_data['direction'] == "vertical":
                x = wall_data['start']['x']
                if wall_data['facing'] == "east":
                    wall.Vertex_1_Xcoordinate=x;    wall.Vertex_1_Ycoordinate=wall_data['start']['y'];    wall.Vertex_1_Zcoordinate=0
                    wall.Vertex_2_Xcoordinate=x;    wall.Vertex_2_Ycoordinate=wall_data['start']['y'];    wall.Vertex_2_Zcoordinate=wall_data['height']
                    wall.Vertex_3_Xcoordinate=x;    wall.Vertex_3_Ycoordinate=wall_data['end']['y'];    wall.Vertex_3_Zcoordinate=wall_data['height']
                    wall.Vertex_4_Xcoordinate=x;    wall.Vertex_4_Ycoordinate=wall_data['end']['y'];    wall.Vertex_4_Zcoordinate=0
                    
                else:
                    wall.Vertex_1_Xcoordinate=x;    wall.Vertex_1_Ycoordinate=wall_data['end']['y'];    wall.Vertex_1_Zcoordinate=0
                    wall.Vertex_2_Xcoordinate=x;    wall.Vertex_2_Ycoordinate=wall_data['end']['y'];    wall.Vertex_2_Zcoordinate=wall_data['height']
                    wall.Vertex_3_Xcoordinate=x;    wall.Vertex_3_Ycoordinate=wall_data['start']['y'];    wall.Vertex_3_Zcoordinate=wall_data['height']
                    wall.Vertex_4_Xcoordinate=x;    wall.Vertex_4_Ycoordinate=wall_data['start']['y'];    wall.Vertex_4_Zcoordinate=0

                    
                    

            else:
                y = wall_data['start']['y']
                if wall_data['facing'] == 'north':
                    wall.Vertex_1_Xcoordinate=wall_data['end']['x'];    wall.Vertex_1_Ycoordinate=y;    wall.Vertex_1_Zcoordinate=0
                    wall.Vertex_2_Xcoordinate=wall_data['end']['x'];    wall.Vertex_2_Ycoordinate=y;    wall.Vertex_2_Zcoordinate=wall_data['height']
                    wall.Vertex_3_Xcoordinate=wall_data['start']['x'];  wall.Vertex_3_Ycoordinate=y;    wall.Vertex_3_Zcoordinate=wall_data['height']
                    wall.Vertex_4_Xcoordinate=wall_data['start']['x'];  wall.Vertex_4_Ycoordinate=y;    wall.Vertex_4_Zcoordinate=0
                
                else:
                    wall.Vertex_1_Xcoordinate=wall_data['start']['x'];  wall.Vertex_1_Ycoordinate=y;    wall.Vertex_1_Zcoordinate=0
                    wall.Vertex_2_Xcoordinate=wall_data['start']['x'];  wall.Vertex_2_Ycoordinate=y;    wall.Vertex_2_Zcoordinate=wall_data['height']
                    wall.Vertex_3_Xcoordinate=wall_data['end']['x'];    wall.Vertex_3_Ycoordinate=y;    wall.Vertex_3_Zcoordinate=wall_data['height']
                    wall.Vertex_4_Xcoordinate=wall_data['end']['x'];    wall.Vertex_4_Ycoordinate=y;    wall.Vertex_4_Zcoordinate=0





    # model has no walls
    else:
        result['message'] = "No Walls in model"
        result['status'] = "error"
    
    
    return result
        





def create_wall_materials(idf):
    # WALL EXTERIOR FINISH MATERIALS
    idf.newidfobject(
        'MATERIAL',
        Name='White Plaster',
        Roughness='MediumRough',
        Thickness=0.0020,
        Conductivity=0.80,
        Density=1750,
        Specific_Heat=790,
        Thermal_Absorptance=0.9,
        Solar_Absorptance=0.3,
        Visible_Absorptance=0.3
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Grey Cement Plaster',
        Roughness='Rough',
        Thickness=0.0020,
        Conductivity=0.80,
        Density=1900,
        Specific_Heat=790,
        Thermal_Absorptance=0.9,
        Solar_Absorptance=0.7,
        Visible_Absorptance=0.3
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Red Clay Face Brick',
        Roughness='Rough',
        Thickness=0.010,
        Conductivity=1.0,
        Density=2000,
        Specific_Heat=790,
        Thermal_Absorptance=0.9,
        Solar_Absorptance=0.75,
        Visible_Absorptance=0.3
    )

    idf.newidfobject(
        'MATERIAL',
        Name='White Glazed Tile',
        Roughness='Smooth',
        Thickness=0.010,
        Conductivity=1.15,
        Density=2350,
        Specific_Heat=790,
        Thermal_Absorptance=0.9,
        Solar_Absorptance=0.2,
        Visible_Absorptance=0.3
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Aluminum Cladding',
        Roughness='VerySmooth',
        Thickness=0.0030,
        Conductivity=180,
        Density=2700,
        Specific_Heat=790,
        Thermal_Absorptance=0.9,
        Solar_Absorptance=0.2,
        Visible_Absorptance=0.3
    )



    # WALL INSULATION MATERIALS
    idf.newidfobject(
        'MATERIAL',
        Name='EPS (Polystyrene)',
        Roughness='MediumSmooth',
        Thickness=0.025,
        Conductivity=0.035,
        Density=15,
        Specific_Heat=1200
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Glass Wool',
        Roughness='Rough',
        Thickness=0.05,
        Conductivity=0.030,
        Density=12,
        Specific_Heat=800
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Polyurethane Foam',
        Roughness='MediumRough',
        Thickness=0.03,
        Conductivity=0.022,
        Density=30,
        Specific_Heat=1400
    )



    # WALL STRUCTURAL MASH MATERIALS
    idf.newidfobject(
        'MATERIAL',
        Name='Cement Block',
        Roughness='Rough',
        Thickness=0.20,
        Conductivity=0.89,
        Density=1920,
        Specific_Heat=790
    )
    
    idf.newidfobject(
        'MATERIAL',
        Name='Clay Brick',
        Roughness='Rough',
        Thickness=0.10,
        Conductivity=0.7,
        Density=1750,
        Specific_Heat=800
    )
    
    idf.newidfobject(
        'MATERIAL',
        Name='Concrete Block',
        Roughness='Rough',
        Thickness=0.20,
        Conductivity=1.44,
        Density=2240,
        Specific_Heat=900
    )
    

    
    # WALL INTERIOR FINISH MATERIALS
    idf.newidfobject(
        'MATERIAL',
        Name='Cement-Sand Plaster',
        Roughness='MediumRough',
        Thickness=0.020,
        Conductivity=0.72,
        Density=1800,
        Specific_Heat=840
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Ceramic Tile',
        Roughness='Smooth',
        Thickness=0.008,
        Conductivity=1.0,
        Density=2300,
        Specific_Heat=800
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Gypsum Plaster',
        Roughness='MediumSmooth',
        Thickness=0.010,
        Conductivity=0.16,
        Density=900,
        Specific_Heat=1090
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Plasterboard (Drywall)',
        Roughness='Smooth',
        Thickness=0.013,
        Conductivity=0.16,
        Density=800,
        Specific_Heat=1090
    )

    idf.newidfobject(
        'MATERIAL',
        Name='Wood Paneling (Pine)',
        Roughness='MediumSmooth',
        Thickness=0.01,
        Conductivity=0.12,
        Density=500,
        Specific_Heat=1600
    )






def create_window_materials(idf):
    idf.newidfobject(
        'WINDOWMATERIAL:GLAZING',
        Name='Single Clear 4mm Glass',
        Optical_Data_Type='SpectralAverage',
        Thickness=0.004, # 4mm
        Solar_Transmittance_at_Normal_Incidence=0.837,
        Front_Side_Solar_Reflectance_at_Normal_Incidence=0.075,
        Back_Side_Solar_Reflectance_at_Normal_Incidence=0.075,
        Visible_Transmittance_at_Normal_Incidence=0.898,
        Front_Side_Visible_Reflectance_at_Normal_Incidence=0.081,
        Back_Side_Visible_Reflectance_at_Normal_Incidence=0.081,
        Infrared_Transmittance_at_Normal_Incidence=0.0,
        Front_Side_Infrared_Hemispherical_Emissivity=0.84,
        Back_Side_Infrared_Hemispherical_Emissivity=0.84,
        Conductivity=0.9
    )

    idf.newidfobject(
        'WINDOWMATERIAL:GLAZING',
        Name='Single Tinted/Bronze 4mm',
        Optical_Data_Type='SpectralAverage',
        Thickness=0.004, # 4mm
        Solar_Transmittance_at_Normal_Incidence=0.646,
        Front_Side_Solar_Reflectance_at_Normal_Incidence=0.062,
        Back_Side_Solar_Reflectance_at_Normal_Incidence=0.062,
        Visible_Transmittance_at_Normal_Incidence=0.781,
        Front_Side_Visible_Reflectance_at_Normal_Incidence=0.063,
        Back_Side_Visible_Reflectance_at_Normal_Incidence=0.063,
        Infrared_Transmittance_at_Normal_Incidence=0.0,
        Front_Side_Infrared_Hemispherical_Emissivity=0.84,
        Back_Side_Infrared_Hemispherical_Emissivity=0.84,
        Conductivity=0.9
    )


    idf.newidfobject(
        "WINDOWMATERIAL:GAS",
        Name="Air 6mm",
        Gas_Type="Air",
        Thickness=0.006
    )

    idf.newidfobject(
        'WINDOWMATERIAL:GLAZING',
        Name='Double Glazing Clear 4-6-4mm air',
        Optical_Data_Type='SpectralAverage',
        Thickness=0.004, # 4mm
        Solar_Transmittance_at_Normal_Incidence=0.837,
        Front_Side_Solar_Reflectance_at_Normal_Incidence=0.075,
        Back_Side_Solar_Reflectance_at_Normal_Incidence=0.075,
        Visible_Transmittance_at_Normal_Incidence=0.898,
        Front_Side_Visible_Reflectance_at_Normal_Incidence=0.081,
        Back_Side_Visible_Reflectance_at_Normal_Incidence=0.081,
        Infrared_Transmittance_at_Normal_Incidence=0.0,
        Front_Side_Infrared_Hemispherical_Emissivity=0.84,
        Back_Side_Infrared_Hemispherical_Emissivity=0.84,
        Conductivity=0.9
    )

    idf.newidfobject(
        'WINDOWMATERIAL:GLAZING',
        Name='Double Glazing Low-e 4-6-4mm air',
        Optical_Data_Type='SpectralAverage',
        Thickness=0.004, # 4mm
        Solar_Transmittance_at_Normal_Incidence=0.63,
        Front_Side_Solar_Reflectance_at_Normal_Incidence=0.19,
        Back_Side_Solar_Reflectance_at_Normal_Incidence=0.22,
        Visible_Transmittance_at_Normal_Incidence=0.84,
        Front_Side_Visible_Reflectance_at_Normal_Incidence=0.1,
        Back_Side_Visible_Reflectance_at_Normal_Incidence=0.11,
        Infrared_Transmittance_at_Normal_Incidence=0.0,
        Front_Side_Infrared_Hemispherical_Emissivity=0.84,
        Back_Side_Infrared_Hemispherical_Emissivity=0.1,
        Conductivity=0.9
    )
    





def create_door_materials(idf):
    idf.newidfobject("MATERIAL",
        Name="Hardwood (Pine)",
        Roughness="MediumRough",
        Thickness=0.045,      # 45mm thick
        Conductivity=0.15,    # W/m-K
        Density=650,          # kg/m3
        Specific_Heat=1400    # J/kg-K
    )

    idf.newidfobject("MATERIAL",
        Name="Steel (Skin)",
        Roughness="Smooth",
        Thickness=0.0012,     # 1.2mm steel
        Conductivity=50,
        Density=7800,
        Specific_Heat=480
    )

    idf.newidfobject("MATERIAL",
        Name="PU Foam (Core)",
        Roughness="Rough",
        Thickness=0.040,      # 40mm foam core
        Conductivity=0.03,
        Density=35,
        Specific_Heat=1200
    )









































# THESE ARE THE CORDINATES OF THE INDIVIDUAL ENCLOSED POLYGONS FROM THE PROJECT DATA
def extract_zones(project):
    RESULT = {
        "logs": [],
        "data": {"exterior_coordinates":None, "zones":None},
        "status":None
    }
    coordinates = []
    exterior_coords = []
    walls = []

    for block in project.data["blocks"]['objects']:
        left_wall_line = LineString([(block['top_left']['x'], block['top_left']['y']) , (block['bottom_left']['x'], block['bottom_left']['y'])])
        right_wall_line = LineString([(block['top_right']['x'], block['top_right']['y']) , (block['bottom_right']['x'], block['bottom_right']['y'])])
        top_wall_line = LineString([(block['top_left']['x'], block['top_left']['y']) , (block['top_right']['x'], block['top_right']['y'])])
        bottom_wall_line = LineString([(block['bottom_left']['x'], block['bottom_left']['y']) , (block['bottom_right']['x'], block['bottom_right']['y'])])

        walls.append(left_wall_line)
        walls.append(right_wall_line)
        walls.append(top_wall_line)
        walls.append(bottom_wall_line)


    if len(walls) == 0:
        RESULT['logs'].append("No zone walls.")
        RESULT['status'] = "error"
    
    else:
        split_junctions = unary_union(walls)
        polygons = list(polygonize(split_junctions))
        

        # exterior coords
        unified_polygons = list(orient(unary_union(polygons), sign=1.0).exterior.coords)
        RESULT['logs'].append("Getting exterior coordinates.")
        for i in range(len(unified_polygons) - 1):
            start = unified_polygons[i]
            end = unified_polygons[i+1]
            exterior_coords.append([start, end])
        RESULT['logs'].append("Done.")
        
        

        RESULT['logs'].append("Getting all zones coordinates.")
        for i,polygon in enumerate(polygons):
            if isinstance(polygon, Polygon):
                poly_ccw = orient(polygon, sign=1.0)
                ccw_coords = list(poly_ccw.exterior.coords[:-1])
                coords = list(polygon.exterior.coords[:-1])
                if ccw_coords not in coords:
                    coordinates.append(ccw_coords)
                    RESULT['logs'].append("Zone coordinates not counter clockwise.")
                    RESULT['logs'].append("Zone coordinates changed to counter clockwise.")

        RESULT['logs'].append("Done.")
        


        RESULT['data']['zones'] = coordinates
        RESULT['data']['exterior_coordinates'] = exterior_coords
        RESULT['status'] = "success"

    return RESULT





def create_blocks(idf, project, zones):
    RESULT = {
        "logs": [],
        "status":None
    }


    # CREATE ZONE BLOCKS
    for i,zone in enumerate(zones['zones']):
        """print(zone)
        for corner_i,corner in enumerate(zone):
            zone[corner_i] = list(zone[corner_i])
            print(corner)
            for coord_i,coord in enumerate(corner):
                zone[corner_i][coord_i] = coord * 2
        print(zone)"""
        
        idf.add_block(
            name = f"Block_{i}",
            coordinates = zone,
            height = 20
        )
    





    # WALLS MATERIALS
    airboundary_construction = idf.newidfobject(
        "CONSTRUCTION:AIRBOUNDARY",
        Name=f"Airboundary_Construction"
    )
    
    open_air_material = idf.newidfobject(
        "MATERIAL:INFRAREDTRANSPARENT",
        Name="Open_Air_Material",
    )
    open_wall_construction = idf.newidfobject(
        "CONSTRUCTION",
        Name=f"Exterior_Airboundary_Construction",
        Outside_Layer=open_air_material.Name
    )



    # SET MATERIALS OF EXTERIOR WALLS
    exterior_walls_construction = idf.newidfobject("CONSTRUCTION", Name=f"Exterior_Walls_Construction", Outside_Layer=project.data['blocks']['exterior_walls_material']['layer_1'])
    if project.data['blocks']['exterior_walls_material']['layer_2'] != None:
        exterior_walls_construction.Layer_2 = project.data['blocks']['exterior_walls_material']['layer_2']
    
    if project.data['blocks']['exterior_walls_material']['layer_3'] != None:
        exterior_walls_construction.Layer_3 = project.data['blocks']['exterior_walls_material']['layer_3']
    
    if project.data['blocks']['exterior_walls_material']['layer_4'] != None:
        exterior_walls_construction.Layer_4 = project.data['blocks']['exterior_walls_material']['layer_4']

    if project.data['blocks']['exterior_walls_material']['layer_5'] != None:
        exterior_walls_construction.Layer_5 = project.data['blocks']['exterior_walls_material']['layer_5']



    # SET ALL EXTERIOR WALLS  MATERIAL
    exterior_wall_names =[]
    for surface in idf.getsurfaces("wall"):
        surface.Outside_Boundary_Condition = "Outdoors"
        surface.Sun_Exposure = "SunExposed"
        surface.Wind_Exposure = "WindExposed"

        x_coords = []
        y_coords = []
        for vertex in surface.coords:
            x_coords.append(vertex[0])
            y_coords.append(vertex[1])
        
        min_x = min(x_coords)
        max_x = max(x_coords)
        min_y = min(y_coords)
        max_y = max(y_coords)


        for exterior_wall in zones["exterior_coordinates"]:
            exterior_wall_min_x = min(exterior_wall[0][0], exterior_wall[1][0])
            exterior_wall_min_y = min(exterior_wall[0][1], exterior_wall[1][1])
            exterior_wall_max_x = max(exterior_wall[0][0], exterior_wall[1][0])
            exterior_wall_max_y = max(exterior_wall[0][1], exterior_wall[1][1])


            # horizontal walls
            if exterior_wall_min_y == exterior_wall_max_y   and  min_y == max_y:
                if min_x == exterior_wall_min_x and   max_x == exterior_wall_max_x:
                    surface.Construction_Name = exterior_walls_construction.Name
                    exterior_wall_names.append(surface.Name)


            # vertical walls
            if exterior_wall_min_x == exterior_wall_max_x   and  min_x == max_x:
                if min_y == exterior_wall_min_y and   max_y == exterior_wall_max_y:
                    surface.Construction_Name = exterior_walls_construction.Name
                    exterior_wall_names.append(surface.Name)

    


    # SET INTERIOR WALLS MATERIALS
    interior_walls_construction = idf.newidfobject("CONSTRUCTION", Name=f"Interior_Walls_Construction", Outside_Layer=project.data['blocks']['interior_walls_material']['layer_1'])
    if project.data['blocks']['interior_walls_material']['layer_2'] != None:
        interior_walls_construction.Layer_2 = project.data['blocks']['interior_walls_material']['layer_2']
    
    if project.data['blocks']['interior_walls_material']['layer_3'] != None:
        interior_walls_construction.Layer_3 = project.data['blocks']['interior_walls_material']['layer_3']
    
    if project.data['blocks']['interior_walls_material']['layer_4'] != None:
        interior_walls_construction.Layer_4 = project.data['blocks']['interior_walls_material']['layer_4']

    if project.data['blocks']['interior_walls_material']['layer_5'] != None:
        interior_walls_construction.Layer_5 = project.data['blocks']['interior_walls_material']['layer_5']

    for surface in idf.getsurfaces("wall"):
        if surface.Name not in exterior_wall_names:
            surface.Outside_Boundary_Condition = "Adiabatic"
            surface.Sun_Exposure = "SunExposed"
            surface.Wind_Exposure = "WindExposed"
            surface.Construction_Name = interior_walls_construction.Name
        

    








    # SET WALLS MATERIAL FOR THOSE THAT AREN'T AVAILABLE
    for surface in idf.getsurfaces("wall"):
        x_coords = []
        y_coords = []
        for vertex in surface.coords:
            x_coords.append(vertex[0])
            y_coords.append(vertex[1])
        min_x = min(x_coords)
        max_x = max(x_coords)
        min_y = min(y_coords)
        max_y = max(y_coords)


        for block_data in project.data['blocks']['objects']:
            # east
            if surface.azimuth == 90:
                if block_data["top_right"]['x'] == min_x and block_data['bottom_right']['x'] == max_x and block_data['top_right']['y'] == min_y and block_data['bottom_right']['y'] == max_y:
                    if block_data['east_wall_available'] == False:
                        west_surface = None
                        # find west wall and check if it is available, if not, then make this surface mass less
                        for surface2 in idf.getsurfaces("wall"):
                            surface2_x_coords = []
                            surface2_y_coords = []
                            for vertex in surface2.coords:
                                surface2_x_coords.append(vertex[0])
                                surface2_y_coords.append(vertex[1])
                            surface2_min_x = min(surface2_x_coords)
                            surface2_min_y = min(surface2_y_coords)
                            surface2_max_x = max(surface2_x_coords)
                            surface2_max_y = max(surface2_y_coords)

                            for block2_data in project.data['blocks']['objects']:
                                if block_data != block2_data:
                                    if surface2.azimuth == 270:
                                        if block_data["top_right"]['x'] == surface2_min_x and block_data['bottom_right']['x'] == surface2_max_x:
                                            if (block_data['top_right']['y'] >= surface2_min_y and block_data['bottom_right']['y'] <= surface2_max_y)  or  (block_data['top_right']['y'] >= surface2_min_y and block_data['bottom_right']['y'] <= surface2_max_y):
                                                west_surface = {"available": block2_data['east_wall_available'] , "object":surface2}
                                                break

                        
                        if west_surface != None:
                            if west_surface['available'] == False:
                                surface.Construction_Name = airboundary_construction.Name
                                surface.Outside_Boundary_Condition = "Surface"
                                surface.Outside_Boundary_Condition_Object = west_surface['object'].Name
                                surface.Sun_Exposure = "NoSun"
                                surface.Wind_Exposure = "NoWind"

                                west_surface['object'].Construction_Name = airboundary_construction.Name
                                west_surface['object'].Outside_Boundary_Condition = "Surface"
                                west_surface['object'].Outside_Boundary_Condition_Object = surface.Name
                                west_surface['object'].Sun_Exposure = "NoSun"
                                west_surface['object'].Wind_Exposure = "NoWind"

                        else:
                            surface.Construction_Name = open_wall_construction.Name
            
            


            
            # west
            if surface.azimuth == 270:
                if block_data["top_left"]['x'] == min_x and block_data['bottom_left']['x'] == max_x and block_data['top_left']['y'] == min_y and block_data['bottom_left']['y'] == max_y:
                    if block_data['west_wall_available'] == False:
                        east_surface = None
                        # find east wall and check if it is available, if not, then make this surface mass less
                        for surface2 in idf.getsurfaces("wall"):
                            surface2_x_coords = []
                            surface2_y_coords = []
                            for vertex in surface2.coords:
                                surface2_x_coords.append(vertex[0])
                                surface2_y_coords.append(vertex[1])
                            surface2_min_x = min(surface2_x_coords)
                            surface2_min_y = min(surface2_y_coords)
                            surface2_max_x = max(surface2_x_coords)
                            surface2_max_y = max(surface2_y_coords)

                            for block2_data in project.data['blocks']['objects']:
                                if block_data != block2_data:
                                    if surface2.azimuth == 90:
                                        if block_data["top_left"]['x'] == surface2_min_x and block_data['bottom_left']['x'] == surface2_max_x:
                                            if (block_data['top_left']['y'] >= surface2_min_y and block_data['bottom_left']['y'] <= surface2_max_y)  or  (block_data['top_left']['y'] >= surface2_min_y and block_data['bottom_left']['y'] <= surface2_max_y):

                                                east_surface = {"available": block2_data['east_wall_available'] , "object":surface2}
                                                break

                        
                        if east_surface != None:
                            if east_surface['available'] == False:
                                surface.Construction_Name = airboundary_construction.Name
                                surface.Outside_Boundary_Condition = "Surface"
                                surface.Outside_Boundary_Condition_Object = east_surface['object'].Name
                                surface.Sun_Exposure = "NoSun"
                                surface.Wind_Exposure = "NoWind"

                                east_surface['object'].Construction_Name = airboundary_construction.Name
                                east_surface['object'].Outside_Boundary_Condition = "Surface"
                                east_surface['object'].Outside_Boundary_Condition_Object = surface.Name
                                east_surface['object'].Sun_Exposure = "NoSun"
                                east_surface['object'].Wind_Exposure = "NoWind"

                        else:
                            surface.Construction_Name = open_wall_construction.Name
            




            # north
            if surface.azimuth == 180:
                if block_data['top_left']['x'] == min_x and block_data['top_right']['x'] == max_x and block_data["top_left"]['y'] == min_y  and block_data['top_right']['y'] == max_y:
                    if block_data['north_wall_available'] == False:
                        south_surface = None
                        # find south wall and check if it is available, if not, then make this surface mass less
                        for surface2 in idf.getsurfaces("wall"):
                            surface2_x_coords = []
                            surface2_y_coords = []
                            for vertex in surface2.coords:
                                surface2_x_coords.append(vertex[0])
                                surface2_y_coords.append(vertex[1])
                            surface2_min_x = min(surface2_x_coords)
                            surface2_min_y = min(surface2_y_coords)
                            surface2_max_x = max(surface2_x_coords)
                            surface2_max_y = max(surface2_y_coords)

                            for block2_data in project.data['blocks']['objects']:
                                if block_data != block2_data:
                                    if surface2.azimuth == 0:
                                        if block_data["top_left"]['y'] == surface2_min_y  and block_data['top_right']['y'] == surface2_max_y:
                                            if (block_data['top_left']['x'] >= surface2_min_x and block_data['top_right']['x'] <= surface2_max_x)  or  (block_data['top_left']['x'] <= surface2_min_x and block_data['top_right']['x'] >= surface2_max_x):
                                                south_surface = {"available": block2_data['south_wall_available'] , "object":surface2}
                                                break

                        
                        if south_surface != None:
                            if south_surface['available'] == False:
                                surface.Construction_Name = airboundary_construction.Name
                                surface.Outside_Boundary_Condition = "Surface"
                                surface.Outside_Boundary_Condition_Object = south_surface['object'].Name
                                surface.Sun_Exposure = "NoSun"
                                surface.Wind_Exposure = "NoWind"

                                south_surface['object'].Construction_Name = airboundary_construction.Name
                                south_surface['object'].Outside_Boundary_Condition = "Surface"
                                south_surface['object'].Outside_Boundary_Condition_Object = surface.Name
                                south_surface['object'].Sun_Exposure = "NoSun"
                                south_surface['object'].Wind_Exposure = "NoWind"

                        else:
                            surface.Construction_Name = open_wall_construction.Name

                        



            
            # south
            if surface.azimuth == 0:
                if block_data['bottom_left']['x'] == min_x and block_data['bottom_right']['x'] == max_x and block_data["bottom_left"]['y'] == min_y  and block_data['bottom_right']['y'] == max_y:
                    if block_data['south_wall_available'] == False:
                        north_surface = None
                        # find north wall and check if it is available, if not, then make this surface mass less
                        for surface2 in idf.getsurfaces("wall"):
                            surface2_x_coords = []
                            surface2_y_coords = []
                            for vertex in surface2.coords:
                                surface2_x_coords.append(vertex[0])
                                surface2_y_coords.append(vertex[1])
                            surface2_min_x = min(surface2_x_coords)
                            surface2_min_y = min(surface2_y_coords)
                            surface2_max_x = max(surface2_x_coords)
                            surface2_max_y = max(surface2_y_coords)

                            for block2_data in project.data['blocks']['objects']:
                                if block_data != block2_data:
                                    if surface2.azimuth == 180:
                                        if block_data["bottom_left"]['y'] == surface2_min_y  and block_data['bottom_right']['y'] == surface2_max_y:
                                            if (block_data['bottom_left']['x'] <= surface2_min_x and block_data['bottom_right']['x'] >= surface2_max_x)  or  (block_data['bottom_left']['x'] >= surface2_min_x and block_data['bottom_right']['x'] <= surface2_max_x):
                                                north_surface = {"available": block2_data['north_wall_available'] , "object":surface2}
                                                break

                        
                        if north_surface != None:
                            if north_surface['available'] == False:
                                surface.Construction_Name = airboundary_construction.Name
                                surface.Outside_Boundary_Condition = "Surface"
                                surface.Outside_Boundary_Condition_Object = north_surface['object'].Name
                                surface.Sun_Exposure = "NoSun"
                                surface.Wind_Exposure = "NoWind"

                                north_surface['object'].Construction_Name = airboundary_construction.Name
                                north_surface['object'].Outside_Boundary_Condition = "Surface"
                                north_surface['object'].Outside_Boundary_Condition_Object = surface.Name
                                north_surface['object'].Sun_Exposure = "NoSun"
                                north_surface['object'].Wind_Exposure = "NoWind"
                        else:
                            surface.Construction_Name = open_wall_construction.Name

                        

    




    # SET FLOORS MATERIALS
    # Add monthly ground temperatures (12 values in Celsius)
    idf.newidfobject(
        'SITE:GROUNDTEMPERATURE:BUILDINGSURFACE',
        January_Ground_Temperature=20.0,
        February_Ground_Temperature=20.0,
        March_Ground_Temperature=21.0,
        April_Ground_Temperature=21.0,
        May_Ground_Temperature=20.0,
        June_Ground_Temperature=19.0,
        July_Ground_Temperature=18.0,
        August_Ground_Temperature=19.0,
        September_Ground_Temperature=21.0,
        October_Ground_Temperature=22.0,
        November_Ground_Temperature=22.0,
        December_Ground_Temperature=21.0
    )

    floor_construction = idf.newidfobject("CONSTRUCTION", Name=f"Floor_Construction", Outside_Layer=project.data['blocks']['floor_material']['layer_1'])
    if project.data['blocks']['floor_material']['layer_2'] != None:
        floor_construction.Layer_2 = project.data['blocks']['floor_material']['layer_2']
    
    if project.data['blocks']['floor_material']['layer_3'] != None:
        floor_construction.Layer_3 = project.data['blocks']['floor_material']['layer_3']
    
    if project.data['blocks']['floor_material']['layer_4'] != None:
        floor_construction.Layer_4 = project.data['blocks']['floor_material']['layer_4']

    if project.data['blocks']['floor_material']['layer_5'] != None:
        floor_construction.Layer_5 = project.data['blocks']['floor_material']['layer_5']

    for i,surface in enumerate(idf.getsurfaces("floor")):
        surface.Construction_Name = floor_construction.Name
        surface.Outside_Boundary_Condition = "Ground"
        surface.Sun_Exposure = "NoSun"
        surface.Wind_Exposure = "NoWind"
    





    

    # SET ROOFS MATERIALS
    roof_construction = idf.newidfobject("CONSTRUCTION", Name=f"Roof_Construction", Outside_Layer=project.data['blocks']['roof_material']['layer_1'])
    if project.data['blocks']['roof_material']['layer_2'] != None:
        roof_construction.Layer_2 = project.data['blocks']['roof_material']['layer_2']
    
    if project.data['blocks']['roof_material']['layer_3'] != None:
        roof_construction.Layer_3 = project.data['blocks']['roof_material']['layer_3']
    
    if project.data['blocks']['roof_material']['layer_4'] != None:
        roof_construction.Layer_4 = project.data['blocks']['roof_material']['layer_4']

    if project.data['blocks']['roof_material']['layer_5'] != None:
        roof_construction.Layer_5 = project.data['blocks']['roof_material']['layer_5']

    for i,surface in enumerate(idf.getsurfaces("roof")):
        surface.Construction_Name = roof_construction.Name
        surface.Outside_Boundary_Condition = "Outdoors"
        surface.Sun_Exposure = "SunExposed"
        surface.Wind_Exposure = "WindExposed"

        



def create_windows(idf, project):
    window_base = 8
    window_height = 8

    for window_data in project.data['windows']:

        # FIND WALLS WINDOW IS ON BASED ON WINDOW COOEDINATES
        target_walls = []
        for wall in idf.getsurfaces("wall"):
            if window_data['type'] == "window 1":
                if wall.Vertex_1_Ycoordinate == window_data['y']:
                    max_x = max(wall.Vertex_1_Xcoordinate, wall.Vertex_2_Xcoordinate, wall.Vertex_3_Xcoordinate, wall.Vertex_4_Xcoordinate)
                    min_x = min(wall.Vertex_1_Xcoordinate, wall.Vertex_2_Xcoordinate, wall.Vertex_3_Xcoordinate, wall.Vertex_4_Xcoordinate)

                    # exclude vertical walls
                    if min_x != max_x:
                        if min_x <= window_data['x']  and  max_x >= window_data['x']:
                            target_walls.append(wall)
            


            elif window_data['type'] == "window 2":
                if wall.Vertex_1_Xcoordinate == window_data['x']:
                    max_y = max(wall.Vertex_1_Ycoordinate, wall.Vertex_2_Ycoordinate, wall.Vertex_3_Ycoordinate, wall.Vertex_4_Ycoordinate)
                    min_y = min(wall.Vertex_1_Ycoordinate, wall.Vertex_2_Ycoordinate, wall.Vertex_3_Ycoordinate, wall.Vertex_4_Ycoordinate)

                    # exclude horizontal walls
                    if min_y != max_y:
                        if window_data['y'] >= min_y  and  window_data['y'] <= max_y:
                            target_walls.append(wall)
                            
        
        

        # CREATE WINDOW OBJECTS
        for i,target_wall in enumerate(target_walls):
            window = idf.newidfobject(
                'FENESTRATIONSURFACE:DETAILED',
                Name=f"{window_data['name']}_{window_data['id']}_{i}_Window",
                # Construction_Name=f"{window_data['name']}_{window_data['id']}_Construction",
                Surface_Type='Window',
                Building_Surface_Name=target_wall.Name,
                #Outside_Boundary_Condition = target_wall.Outside_Boundary_Condition
            )


            # MATERIAL
            construction = idf.newidfobject(
                'CONSTRUCTION',
                Name=f"{window_data['name']}_{window_data['id']}_{i}_Construction"
            )
            window.Construction_Name = construction.Name

            if window_data['layer_1'] == "Single Clear 4mm Glass":
                construction.Outside_Layer = "Single Clear 4mm Glass"
            elif window_data['layer_1'] == "Single Tinted/Bronze 4mm":
                construction.Outside_Layer = "Single Tinted/Bronze 4mm"
            elif window_data['layer_1'] == "Double Glazing Clear 4-6-4mm air":
                construction.Outside_Layer = "Single Clear 4mm Glass"
                construction.Layer_2 = "Air 6mm"
                construction.Layer_3 = "Single Clear 4mm Glass"
            elif window_data['layer_1'] == "Double Glazing Low-e 4-6-4mm air":
                construction.Outside_Layer = "Single Clear 4mm Glass"
                construction.Layer_2 = "Air 6mm"
                construction.Layer_3 = "Double Glazing Low-e 4-6-4mm air"
            else:
                construction.Outside_Layer = "Single Clear 4mm Glass"
            


            
            # COORDINATES
            if round(target_wall.azimuth) == 0:    # done, south
                window.Vertex_1_Xcoordinate=window_data['x']-1; window.Vertex_1_Ycoordinate=window_data['y'];   window.Vertex_1_Zcoordinate=window_base
                window.Vertex_2_Xcoordinate=window_data['x']-1; window.Vertex_2_Ycoordinate=window_data['y'];   window.Vertex_2_Zcoordinate=window_base+window_height
                window.Vertex_3_Xcoordinate=window_data['x']+1; window.Vertex_3_Ycoordinate=window_data['y'];   window.Vertex_3_Zcoordinate=window_base+window_height
                window.Vertex_4_Xcoordinate=window_data['x']+1; window.Vertex_4_Ycoordinate=window_data['y'];   window.Vertex_4_Zcoordinate=window_base
            
            
            if round(target_wall.azimuth) == 90:    # done, west
                window.Vertex_1_Xcoordinate=window_data['x']; window.Vertex_1_Ycoordinate=window_data['y']+1;   window.Vertex_1_Zcoordinate=window_base
                window.Vertex_2_Xcoordinate=window_data['x']; window.Vertex_2_Ycoordinate=window_data['y']+1;   window.Vertex_2_Zcoordinate=window_base+window_height
                window.Vertex_3_Xcoordinate=window_data['x']; window.Vertex_3_Ycoordinate=window_data['y']-1;   window.Vertex_3_Zcoordinate=window_base+window_height
                window.Vertex_4_Xcoordinate=window_data['x']; window.Vertex_4_Ycoordinate=window_data['y']-1;   window.Vertex_4_Zcoordinate=window_base
            


            if round(target_wall.azimuth) == 180:  # done, north
                window.Vertex_1_Xcoordinate=window_data['x']+1; window.Vertex_1_Ycoordinate=window_data['y'];   window.Vertex_1_Zcoordinate=window_base
                window.Vertex_2_Xcoordinate=window_data['x']+1; window.Vertex_2_Ycoordinate=window_data['y'];   window.Vertex_2_Zcoordinate=window_base+window_height
                window.Vertex_3_Xcoordinate=window_data['x']-1; window.Vertex_3_Ycoordinate=window_data['y'];   window.Vertex_3_Zcoordinate=window_base+window_height
                window.Vertex_4_Xcoordinate=window_data['x']-1; window.Vertex_4_Ycoordinate=window_data['y'];   window.Vertex_4_Zcoordinate=window_base
            

            if round(target_wall.azimuth) == 270:  # done
                window.Vertex_1_Xcoordinate=window_data['x']; window.Vertex_1_Ycoordinate=window_data['y']-1;   window.Vertex_1_Zcoordinate=window_base
                window.Vertex_2_Xcoordinate=window_data['x']; window.Vertex_2_Ycoordinate=window_data['y']-1;   window.Vertex_2_Zcoordinate=window_base+window_height
                window.Vertex_3_Xcoordinate=window_data['x']; window.Vertex_3_Ycoordinate=window_data['y']+1;   window.Vertex_3_Zcoordinate=window_base+window_height
                window.Vertex_4_Xcoordinate=window_data['x']; window.Vertex_4_Ycoordinate=window_data['y']+1;   window.Vertex_4_Zcoordinate=window_base
            




def create_doors(idf, project):
    door_base = 1
    door_height = 5

    
    for door_data in project.data['doors']:

        # FIND WALLS WINDOW IS ON BASED ON WINDOW COOEDINATES
        target_walls = []
        for wall in idf.getsurfaces("wall"):
            x_coords = []
            y_coords = []
            for vertex in wall.coords:
                x_coords.append(vertex[0])
                y_coords.append(vertex[1])
            
            min_x = round(min(x_coords))
            max_x = round(max(x_coords))
            min_y = round(min(y_coords))
            max_y = round(max(y_coords))

            


            if (door_data['type'] == "door 1" or door_data['type'] == "door 2")  and min_y == max_y:
                if min_y == door_data['y']  and max_y == door_data['y']:
                    if min_x <= door_data['x']  and  max_x >= door_data['x']+4:
                        target_walls.append(wall)
            

            elif (door_data['type'] == "door 3" or door_data['type'] == "door 4")  and min_y == max_y:
                if min_y == door_data['y']  and max_y == door_data['y']:
                    if min_x <= door_data['x']-4  and  max_x >= door_data['x']:
                        target_walls.append(wall)

            
            elif (door_data['type'] == "door 5" or door_data['type'] == "door 6")  and min_x == max_x:
                if min_x == door_data['x']  and max_x == door_data['x']:
                    if min_y <= door_data['y']-4  and  max_y >= door_data['y']:
                        target_walls.append(wall)
            

            elif (door_data['type'] == "door 7" or door_data['type'] == "door 8")  and min_x == max_x:
                if min_x == door_data['x']  and max_x == door_data['x']:
                    if min_y <= door_data['y']  and  max_y >= door_data['y']+4:
                        target_walls.append(wall)


                


        
            



        
        # CREATE WINDOW OBJECTS
        for i,target_wall in enumerate(target_walls):
           
            door = idf.newidfobject(
                'FENESTRATIONSURFACE:DETAILED',
                Name=f"{door_data['name']}_{door_data['id']}{i}",
                Surface_Type='Door',
                Building_Surface_Name=target_wall.Name,
            )



            # MATERIAL
            construction = idf.newidfobject(
                'CONSTRUCTION',
                Name=f"{door_data['name']}_{door_data['id']}_{i}_Construction"
            )
            door.Construction_Name = construction.Name

            if door_data['layer_1'] == None:    construction.Outside_Layer = "Hardwood"
            else:   construction.Outside_Layer = door_data['layer_1']

            if door_data['layer_2'] != None:    construction.Layer_2 = door_data['layer_2']
            if door_data['layer_3'] != None:    construction.Layer_3 = door_data['layer_3']
            if door_data['layer_4'] != None:    construction.Layer_4 = door_data['layer_4']
            if door_data['layer_5'] != None:    construction.Layer_5 = door_data['layer_5']
            



            # COORDINATES
            if round(target_wall.azimuth) == 0:
                if door_data['type'] == "door 1" or door_data['type'] == "door 2":
                    door.Vertex_1_Xcoordinate=door_data['x']; door.Vertex_1_Ycoordinate=door_data['y'];   door.Vertex_1_Zcoordinate=door_base
                    door.Vertex_2_Xcoordinate=door_data['x']; door.Vertex_2_Ycoordinate=door_data['y'];   door.Vertex_2_Zcoordinate=door_base+door_height
                    door.Vertex_3_Xcoordinate=door_data['x']+2; door.Vertex_3_Ycoordinate=door_data['y'];   door.Vertex_3_Zcoordinate=door_base+door_height
                    door.Vertex_4_Xcoordinate=door_data['x']+2; door.Vertex_4_Ycoordinate=door_data['y'];   door.Vertex_4_Zcoordinate=door_base
                
                elif door_data['type'] == "door 3" or door_data['type'] == "door 4":
                    door.Vertex_1_Xcoordinate=door_data['x']-2; door.Vertex_1_Ycoordinate=door_data['y'];   door.Vertex_1_Zcoordinate=door_base
                    door.Vertex_2_Xcoordinate=door_data['x']-2; door.Vertex_2_Ycoordinate=door_data['y'];   door.Vertex_2_Zcoordinate=door_base+door_height
                    door.Vertex_3_Xcoordinate=door_data['x']; door.Vertex_3_Ycoordinate=door_data['y'];   door.Vertex_3_Zcoordinate=door_base+door_height
                    door.Vertex_4_Xcoordinate=door_data['x']; door.Vertex_4_Ycoordinate=door_data['y'];   door.Vertex_4_Zcoordinate=door_base
                



            elif round(target_wall.azimuth) == 180:
                if door_data['type'] == "door 1"  or  door_data['type'] == "door 2":
                    door.Vertex_1_Xcoordinate=door_data['x']+2; door.Vertex_1_Ycoordinate=door_data['y'];   door.Vertex_1_Zcoordinate=door_base
                    door.Vertex_2_Xcoordinate=door_data['x']+2; door.Vertex_2_Ycoordinate=door_data['y'];   door.Vertex_2_Zcoordinate=door_base+door_height
                    door.Vertex_3_Xcoordinate=door_data['x']; door.Vertex_3_Ycoordinate=door_data['y'];   door.Vertex_3_Zcoordinate=door_base+door_height
                    door.Vertex_4_Xcoordinate=door_data['x']; door.Vertex_4_Ycoordinate=door_data['y'];   door.Vertex_4_Zcoordinate=door_base
                
                elif door_data['type'] == "door 3" or door_data['type'] == "door 4":
                    door.Vertex_1_Xcoordinate=door_data['x']; door.Vertex_1_Ycoordinate=door_data['y'];   door.Vertex_1_Zcoordinate=door_base
                    door.Vertex_2_Xcoordinate=door_data['x']; door.Vertex_2_Ycoordinate=door_data['y'];   door.Vertex_2_Zcoordinate=door_base+door_height
                    door.Vertex_3_Xcoordinate=door_data['x']-2; door.Vertex_3_Ycoordinate=door_data['y'];   door.Vertex_3_Zcoordinate=door_base+door_height
                    door.Vertex_4_Xcoordinate=door_data['x']-2; door.Vertex_4_Ycoordinate=door_data['y'];   door.Vertex_4_Zcoordinate=door_base
                



            elif round(target_wall.azimuth) == 90:    # east
                if door_data['type'] == "door 5"  or  door_data['type'] == "door 6":
                    door.Vertex_1_Xcoordinate=door_data['x']; door.Vertex_1_Ycoordinate=door_data['y'];   door.Vertex_1_Zcoordinate=door_base
                    door.Vertex_2_Xcoordinate=door_data['x']; door.Vertex_2_Ycoordinate=door_data['y'];   door.Vertex_2_Zcoordinate=door_base+door_height
                    door.Vertex_3_Xcoordinate=door_data['x']; door.Vertex_3_Ycoordinate=door_data['y']-2;     door.Vertex_3_Zcoordinate=door_base+door_height
                    door.Vertex_4_Xcoordinate=door_data['x']; door.Vertex_4_Ycoordinate=door_data['y']-2;     door.Vertex_4_Zcoordinate=door_base

                if door_data['type'] == "door 7"  or  door_data['type'] == "door 8":
                    door.Vertex_1_Xcoordinate=door_data['x']; door.Vertex_1_Ycoordinate=door_data['y']+2;   door.Vertex_1_Zcoordinate=door_base
                    door.Vertex_2_Xcoordinate=door_data['x']; door.Vertex_2_Ycoordinate=door_data['y']+2;   door.Vertex_2_Zcoordinate=door_base+door_height
                    door.Vertex_3_Xcoordinate=door_data['x']; door.Vertex_3_Ycoordinate=door_data['y'];     door.Vertex_3_Zcoordinate=door_base+door_height
                    door.Vertex_4_Xcoordinate=door_data['x']; door.Vertex_4_Ycoordinate=door_data['y'];     door.Vertex_4_Zcoordinate=door_base



            elif round(target_wall.azimuth) == 270:
                if door_data['type'] == "door 5"  or  door_data['type'] == "door 6":
                    door.Vertex_1_Xcoordinate=door_data['x']; door.Vertex_1_Ycoordinate=door_data['y']-2;   door.Vertex_1_Zcoordinate=door_base
                    door.Vertex_2_Xcoordinate=door_data['x']; door.Vertex_2_Ycoordinate=door_data['y']-2;   door.Vertex_2_Zcoordinate=door_base+door_height
                    door.Vertex_3_Xcoordinate=door_data['x']; door.Vertex_3_Ycoordinate=door_data['y'];     door.Vertex_3_Zcoordinate=door_base+door_height
                    door.Vertex_4_Xcoordinate=door_data['x']; door.Vertex_4_Ycoordinate=door_data['y'];     door.Vertex_4_Zcoordinate=door_base

                if door_data['type'] == "door 7"  or  door_data['type'] == "door 8":
                    door.Vertex_1_Xcoordinate=door_data['x']; door.Vertex_1_Ycoordinate=door_data['y'];   door.Vertex_1_Zcoordinate=door_base
                    door.Vertex_2_Xcoordinate=door_data['x']; door.Vertex_2_Ycoordinate=door_data['y'];   door.Vertex_2_Zcoordinate=door_base+door_height
                    door.Vertex_3_Xcoordinate=door_data['x']; door.Vertex_3_Ycoordinate=door_data['y']+2;     door.Vertex_3_Zcoordinate=door_base+door_height
                    door.Vertex_4_Xcoordinate=door_data['x']; door.Vertex_4_Ycoordinate=door_data['y']+2;     door.Vertex_4_Zcoordinate=door_base


            



def create_lights(idf, project):


    for i,light_data in enumerate(project.data['lights']):

        # get zone this light is in
        zone_area = None
        zone_name = None
        for surface in idf.getsurfaces("floor"):
            polygon = geomeppy.geom.polygons.Polygon3D(surface.coords)

            min_x = None
            min_y = None
            max_x = None
            max_y = None

            for vertex in polygon.bounding_box.vertices_list:
                # min x
                if min_x == None:
                    min_x = vertex[0]
                else:
                    if vertex[0] < min_x:
                        min_x = vertex[0]
                

                # min y
                if min_y == None:
                    min_y = vertex[1]
                else:
                    if vertex[1] < min_y:
                        min_y = vertex[1]


                # max x
                if max_x == None:
                    max_x = vertex[0]
                else:
                    if vertex[0] > max_x:
                        max_x = vertex[0]
                
                # max y
                if max_y == None:
                    max_y = vertex[1]
                else:
                    if vertex[1] > max_y:
                        max_y = vertex[1]


            if light_data['x'] >= min_x  and  light_data['x'] <= max_x  and light_data['y'] >= min_y  and light_data['y'] <= max_y:
                if zone_area == None:
                    zone_area = polygon.area
                    zone_name = surface.Zone_Name
                else:
                    if polygon.area < zone_area:
                        zone_area = polygon.area
                        zone_name = surface.Zone_Name



        # EXTEROIR LIGHTS
        if zone_name == None:
            exterior_lights_schedule = idf.newidfobject(
                "SCHEDULE:COMPACT",
                Name=f"Exterior_Lights_Schedule_{i}",
                Schedule_Type_Limits_Name="Fraction",
                Field_1="Through: Dec 31",
                Field_2="For: AllDays",
                Field_3="Until: 06:00",
                Field_4=1.0,
                Field_5="Until: 17:00",
                Field_6=0.0,
                Field_7="Until: 24:00",
                Field_8=1.0
            )

            exterior_light = idf.newidfobject(
                "EXTERIOR:LIGHTS",
                Name=f"Exterior Lights {i} - {project.data['lights'][i]['name']}",
                Control_Option="AstronomicalClock",
                Design_Level= float(project.data['lights'][i]['watts']),
                EndUse_Subcategory="General",
                Schedule_Name = exterior_lights_schedule.Name
            )
            
          


        else:
            """interior_lights_schedule = idf.newidfobject(
                "SCHEDULE:COMPACT",
                Name=f"Interior_Lights_Schedule_{i}",
                Schedule_Type_Limits_Name="Fraction",
                Field_1="Through: Dec 31",
                Field_2="For: AllDays",
                Field_3=f"Until: 08:00,0.00",
                Field_4=f"Until: 18:00,1.0",
                Field_5=f"Until: 24:00,0.0",
            )
            idf.newidfobject(
                "LIGHTS",
                Name = f"{light_data['name']}_{light_data['id']}_{i}_Lights",
                Zone_or_ZoneList_or_Space_or_SpaceList_Name = zone_name,
                Schedule_Name = interior_lights_schedule.Name,
                Design_Level_Calculation_Method = "LightingLevel",
                Lighting_Level=light_data['watts'],
                Return_Air_Fraction=0.0,
                Fraction_Radiant=0.42,
                Fraction_Visible=0.18,
                Fraction_Replaceable=1.0,
                EndUse_Subcategory="General"
            )"""
            idf.newidfobject(
                "SCHEDULETYPELIMITS",
                Name=f"Interior_Lights_Schedule_Limits_{i}",
                Lower_Limit_Value = 0.0,
                Upper_Limit_Value = 1.0,
                Numeric_Type="Continuous",
                Unit_Type="Dimensionless"
            )
            interior_lights_schedule = idf.newidfobject(
                "SCHEDULE:COMPACT",
                Name=f"Interior_Lights_Schedule_{i}",
                Schedule_Type_Limits_Name=f"Interior_Lights_Schedule_Limits_{i}",
                Field_1="Through: 12/31",
                Field_2="For: AllDays"
            )
            on_time = time(int(light_data['schedule']['on_time'].split(":")[0]), int(light_data['schedule']['on_time'].split(":")[1]))
            off_time = time(int(light_data['schedule']['off_time'].split(":")[0]), int(light_data['schedule']['off_time'].split(":")[1]))
            if on_time < off_time:
                interior_lights_schedule.Field_3=f"Until: {light_data['schedule']['on_time']}, 0.0"
                interior_lights_schedule.Field_4=f"Until: {light_data['schedule']['off_time']}, 1.0"
                if light_data['schedule']['off_time'] != "24:00":
                    interior_lights_schedule.Field_5 = f"Until: 24:00, 0.0"
            
            else:
                interior_lights_schedule.Field_3=f"Until: {light_data['schedule']['off_time']}, 1.0"
                interior_lights_schedule.Field_4=f"Until: {light_data['schedule']['on_time']}, 0.0"
                if light_data['schedule']['off_time'] != "24:00":
                    interior_lights_schedule.Field_5 = f"Until: 24:00, 1.0"
                
            
            


            idf.newidfobject(
                "LIGHTS",
                Name = f"{light_data['name']}_{light_data['id']}_{i}_Lights",
                Zone_or_ZoneList_or_Space_or_SpaceList_Name = zone_name,
                Schedule_Name = interior_lights_schedule.Name,
                Design_Level_Calculation_Method = "LightingLevel",
                Lighting_Level=light_data['watts'],
                Return_Air_Fraction=0.0,
                Fraction_Radiant=0.42,
                Fraction_Visible=0.18,
                Fraction_Replaceable=1.0,
                EndUse_Subcategory="General"
            )

            ref_point = idf.newidfobject(
                "DAYLIGHTING:REFERENCEPOINT",
                Name=f"Vis_{i}_Sensor",
                Zone_or_Space_Name = zone_name,
                XCoordinate_of_Reference_Point=light_data['x'],
                YCoordinate_of_Reference_Point=light_data['y'],
                ZCoordinate_of_Reference_Point=0.8
            )
            
            idf.newidfobject(
                "DAYLIGHTING:CONTROLS",
                Name=f"Daylight_Controls_{i}",
                Zone_or_Space_Name=zone_name,
                Availability_Schedule_Name="AlwaysOn",
                Lighting_Control_Type="Stepped",
                Minimum_Input_Power_Fraction_for_Continuous_or_ContinuousOff_Dimming_Control=0.1,
                Minimum_Light_Output_Fraction_for_Continuous_or_ContinuousOff_Dimming_Control=0.1,
                Daylighting_Method="SplitFlux",
                Number_of_Stepped_Control_Steps=1,
            
                Daylighting_Reference_Point_1_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_1=1,
                Illuminance_Setpoint_at_Reference_Point_1=500,

                Daylighting_Reference_Point_2_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_2=0,
                Illuminance_Setpoint_at_Reference_Point_2=0,

                Daylighting_Reference_Point_3_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_3=0,
                Illuminance_Setpoint_at_Reference_Point_3=0,

                Daylighting_Reference_Point_4_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_4=0,
                Illuminance_Setpoint_at_Reference_Point_4=0,

                Daylighting_Reference_Point_5_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_5=0,
                Illuminance_Setpoint_at_Reference_Point_5=0,

                Daylighting_Reference_Point_6_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_6=0,
                Illuminance_Setpoint_at_Reference_Point_6=0,

                Daylighting_Reference_Point_7_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_7=0,
                Illuminance_Setpoint_at_Reference_Point_7=0,

                Daylighting_Reference_Point_8_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_8=0,
                Illuminance_Setpoint_at_Reference_Point_8=0,

                Daylighting_Reference_Point_9_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_9=0,
                Illuminance_Setpoint_at_Reference_Point_9=0,

                Daylighting_Reference_Point_10_Name=ref_point.Name,
                Fraction_of_Lights_Controlled_by_Reference_Point_10=0,
                Illuminance_Setpoint_at_Reference_Point_10=0,
            )
                
            
            
          





            
        




def create_hvac(idf, project):

    # get heating, cooling setpoints

    idf.newidfobject(
        "OUTPUTCONTROL:SIZING:STYLE",
        Column_Separator="Comma"
    )

    idf.newidfobject(
        "SIZINGPERIOD:DESIGNDAY",
        Name="Lusaka Summer Design Day",
        Month=10,
        Day_of_Month=21,
        Day_Type="SummerDesignDay",
        Maximum_DryBulb_Temperature=35,
        Daily_DryBulb_Temperature_Range=10,
        Humidity_Condition_Type="WetBulb",
        Wetbulb_or_DewPoint_at_Maximum_DryBulb=24,
        Wind_Speed=3.0,
        Wind_Direction=0.0
    )

    idf.newidfobject(
        "SIZINGPERIOD:DESIGNDAY",
        Name="Lusaka Winter Design Day",
        Month=7,
        Day_of_Month=21,
        Day_Type="WinterDesignDay",
        Maximum_DryBulb_Temperature=10,
        Daily_DryBulb_Temperature_Range=5,
        Humidity_Condition_Type="WetBulb",
        Wetbulb_or_DewPoint_at_Maximum_DryBulb=8,
        Wind_Speed=2.0,
        Wind_Direction=0.0
    )



    done_zones = []


    for i,hvac_data in enumerate(project.data['hvacs']):

        # get zone this light is in
        zone_area = None
        zone_name = None
        for surface in idf.getsurfaces("floor"):
            polygon = geomeppy.geom.polygons.Polygon3D(surface.coords)

            min_x = None
            min_y = None
            max_x = None
            max_y = None

            for vertex in polygon.bounding_box.vertices_list:
                # min x
                if min_x == None:
                    min_x = vertex[0]
                else:
                    if vertex[0] < min_x:
                        min_x = vertex[0]
                

                # min y
                if min_y == None:
                    min_y = vertex[1]
                else:
                    if vertex[1] < min_y:
                        min_y = vertex[1]


                # max x
                if max_x == None:
                    max_x = vertex[0]
                else:
                    if vertex[0] > max_x:
                        max_x = vertex[0]
                
                # max y
                if max_y == None:
                    max_y = vertex[1]
                else:
                    if vertex[1] > max_y:
                        max_y = vertex[1]


            if hvac_data['x'] >= min_x  and  hvac_data['x'] <= max_x  and hvac_data['y'] >= min_y  and hvac_data['y'] <= max_y:
                if zone_area == None:
                    zone_area = polygon.area
                    zone_name = surface.Zone_Name
                else:
                    if polygon.area < zone_area:
                        zone_area = polygon.area
                        zone_name = surface.Zone_Name



        # EXTEROIR LIGHTS
        if zone_name == None:
            continue

        else:
            
                
                if zone_name not in done_zones:
                    cool_set = idf.newidfobject(
                        "SCHEDULE:COMPACT",
                        Name=f"Zone_{i}_CoolSet",
                        Schedule_Type_Limits_Name="Temperature",
                        Field_1="Through: 12/31",
                        Field_2="For: AllDays",
                        Field_3="Until: 24:00",
                        Field_4=26
                    )
                    heat_set = idf.newidfobject(
                        "SCHEDULE:COMPACT",
                        Name=f"Zone_{i}_HeatSet",
                        Schedule_Type_Limits_Name="Temperature",
                        Field_1="Through: 12/31",
                        Field_2="For: AllDays",
                        Field_3="Until: 24:00",
                        Field_4=20
                    )
                    idf.newidfobject(
                        "SCHEDULE:COMPACT",
                        Name = f"Zone_{i}_HVAC_AlwaysOn",
                        Schedule_Type_Limits_Name="Any Number",
                        Field_1="Through: 12/31",
                        Field_2="For: AllDays",
                        Field_3="Until: 24:00",
                        Field_4=1,
                    )
                    therm = idf.newidfobject(
                        "HVACTEMPLATE:THERMOSTAT",
                        Name=f"Zone_{i}_Thermostat",
                        Heating_Setpoint_Schedule_Name=heat_set.Name,
                        Cooling_Setpoint_Schedule_Name=cool_set.Name
                    )

                    idf.newidfobject(
                        "HVACTEMPLATE:ZONE:PTAC",
                        Zone_Name=zone_name,
                        Template_Thermostat_Name=therm.Name,
                        System_Availability_Schedule_Name=f"Zone_{i}_HVAC_AlwaysOn",
                        Cooling_Coil_Type="SingleSpeedDX",
                        Heating_Coil_Type="Electric",
                        Cooling_Supply_Air_Flow_Rate="autosize",
                        Heating_Supply_Air_Flow_Rate="autosize",

                    )

                    done_zones.append(zone_name)
                


    










    






def create_output_variables(idf, project):
    idf.newidfobject('OUTPUT:DIAGNOSTICS', Key_1='DisplayExtraWarnings', Key_2="DisplayAllWarnings")
    #idf.newidfobject('OUTPUT:DIAGNOSTICS', Key_1='DisplayAllWarnings', Key_2="DisplayAdvancedReportVariables")

    
    # eplusout.json
    #idf.newidfobject(
    #    "OUTPUT:JSON",
    #    Option_Type="TimeSeriesAndTabular"
    #)

    
    # eplusout.sql
    idf.newidfobject("OUTPUT:SQLITE", Option_Type="SimpleAndTabular")
    
    # eplustbl.csv , eplusout.eso
    idf.newidfobject("OUTPUT:TABLE:SUMMARYREPORTS", Report_1_Name='AllSummary')

    # eplusout.csv
    #idf.newidfobject("OUTPUTCONTROL:TABLE:STYLE",Column_Separator="Comma")



    # LIGHTING
    idf.newidfobject(
        'OUTPUT:VARIABLE',
        Variable_Name='Lights Electricity Energy',
        Reporting_Frequency='Monthly'
    )




    


    






    # HVAC
    hvac_variables = [
        "Zone Packaged Terminal Air Conditioner Total Cooling Energy",
        "Zone Packaged Terminal Air Conditioner Total Heating Energy",
        "Zone Packaged Terminal Air Conditioner Electricity Energy",
        "Cooling Coil Total Cooling Energy",
        "Heating Coil Heating Energy",
        "Fan Electricity Energy"
    ]
    for var in hvac_variables:
        idf.newidfobject('OUTPUT:VARIABLE', Variable_Name=var, Reporting_Frequency='Monthly')











    # CO2 EMISSIONS
    # idf.newidfobject('Output:EnvironmentalIndicators')
    idf.newidfobject(
        'OUTPUT:ENVIRONMENTALIMPACTFACTORS',
        # Name="Environmental Impact",
        # Fuel_Type = "Electricity",
        # Source_Energy = 3.167,
        # Carbon_Equivalent_Factor = 0.233
        Reporting_Frequency = "Monthly"
    )

    #idf.newidfobject(
    #    "OUTPUT:CARBONEQUIVALENTFACTORS",
    #    Reporting_Frequency = "Monthly"
    #)
    # idf.newidfobject('Output:EnvironmentalIndicators')
    # idf.newidfobject('OUTPUT:ENVIRONMENTALINDICATORS')

















    # COMFORT
    comfort_variables = [
        'Zone Thermal Comfort Fanger Model PMV',
        'Zone Thermal Comfort Fanger Model PPD',
        'Zone Thermal Comfort ASHRAE 55 Adaptive Model Temperature',
        'Zone Thermal Comfort ASHRAE 55 Adaptive Model Temperature',
        'Zone Thermal Comfort ASHRAE 55 Adaptive Model 90% Acceptibility Status',
        "Zone Thermal Comfort Pierce Model Standard Effective Temperature",
        "Zone Mean Air Temperature",
        "Zone Mean Radiant Temperature",
        "Zone Air Relative Humidity"
    ]
    for var in comfort_variables:
        idf.newidfobject('OUTPUT:VARIABLE', Variable_Name=var, Reporting_Frequency='Monthly')




    







































































def create_floor(idf, vertices):
    floor = idf.newidfobject(
        "BUILDINGSURFACE:DETAILED",
        Name=f"Floor_{random.random()}",
        Surface_Type="Floor",        
        Outside_Boundary_Condition="Ground",
        Sun_Exposure='NoSun',
        Wind_Exposure='NoWind',    
    )
    floor.setcoords(vertices)
    return floor


def create_roof(idf, vertices):
    roof = idf.newidfobject(
        "BUILDINGSURFACE:DETAILED",
        Name=f"Roof_{random.random()}",
        Surface_Type="Roof",        
        Outside_Boundary_Condition="Outdoors",
        Sun_Exposure='SunExposed',
        Wind_Exposure='WindExposed',      
    )
    roof.setcoords(vertices)
    return roof


def create_wall(idf, vertices):
    wall = idf.newidfobject(
        'BUILDINGSURFACE:DETAILED',
        # Construction_Name=f"{wall_data['name']}_{wall_data['id']}_Construction",
        Name=f"Wall_{random.random()}",
        Number_of_Vertices=4,
        Surface_Type = 'wall',  
        # Zone_Name=f'{project.name}_Zone'
    )
    wall.setcoords(vertices)

    return wall











          






        

            


# INITIALIZE GEOMEPPY AND RETURN IDF
def init_geomeppy(project):
    idd_file = find("EnergyPlus/Energy+.idd")
    if not os.path.exists(idd_file):
        raise FileNotFoundError(f"Check your EnergyPlus path: {idd_file}")
    IDF.setiddname(idd_file)



    #idf = IDF("/home/victor/DEV/0/FINAL_YEAR_PROJECT/FINAL_YEAR_PROJECT/editor/static/EnergyPlus/ExampleFiles/Minimal.idf")
    idf = IDF(
        idfname=io.StringIO(""),
        epw=find(f"WeatherFiles/{project.location}/{project.location}.epw")
    )

   


    
    # DEFAULT, REQUIRED OBJECTS
    idf.newidfobject('VERSION', Version_Identifier='25.1') # Use your E+ version

    
    idf.newidfobject('SIMULATIONCONTROL',
        Do_Zone_Sizing_Calculation='Yes',
        Do_System_Sizing_Calculation='Yes',
        Do_Plant_Sizing_Calculation='No',
        Run_Simulation_for_Sizing_Periods='No',
        Run_Simulation_for_Weather_File_Run_Periods='Yes'
    )

    idf.newidfobject('BUILDING',
        Name=project.name.replace(";", "_"),
        North_Axis=180,
        Solar_Distribution="FullInteriorAndExterior"
    )

    
    idf.newidfobject('TIMESTEP',
        Number_of_Timesteps_per_Hour=6
    )
    
    idf.newidfobject('RUNPERIOD',
        Name='Annual Simulation',
        Begin_Month=1,
        Begin_Day_of_Month=1,
        End_Month=12,
        End_Day_of_Month=31,
        Day_of_Week_for_Start_Day='Sunday',
        Use_Weather_File_Holidays_and_Special_Days='Yes',
        Use_Weather_File_Daylight_Saving_Period='Yes',
        Apply_Weekend_Holiday_Rule='No',
        Use_Weather_File_Rain_Indicators='Yes',
        Use_Weather_File_Snow_Indicators='Yes'
    )

    idf.newidfobject(
        'GLOBALGEOMETRYRULES', 
        Starting_Vertex_Position='LowerLeftCorner', 
        Vertex_Entry_Direction='CounterClockwise', 
        Coordinate_System='Relative'
    )
    
    


    return idf







    








