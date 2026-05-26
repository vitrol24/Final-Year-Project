import * as PIXI from "PIXI";

import * as values from "values";
import * as functions from "functions";










// WALLS DATA
let DATA;




// EDITOR MODE
let MODE = "block"; // block, edit, wall



// WALL start and end coords
let SX = null;
let SY = null;
let EX = null;
let EY = null;





// THICKNESSES OF GRAPHICS OBJECTS
let DOOR_THICKNESS = 8;
let WINDOW_THICKNESS = 8;
let BLOCK_THICKNESS = 5;








// TEXTURES
let ceramic_tiles_texture = await PIXI.Assets.load(document.getElementById("ceramic_tiles_texture").src);
let granite_texture = await PIXI.Assets.load(document.getElementById("granite_texture").src);
let hardwood_texture = await PIXI.Assets.load(document.getElementById("hardwood_texture").src);
let marble_texture = await PIXI.Assets.load(document.getElementById("marble_texture").src);
let polished_concrete_texture = await PIXI.Assets.load(document.getElementById("polished_concrete_texture").src);
let porcelain_tiles_texture = await PIXI.Assets.load(document.getElementById("porcelain_tiles_texture").src);
let pvc_tiles_texture = await PIXI.Assets.load(document.getElementById("pvc_tiles_texture").src);





// HTML DOM ELEMNTS
let CANVAS_HOLDER = document.querySelector("#canvas_holder");
//let OBJECT_EDITOR = EDITOR.querySelector("#object_editor");
let TOAST = document.querySelector("#toast");





// PIXI APP
let PIXI_APP = new PIXI.Application();
await PIXI_APP.init({
    width:1500,
    height:1500
});
CANVAS_HOLDER.appendChild(PIXI_APP.canvas);




let BG = new PIXI.Graphics();
PIXI_APP.stage.addChild(BG);
draw_bg();




// FLOORS ARE DRAWN HERE
let FLOOR_CONTAINER = new PIXI.Container();
BG.addChild(FLOOR_CONTAINER);

// BLOCKS ARE DRAWN HERE
let BLOCKS_CONTAINER = new PIXI.Container();
BG.addChild(BLOCKS_CONTAINER);

// WINDOWS ARE DRAWN HERE
let WINDOWS_CONTAINER = new PIXI.Container();
BG.addChild(WINDOWS_CONTAINER);

// DOORS ARE DRAWN HERE
let DOORS_CONTAINER = new PIXI.Container();
BG.addChild(DOORS_CONTAINER);

// LIGHTS ARE DRAWN HERE
let LIGHTS_CONTAINER = new PIXI.Container();
BG.addChild(LIGHTS_CONTAINER);

// HVACS ARE DRAWN HERE
let HVACS_CONTAINER = new PIXI.Container();
BG.addChild(HVACS_CONTAINER);

// ROOFS ARE DRAWN HERE
let ROOF_CONTAINER = new PIXI.Container();
BG.addChild(ROOF_CONTAINER);

// TEXTS ARE DRAWN HERE
let TEXTS_CONTAINER = new PIXI.Container();
BG.addChild(TEXTS_CONTAINER);







// OVERLAY FOR SOME HELPFUL GRAPHICS
let OVERLAY = new PIXI.Graphics();
BG.addChild(OVERLAY);









// CAMPUS HELPER
let campus_size = 30;
let CAMPUS = new PIXI.Graphics();
BG.addChild(CAMPUS);
CAMPUS.circle(0, 0, campus_size).fill({alpha:1, color:"#ffffff"}).stroke(1);
CAMPUS.star(0 , 0, 4, campus_size*0.5, campus_size*0.1).fill("#000000");
CAMPUS.x = (CAMPUS.width/2) +5;
CAMPUS.y = (CAMPUS.height/2) +5;

const textStyle = new PIXI.TextStyle({fill:"#ff0000", fontSize:15});
let CAMPUS_EAST = new PIXI.Text({text:"E", style:textStyle});
CAMPUS.addChild(CAMPUS_EAST);
CAMPUS_EAST.x = campus_size - CAMPUS_EAST.width;
CAMPUS_EAST.y = -CAMPUS_EAST.height/2;

let CAMPUS_WEST = new PIXI.Text({text:"W", style:textStyle});
CAMPUS.addChild(CAMPUS_WEST);
CAMPUS_WEST.x = -campus_size;
CAMPUS_WEST.y = -CAMPUS_WEST.height/2;

let CAMPUS_NORTH = new PIXI.Text({text:"N", style:textStyle});
CAMPUS.addChild(CAMPUS_NORTH);
CAMPUS_NORTH.x = -CAMPUS_NORTH.width/2;
CAMPUS_NORTH.y = -campus_size;

let CAMPUS_SOUTH = new PIXI.Text({text:"S", style:textStyle});
CAMPUS.addChild(CAMPUS_SOUTH);
CAMPUS_SOUTH.x = -CAMPUS_SOUTH.width/2;
CAMPUS_SOUTH.y = campus_size - (CAMPUS_SOUTH.height);
        


// MOUSE POSITION HELPER
let MOUSE_POS_HELPER = new PIXI.Text({
    text: '0,0',
    style: {
        fill: '#000000',
        fontSize: 15,
    },
    anchor: 0.5
});
BG.addChild(MOUSE_POS_HELPER);
MOUSE_POS_HELPER.x = MOUSE_POS_HELPER.width + 5;
MOUSE_POS_HELPER.y = CAMPUS.y + (CAMPUS.height/2) + MOUSE_POS_HELPER.height;


// TEXT_MODE_HELPER
let TEXT_MODE_HELPER = new PIXI.Text({
    anchor: 0.5,
    label: "TEXT MODE HELPER",
    style: {
        fill: '#0c015b',
        fontSize: 15,
    },
    text: 'Text'
});
OVERLAY.addChild(TEXT_MODE_HELPER);

















// EVENTS
BG.eventMode = "static";
BG.on("mousedown", (ev)=>{
    const global_pos = ev.global;
    const local_pos = PIXI_APP.stage.toLocal( new PIXI.Point(global_pos.x, global_pos.y));
    const relative_pos = {x: Math.round(local_pos.x / values.UNIT), y:Math.round(local_pos.y / values.UNIT)};

    SX = relative_pos.x;
    SY = relative_pos.y;


    // UPDATE HELPER
    MOUSE_POS_HELPER.text = `${relative_pos.x},${relative_pos.y}`;

    
    // CHANGE FUNCTIONALITY DEPENDING ON MODE
    if(MODE == "block 1"){
        
    }else if(MODE == "door"){
        
    }else if(MODE == "light"){
        
    }else if(MODE == "text"){
       
    }else if(MODE == "window"){
        
    }




});





BG.on("mouseenter", (ev)=>{
    const global_pos = ev.global;
    const local_pos = PIXI_APP.stage.toLocal( new PIXI.Point(global_pos.x, global_pos.y));
    const relative_pos = {x: Math.round(local_pos.x / values.UNIT), y:Math.round(local_pos.y / values.UNIT)};

    // UPDATE HELPER
    MOUSE_POS_HELPER.text = `${relative_pos.x},${relative_pos.y}`;



});





BG.on("mousemove", (ev)=>{
    const global_pos = ev.global;
    const local_pos = PIXI_APP.stage.toLocal( new PIXI.Point(global_pos.x, global_pos.y));
    const relative_pos = {x: Math.round(local_pos.x / values.UNIT), y:Math.round(local_pos.y / values.UNIT)};


    // UPDATE HELPERS
    MOUSE_POS_HELPER.text = `${relative_pos.x},${relative_pos.y}`;
    TEXT_MODE_HELPER.visible = false;

    

    OVERLAY.clear();






    if(MODE == "block 1"){
        if(SX!=null  &&  SY!=null){
            OVERLAY.moveTo(SX*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT, relative_pos.y*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT, SY*values.UNIT);
            OVERLAY.stroke({color:"#30465C", width:BLOCK_THICKNESS});
        }

        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "block 2"){
        if(SX!=null  &&  SY!=null){
            
            OVERLAY.moveTo(SX*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo((SX+((relative_pos.x - SX))/2)*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo((SX+((relative_pos.x - SX))/2)*values.UNIT,  (SY+((relative_pos.y - SY))/2)*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT, (SY+((relative_pos.y - SY))/2)*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT, relative_pos.y*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT, SY*values.UNIT);
            OVERLAY.stroke({color:"#30465C", width:BLOCK_THICKNESS});
        }

        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "block 3"){
        if(SX!=null  &&  SY!=null){
            
            OVERLAY.moveTo((SX+((relative_pos.x - SX))/2)*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT, relative_pos.y*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT, (SY+((relative_pos.y - SY))/2)*values.UNIT);
            OVERLAY.lineTo((SX+((relative_pos.x - SX))/2)*values.UNIT,  (SY+((relative_pos.y - SY))/2)*values.UNIT);
            OVERLAY.lineTo((SX+((relative_pos.x - SX))/2)*values.UNIT,  SY*values.UNIT);
            OVERLAY.stroke({color:"#30465C", width:BLOCK_THICKNESS});
        }

        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "block 4"){
        if(SX!=null  &&  SY!=null){
            OVERLAY.moveTo(SX*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT,  (SY+((relative_pos.y - SY))/2)*values.UNIT);
            OVERLAY.lineTo((SX+((relative_pos.x - SX))/2)*values.UNIT,  (SY+((relative_pos.y - SY))/2)*values.UNIT);
            OVERLAY.lineTo((SX+((relative_pos.x - SX))/2)*values.UNIT,  relative_pos.y*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT,  relative_pos.y*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT, SY*values.UNIT);
            OVERLAY.stroke({color:"#30465C", width:BLOCK_THICKNESS});
        }

        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "block 5"){
        if(SX!=null  &&  SY!=null){
            OVERLAY.moveTo(SX*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT, SY*values.UNIT);
            OVERLAY.lineTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
            OVERLAY.lineTo((SX+((relative_pos.x - SX))/2)*values.UNIT, relative_pos.y*values.UNIT);
            OVERLAY.lineTo((SX+((relative_pos.x - SX))/2)*values.UNIT,  (SY+((relative_pos.y - SY))/2)*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT,  (SY+((relative_pos.y - SY))/2)*values.UNIT);
            OVERLAY.lineTo(SX*values.UNIT, SY*values.UNIT);
            OVERLAY.stroke({color:"#30465C", width:BLOCK_THICKNESS});
        }

        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"})
    }



    else if(MODE == "door 1"){
        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x+2)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#ffffff", width:BLOCK_THICKNESS});


        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y-2)*values.UNIT);
        OVERLAY.stroke({color:"#7e3707", width:5});
        OVERLAY.arc(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT, 2*values.UNIT, Math.PI*1.5, 0);
        OVERLAY.stroke({color:"#000000", pixelLine:true})


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "door 2"){
        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x+2)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y+2)*values.UNIT);
        OVERLAY.stroke({color:"#7e3707", width:5});
        OVERLAY.arc(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT, 2*values.UNIT, Math.PI/2 ,0, true);
        OVERLAY.stroke({color:"#000000", pixelLine:true})


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "door 3"){
        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x-2)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#ffffff", width:BLOCK_THICKNESS});


        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y-2)*values.UNIT);
        OVERLAY.stroke({color:"#7e3707", width:5});
        OVERLAY.arc(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT, 2*values.UNIT, Math.PI*1.5, Math.PI, true);
        OVERLAY.stroke({color:"#000000", pixelLine:true})


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "door 4"){
        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x-2)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y+2)*values.UNIT);
        OVERLAY.stroke({color:"#7e3707", width:5});
        OVERLAY.arc(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT, 2*values.UNIT, Math.PI/2, Math.PI);
        OVERLAY.stroke({color:"#000000", pixelLine:true});


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "door 5"){
        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y-2)*values.UNIT);
        OVERLAY.stroke({color:"#ffffff", width:BLOCK_THICKNESS});


        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x+2)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#7e3707", width:5});
        OVERLAY.arc(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT, 2*values.UNIT, 0, Math.PI*1.5, true);
        OVERLAY.stroke({color:"#000000", pixelLine:true});


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "door 6"){
        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y-2)*values.UNIT);
        OVERLAY.stroke({color:"#ffffff", width:BLOCK_THICKNESS});


        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x-2)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#7e3707", width:5});
        OVERLAY.arc(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT, 2*values.UNIT, Math.PI, Math.PI*1.5);
        OVERLAY.stroke({color:"#000000", width:1})


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "door 7"){
        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y+2)*values.UNIT);
        OVERLAY.stroke({color:"#ffffff", width:BLOCK_THICKNESS});


        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x-2)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#7e3707", width:5});
        OVERLAY.arc(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT, 2*values.UNIT, Math.PI, Math.PI/2, true);
        OVERLAY.stroke({color:"#000000", width:1})


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "door 8"){
        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y+2)*values.UNIT);
        OVERLAY.stroke({color:"#ffffff", width:BLOCK_THICKNESS});


        OVERLAY.moveTo(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x+2)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#7e3707", width:5});
        OVERLAY.arc(relative_pos.x*values.UNIT, relative_pos.y*values.UNIT, 2*values.UNIT, 0, Math.PI/2);
        OVERLAY.stroke({color:"#000000", width:1})


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }








    










    
    
    else if(MODE == "hvac 1"){
        OVERLAY.rect((relative_pos.x-1)*values.UNIT, (relative_pos.y-1)*values.UNIT, 2*values.UNIT, 2*values.UNIT);
        OVERLAY.circle(relative_pos.x*values.UNIT , relative_pos.y*values.UNIT, 10);
        OVERLAY.moveTo((relative_pos.x-1) * values.UNIT, (relative_pos.y-1)*values.UNIT);
        OVERLAY.lineTo((relative_pos.x+1) * values.UNIT, (relative_pos.y+1)*values.UNIT);
        OVERLAY.moveTo((relative_pos.x-1) * values.UNIT, (relative_pos.y+1)*values.UNIT);
        OVERLAY.lineTo((relative_pos.x+1) * values.UNIT, (relative_pos.y-1)*values.UNIT);
        OVERLAY.stroke({color:"#000000", pixelLine:true});
    }


















    else if(MODE == "light 1"){
        OVERLAY.circle(relative_pos.x*values.UNIT , relative_pos.y*values.UNIT, 10).fill({alpha:0.4, color:"#f6c500"});
        
        OVERLAY.circle(relative_pos.x*values.UNIT , relative_pos.y*values.UNIT, 3);
        OVERLAY.circle(relative_pos.x*values.UNIT , relative_pos.y*values.UNIT, 5);

        OVERLAY.moveTo(relative_pos.x*values.UNIT , relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x*values.UNIT)-7 , (relative_pos.y*values.UNIT)+7);
        OVERLAY.lineTo((relative_pos.x*values.UNIT)+7 , (relative_pos.y*values.UNIT)-7);

        OVERLAY.moveTo(relative_pos.x*values.UNIT , relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x*values.UNIT)-7 , (relative_pos.y*values.UNIT)-7);
        OVERLAY.lineTo((relative_pos.x*values.UNIT)+7 , (relative_pos.y*values.UNIT)+7);

        OVERLAY.stroke({color:"#000000", pixelLine:true});


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }







    

    
    else if(MODE == "text 1"){
        TEXT_MODE_HELPER.visible = true;
        TEXT_MODE_HELPER.x = relative_pos.x * values.UNIT;
        TEXT_MODE_HELPER.y = relative_pos.y * values.UNIT;
    }












    else if(MODE == "window 1"){
        
        OVERLAY.moveTo((relative_pos.x-1)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.lineTo((relative_pos.x+1)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#CAE1E5", width:WINDOW_THICKNESS});
        OVERLAY.lineTo((relative_pos.x-1)*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.stroke({color:"#8699A7", width:1});


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    else if(MODE == "window 2"){
        
        OVERLAY.moveTo(relative_pos.x*values.UNIT, (relative_pos.y-1)*values.UNIT);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y+1)*values.UNIT);
        OVERLAY.stroke({color:"#CAE1E5", width:WINDOW_THICKNESS});
        OVERLAY.lineTo(relative_pos.x*values.UNIT, (relative_pos.y-1)*values.UNIT);
        OVERLAY.stroke({color:"#8699A7", width:1});


        // HELPER
        OVERLAY.moveTo(0, relative_pos.y*values.UNIT);
        OVERLAY.lineTo(PIXI_APP.screen.width*values.UNIT, relative_pos.y*values.UNIT);
        OVERLAY.moveTo(relative_pos.x*values.UNIT, 0);
        OVERLAY.lineTo(relative_pos.x*values.UNIT, PIXI_APP.screen.height*values.UNIT);
        OVERLAY.stroke({color:"#000000"});
    }


    
});





BG.on("mouseout", (ev)=>{
    // UPDATE HELPER
    MOUSE_POS_HELPER.text = ``;


    OVERLAY.clear();


    SX = null; SY = null;
    EX = null; EY = null;
});





BG.on("mouseup", (ev)=>{
    const global_pos = ev.global;
    const local_pos = PIXI_APP.stage.toLocal( new PIXI.Point(global_pos.x, global_pos.y));
    const relative_pos = {x: Math.round(local_pos.x / values.UNIT), y:Math.round(local_pos.y / values.UNIT)};

    EX = relative_pos.x;
    EY = relative_pos.y;


    // UPDATE HELPER
    MOUSE_POS_HELPER.text = `${relative_pos.x},${relative_pos.y}`;
    OVERLAY.clear();





    // ENSURE SX,SY ARE THE START COORDINATES AND EX,EY ARE THE END COORDINATES
    fix_coordinates();





    // CHANGE FUNCTIONALITY DEPENDING ON MODE
    if(MODE == "block 1"){
        if(SX==EX  &&  SY==EY){
            show_toast_error(`A block cannot have a size of 0.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }

        /*
        if(is_block_crossing_other_blocks() == true){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error(`A block cannot cross another block.`);
            return;
        }*/




        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:true,
            west_wall_available:true,
            north_wall_available:true,
            south_wall_available:true,
            
            bottom_left: {
                x:SX,
                y:EY
            },
            bottom_right: {
                x:EX,
                y:EY
            },
            top_left: {
                x:SX,
                y: SY
            },
            top_right: {
                x:EX,
                y:SY
            }


        });



        // MAKE UNAVAILABLE BLOCK WALLS THAT ARE OVER OTHER WALLS
        //remove_same_direction_overlapping_block_walls();



        // update graphics objects
        update();
    }


    else if(MODE == "block 2"){
        if(SX==EX  &&  SY==EY){
            show_toast_error(`A block cannot have a size of 0.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }


        /*if(is_block_crossing_other_blocks() == true){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error(`A block cannot cross another block.`);
            return;
        }*/




        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:true,
            west_wall_available:true,
            north_wall_available:true,
            south_wall_available:false,
            
            bottom_left: {
                x:SX,
                y:SY+((EY-SY)/2)
            },
            bottom_right: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            },
            top_left: {
                x:SX,
                y:SY
            },
            top_right: {
                x:SX+((EX-SX)/2),
                y:SY
            }
        });



        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:false,
            west_wall_available:true,
            north_wall_available:false,
            south_wall_available:true,
            
            bottom_left: {
                x:SX,
                y:EY
            },
            bottom_right: {
                x:SX+((EX-SX)/2),
                y:EY
            },

            top_left: {
                x:SX,
                y:SY+((EY-SY)/2)
            },
            top_right: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            }
        });


        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:true,
            west_wall_available:false,
            north_wall_available:true,
            south_wall_available:true,

            
            bottom_left: {
                x:SX+((EX-SX)/2),
                y:EY
            },
            bottom_right: {
                x:EX,
                y:EY
            },

            top_left: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            },

            top_right: {
                x:EX,
                y:SY+((EY-SY)/2)
            }
        });



        // MAKE UNAVAILABLE BLOCK WALLS THAT ARE OVER OTHER WALLS
        //remove_same_direction_overlapping_block_walls();



        // update graphics objects
        update();
    }


    if(MODE == "block 3"){
        if(SX==EX  &&  SY==EY){
            show_toast_error(`A block cannot have a size of 0.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }


        /*if(is_block_crossing_other_blocks() == true){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error(`A block cannot cross another block.`);
            return;
        }*/



        
        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:true,
            west_wall_available:true,
            north_wall_available:true,
            south_wall_available:false,

            bottom_left: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            },
            bottom_right: {
                x:EX,
                y:SY+((EY-SY)/2)
            },
            top_left: {
                x:SX+((EX-SX)/2),
                y:SY
            },
            top_right: {
                x:EX,
                y:SY
            }
        });
        


        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:false,
            west_wall_available:true,
            north_wall_available:true,
            south_wall_available:true,
            
            bottom_left: {
                x:SX,
                y:EY
            },
            bottom_right: {
                x:SX+((EX-SX)/2),
                y:EY
            },

            top_left: {
                x:SX,
                y:SY+((EY-SY)/2)
            },
            top_right: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            }
        });


        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:true,
            west_wall_available:false,
            north_wall_available:false,
            south_wall_available:true,

            
            bottom_left: {
                x:SX+((EX-SX)/2),
                y:EY
            },
            bottom_right: {
                x:EX,
                y:EY
            },

            top_left: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            },

            top_right: {
                x:EX,
                y:SY+((EY-SY)/2)
            }
        });



        // MAKE UNAVAILABLE BLOCK WALLS THAT ARE OVER OTHER WALLS
        //remove_same_direction_overlapping_block_walls();



        // update graphics objects
        update();
    }


    if(MODE == "block 4"){
        if(SX==EX  &&  SY==EY){
            show_toast_error(`A block cannot have a size of 0.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }


        /*if(is_block_crossing_other_blocks() == true){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error(`A block cannot cross another block.`);
            return;
        }*/



        
        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:false,
            west_wall_available:true,
            north_wall_available:true,
            south_wall_available:false,

            bottom_left: {
                x:SX,
                y:SY+((EY-SY)/2)
            },
            bottom_right: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            },
            top_left: {
                x:SX,
                y:SY
            },
            top_right: {
                x:SX+((EX-SX)/2),
                y:SY
            }
        });



        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:true,
            west_wall_available:true,
            north_wall_available:false,
            south_wall_available:true,

            bottom_left: {
                x:SX,
                y:EY
            },
            bottom_right: {
                x:SX+((EX-SX)/2),
                y:EY
            },
            top_left: {
                x:SX,
                y:SY+((EY-SY)/2)
            },
            top_right: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            }
        });



        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:true,
            west_wall_available:false,
            north_wall_available:true,
            south_wall_available:true,

            bottom_left: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            },
            bottom_right: {
                x:EX,
                y:SY+((EY-SY)/2)
            },
            top_left: {
                x:SX+((EX-SX)/2),
                y:SY
            },
            top_right: {
                x:EX,
                y:SY
            }
        });
        






        // update graphics objects
        update();
    }


    if(MODE == "block 5"){
        if(SX==EX  &&  SY==EY){
            show_toast_error(`A block cannot have a size of 0.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }


        /*if(is_block_crossing_other_blocks() == true){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error(`A block cannot cross another block.`);
            return;
        }*/



        
        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:false,
            west_wall_available:true,
            north_wall_available:true,
            south_wall_available:true,

            bottom_left: {
                x:SX,
                y:SY+((EY-SY)/2)
            },
            bottom_right: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            },
            top_left: {
                x:SX,
                y:SY
            },
            top_right: {
                x:SX+((EX-SX)/2),
                y:SY
            }
        });


        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:true,
            west_wall_available:true,
            north_wall_available:false,
            south_wall_available:true,

            
            bottom_left: {
                x:SX+((EX-SX)/2),
                y:EY
            },
            bottom_right: {
                x:EX,
                y:EY
            },

            top_left: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            },

            top_right: {
                x:EX,
                y:SY+((EY-SY)/2)
            }
        });


        DATA.blocks.objects.push({
            id: generate_id(),
            height:20,
            name:"block",
            visible:true,

            east_wall_available:true,
            west_wall_available:false,
            north_wall_available:true,
            south_wall_available:false,

            bottom_left: {
                x:SX+((EX-SX)/2),
                y:SY+((EY-SY)/2)
            },
            bottom_right: {
                x:EX,
                y:SY+((EY-SY)/2)
            },
            top_left: {
                x:SX+((EX-SX)/2),
                y:SY
            },
            top_right: {
                x:EX,
                y:SY
            }
        });
        





        // update graphics objects
        update();
    }













    else if(MODE == "door 1"){
        
        
        // ensure door coordinates are on the same block and wall
        let start_block = determine_block_from_coordinates(EX, EY);
        let end_block = determine_block_from_coordinates(EX+4, EY);
        if(start_block == null  ||  end_block==null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be fully on a block wall.");
            return;
        }
        if(start_block.block_id != end_block.block_id){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be on the same block.");
            return;
        }
        if(start_block.wall=="east" || start_block.wall=="west"  ||  end_block.wall=="east" || end_block.wall=="west"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This door can only be placed on north or south facing walls.");
            return;
        }

        
        // ensure door isn't ovarlapping with any window
        let overlapped_windows = DATA.windows.filter(item => item.type==="window 1"  &&  item.y===EY  &&  ((item.x-1>=EX-4 && item.x-1<=EX) || (item.x+1>=EX-4 && item.x+1<=EX)) );
        // let overlapped_windows = DATA.windows.filter(item => item.type==="window 1"  &&  item.y===EY  &&  item.x-1>=EX  &&item.x+1<=EX+4);
        if(overlapped_windows.length){
            show_toast_error(`A door cannot overalap a window.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }
        


        DATA.doors.push({
            block:start_block,
            id: generate_id(),
            layer_1: "Hardwood (Pine)",
            layer_2: null,
            layer_3: null,
            layer_4: null,
            layer_5: null,
            name: "door",
            type:MODE,
            visible:true,    
            x: EX,
            y: EY
            
        });

        


        update();
    }

    else if(MODE == "door 2"){
        
        
        // ensure door coordinates are on the same block and wall
        let start_block = determine_block_from_coordinates(EX, EY);
        let end_block = determine_block_from_coordinates(EX+4, EY);
        if(start_block == null  ||  end_block==null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be fully on a block wall.");
            return;
        }
        if(start_block.block_id != end_block.block_id){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be on the same block.");
            return;
        }
        if(start_block.wall=="east" || start_block.wall=="west"  ||  end_block.wall=="east" || end_block.wall=="west"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This door can only be placed on north or south facing walls.");
            return;
        }

        
        // ensure door isn't ovarlapping with any window
        let overlapped_windows = DATA.windows.filter(item => item.type==="window 1"  &&  item.y===EY  &&  ((item.x-1>=EX-4 && item.x-1<=EX) || (item.x+1>=EX-4 && item.x+1<=EX)) );
        //let overlapped_windows = DATA.windows.filter(item => item.type==="window 1"  &&  item.y===EY  &&  item.x-1>=EX  &&item.x+1<=EX+4);
        if(overlapped_windows.length){
            show_toast_error(`A door cannot overalap a window.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }
        
        

        DATA.doors.push({
            block:start_block,
            id: generate_id(),
            layer_1: "Hardwood (Pine)",
            layer_2: null,
            layer_3: null,
            layer_4: null,
            layer_5: null,
            name: "door",
            type:MODE,
            visible:true,    
            x: EX,
            y: EY
            
        });

        


        update();
    }

    else if(MODE == "door 3"){
        
        
        // ensure door coordinates are on the same block and wall
        let start_block = determine_block_from_coordinates(EX, EY);
        let end_block = determine_block_from_coordinates(EX-4, EY);
        if(start_block == null  ||  end_block==null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be fully on a block wall.");
            return;
        }
        if(start_block.block_id != end_block.block_id){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be on the same block.");
            return;
        }
        if(start_block.wall=="east" || start_block.wall=="west"  ||  end_block.wall=="east" || end_block.wall=="west"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This door can only be placed on north or south facing walls.");
            return;
        }

        
        // ensure door isn't ovarlapping with any window
        let overlapped_windows = DATA.windows.filter(item => item.type==="window 1"  &&  item.y===EY  &&  ((item.x-1>=EX-4 && item.x-1<=EX) || (item.x+1>=EX-4 && item.x+1<=EX)) );
        if(overlapped_windows.length){
            show_toast_error(`A door cannot overalap a window.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }
        
        

        DATA.doors.push({
            block:start_block,
            id: generate_id(),
            layer_1: "Hardwood (Pine)",
            layer_2: null,
            layer_3: null,
            layer_4: null,
            layer_5: null,
            name: "door",
            type:MODE,
            visible:true,    
            x: EX,
            y: EY
            
        });

        


        update();
    }

    else if(MODE == "door 4"){
        
        
        // ensure door coordinates are on the same block and wall
        let start_block = determine_block_from_coordinates(EX, EY);
        let end_block = determine_block_from_coordinates(EX-4, EY);
        if(start_block == null  ||  end_block==null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be fully on a block wall.");
            return;
        }
        if(start_block.block_id != end_block.block_id){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be on the same block.");
            return;
        }
        if(start_block.wall=="east" || start_block.wall=="west"  ||  end_block.wall=="east" || end_block.wall=="west"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This door can only be placed on north or south facing walls.");
            return;
        }

        
        // ensure door isn't ovarlapping with any window
        let overlapped_windows = DATA.windows.filter(item => item.type==="window 1"  &&  item.y===EY  &&  ((item.x-1>=EX-4 && item.x-1<=EX) || (item.x+1>=EX-4 && item.x+1<=EX)) );
        if(overlapped_windows.length){
            show_toast_error(`A door cannot overalap a window.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }
        
        

        DATA.doors.push({
            block:start_block,
            id: generate_id(),
            layer_1: "Hardwood (Pine)",
            layer_2: null,
            layer_3: null,
            layer_4: null,
            layer_5: null,
            name: "door",
            type:MODE,
            visible:true,    
            x: EX,
            y: EY
            
        });

        


        update();
    }

    else if(MODE == "door 5"){
        
        
        // ensure door coordinates are on the same block and wall
        let start_block = determine_block_from_coordinates(EX, EY);
        let end_block = determine_block_from_coordinates(EX, EY-4);
        if(start_block == null  ||  end_block==null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be fully on a block wall.");
            return;
        }
        if(start_block.block_id != end_block.block_id){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be on the same block.");
            return;
        }
        if(start_block.wall=="north" || start_block.wall=="south"  ||  end_block.wall=="north" || end_block.wall=="south"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This door can only be placed on east or west facing walls.");
            return;
        }

        
        // ensure door isn't ovarlapping with any window
        let overlapped_windows = DATA.windows.filter(item => item.type==="window 2"  &&  item.x===EX  &&  ((item.y-1>=EY-4 && item.y-1<=EY) || (item.y+1>=EY-4 && item.y+1<=EY)) );
        if(overlapped_windows.length){
            show_toast_error(`A door cannot overalap a window.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }
        
        

        DATA.doors.push({
            block:start_block,
            id: generate_id(),
            layer_1: "Hardwood (Pine)",
            layer_2: null,
            layer_3: null,
            layer_4: null,
            layer_5: null,
            name: "door",
            type:MODE,
            visible:true,    
            x: EX,
            y: EY
            
        });

        


        update();
    }

    else if(MODE == "door 6"){
        // ensure door coordinates are on the same block and wall
        let start_block = determine_block_from_coordinates(EX, EY);
        let end_block = determine_block_from_coordinates(EX, EY-4);
        if(start_block == null  ||  end_block==null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be fully on a block wall.");
            return;
        }
        if(start_block.block_id != end_block.block_id){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be on the same block.");
            return;
        }
        if(start_block.wall=="north" || start_block.wall=="south"  ||  end_block.wall=="north" || end_block.wall=="south"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This door can only be placed on east or west facing walls.");
            return;
        }

        
        // ensure door isn't ovarlapping with any window
        let overlapped_windows = DATA.windows.filter(item => item.type==="window 2"  &&  item.x===EX  &&  ((item.y-1>=EY-4 && item.y-1<=EY) || (item.y+1>=EY-4 && item.y+1<=EY)) );
        if(overlapped_windows.length){
            show_toast_error(`A door cannot overalap a window.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }
        
        
        DATA.doors.push({
            block:start_block,
            id: generate_id(),
            layer_1: "Hardwood (Pine)",
            layer_2: null,
            layer_3: null,
            layer_4: null,
            layer_5: null,
            name: "door",
            type:MODE,
            visible:true,    
            x: EX,
            y: EY
            
        });

        

        update();
    }

    else if(MODE == "door 7"){
        // ensure door coordinates are on the same block and wall
        let start_block = determine_block_from_coordinates(EX, EY);
        let end_block = determine_block_from_coordinates(EX, EY+4);
        if(start_block == null  ||  end_block==null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be fully on a block wall.");
            return;
        }
        if(start_block.block_id != end_block.block_id){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be on the same block.");
            return;
        }
        if(start_block.wall=="north" || start_block.wall=="south"  ||  end_block.wall=="north" || end_block.wall=="south"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This door can only be placed on east or west facing walls.");
            return;
        }

        
        // ensure door isn't ovarlapping with any window
        let overlapped_windows = DATA.windows.filter(item => item.type==="window 2"  &&  item.x===EX  &&  ((item.y-1>=EY && item.y-1<=EY+4) || (item.y+1>=EY && item.y+1<=EY+4)) );
        if(overlapped_windows.length){
            show_toast_error(`A door cannot overalap a window.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }
        
        
        DATA.doors.push({
            block:start_block,
            id: generate_id(),
            layer_1: "Hardwood (Pine)",
            layer_2: null,
            layer_3: null,
            layer_4: null,
            layer_5: null,
            name: "door",
            type:MODE,
            visible:true,    
            x: EX,
            y: EY
            
        });

        

        update();
    }

    else if(MODE == "door 8"){
        // ensure door coordinates are on the same block and wall
        let start_block = determine_block_from_coordinates(EX, EY);
        let end_block = determine_block_from_coordinates(EX, EY+4);
        if(start_block == null  ||  end_block==null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be fully on a block wall.");
            return;
        }
        if(start_block.block_id != end_block.block_id){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A door must be on the same block.");
            return;
        }
        if(start_block.wall=="north" || start_block.wall=="south"  ||  end_block.wall=="north" || end_block.wall=="south"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This door can only be placed on east or west facing walls.");
            return;
        }

        
        // ensure door isn't ovarlapping with any window
        let overlapped_windows = DATA.windows.filter(item => item.type==="window 2"  &&  item.x===EX  &&  ((item.y-1>=EY && item.y-1<=EY+4) || (item.y+1>=EY && item.y+1<=EY+4)) );
        if(overlapped_windows.length){
            show_toast_error(`A door cannot overalap a window.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }
        
        
        DATA.doors.push({
            block:start_block,
            id: generate_id(),
            layer_1: "Hardwood (Pine)",
            layer_2: null,
            layer_3: null,
            layer_4: null,
            layer_5: null,
            name: "door",
            type:MODE,
            visible:true,    
            x: EX,
            y: EY
            
        });

        

        update();
    }









    else if(MODE == "hvac 1"){
        DATA.hvacs.push({
            id: generate_id(),
            name: "HVAC",
            type: 1,
            visible:true,
            x: EX,
            y: EY
        });
        update();
    }





















    else if(MODE == "light 1"){

        /*let zone = determine_zone_light_is_in();
        if(zone == null){
            SX = SY = EX = EY = null;
            show_toast_error("All lights are supposed to be in a block.");
            return;
        }*/


        DATA.lights.push({
            id: generate_id(),
            name: "Light",
            schedule:{
                off_time:"23:00",
                on_time:"18:00"
            },
            visible:true,
            watts: 50,
            x: EX,
            y: EY
        });

        update();
    }





    else if(MODE == "text 1"){


        DATA.texts.push({
            id: generate_id(),
            text:"Text",
            visible:true,
            x:EX,
            y:EY
        });

        // update graphics objects
        update();
    }
























    else if(MODE == "window 1"){



        // ensure window coordinates are on the same wall, block_wall
        let target_block = determine_block_from_coordinates(EX, EY);

        if(target_block == null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A window must be placed on a wall.");
            return;
        }


        // ensure window is on north or south wall
        if(target_block.wall=="east"  ||  target_block.wall=="west"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This window can only be placed on north or south facing walls.");
            return;
        }



        /*
        // ensure window isn't ovarllaping with any door
        if(is_window_overlapping_any_doors()){
            show_toast_error(`A window cannot overalap a door.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }*/



        DATA.windows.push({
            block:target_block,
            id: generate_id(),
            layer_1: "Single Clear 4mm Glass",
            name: "window",
            type:MODE,
            visible:true,
            x: EX,
            y: EY
        });




        // join any overlapping doors
        //join_overlapping_windows();


        update();
    }


    else if(MODE == "window 2"){
        // ensure window coordinates are on the same wall, block_wall
        let target_block = determine_block_from_coordinates(EX, EY);

        if(target_block == null){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("A window must be placed on a wall.");
            return;
        }


        // ensure window is on east or west wall
        if(target_block.wall=="north"  ||  target_block.wall=="south"){
            SX = null; SY = null;
            EX = null; EY = null;
            show_toast_error("This window can only be placed on east or west facing walls.");
            return;
        }



        /*
        // ensure window isn't ovarllaping with any door
        if(is_window_overlapping_any_doors()){
            show_toast_error(`A window cannot overalap a door.`);
            SX = null; SY = null;
            EX = null; EY = null;
            return;
        }*/



        DATA.windows.push({
            block:target_block,
            id: generate_id(),
            layer_1: "Single Clear 4mm Glass",
            name: "window",
            type:MODE,
            visible:true,
            x: EX,
            y: EY
        });




        // join any overlapping doors
        //join_overlapping_windows();


        update();
    }


















    



    // reset START and END coordinates
    SX = null; SY = null;
    EX = null; EY = null;
});












// CHANGING MODE
document.querySelector("#set_mode_block_1").onclick = (ev)=>{
    set_mode_block(1);
}

document.querySelector("#set_mode_block_2").onclick = (ev)=>{
    set_mode_block(2);
}

document.querySelector("#set_mode_block_3").onclick = (ev)=>{
    set_mode_block(3);
}

document.querySelector("#set_mode_block_4").onclick = (ev)=>{
    set_mode_block(4);
}

document.querySelector("#set_mode_block_5").onclick = (ev)=>{
    set_mode_block(5);
}

document.querySelector("#set_mode_door_1").onclick = (ev)=>{
    set_mode_door(1);
}

document.querySelector("#set_mode_door_2").onclick = (ev)=>{
    set_mode_door(2);
}

document.querySelector("#set_mode_door_3").onclick = (ev)=>{
    set_mode_door(3);
}

document.querySelector("#set_mode_door_4").onclick = (ev)=>{
    set_mode_door(4);
}

document.querySelector("#set_mode_door_5").onclick = (ev)=>{
    set_mode_door(5);
}

document.querySelector("#set_mode_door_6").onclick = (ev)=>{
    set_mode_door(6);
}

document.querySelector("#set_mode_door_7").onclick = (ev)=>{
    set_mode_door(7);
}

document.querySelector("#set_mode_door_8").onclick = (ev)=>{
    set_mode_door(8);
}

document.querySelector("#set_mode_hvac_1").onclick = (ev)=>{
    set_mode_hvac(1);
}

document.querySelector("#set_mode_light_1").onclick = (ev)=>{
    set_mode_light(1);
}

document.querySelector("#set_mode_text_1").onclick = (ev)=>{
    set_mode_text(1);
}

document.querySelector("#set_mode_window_1").onclick = (ev)=>{
    set_mode_window(1);
}

document.querySelector("#set_mode_window_2").onclick = (ev)=>{
    set_mode_window(2);
}

document.getElementById("save_btn").addEventListener("click", (ev)=>{
    let project_data = DATA;

    let save_project_form = document.getElementById("save_project_form");
    save_project_form.querySelector("#project_data").value = JSON.stringify(project_data);
    save_project_form.submit();
});









// functions
function determine_block_from_coordinates(x, y){
    let result = null;

    for(let block_data of DATA.blocks.objects){

        if(block_data.east_wall_available===true  &&  block_data.top_right.x===x){
            if(block_data.top_right.y <= y  &&  block_data.bottom_right.y >= y){
                result = {block_id: block_data.id, wall: "east" };
                break;
            }
        }


        if(block_data.west_wall_available===true  &&  block_data.top_left.x===x){
            if(block_data.top_left.y <= y  &&  block_data.bottom_left.y >= y){
                result = {block_id: block_data.id, wall: "west" };
                break;
            }
        }


        if(block_data.north_wall_available===true  &&  block_data.top_left.y===y){
            if(block_data.top_left.x <= x  &&  block_data.top_right.x >= x){
                result = {block_id: block_data.id, wall: "north" };
                break;
            }
        }


        if(block_data.south_wall_available===true  &&  block_data.bottom_left.y===y){
            if(block_data.bottom_left.x <= x  &&  block_data.bottom_right.x >= x){
                result = {block_id: block_data.id, wall: "south" };
                break;
            }
        }
    }


    return result;
}

function determine_window_orientation(){
    let result = null;
    if(SX == EX){
        result = "vertical";
    }
    if(SY == EY){
        result = "horizontal";
    }
    return result;
}

function determine_block_window_is_on(){
    let result = [];

    // vertical window
    if(SX == EX){
        let east_walls = DATA.blocks.objects.filter(item => item.east_wall_available===true  &&  SX===item.top_right.x  &&  SY>item.top_right.y  &&  EY<item.bottom_right.y);
        let west_walls = DATA.blocks.objects.filter(item => item.west_wall_available===true  &&  SX===item.top_left.x  &&  SY>item.top_left.y  &&  EY<item.bottom_left.y);

        if(east_walls.length > 0){
            for(let east_wall of east_walls){
                result.push({
                    block_id: east_wall.id,
                    wall: "east"
                });
            }
        }

        if(west_walls.length > 0){
            for(let west_wall of west_walls){
                result.push({
                    block_id: west_wall.id,
                    wall: "west"
                });
            }
        }
    }


    // horizontal window
    if(SY == EY){
        let north_walls = DATA.blocks.objects.filter(item=> item.north_wall_available===true  &&  SY===item.top_left.y  &&  SX>item.top_left.x  &&  EX<item.top_right.x);
        let south_walls = DATA.blocks.objects.filter(item=> item.south_wall_available===true  &&  SY===item.bottom_left.y  &&  SX>item.bottom_left.x  &&  EX<item.bottom_right.x);
        if(north_walls.length > 0){
            for(let north_wall of north_walls){
                result.push({
                    block_id: north_wall.id,
                    wall: "north"
                });
            }
        }

        if(south_walls.length > 0){
            for(let south_wall of south_walls){
                result.push({
                    block_id: south_wall.id,
                    wall: "south"
                });
            }
        }
    }


    return result;
}

function draw_bg(){
    BG.clear();
    BG.rect(0 , 0 , PIXI_APP.screen.width , PIXI_APP.screen.height).fill("#ffffff");
    /*for(let x = 0; x < PIXI_APP.screen.width; x+=values.UNIT){
        for(let y = 0; y < PIXI_APP.screen.height; y+=values.UNIT){
            BG.rect(x , y , 1 , 1);
        }
    }*/
    for(let x = 0; x < PIXI_APP.screen.width; x+=values.UNIT){
        BG.moveTo(x, 0).lineTo(x, PIXI_APP.screen.height);
    }
    for(let y = 0; y < PIXI_APP.screen.height; y+=values.UNIT){
        //BG.rect(x , y , 1 , 1);
        BG.moveTo(0, y).lineTo(PIXI_APP.screen.width, y);
    }
    BG.stroke({alpha:0.05, color:"#000000", pixelLine:true});
}

function generate_id(){
    return String(Math.random() * Math.random());
}

function fix_coordinates(){
    if(EX < SX){
        const temp_sx = SX;
        SX = EX;
        EX = temp_sx;
    }
    if(EY < SY){
        const temp_sy = SY;
        SY = EY;
        EY = temp_sy;
    }
}

function hide_all_editors(){
    document.getElementById("block_editor").style.display = "none";
    document.getElementById("door_editor").style.display = "none";
    document.getElementById("hvac_editor").style.display = "none";
    document.getElementById("light_editor").style.display = "none";
    document.getElementById("text_editor").style.display = "none";
    document.getElementById("window_editor").style.display = "none";
}

function highlight_block(block_data_id){
    let filter = new PIXI.ColorMatrixFilter({});
    filter.brightness(2, false);

    for(let block of BLOCKS_CONTAINER.children){
        if(block.id === block_data_id){
            block.filters = [filter];
            break;
        }
    }
}

function highlight_door(door_data_id){
    let filter = new PIXI.ColorMatrixFilter({});
    filter.brightness(2, false);

    for(let door of DOORS_CONTAINER.children){
        if(door.id === door_data_id){
            door.filters = [filter];
            break;
        }
    }
}

function highlight_hvac(hvac_data_id){
    let filter = new PIXI.ColorMatrixFilter({});
    filter.brightness(2, false);

    for(let hvac of HVACS_CONTAINER.children){
        if(hvac.id === hvac_data_id){
            hvac.filters = [filter];
            break;
        }
    }
}

function highlight_light(light_data_id){
    let filter = new PIXI.ColorMatrixFilter({});
    filter.brightness(2, false);

    for(let light of LIGHTS_CONTAINER.children){
        if(light.id === light_data_id){
            light.filters = [filter];
            break;
        }
    }
}

function highlight_text(text_data_id){
    let filter = new PIXI.ColorMatrixFilter({});
    filter.brightness(2, false);

    TEXTS_CONTAINER.children[DATA.texts.findIndex(item => item.id===text_data_id)].filters = [filter];
}

function highlight_window(window_data_id){
    let filter = new PIXI.ColorMatrixFilter({});
    filter.brightness(2, false);

    for(let _window of WINDOWS_CONTAINER.children){
        if(_window.id === window_data_id){
            _window.filters = [filter];
            break;
        }
    }
}

function is_block_crossing_other_blocks(){
    let result = false;

    for(let block_data of DATA.blocks.objects){
        if(block_data.top_left.x > SX  &&  block_data.top_left.x < EX){
            // top-left
            if(block_data.top_left.y > SY  &&  block_data.top_left.y < EY){
                result = true;
                break;
            }

            // center-left
            if(block_data.top_left.y < SY  &&  block_data.bottom_left.y > EY){
                result = true;
                break;
            }

            // bottom-left
            if(block_data.bottom_left.y > SY  &&  block_data.bottom_left.y < EY){
                result = true;
                break;
            }
        }

        // top,bottom center
        if(SX > block_data.top_left.x  &&  EX < block_data.top_right.x){
            if(SY < block_data.top_left.y  &&  EY > block_data.top_left.y){
                result = true;
                break;
            }

            if(SY < block_data.bottom_left.y  &&  EY > block_data.bottom_left.y){
                result = true;
                break;
            }
        }


        if(block_data.top_right.x > SX  &&  block_data.top_right.x < EX){
            // top-right
            if(block_data.top_right.y > SY  &&  block_data.top_right.y < EY){
                result = true;
                break;
            }

            // center-right
            if(block_data.top_right.y < SY  &&  block_data.bottom_right.y > EY){
                result = true;
                break;
            }

            // bottom-right
            if(block_data.bottom_right.y > SY  &&  block_data.bottom_right.y < EY){
                result = true;
                break;
            }
        }

    }

    return result;
}

function is_door_overlapping_any_windows(){
    let result = false;

    // horizontal
    if(SY == EY){
        let horizontal_windows = DATA.windows.filter(item => item.orientation==="horizontal");
        let overlapping_horizontal_windows = horizontal_windows.filter(item => SY===item.start.y && ((SX>=item.start.x&&EX<=item.end.x) || (SX>item.start.x&&SX<item.end.x) || (EX>item.start.x&&EX<item.end.x) || (item.start.x>SX&&item.start.x<EX) || (item.end.x>SX&&item.end.x<EX)));
        if(overlapping_horizontal_windows.length > 0){
            result = true;
        }
    }

    // vertical
    if(SX == EX){
        let vertical_windows = DATA.windows.filter(item => item.orientation==="vertical");
        let overlapping_vertical_windows = vertical_windows.filter(item => SX===item.start.x && ((SY>=item.start.x&&EY<=item.end.y) || (SY>item.start.y&&SY<item.end.y) || (EY>item.start.y&&EY<item.end.y) || (item.start.y>SY&&item.start.y<EY) || (item.end.y>SY&&item.end.y<EY)));
        if(overlapping_vertical_windows.length > 0){
            result = true;
        }
    }

    return result;
}

function is_window_overlapping_any_doors(){
    let result = false;

    // horizontal
    if(SY == EY){
        let horizontal_doors = DATA.doors.filter(item => item.orientation==="horizontal");
        let overlapping_horizontal_doors = horizontal_doors.filter(item => SY===item.start.y && ((SX>=item.start.x&&EX<=item.end.x) || (SX>item.start.x&&SX<item.end.x) || (EX>item.start.x&&EX<item.end.x) || (item.start.x>SX&&item.start.x<EX) || (item.end.x>SX&&item.end.x<EX)));
        if(overlapping_horizontal_doors.length > 0){
            result = true;
        }
    }

    // vertical
    if(SX == EX){
        let vertical_doors = DATA.doors.filter(item => item.orientation==="vertical");
        let overlapping_vertical_doors = vertical_doors.filter(item => SX===item.start.x && ((SY>=item.start.x&&EY<=item.end.y) || (SY>item.start.y&&SY<item.end.y) || (EY>item.start.y&&EY<item.end.y) || (item.start.y>SY&&item.start.y<EY) || (item.end.y>SY&&item.end.y<EY)));
        if(overlapping_vertical_doors.length > 0){
            result = true;
        }
    }

    return result;
}

function join_overlapping_doors(){
    let old_doors_data = structuredClone(DATA.doors)

    for(let door_data of old_doors_data){

        // horizontal doors
        if(door_data.orientation == "horizontal"){
            let overlapping_horizontal_doors = old_doors_data.filter(item => item.orientation==="horizontal"  &&  item.start.y===door_data.start.y  &&  ((item.start.x>=door_data.start.x && item.end.x<=door_data.x) || (door_data.start.x>=item.start.x && door_data.end.x<=item.end.x) || (item.start.x>door_data.start.x && item.start.x<door_data.end.x) || (door_data.start.x>item.start.x && door_data.start.x<item.end.x) || (door_data.end.x===item.start.x) || (item.end.x===door_data.start.x)));
            if(overlapping_horizontal_doors.length > 0){
                let sx = overlapping_horizontal_doors.sort((a,b) => a.start.x - b.start.x)[0].start.x;
                let ex = overlapping_horizontal_doors.sort((a,b) => b.end.x - a.end.x)[0].end.x;
            
                // delete combined doors
                for(let horizontal_door of overlapping_horizontal_doors){
                    old_doors_data = old_doors_data.filter(item => item.id!==horizontal_door.id);
                }

                // add new door
                let new_horizontal_door = structuredClone(door_data);
                new_horizontal_door.start.x = sx;
                new_horizontal_door.end.x = ex;
                old_doors_data.push(new_horizontal_door);
            }
        }






        // vertical doors
        if(door_data.orientation == "vertical"){
            let overlapping_vertical_doors = old_doors_data.filter(item => item.orientation==="vertical"  &&  item.start.x===door_data.start.x  &&  ((item.start.y>=door_data.start.y && item.end.y<=door_data.y) || (door_data.start.y>=item.start.y && door_data.end.y<=item.end.y) || (item.start.y>door_data.start.y && item.start.y<door_data.end.y) || (door_data.start.y>item.start.y && door_data.start.y<item.end.y) || (door_data.end.y===item.start.y) || (item.end.y===door_data.start.y)));
            if(overlapping_vertical_doors.length > 0){
                let sy = overlapping_vertical_doors.sort((a,b) => a.start.y - b.start.y)[0].start.y;
                let ey = overlapping_vertical_doors.sort((a,b) => b.end.y - a.end.y)[0].end.y;

                // delete combined doors
                for(let vertical_door of overlapping_vertical_doors){
                    old_doors_data = old_doors_data.filter(item => item.id!==vertical_door.id);
                }

                // add new door
                let new_vertical_door = structuredClone(door_data);
                new_vertical_door.start.y = sy;
                new_vertical_door.end.y = ey;
                old_doors_data.push(new_vertical_door);
            }
            
        }
    }



    DATA.doors = old_doors_data;
    update();
}

function join_overlapping_windows(){
    let old_windows_data = structuredClone(DATA.windows)

    for(let window_data of old_windows_data){

        // horizontal windows
        if(window_data.orientation == "horizontal"){
            let overlapping_horizontal_windows = old_windows_data.filter(item => item.orientation==="horizontal"  &&  item.start.y===window_data.start.y  &&  ((item.start.x>=window_data.start.x && item.end.x<=window_data.x) || (window_data.start.x>=item.start.x && window_data.end.x<=item.end.x) || (item.start.x>window_data.start.x && item.start.x<window_data.end.x) || (window_data.start.x>item.start.x && window_data.start.x<item.end.x) || (window_data.end.x===item.start.x) || (item.end.x===window_data.start.x)));
            if(overlapping_horizontal_windows.length > 0){
                let sx = overlapping_horizontal_windows.sort((a,b) => a.start.x - b.start.x)[0].start.x;
                let ex = overlapping_horizontal_windows.sort((a,b) => b.end.x - a.end.x)[0].end.x;
            
                // delete combined windows
                for(let horizontal_window of overlapping_horizontal_windows){
                    old_windows_data = old_windows_data.filter(item => item.id!==horizontal_window.id);
                }

                // add new window
                let new_horizontal_window = structuredClone(window_data);
                new_horizontal_window.start.x = sx;
                new_horizontal_window.end.x = ex;
                old_windows_data.push(new_horizontal_window);
            }
        }






        // vertical windows
        if(window_data.orientation == "vertical"){
            let overlapping_vertical_windows = old_windows_data.filter(item => item.orientation==="vertical"  &&  item.start.x===window_data.start.x  &&  ((item.start.y>=window_data.start.y && item.end.y<=window_data.y) || (window_data.start.y>=item.start.y && window_data.end.y<=item.end.y) || (item.start.y>window_data.start.y && item.start.y<window_data.end.y) || (window_data.start.y>item.start.y && window_data.start.y<item.end.y) || (window_data.end.y===item.start.y) || (item.end.y===window_data.start.y)));
            if(overlapping_vertical_windows.length > 0){
                let sy = overlapping_vertical_windows.sort((a,b) => a.start.y - b.start.y)[0].start.y;
                let ey = overlapping_vertical_windows.sort((a,b) => b.end.y - a.end.y)[0].end.y;

                // delete combined windows
                for(let vertical_window of overlapping_vertical_windows){
                    old_windows_data = old_windows_data.filter(item => item.id!==vertical_window.id);
                }

                // add new window
                let new_vertical_window = structuredClone(window_data);
                new_vertical_window.start.y = sy;
                new_vertical_window.end.y = ey;
                old_windows_data.push(new_vertical_window);
            }
            
        }
    }



    DATA.windows = old_windows_data;
    update();
}

function remove_same_direction_overlapping_block_walls(){
    let old_blocks_data = structuredClone(DATA.blocks.objects);

    const new_blocks_data = old_blocks_data.map((item, index, array) =>{
        
        // west wall
        let overlapping_west_walls = old_blocks_data.filter(i => i.top_left.x===item.top_left.x  &&  i.top_left.y>=item.top_left.y  &&  i.bottom_left.y<=item.bottom_left.y  &&  i.id!==item.id);
        for(let overlapping_west_wall of overlapping_west_walls){
            if(item.bottom_left.y < overlapping_west_wall.bottom_left.y){
                item.west_wall_available = false;
                overlapping_west_wall.west_wall_available = true;

            }else if(item.bottom_left.y > overlapping_west_wall.bottom_left.y){
                item.west_wall_available = true;
                overlapping_west_wall.west_wall_available = false;

            }else{
                item.west_wall_available = true;
                overlapping_west_wall.west_wall_available = false;
            }

        }



        // east wall
        let overlapping_east_walls = old_blocks_data.filter(i => i.top_right.x===item.top_right.x  &&  i.top_right.y>=item.top_right.y  &&  i.bottom_right.y<=item.bottom_right.y  &&  i.id!==item.id);
        for(let overlapping_east_wall of overlapping_east_walls){
            if(item.bottom_right.y < overlapping_east_wall.bottom_right.y){
                item.east_wall_available = false;
                overlapping_east_wall.east_wall_available = true;
            
            }else if(item.bottom_right.y > overlapping_east_wall.bottom_right.y){
                item.east_wall_available = true;
                overlapping_east_wall.east_wall_available = false;

            }else{
                item.east_wall_available = true;
                overlapping_east_wall.east_wall_available = false;
            }
        }



        // north wall
        let overlapping_north_walls = old_blocks_data.filter(i => i.top_left.y===item.top_left.y  &&  i.top_left.x>=item.top_left.x  &&  i.top_right.x<=item.top_right.x  &&  i.id!==item.id);
        for(let overlapping_north_wall of overlapping_north_walls){
            if(item.top_right.x < overlapping_north_wall.top_right.x){
                item.north_wall_available = false;
                overlapping_north_wall.north_wall_available = true;
            
            }else if(item.top_right.x > overlapping_north_wall.top_right.x){
                item.north_wall_available = true;
                overlapping_north_wall.north_wall_available = false;

            }else{
                item.north_wall_available = true;
                overlapping_north_wall.north_wall_available = false;
            }
        }


        
        // south wall
        let overlapping_south_walls = old_blocks_data.filter(i => i.bottom_left.y===item.bottom_left.y  &&  i.bottom_left.x>=item.bottom_left.x  &&  i.bottom_right.x<=item.bottom_right.x  &&  i.id!==item.id);
        for(let overlapping_south_wall of overlapping_south_walls){
            if(item.bottom_right.x < overlapping_south_wall.bottom_right.x){
                item.south_wall_available = false;
                overlapping_south_wall.south_wall_available = true;
                
            }else if(item.bottom_right.x > overlapping_south_wall.bottom_right.x){
                item.south_wall_available = true;
                overlapping_south_wall.south_wall_available = false;

            }else{
                item.south_wall_available = true;
                overlapping_south_wall.south_wall_available = false;
            }
        }


        return item;
    });


    DATA.blocks.objects = new_blocks_data
    update();
}

function set_mode_block(block_number){
    MODE = `block ${block_number}`;
    localStorage.setItem("MODE", MODE);

    // highlight button  and  unhighlight all others
    for(let img_btn of document.getElementsByTagName("img")){
        if(img_btn.id.startsWith("set_mode")){
            if(img_btn.id.endsWith(`block_${block_number}`)){
                //img_btn.className = "bg-success border border-success";
                img_btn.className = "";
                img_btn.style.border = "5px solid rgb(100, 200, 150)";
            }else{
                img_btn.className = "";
                img_btn.style.border = "none";
            }
        }
    }
    


    // open blocks object btns
    document.querySelector("#block_buttons_holder").getElementsByTagName("tbody")[0].style.display = "table-row-group";


    // close all others
    document.querySelector("#door_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#hvac_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#light_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#text_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    // document.querySelector("#internal_loads_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#window_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";


    // hide all editors
    hide_all_editors();


    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();
}

function set_mode_door(door_number){
    MODE = `door ${door_number}`;
    localStorage.setItem("MODE", MODE);


    // highlight button  and  unhighlight all others
    for(let img_btn of document.getElementsByTagName("img")){
        if(img_btn.id.startsWith("set_mode")){
            if(img_btn.id.endsWith(`door_${door_number}`)){
                img_btn.className = "";
                img_btn.style.border = "5px solid rgb(100, 200, 150)";
            }else{
                img_btn.className = "";
                img_btn.style.border = "none";
            }
        }
    }
    

    

    // open blocks object btns
    document.querySelector("#door_buttons_holder").getElementsByTagName("tbody")[0].style.display = "table-row-group";

    // close all others
    document.querySelector("#block_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#hvac_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    // document.querySelector("#internal_loads_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#light_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#text_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#window_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";



    // hide all editors
    hide_all_editors();


    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();
}

function set_mode_hvac(num){
    MODE = `hvac ${num}`;
    localStorage.setItem("MODE", MODE);



    // highlight button  and  unhighlight all others
    for(let img_btn of document.getElementsByTagName("img")){
        if(img_btn.id.startsWith("set_mode")){
            if(img_btn.id.endsWith(`hvac_${num}`)){
                img_btn.className = "";
                img_btn.style.border = "5px solid rgb(100, 200, 150)";

            }else{
                img_btn.className = "";
                img_btn.style.border = "none";
            }
        }
    }






    // open hvac object btns
    document.querySelector("#hvac_buttons_holder").getElementsByTagName("tbody")[0].style.display = "table-row-group";

    // close all others
    document.querySelector("#block_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#door_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#light_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#text_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#window_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";



    // hide all editors
    hide_all_editors();


    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();
}

function set_mode_light(light_number){
    MODE = `light ${light_number}`;
    localStorage.setItem("MODE", MODE);


    

    // highlight button  and  unhighlight all others
    for(let img_btn of document.getElementsByTagName("img")){
        if(img_btn.id.startsWith("set_mode")){
            if(img_btn.id.endsWith(`light_${light_number}`)){
                img_btn.className = "";
                img_btn.style.border = "5px solid rgb(100, 200, 150)";
            }else{
                img_btn.className = "";
                img_btn.style.border = "none";
            }
        }
    }


    // open lights object btns
    document.querySelector("#light_buttons_holder").getElementsByTagName("tbody")[0].style.display = "table-row-group";

    // close all others
    document.querySelector("#block_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#door_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#hvac_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    // document.querySelector("#internal_loads_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#text_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#window_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";

    // hide all editors
    hide_all_editors();

    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();
}

function set_mode_text(text_number){
    MODE = `text ${text_number}`;
    localStorage.setItem("MODE", MODE);


  // highlight button  and  unhighlight all others
    for(let img_btn of document.getElementsByTagName("img")){
        if(img_btn.id.startsWith("set_mode")){
            if(img_btn.id.endsWith(`text_${text_number}`)){
                img_btn.className = "";
                img_btn.style.border = "5px solid rgb(100, 200, 150)";
            }else{
                img_btn.className = "";
                img_btn.style.border = "none";
                
            }
        }
    }


    // open blocks object btns
    document.querySelector("#text_buttons_holder").getElementsByTagName("tbody")[0].style.display = "table-row-group";

    // close all others
    document.querySelector("#block_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#door_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#hvac_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    // document.querySelector("#internal_loads_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#light_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#window_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";

    // hide all editors
    hide_all_editors();

    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();
}

function set_mode_window(window_number){
    MODE = `window ${window_number}`;
    localStorage.setItem("MODE", MODE);

    // highlight button  and  unhighlight all others
    for(let img_btn of document.getElementsByTagName("img")){
        if(img_btn.id.startsWith("set_mode")){
            if(img_btn.id.endsWith(`window_${window_number}`)){
                img_btn.className = "";
                img_btn.style.border = "5px solid rgb(100, 200, 150)";

                // img_btn.style.opacity = 1;
            }else{
                img_btn.className = "";
                img_btn.style.border = "none";
            }
        }
    }


    // open blocks object btns
    document.querySelector("#window_buttons_holder").getElementsByTagName("tbody")[0].style.display = "table-row-group";

    // close all others
    document.querySelector("#block_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#door_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#hvac_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    // document.querySelector("#internal_loads_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#light_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    document.querySelector("#text_buttons_holder").getElementsByTagName("tbody")[0].style.display = "none";
    

    // hide all editors
    hide_all_editors();


    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();
}

function show_editor_block(block_data_id){
    let block = BLOCKS_CONTAINER.children.filter(item => item.id===block_data_id)[0];
    let block_data_index = DATA.blocks.objects.findIndex(item => item.id===block_data_id);

    
    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();


    // highlight block
    highlight_block(block_data_id);


    // hide other editors
    hide_all_editors();


    // open block editor
    let editor = document.getElementById("block_editor");
    editor.style.display = "block";


    // NAME
    editor.querySelector("#name").value = DATA.blocks.objects[block_data_index].name;
    editor.querySelector("#name").oninput = (ev)=>{
        DATA.blocks.objects[block_data_index].name = ev.target.value;
        block.object_btn.innerHTML = ev.target.value;
    }


    // VISIBLE
    editor.querySelector("#visible").checked = DATA.blocks.objects[block_data_index].visible;
    editor.querySelector("#visible").onchange = (ev)=>{
        DATA.blocks.objects[block_data_index].visible = ev.target.checked;
        block.visible = ev.target.checked;
    }


    // WALLS
    editor.querySelector("#east_wall").checked = DATA.blocks.objects[block_data_index].east_wall_available;
    editor.querySelector("#east_wall").onchange = (ev)=>{
        DATA.blocks.objects[block_data_index].east_wall_available = ev.target.checked;
        update();
        show_editor_block(block_data_id);
    }

    editor.querySelector("#west_wall").checked = DATA.blocks.objects[block_data_index].west_wall_available;
    editor.querySelector("#west_wall").onchange = (ev)=>{
        DATA.blocks.objects[block_data_index].west_wall_available = ev.target.checked;
        update();
        show_editor_block(block_data_id);
    }

    editor.querySelector("#north_wall").checked = DATA.blocks.objects[block_data_index].north_wall_available;
    editor.querySelector("#north_wall").onchange = (ev)=>{
        DATA.blocks.objects[block_data_index].north_wall_available = ev.target.checked;
        update();
        show_editor_block(block_data_id);
    }

    editor.querySelector("#south_wall").checked = DATA.blocks.objects[block_data_index].south_wall_available;
    editor.querySelector("#south_wall").onchange = (ev)=>{
        DATA.blocks.objects[block_data_index].south_wall_available = ev.target.checked;
        update();
        show_editor_block(block_data_id);
    }









    // GLOBAL FLOOR MATERIAL
    if(DATA.blocks.floor_material.layer_1 == null){
        editor.querySelector("#floor_layer_1").value = "";

        // set null to other material layers
        DATA.blocks.floor_material.layer_2 = null;
        DATA.blocks.floor_material.layer_3 = null;
        DATA.blocks.floor_material.layer_4 = null;
        DATA.blocks.floor_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#floor_layer_2").disabled = true;   editor.querySelector("#floor_layer_2").value="";
        editor.querySelector("#floor_layer_3").disabled = true;   editor.querySelector("#floor_layer_3").value="";
        editor.querySelector("#floor_layer_4").disabled = true;   editor.querySelector("#floor_layer_4").value="";
        editor.querySelector("#floor_layer_5").disabled = true;   editor.querySelector("#floor_layer_5").value="";
    }else{
        editor.querySelector("#floor_layer_1").value = DATA.blocks.floor_material.layer_1;

        // enable material 2 selector
        editor.querySelector("#floor_layer_2").disabled = false;
    }
    editor.querySelector("#floor_layer_1").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.floor_material.layer_1 = null;

            // set null to other material layers
            DATA.blocks.floor_material.layer_2 = null;
            DATA.blocks.floor_material.layer_3 = null;
            DATA.blocks.floor_material.layer_4 = null;
            DATA.blocks.floor_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#floor_layer_2").disabled = true;    editor.querySelector("#floor_layer_2").value="";
            editor.querySelector("#floor_layer_3").disabled = true;    editor.querySelector("#floor_layer_3").value="";
            editor.querySelector("#floor_layer_4").disabled = true;    editor.querySelector("#floor_layer_4").value="";
            editor.querySelector("#floor_layer_5").disabled = true;    editor.querySelector("#floor_layer_5").value="";

        }else{
            DATA.blocks.floor_material.layer_1 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#floor_layer_2").disabled = false;
        }

        update();
        highlight_block(block);
        show_editor_block(block_data_id);
    }


    if(DATA.blocks.floor_material.layer_2 == null){
        editor.querySelector("#floor_layer_2").value = "";

        // set null to other material layers
        DATA.blocks.floor_material.layer_3 = null;
        DATA.blocks.floor_material.layer_4 = null;
        DATA.blocks.floor_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#floor_layer_3").disabled = true;   editor.querySelector("#floor_layer_3").value="";
        editor.querySelector("#floor_layer_4").disabled = true;   editor.querySelector("#floor_layer_4").value="";
        editor.querySelector("#floor_layer_5").disabled = true;   editor.querySelector("#floor_layer_5").value="";
    }else{
        editor.querySelector("#floor_layer_2").value = DATA.blocks.floor_material.layer_2;

        // enable material 3 selector
        editor.querySelector("#floor_layer_3").disabled = false;
    }
    editor.querySelector("#floor_layer_2").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.floor_material.layer_2 = null;

            // set null to other material layers
            DATA.blocks.floor_material.layer_3 = null;
            DATA.blocks.floor_material.layer_4 = null;
            DATA.blocks.floor_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#floor_layer_3").disabled = true;    editor.querySelector("#floor_layer_3").value="";
            editor.querySelector("#floor_layer_4").disabled = true;    editor.querySelector("#floor_layer_4").value="";
            editor.querySelector("#floor_layer_5").disabled = true;    editor.querySelector("#floor_layer_5").value="";

        }else{
            DATA.blocks.floor_material.layer_2 = ev.target.value;

            // enable layer 3 material selector
            editor.querySelector("#floor_layer_3").disabled = false;
        }
    }


    if(DATA.blocks.floor_material.layer_3 == null){
        editor.querySelector("#floor_layer_3").value = "";

        // set null to other material layers
        DATA.blocks.floor_material.layer_4 = null;
        DATA.blocks.floor_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#floor_layer_4").disabled = true;   editor.querySelector("#floor_layer_4").value="";
        editor.querySelector("#floor_layer_5").disabled = true;   editor.querySelector("#floor_layer_5").value="";
    }else{
        editor.querySelector("#floor_layer_3").value = DATA.blocks.floor_material.layer_3;

        // enable material 4 selector
        editor.querySelector("#floor_layer_4").disabled = false;
    }
    editor.querySelector("#floor_layer_3").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.floor_material.layer_3 = null;

            // set null to other material layers
            DATA.blocks.floor_material.layer_4 = null;
            DATA.blocks.floor_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#floor_layer_4").disabled = true;    editor.querySelector("#floor_layer_4").value="";
            editor.querySelector("#floor_layer_5").disabled = true;    editor.querySelector("#floor_layer_5").value="";

        }else{
            DATA.blocks.floor_material.layer_3 = ev.target.value;

            // enable layer 4 material selector
            editor.querySelector("#floor_layer_4").disabled = false;
        }
    }


    if(DATA.blocks.floor_material.layer_4 == null){
        editor.querySelector("#floor_layer_4").value = "";

        // set null to other material layers
        DATA.blocks.floor_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#floor_layer_5").disabled = true;   editor.querySelector("#floor_layer_5").value="";
    }else{
        editor.querySelector("#floor_layer_4").value = DATA.blocks.floor_material.layer_4;

        // enable material 5 selector
        editor.querySelector("#floor_layer_5").disabled = false;
    }
    editor.querySelector("#floor_layer_4").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.floor_material.layer_4 = null;

            // set null to other material layers
            DATA.blocks.floor_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#floor_layer_5").disabled = true;    editor.querySelector("#floor_layer_5").value="";

        }else{
            DATA.blocks.floor_material.layer_4 = ev.target.value;

            // enable layer 5 material selector
            editor.querySelector("#floor_layer_5").disabled = false;
        }
    }


    if(DATA.blocks.floor_material.layer_5 == null){
        editor.querySelector("#floor_layer_5").value = "";

    }else{
        editor.querySelector("#floor_layer_5").value = DATA.blocks.floor_material.layer_5;

    }
    editor.querySelector("#floor_layer_5").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.floor_material.layer_5 = null;

        }else{
            DATA.blocks.floor_material.layer_5 = ev.target.value;

        }
    }


    






    // GLOBAL EXTERIOR WALLS MATERIAL
    if(DATA.blocks.exterior_walls_material.layer_1 == null){
        editor.querySelector("#exterior_wall_layer_1").value = "";

        // set null to other material layers
        DATA.blocks.exterior_walls_material.layer_2 = null;
        DATA.blocks.exterior_walls_material.layer_3 = null;
        DATA.blocks.exterior_walls_material.layer_4 = null;
        DATA.blocks.exterior_walls_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#exterior_wall_layer_2").disabled = true;   editor.querySelector("#exterior_wall_layer_2").value="";
        editor.querySelector("#exterior_wall_layer_3").disabled = true;   editor.querySelector("#exterior_wall_layer_3").value="";
        editor.querySelector("#exterior_wall_layer_4").disabled = true;   editor.querySelector("#exterior_wall_layer_4").value="";
        editor.querySelector("#exterior_wall_layer_5").disabled = true;   editor.querySelector("#exterior_wall_layer_5").value="";
    }else{
        editor.querySelector("#exterior_wall_layer_1").value = DATA.blocks.exterior_walls_material.layer_1;

        // enable material 2 selector
        editor.querySelector("#exterior_wall_layer_2").disabled = false;
    }
    editor.querySelector("#exterior_wall_layer_1").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.exterior_walls_material.layer_1 = null;

            // set null to other material layers
            DATA.blocks.exterior_walls_material.layer_2 = null;
            DATA.blocks.exterior_walls_material.layer_3 = null;
            DATA.blocks.exterior_walls_material.layer_4 = null;
            DATA.blocks.exterior_walls_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#exterior_wall_layer_2").disabled = true;    editor.querySelector("#exterior_wall_layer_2").value="";
            editor.querySelector("#exterior_wall_layer_3").disabled = true;    editor.querySelector("#exterior_wall_layer_3").value="";
            editor.querySelector("#exterior_wall_layer_4").disabled = true;    editor.querySelector("#exterior_wall_layer_4").value="";
            editor.querySelector("#exterior_wall_layer_5").disabled = true;    editor.querySelector("#exterior_wall_layer_5").value="";

        }else{
            DATA.blocks.exterior_walls_material.layer_1 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#exterior_wall_layer_2").disabled = false;
        }
    }


    if(DATA.blocks.exterior_walls_material.layer_2 == null){
        editor.querySelector("#exterior_wall_layer_2").value = "";

        // set null to other material layers
        DATA.blocks.exterior_walls_material.layer_3 = null;
        DATA.blocks.exterior_walls_material.layer_4 = null;
        DATA.blocks.exterior_walls_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#exterior_wall_layer_3").disabled = true;   editor.querySelector("#exterior_wall_layer_3").value="";
        editor.querySelector("#exterior_wall_layer_4").disabled = true;   editor.querySelector("#exterior_wall_layer_4").value="";
        editor.querySelector("#exterior_wall_layer_5").disabled = true;   editor.querySelector("#exterior_wall_layer_5").value="";
    }else{
        editor.querySelector("#exterior_wall_layer_2").value = DATA.blocks.exterior_walls_material.layer_2;

        // enable material 2 selector
        editor.querySelector("#exterior_wall_layer_3").disabled = false;
    }
    editor.querySelector("#exterior_wall_layer_2").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.exterior_walls_material.layer_2 = null;

            // set null to other material layers
            DATA.blocks.exterior_walls_material.layer_3 = null;
            DATA.blocks.exterior_walls_material.layer_4 = null;
            DATA.blocks.exterior_walls_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#exterior_wall_layer_3").disabled = true;    editor.querySelector("#exterior_wall_layer_3").value="";
            editor.querySelector("#exterior_wall_layer_4").disabled = true;    editor.querySelector("#exterior_wall_layer_4").value="";
            editor.querySelector("#exterior_wall_layer_5").disabled = true;    editor.querySelector("#exterior_wall_layer_5").value="";

        }else{
            DATA.blocks.exterior_walls_material.layer_2 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#exterior_wall_layer_3").disabled = false;
        }
    }


    if(DATA.blocks.exterior_walls_material.layer_3 == null){
        editor.querySelector("#exterior_wall_layer_3").value = "";

        // set null to other material layers
        DATA.blocks.exterior_walls_material.layer_4 = null;
        DATA.blocks.exterior_walls_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#exterior_wall_layer_4").disabled = true;   editor.querySelector("#exterior_wall_layer_4").value="";
        editor.querySelector("#exterior_wall_layer_5").disabled = true;   editor.querySelector("#exterior_wall_layer_5").value="";
    }else{
        editor.querySelector("#exterior_wall_layer_3").value = DATA.blocks.exterior_walls_material.layer_3;

        // enable material 2 selector
        editor.querySelector("#exterior_wall_layer_4").disabled = false;
    }
    editor.querySelector("#exterior_wall_layer_3").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.exterior_walls_material.layer_3 = null;

            // set null to other material layers
            DATA.blocks.exterior_walls_material.layer_4 = null;
            DATA.blocks.exterior_walls_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#exterior_wall_layer_4").disabled = true;    editor.querySelector("#exterior_wall_layer_4").value="";
            editor.querySelector("#exterior_wall_layer_5").disabled = true;    editor.querySelector("#exterior_wall_layer_5").value="";

        }else{
            DATA.blocks.exterior_walls_material.layer_3 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#exterior_wall_layer_4").disabled = false;
        }
    }


    if(DATA.blocks.exterior_walls_material.layer_4 == null){
        editor.querySelector("#exterior_wall_layer_4").value = "";

        // set null to other material layers
        DATA.blocks.exterior_walls_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#exterior_wall_layer_5").disabled = true;   editor.querySelector("#exterior_wall_layer_5").value="";
    }else{
        editor.querySelector("#exterior_wall_layer_4").value = DATA.blocks.exterior_walls_material.layer_4;

        // enable material 2 selector
        editor.querySelector("#exterior_wall_layer_5").disabled = false;
    }
    editor.querySelector("#exterior_wall_layer_4").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.exterior_walls_material.layer_4 = null;

            // set null to other material layers
            DATA.blocks.exterior_walls_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#exterior_wall_layer_5").disabled = true;    editor.querySelector("#exterior_wall_layer_5").value="";

        }else{
            DATA.blocks.exterior_walls_material.layer_4 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#exterior_wall_layer_5").disabled = false;
        }
    }


    if(DATA.blocks.exterior_walls_material.layer_5 == null){
        editor.querySelector("#exterior_wall_layer_5").value = "";

    }else{
        editor.querySelector("#exterior_wall_layer_5").value = DATA.blocks.exterior_walls_material.layer_5;

    }
    editor.querySelector("#exterior_wall_layer_5").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.exterior_walls_material.layer_5 = null;

        }else{
            DATA.blocks.exterior_walls_material.layer_5 = ev.target.value;
        }
    }









    // GLOBAL INTERIOR WALLS MATERIAL
    if(DATA.blocks.interior_walls_material.layer_1 == null){
        editor.querySelector("#interior_wall_layer_1").value = "";

        // set null to other material layers
        DATA.blocks.interior_walls_material.layer_2 = null;
        DATA.blocks.interior_walls_material.layer_3 = null;
        DATA.blocks.interior_walls_material.layer_4 = null;
        DATA.blocks.interior_walls_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#interior_wall_layer_2").disabled = true;   editor.querySelector("#interior_wall_layer_2").value="";
        editor.querySelector("#interior_wall_layer_3").disabled = true;   editor.querySelector("#interior_wall_layer_3").value="";
        editor.querySelector("#interior_wall_layer_4").disabled = true;   editor.querySelector("#interior_wall_layer_4").value="";
        editor.querySelector("#interior_wall_layer_5").disabled = true;   editor.querySelector("#interior_wall_layer_5").value="";
    }else{
        editor.querySelector("#interior_wall_layer_1").value = DATA.blocks.interior_walls_material.layer_1;

        // enable material 2 selector
        editor.querySelector("#interior_wall_layer_2").disabled = false;
    }
    editor.querySelector("#interior_wall_layer_1").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.interior_walls_material.layer_1 = null;

            // set null to other material layers
            DATA.blocks.interior_walls_material.layer_2 = null;
            DATA.blocks.interior_walls_material.layer_3 = null;
            DATA.blocks.interior_walls_material.layer_4 = null;
            DATA.blocks.interior_walls_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#interior_wall_layer_2").disabled = true;    editor.querySelector("#interior_wall_layer_2").value="";
            editor.querySelector("#interior_wall_layer_3").disabled = true;    editor.querySelector("#interior_wall_layer_3").value="";
            editor.querySelector("#interior_wall_layer_4").disabled = true;    editor.querySelector("#interior_wall_layer_4").value="";
            editor.querySelector("#interior_wall_layer_5").disabled = true;    editor.querySelector("#interior_wall_layer_5").value="";

        }else{
            DATA.blocks.interior_walls_material.layer_1 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#interior_wall_layer_2").disabled = false;
        }
    }


    if(DATA.blocks.interior_walls_material.layer_2 == null){
        editor.querySelector("#interior_wall_layer_2").value = "";

        // set null to other material layers
        DATA.blocks.interior_walls_material.layer_3 = null;
        DATA.blocks.interior_walls_material.layer_4 = null;
        DATA.blocks.interior_walls_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#interior_wall_layer_3").disabled = true;   editor.querySelector("#interior_wall_layer_3").value="";
        editor.querySelector("#interior_wall_layer_4").disabled = true;   editor.querySelector("#interior_wall_layer_4").value="";
        editor.querySelector("#interior_wall_layer_5").disabled = true;   editor.querySelector("#interior_wall_layer_5").value="";
    }else{
        editor.querySelector("#interior_wall_layer_2").value = DATA.blocks.interior_walls_material.layer_2;

        // enable material 2 selector
        editor.querySelector("#interior_wall_layer_3").disabled = false;
    }
    editor.querySelector("#interior_wall_layer_2").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.interior_walls_material.layer_2 = null;

            // set null to other material layers
            DATA.blocks.interior_walls_material.layer_3 = null;
            DATA.blocks.interior_walls_material.layer_4 = null;
            DATA.blocks.interior_walls_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#interior_wall_layer_3").disabled = true;    editor.querySelector("#interior_wall_layer_3").value="";
            editor.querySelector("#interior_wall_layer_4").disabled = true;    editor.querySelector("#interior_wall_layer_4").value="";
            editor.querySelector("#interior_wall_layer_5").disabled = true;    editor.querySelector("#interior_wall_layer_5").value="";

        }else{
            DATA.blocks.interior_walls_material.layer_2 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#interior_wall_layer_3").disabled = false;
        }
    }


    if(DATA.blocks.interior_walls_material.layer_3 == null){
        editor.querySelector("#interior_wall_layer_3").value = "";

        // set null to other material layers
        DATA.blocks.interior_walls_material.layer_4 = null;
        DATA.blocks.interior_walls_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#interior_wall_layer_4").disabled = true;   editor.querySelector("#interior_wall_layer_4").value="";
        editor.querySelector("#interior_wall_layer_5").disabled = true;   editor.querySelector("#interior_wall_layer_5").value="";
    }else{
        editor.querySelector("#interior_wall_layer_3").value = DATA.blocks.interior_walls_material.layer_3;

        // enable material 2 selector
        editor.querySelector("#interior_wall_layer_4").disabled = false;
    }
    editor.querySelector("#interior_wall_layer_3").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.interior_walls_material.layer_3 = null;

            // set null to other material layers
            DATA.blocks.interior_walls_material.layer_4 = null;
            DATA.blocks.interior_walls_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#interior_wall_layer_4").disabled = true;    editor.querySelector("#interior_wall_layer_4").value="";
            editor.querySelector("#interior_wall_layer_5").disabled = true;    editor.querySelector("#interior_wall_layer_5").value="";

        }else{
            DATA.blocks.interior_walls_material.layer_3 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#interior_wall_layer_4").disabled = false;
        }
    }


    if(DATA.blocks.interior_walls_material.layer_4 == null){
        editor.querySelector("#interior_wall_layer_4").value = "";

        // set null to other material layers
        DATA.blocks.interior_walls_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#interior_wall_layer_5").disabled = true;   editor.querySelector("#interior_wall_layer_5").value="";
    }else{
        editor.querySelector("#interior_wall_layer_4").value = DATA.blocks.interior_walls_material.layer_4;

        // enable material 2 selector
        editor.querySelector("#interior_wall_layer_5").disabled = false;
    }
    editor.querySelector("#interior_wall_layer_4").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.interior_walls_material.layer_4 = null;

            // set null to other material layers
            DATA.blocks.interior_walls_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#interior_wall_layer_5").disabled = true;    editor.querySelector("#interior_wall_layer_5").value="";

        }else{
            DATA.blocks.interior_walls_material.layer_4 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#interior_wall_layer_5").disabled = false;
        }
    }


    if(DATA.blocks.interior_walls_material.layer_5 == null){
        editor.querySelector("#interior_wall_layer_5").value = "";

    }else{
        editor.querySelector("#interior_wall_layer_5").value = DATA.blocks.interior_walls_material.layer_5;

    }
    editor.querySelector("#interior_wall_layer_5").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.interior_walls_material.layer_5 = null;

        }else{
            DATA.blocks.interior_walls_material.layer_5 = ev.target.value;
        }
    }
    





    


    if(DATA.blocks.floor_material.layer_5 == null){
        editor.querySelector("#floor_layer_5").value = "";
    }else{
        editor.querySelector("#floor_layer_5").value = DATA.blocks.floor_material.layer_5;
    }
    editor.querySelector("#floor_layer_5").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.floor_material.layer_5 = null;
        }else{
            DATA.blocks.floor_material.layer_5 = ev.target.value;
        }
    }












    // ROOF MATERIAL
    if(DATA.blocks.roof_material.layer_1 == null){
        editor.querySelector("#roof_layer_1").value = "";

        // set null to other material layers
        DATA.blocks.roof_material.layer_2 = null;
        DATA.blocks.roof_material.layer_3 = null;
        DATA.blocks.roof_material.layer_4 = null;
        DATA.blocks.roof_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#roof_layer_2").disabled = true;   editor.querySelector("#roof_layer_2").value="";
        editor.querySelector("#roof_layer_3").disabled = true;   editor.querySelector("#roof_layer_3").value="";
        editor.querySelector("#roof_layer_4").disabled = true;   editor.querySelector("#roof_layer_4").value="";
        editor.querySelector("#roof_layer_5").disabled = true;   editor.querySelector("#roof_layer_5").value="";
    }else{
        editor.querySelector("#roof_layer_1").value = DATA.blocks.roof_material.layer_1;

        // enable material 2 selector
        editor.querySelector("#roof_layer_2").disabled = false;
    }
    editor.querySelector("#roof_layer_1").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.roof_material.layer_1 = null;

            // set null to other material layers
            DATA.blocks.roof_material.layer_2 = null;
            DATA.blocks.roof_material.layer_3 = null;
            DATA.blocks.roof_material.layer_4 = null;
            DATA.blocks.roof_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#roof_layer_2").disabled = true;    editor.querySelector("#roof_layer_2").value="";
            editor.querySelector("#roof_layer_3").disabled = true;    editor.querySelector("#roof_layer_3").value="";
            editor.querySelector("#roof_layer_4").disabled = true;    editor.querySelector("#roof_layer_4").value="";
            editor.querySelector("#roof_layer_5").disabled = true;    editor.querySelector("#roof_layer_5").value="";

        }else{
            DATA.blocks.roof_material.layer_1 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#roof_layer_2").disabled = false;
        }
    }


    if(DATA.blocks.roof_material.layer_2 == null){
        editor.querySelector("#roof_layer_2").value = "";

        // set null to other material layers
        DATA.blocks.roof_material.layer_3 = null;
        DATA.blocks.roof_material.layer_4 = null;
        DATA.blocks.roof_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#roof_layer_3").disabled = true;   editor.querySelector("#roof_layer_3").value="";
        editor.querySelector("#roof_layer_4").disabled = true;   editor.querySelector("#roof_layer_4").value="";
        editor.querySelector("#roof_layer_5").disabled = true;   editor.querySelector("#roof_layer_5").value="";
    }else{
        editor.querySelector("#roof_layer_2").value = DATA.blocks.roof_material.layer_2;

        // enable material 3 selector
        editor.querySelector("#roof_layer_3").disabled = false;
    }
    editor.querySelector("#roof_layer_2").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.roof_material.layer_2 = null;

            // set null to other material layers
            DATA.blocks.roof_material.layer_3 = null;
            DATA.blocks.roof_material.layer_4 = null;
            DATA.blocks.roof_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#roof_layer_3").disabled = true;    editor.querySelector("#roof_layer_3").value="";
            editor.querySelector("#roof_layer_4").disabled = true;    editor.querySelector("#roof_layer_4").value="";
            editor.querySelector("#roof_layer_5").disabled = true;    editor.querySelector("#roof_layer_5").value="";

        }else{
            DATA.blocks.roof_material.layer_2 = ev.target.value;

            // enable layer 3 material selector
            editor.querySelector("#roof_layer_3").disabled = false;
        }
    }


    if(DATA.blocks.roof_material.layer_3 == null){
        editor.querySelector("#roof_layer_3").value = "";

        // set null to other material layers
        DATA.blocks.roof_material.layer_4 = null;
        DATA.blocks.roof_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#roof_layer_4").disabled = true;   editor.querySelector("#roof_layer_4").value="";
        editor.querySelector("#roof_layer_5").disabled = true;   editor.querySelector("#roof_layer_5").value="";
    }else{
        editor.querySelector("#roof_layer_3").value = DATA.blocks.roof_material.layer_3;

        // enable material 4 selector
        editor.querySelector("#roof_layer_4").disabled = false;
    }
    editor.querySelector("#roof_layer_3").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.roof_material.layer_3 = null;

            // set null to other material layers
            DATA.blocks.roof_material.layer_4 = null;
            DATA.blocks.roof_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#roof_layer_4").disabled = true;    editor.querySelector("#roof_layer_4").value="";
            editor.querySelector("#roof_layer_5").disabled = true;    editor.querySelector("#roof_layer_5").value="";

        }else{
            DATA.blocks.roof_material.layer_3 = ev.target.value;

            // enable layer 4 material selector
            editor.querySelector("#roof_layer_4").disabled = false;
        }
    }


    if(DATA.blocks.roof_material.layer_4 == null){
        editor.querySelector("#roof_layer_4").value = "";

        // set null to other material layers
        DATA.blocks.roof_material.layer_5 = null;

        // disable other material selectors
        editor.querySelector("#roof_layer_5").disabled = true;   editor.querySelector("#roof_layer_5").value="";
    }else{
        editor.querySelector("#roof_layer_4").value = DATA.blocks.roof_material.layer_4;

        // enable material 5 selector
        editor.querySelector("#roof_layer_5").disabled = false;
    }
    editor.querySelector("#roof_layer_4").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.roof_material.layer_4 = null;

            // set null to other material layers
            DATA.blocks.roof_material.layer_5 = null;

            // disable other material selectors
            editor.querySelector("#roof_layer_5").disabled = true;    editor.querySelector("#roof_layer_5").value="";

        }else{
            DATA.blocks.roof_material.layer_4 = ev.target.value;

            // enable layer 5 material selector
            editor.querySelector("#roof_layer_5").disabled = false;
        }
    }


    if(DATA.blocks.roof_material.layer_5 == null){
        editor.querySelector("#roof_layer_5").value = "";
    }else{
        editor.querySelector("#roof_layer_5").value = DATA.blocks.roof_material.layer_5;
    }
    editor.querySelector("#roof_layer_5").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.blocks.roof_material.layer_5 = null;
        }else{
            DATA.blocks.roof_material.layer_5 = ev.target.value;
        }
    }














    




    



    // DELETE BUTTON
    editor.querySelector("#delete_block_btn").onclick = (ev)=>{
        // DELETE WINDOWS ON THIS BLOCK
        let new_windows_data = DATA.windows.filter(item => item.block.block_id!==block_data_id);
        DATA.windows = new_windows_data;
        
        
        // DELETE DOORS ON THIS BLOCK
        let new_doors_data = DATA.doors.filter(item => item.block.block_id!==block_data_id);
        DATA.doors = new_doors_data;





        // delete block_data
        DATA.blocks.objects = DATA.blocks.objects.filter(item => item.id !== block_data_id);


        // DELETE OBJECT BTN
        block.object_btn.parentNode.remove();


        // delete block graphic object
        BLOCKS_CONTAINER.removeChild(block);

        
        // close editor
        hide_all_editors();


        // update graphics object
        update();
    }




}

function show_editor_door(door_data_id){
    let door = DOORS_CONTAINER.children.filter(item => item.id===door_data_id)[0];
    let door_data_index = DATA.doors.findIndex(item => item.id===door_data_id);
    

    
    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();


    // highlight window
    highlight_door(door_data_id);


    // hide other editors
    hide_all_editors();


    // open block editor
    let editor = document.getElementById("door_editor");
    editor.style.display = "block";


    // NAME
    editor.querySelector("#name").value = DATA.doors[door_data_index].name;
    editor.querySelector("#name").oninput = (ev)=>{
        DATA.doors[door_data_index].name = ev.target.value;
        door.object_btn.innerHTML = ev.target.value;
    }


    // VISIBLE
    editor.querySelector("#visible").checked = DATA.doors[door_data_index].visible;
    editor.querySelector("#visible").onchange = (ev)=>{
        DATA.doors[door_data_index].visible = ev.target.checked;
        door.visible = ev.target.checked;
    }



    // MATERIAL
    if(DATA.doors[door_data_index].layer_1 == null){
        editor.querySelector("#layer_1").value = "";

        // set null to other material layers
        DATA.doors[door_data_index].layer_2 = null;
        DATA.doors[door_data_index].layer_3 = null;
        DATA.doors[door_data_index].layer_4 = null;
        DATA.doors[door_data_index].layer_5 = null;

        // disable other material selectors
        editor.querySelector("#layer_2").disabled = true;   editor.querySelector("#layer_2").value="";
        editor.querySelector("#layer_3").disabled = true;   editor.querySelector("#layer_3").value="";
        editor.querySelector("#layer_4").disabled = true;   editor.querySelector("#layer_4").value="";
        editor.querySelector("#layer_5").disabled = true;   editor.querySelector("#layer_5").value="";
    }else{
        editor.querySelector("#layer_1").value = DATA.doors[door_data_index].layer_1;

        // enable material 2 selector
        editor.querySelector("#layer_2").disabled = false;
    }
    editor.querySelector("#layer_1").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.doors[door_data_index].layer_1 = null;

            // set null to other material layers
            DATA.doors[door_data_index].layer_2 = null;
            DATA.doors[door_data_index].layer_3 = null;
            DATA.doors[door_data_index].layer_4 = null;
            DATA.doors[door_data_index].layer_5 = null;

            // disable other material selectors
            editor.querySelector("#layer_2").disabled = true;    editor.querySelector("#layer_2").value="";
            editor.querySelector("#layer_3").disabled = true;    editor.querySelector("#layer_3").value="";
            editor.querySelector("#layer_4").disabled = true;    editor.querySelector("#layer_4").value="";
            editor.querySelector("#layer_5").disabled = true;    editor.querySelector("#layer_5").value="";

        }else{
            DATA.doors[door_data_index].layer_1 = ev.target.value;

            // enable layer 2 material selector
            editor.querySelector("#layer_2").disabled = false;
        }
    }


    if(DATA.doors[door_data_index].layer_2 == null){
        editor.querySelector("#layer_2").value = "";

        // set null to other material layers
        DATA.doors[door_data_index].layer_3 = null;
        DATA.doors[door_data_index].layer_4 = null;
        DATA.doors[door_data_index].layer_5 = null;

        // disable other material selectors
        editor.querySelector("#layer_3").disabled = true;   editor.querySelector("#layer_3").value="";
        editor.querySelector("#layer_4").disabled = true;   editor.querySelector("#layer_4").value="";
        editor.querySelector("#layer_5").disabled = true;   editor.querySelector("#layer_5").value="";
    }else{
        editor.querySelector("#layer_2").value = DATA.doors[door_data_index].layer_2;

        // enable material 3 selector
        editor.querySelector("#layer_3").disabled = false;
    }
    editor.querySelector("#layer_2").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.doors[door_data_index].layer_2 = null;

            // set null to other material layers
            DATA.doors[door_data_index].layer_3 = null;
            DATA.doors[door_data_index].layer_4 = null;
            DATA.doors[door_data_index].layer_5 = null;

            // disable other material selectors
            editor.querySelector("#layer_3").disabled = true;    editor.querySelector("#layer_3").value="";
            editor.querySelector("#layer_4").disabled = true;    editor.querySelector("#layer_4").value="";
            editor.querySelector("#layer_5").disabled = true;    editor.querySelector("#layer_5").value="";

        }else{
            DATA.doors[door_data_index].layer_2 = ev.target.value;

            // enable layer 3 material selector
            editor.querySelector("#layer_3").disabled = false;
        }
    }


    if(DATA.doors[door_data_index].layer_3 == null){
        editor.querySelector("#layer_3").value = "";

        // set null to other material layers
        DATA.doors[door_data_index].layer_4 = null;
        DATA.doors[door_data_index].layer_5 = null;

        // disable other material selectors
        editor.querySelector("#layer_4").disabled = true;   editor.querySelector("#layer_4").value="";
        editor.querySelector("#layer_5").disabled = true;   editor.querySelector("#layer_5").value="";
    }else{
        editor.querySelector("#layer_3").value = DATA.doors[door_data_index].layer_3;

        // enable material 4 selector
        editor.querySelector("#layer_4").disabled = false;
    }
    editor.querySelector("#layer_3").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.doors[door_data_index].layer_3 = null;

            // set null to other material layers
            DATA.doors[door_data_index].layer_4 = null;
            DATA.doors[door_data_index].layer_5 = null;

            // disable other material selectors
            editor.querySelector("#layer_4").disabled = true;    editor.querySelector("#layer_4").value="";
            editor.querySelector("#layer_5").disabled = true;    editor.querySelector("#layer_5").value="";

        }else{
            DATA.doors[door_data_index].layer_3 = ev.target.value;

            // enable layer 4 material selector
            editor.querySelector("#layer_4").disabled = false;
        }
    }


    if(DATA.doors[door_data_index].layer_4 == null){
        editor.querySelector("#layer_4").value = "";

        // set null to other material layers
        DATA.doors[door_data_index].layer_5 = null;

        // disable other material selectors
        editor.querySelector("#layer_5").disabled = true;   editor.querySelector("#layer_5").value="";
    }else{
        editor.querySelector("#layer_4").value = DATA.doors[door_data_index].layer_4;

        // enable material 5 selector
        editor.querySelector("#layer_5").disabled = false;
    }
    editor.querySelector("#layer_4").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.doors[door_data_index].layer_4 = null;

            // set null to other material layers
            DATA.doors[door_data_index].layer_5 = null;

            // disable other material selectors
            editor.querySelector("#layer_5").disabled = true;    editor.querySelector("#layer_5").value="";

        }else{
            DATA.doors[door_data_index].layer_4 = ev.target.value;

            // enable layer 5 material selector
            editor.querySelector("#layer_5").disabled = false;
        }
    }


    if(DATA.doors[door_data_index].layer_5 == null){
        editor.querySelector("#layer_5").value = "";
    }else{
        editor.querySelector("#layer_5").value = DATA.doors[door_data_index].layer_5;
    }
    editor.querySelector("#layer_5").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.doors[door_data_index].layer_5 = null;
        }else{
            DATA.doors[door_data_index].layer_5 = ev.target.value;
        }
    }






    


    



    // DELETE BUTTON
    editor.querySelector("#delete_door_btn").onclick = (ev)=>{
        // delete wall_data
        DATA.doors = DATA.doors.filter(item => item.id !== door_data_id);

        // delete door graphic object
        DOORS_CONTAINER.removeChild(door);

        // DELETE OBJECT BTN
        door.object_btn.parentNode.remove();
        
        // close editor
        hide_all_editors();
    }


}

function show_editor_hvac(hvac_data_id){
    let hvac = HVACS_CONTAINER.children.filter(item => item.id === hvac_data_id)[0];

    
    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();


    // highlight light
    highlight_hvac(hvac_data_id);


    // hide other editors
    hide_all_editors();


    // open hvac editor
    let editor = document.getElementById("hvac_editor");
    editor.style.display = "block";


    // NAME
    editor.querySelector("#name").value = DATA.hvacs.filter(item => item.id === hvac_data_id)[0].name;
    editor.querySelector("#name").oninput = (ev)=>{
        DATA.hvacs[DATA.hvacs.findIndex(item => item.id===hvac_data_id)].name = ev.target.value;
        hvac.object_btn.innerHTML = ev.target.value;
    }


    // VISIBLE
    editor.querySelector("#visible").checked = DATA.hvacs.filter(item => item.id === hvac_data_id)[0].visible;
    editor.querySelector("#visible").onchange = (ev)=>{
        DATA.hvacs[DATA.hvacs.findIndex(item => item.id===hvac_data_id)].visible = ev.target.checked;
        hvac.visible = ev.target.checked;
    }



    


    // DELETE BUTTON
    editor.querySelector("#delete_btn").onclick = (ev)=>{
        // delete text_data
        DATA.hvacs = DATA.hvacs.filter(item => item.id !== hvac_data_id);

        // delete block graphic object
        HVACS_CONTAINER.removeChild(hvac);
        
        // DELETE OBJECT BTN'
        hvac.object_btn.parentNode.remove();

        // close editor
        hide_all_editors();
    }
}

function show_editor_light(light_data_id){
    let light = LIGHTS_CONTAINER.children.filter(item => item.id === light_data_id)[0];

    
    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();


    // highlight light
    highlight_light(light_data_id);


    // hide other editors
    hide_all_editors();


    // open ligh editor
    let editor = document.getElementById("light_editor");
    editor.style.display = "block";


    // NAME
    editor.querySelector("#name").value = DATA.lights.filter(item => item.id === light_data_id)[0].name;
    editor.querySelector("#name").oninput = (ev)=>{
        DATA.lights[DATA.lights.findIndex(item => item.id===light_data_id)].name = ev.target.value;
        light.object_btn.innerHTML = ev.target.value;
    }


    // VISIBLE
    editor.querySelector("#visible").checked = DATA.lights.filter(item => item.id === light_data_id)[0].visible;
    editor.querySelector("#visible").onchange = (ev)=>{
        DATA.lights[DATA.lights.findIndex(item => item.id===light_data_id)].visible = ev.target.checked;
        light.visible = ev.target.checked;
    }



    // WATTS
    editor.querySelector("#watts").value = DATA.lights.filter(item => item.id === light_data_id)[0].watts;
    editor.querySelector("#watts").oninput = (ev)=>{
        DATA.lights[DATA.lights.findIndex(item => item.id===light_data_id)].watts = ev.target.value;
    }




    // SCHEDULE
    editor.querySelector("#on_time").value = DATA.lights.filter(item => item.id === light_data_id)[0].schedule.on_time;
    editor.querySelector("#on_time").oninput = (ev)=>{
        DATA.lights.filter(item => item.id === light_data_id)[0].schedule.on_time = ev.target.value;
    }

    editor.querySelector("#off_time").value = DATA.lights.filter(item => item.id === light_data_id)[0].schedule.off_time;
    editor.querySelector("#off_time").oninput = (ev)=>{
        DATA.lights.filter(item => item.id === light_data_id)[0].schedule.off_time = ev.target.value;
    }

    


    // DELETE BUTTON
    editor.querySelector("#delete_btn").onclick = (ev)=>{
        // delete text_data
        DATA.lights = DATA.lights.filter(item => item.id !== light_data_id);

        // delete block graphic object
        LIGHTS_CONTAINER.removeChild(light);
        
        // DELETE OBJECT BTN'
        // light.object_btn.remove();
        light.object_btn.parentNode.remove();

        // close editor
        hide_all_editors();
    }
}

function show_editor_text(text_data_id){
    let text = TEXTS_CONTAINER.children.filter(item => item.id === text_data_id)[0];

    
    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();


    // highlight block
    highlight_text(text_data_id);


    // hide other editors
    hide_all_editors();


    // open block editor
    let editor = document.getElementById("text_editor");
    editor.style.display = "block";


    // TEXT
    editor.querySelector("#text").value = DATA.texts.filter(item => item.id === text_data_id)[0].text;
    editor.querySelector("#text").oninput = (ev)=>{
        DATA.texts[DATA.texts.findIndex(item => item.id===text_data_id)].text = ev.target.value;
        text.text = ev.target.value;
        text.object_btn.innerHTML = ev.target.value;
    }


    // VISIBLE
    editor.querySelector("#visible").checked = DATA.texts.filter(item => item.id === text_data_id)[0].visible;
    editor.querySelector("#visible").onchange = (ev)=>{
        DATA.texts[DATA.texts.findIndex(item => item.id===text_data_id)].visible = ev.target.checked;
        text.visible = ev.target.checked;
    }


    // DELETE BUTTON
    editor.querySelector("#delete_text_btn").onclick = (ev)=>{
        // delete text_data
        DATA.texts = DATA.texts.filter(item => item.id !== text_data_id);

        // delete block graphic object
        TEXTS_CONTAINER.removeChild(text);
        
        // DELETE OBJECT BTN'
        //text.object_btn.remove();
        text.object_btn.parentNode.remove();

        // close editor
        hide_all_editors();
    }
}

function show_editor_window(window_data_id){
    let _window = WINDOWS_CONTAINER.children.filter(item => item.id===window_data_id)[0];
    let window_data_index = DATA.windows.findIndex(item => item.id===window_data_id);
    
    
    // unhighlight all other graphics objects
    unhighlight_all_graphics_objects();


    // highlight window
    highlight_window(window_data_id);


    // hide other editors
    hide_all_editors();


    // open block editor
    let editor = document.getElementById("window_editor");
    editor.style.display = "block";


    // NAME
    editor.querySelector("#name").value = DATA.windows[window_data_index].name;
    editor.querySelector("#name").oninput = (ev)=>{
        DATA.windows[window_data_index].name = ev.target.value;
        _window.object_btn.innerHTML = ev.target.value;
    }


    // VISIBLE
    editor.querySelector("#visible").checked = DATA.windows[window_data_index].visible;
    editor.querySelector("#visible").onchange = (ev)=>{
        DATA.windows[window_data_index].visible = ev.target.checked;
        _window.visible = ev.target.checked;
    }


   

    // MATERIAL
    if(DATA.windows[window_data_index].layer_1 == null){
        editor.querySelector("#layer_1").value = "";

    }else{
        editor.querySelector("#layer_1").value = DATA.windows[window_data_index].layer_1;

    }
    editor.querySelector("#layer_1").onchange = (ev)=>{
        if(ev.target.value == ""){
            DATA.windows[window_data_index].layer_1 = null;

        }else{
            DATA.windows[window_data_index].layer_1 = ev.target.value;
        }
    }





    


    



    // DELETE BUTTON
    editor.querySelector("#delete_window_btn").onclick = (ev)=>{
        // delete wall_data
        DATA.windows = DATA.windows.filter(item => item.id !== window_data_id);

        // delete block graphic object
        WINDOWS_CONTAINER.removeChild(_window);

        // DELETE OBJECT BTN
        //_window.object_btn.remove();
        _window.object_btn.parentNode.remove();
        
        // close editor
        hide_all_editors();
    }


}

function show_toast_info(msg){
    TOAST.className = "alert alert-primary";
    TOAST.innerHTML = msg;
    TOAST.style.display = "block";
    TOAST.style.opacity = 1.0;

    setTimeout(() => {
        let interval = setInterval(() => {
            TOAST.style.opacity -= 0.05;
            if(TOAST.style.opacity <= 0){
                TOAST.style.display = "none";
                clearInterval(interval);
            }
        }, 100);
    }, 3000);
}

function show_toast_error(msg){
    TOAST.className = "alert alert-danger";
    TOAST.innerHTML = msg;
    TOAST.style.display = "block";
    TOAST.style.opacity = 1.0;

    setTimeout(() => {
        let interval = setInterval(() => {
            TOAST.style.opacity -= 0.05;
            if(TOAST.style.opacity <= 0){
                TOAST.style.display = "none";
                clearInterval(interval);
            }
        }, 100);
    }, 3000);
}

function show_toast_success(msg){
    TOAST.className = "alert alert-success";
    TOAST.innerHTML = msg;
    TOAST.style.display = "block";
    TOAST.style.opacity = 1.0;

    setTimeout(() => {
        let interval = setInterval(() => {
            TOAST.style.opacity -= 0.05;
            if(TOAST.style.opacity <= 0){
                TOAST.style.display = "none";
                clearInterval(interval);
            }
        }, 100);
    }, 3000);
}

function show_toast_warning(msg){
    TOAST.className = "alert alert-warning";
    TOAST.innerHTML = msg;
    TOAST.style.display = "block";
    TOAST.style.opacity = 1.0;

    setTimeout(() => {
        let interval = setInterval(() => {
            TOAST.style.opacity -= 0.05;
            if(TOAST.style.opacity <= 0){
                TOAST.style.display = "none";
                clearInterval(interval);
            }
        }, 100);
    }, 3000);
}

function unhighlight_all_blocks(){
    for(let block of BLOCKS_CONTAINER.children){
        block.filters = null;
    }
}

function unhighlight_all_doors(){
    for(let door of DOORS_CONTAINER.children){
        door.filters = null;
    }
}

function unhighlight_all_hvacs(){
    for(let hvac of HVACS_CONTAINER.children){
        hvac.filters = null;
    }
}

function unhighlight_all_lights(){
    for(let light of LIGHTS_CONTAINER.children){
        light.filters = null;
    }
}

function unhighlight_all_texts(){
    for(let text of TEXTS_CONTAINER.children){
        text.filters = null;
    }
}

function unhighlight_all_windows(){
    for(let _window of WINDOWS_CONTAINER.children){
        _window.filters = null;
    }
}

function unhighlight_all_graphics_objects(){
    unhighlight_all_blocks();
    unhighlight_all_doors();
    unhighlight_all_hvacs();
    unhighlight_all_lights();
    unhighlight_all_texts();
    unhighlight_all_windows();
}

function update(){
    // CLEAR GRAPHICS OBJECTS
    BLOCKS_CONTAINER.removeChildren();
    DOORS_CONTAINER.removeChildren();
    FLOOR_CONTAINER.removeChildren();
    HVACS_CONTAINER.removeChildren();
    LIGHTS_CONTAINER.removeChildren();
    ROOF_CONTAINER.removeChildren();
    TEXTS_CONTAINER.removeChildren();
    WINDOWS_CONTAINER.removeChildren();





    // CLEAR OBJECT BUTTONS
    document.getElementById("block_buttons_holder").getElementsByTagName("tbody")[0].innerHTML="";
    document.getElementById("door_buttons_holder").getElementsByTagName("tbody")[0].innerHTML="";
    document.getElementById("hvac_buttons_holder").getElementsByTagName("tbody")[0].innerHTML="";
    // document.getElementById("internal_loads_holder").getElementsByTagName("tbody")[0].innerHTML="";
    document.getElementById("light_buttons_holder").getElementsByTagName("tbody")[0].innerHTML="";
    document.getElementById("text_buttons_holder").getElementsByTagName("tbody")[0].innerHTML="";
    document.getElementById("window_buttons_holder").getElementsByTagName("tbody")[0].innerHTML="";




    // hide all editors
    hide_all_editors();




    // BLOCKS
    for(let i=0; i < DATA.blocks.objects.length; i++){
        let block_data = DATA.blocks.objects[i];

        let block = new PIXI.Graphics();
        BLOCKS_CONTAINER.addChild(block);
        block.id = block_data.id;
        block.visible = block_data.visible;


        // walls
        if(block_data.east_wall_available == true){
            block.moveTo(block_data.top_right.x*values.UNIT, block_data.top_right.y*values.UNIT).lineTo(block_data.bottom_right.x*values.UNIT, block_data.bottom_right.y*values.UNIT);
        }
        if(block_data.west_wall_available){
            block.moveTo(block_data.top_left.x*values.UNIT, block_data.top_left.y*values.UNIT).lineTo(block_data.bottom_left.x*values.UNIT, block_data.bottom_left.y*values.UNIT);
        }
        if(block_data.north_wall_available){
            block.moveTo(block_data.top_left.x*values.UNIT, block_data.top_left.y*values.UNIT).lineTo(block_data.top_right.x*values.UNIT, block_data.top_right.y*values.UNIT);
        }
        if(block_data.south_wall_available){
            block.moveTo(block_data.bottom_left.x*values.UNIT, block_data.bottom_left.y*values.UNIT).lineTo(block_data.bottom_right.x*values.UNIT, block_data.bottom_right.y*values.UNIT);
        }
        block.stroke({color:"#30465C", width:BLOCK_THICKNESS});





        // floor
        let floor = new PIXI.Graphics();
        FLOOR_CONTAINER.addChild(floor);
        floor.id = block_data.id;
        floor.rect(
            block_data['top_left']['x'] * values.UNIT,
            block_data['top_left']['y'] * values.UNIT,
            (block_data['top_right']['x'] - block_data['top_left']['x']) * values.UNIT,
            (block_data['bottom_left']['y'] - block_data['top_left']['y']) * values.UNIT
        );
        /*if(block_data.floor.layer_1 == null){
            floor.fill( "#D9D9D9")

        }else if(block_data.floor.layer_1 == "Ceramic Tiles"){
            floor.fill({ texture:ceramic_tiles_texture});
        
        }else if(block_data.floor.layer_1 == "Granite"){
            floor.fill({ texture:granite_texture});

        }else if(block_data.floor.layer_1 == "Hardwood"){
            floor.fill({ texture:hardwood_texture});
        
        }else if(block_data.floor.layer_1 == "Marble"){
            floor.fill({ texture:marble_texture});
        
        }else if(block_data.floor.layer_1 == "Polished Concrete"){
            floor.fill({ texture: polished_concrete_texture });
        
        }else if(block_data.floor.layer_1 == "Porcelain Tiles"){
            floor.fill({ texture: porcelain_tiles_texture });
        
        }else if(block_data.floor.layer_1 == "PVC/Vinyl Tiles"){
            floor.fill({ texture: pvc_tiles_texture });
        
        }else{
            floor.fill( "#D9D9D9")

        }*/



















        // roof






        // block btn
        let block_btn = document.createElement("tr");
        document.getElementById("block_buttons_holder").getElementsByTagName("tbody")[0].appendChild(block_btn);
        block_btn.style.cursor = "pointer";


        let block_empty_td = document.createElement("td");
        block_empty_td.className = "m-0 p-0";
        block_btn.appendChild(block_empty_td);


        let block_btn_td = document.createElement("td");
        block_btn.appendChild(block_btn_td);
        block_btn_td.className = "m-0 p-0";
        block_btn_td.innerHTML = block_data.name;

        // store block btn in graphics object
        block.object_btn = block_btn_td;



        block_btn.onclick = (ev)=>{
            show_editor_block(block_data.id);
        }
        
    }

   



































    // DOORS
    for(let door_data of DATA.doors){
        let door = new PIXI.Graphics();
        DOORS_CONTAINER.addChild(door);
        door.id = door_data.id;
        door.visible = door_data.visible;


        if(door_data.type == "door 1"){
            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo((door_data.x+2)*values.UNIT, door_data.y*values.UNIT);
            door.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo(door_data.x*values.UNIT, (door_data.y-2)*values.UNIT);
            door.stroke({color:"#7e3707", width:5});
            door.arc(door_data.x*values.UNIT, door_data.y*values.UNIT, 2*values.UNIT, Math.PI*1.5, 0);
            door.stroke({color:"#000000", width:1})
        
        }else if(door_data.type == "door 2"){
            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo((door_data.x+2)*values.UNIT, door_data.y*values.UNIT);
            door.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo(door_data.x*values.UNIT, (door_data.y+2)*values.UNIT);
            door.stroke({color:"#7e3707", width:5});
            door.arc(door_data.x*values.UNIT, door_data.y*values.UNIT, 2*values.UNIT, Math.PI/2 ,0, true);
            door.stroke({color:"#000000", pixelLine:true});

        }else if(door_data.type == "door 3"){
            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo((door_data.x-2)*values.UNIT, door_data.y*values.UNIT);
            door.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo(door_data.x*values.UNIT, (door_data.y-2)*values.UNIT);
            door.stroke({color:"#7e3707", width:5});
            door.arc(door_data.x*values.UNIT, door_data.y*values.UNIT, 2*values.UNIT, Math.PI*1.5, Math.PI, true);
            door.stroke({color:"#000000", pixelLine:true})

        }else if(door_data.type == "door 4"){
            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo((door_data.x-2)*values.UNIT, door_data.y*values.UNIT);
            door.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo(door_data.x*values.UNIT, (door_data.y+2)*values.UNIT);
            door.stroke({color:"#7e3707", width:5});
            door.arc(door_data.x*values.UNIT, door_data.y*values.UNIT, 2*values.UNIT, Math.PI/2, Math.PI);
            door.stroke({color:"#000000", pixelLine:true});
        }else if(door_data.type == "door 5"){
            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo(door_data.x*values.UNIT, (door_data.y-2)*values.UNIT);
            door.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo((door_data.x+2)*values.UNIT, door_data.y*values.UNIT);
            door.stroke({color:"#7e3707", width:5});
            door.arc(door_data.x*values.UNIT, door_data.y*values.UNIT, 2*values.UNIT, 0, Math.PI*1.5, true);
            door.stroke({color:"#000000", pixelLine:true});

        }else if(door_data.type == "door 6"){        
            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo(door_data.x*values.UNIT, (door_data.y-2)*values.UNIT);
            door.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo((door_data.x-2)*values.UNIT, door_data.y*values.UNIT);
            door.stroke({color:"#7e3707", width:5});
            door.arc(door_data.x*values.UNIT, door_data.y*values.UNIT, 2*values.UNIT, Math.PI, Math.PI*1.5);
            door.stroke({color:"#000000", width:1})
        
        }else if(door_data.type == "door 7"){
            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo(door_data.x*values.UNIT, (door_data.y+2)*values.UNIT);
            door.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo((door_data.x-2)*values.UNIT, door_data.y*values.UNIT);
            door.stroke({color:"#7e3707", width:5});
            door.arc(door_data.x*values.UNIT, door_data.y*values.UNIT, 2*values.UNIT, Math.PI, Math.PI/2, true);
            door.stroke({color:"#000000", width:1})
        
        }else if(door_data.type == "door 8"){
            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo(door_data.x*values.UNIT, (door_data.y+2)*values.UNIT);
            door.stroke({color:"#ffffff", width:BLOCK_THICKNESS});

            door.moveTo(door_data.x*values.UNIT, door_data.y*values.UNIT);
            door.lineTo((door_data.x+2)*values.UNIT, door_data.y*values.UNIT);
            door.stroke({color:"#7e3707", width:5});
            door.arc(door_data.x*values.UNIT, door_data.y*values.UNIT, 2*values.UNIT, 0, Math.PI/2);
            door.stroke({color:"#000000", pixelLine:true});
    
        }

        
        




        // door object btn
        let door_btn = document.createElement("tr");
        document.getElementById("door_buttons_holder").getElementsByTagName("tbody")[0].appendChild(door_btn);
        door_btn.style.cursor = "pointer";
        door_btn.style.height = "20px";

        let door_empty_td = document.createElement("td");
        door_empty_td.className = "m-0 p-0";
        //door_empty_td.style.height = "50px";
        door_btn.appendChild(door_empty_td);

        let door_btn_td = document.createElement("td");
        door_btn.appendChild(door_btn_td);
        door_btn_td.className = "m-0 p-0";
        //door_btn_td.style.height = "50px";
        door_btn_td.innerHTML = door_data.name;

        // store door button inside door graphics object
        door.object_btn = door_btn_td;

        door_btn.onclick = (ev)=>{
            show_editor_door(door_data.id);
        }
    }





















    // HVAC
    for(let hvac_data of DATA.hvacs){
        let hvac = new PIXI.Graphics();
        HVACS_CONTAINER.addChild(hvac);

        hvac.rect((hvac_data.x-1)*values.UNIT, (hvac_data.y-1)*values.UNIT, 2*values.UNIT, 2*values.UNIT);
        hvac.circle(hvac_data.x*values.UNIT , hvac_data.y*values.UNIT, 10);
        hvac.moveTo((hvac_data.x-1) * values.UNIT, (hvac_data.y-1)*values.UNIT);
        hvac.lineTo((hvac_data.x+1) * values.UNIT, (hvac_data.y+1)*values.UNIT);
        hvac.moveTo((hvac_data.x-1) * values.UNIT, (hvac_data.y+1)*values.UNIT);
        hvac.lineTo((hvac_data.x+1) * values.UNIT, (hvac_data.y-1)*values.UNIT);
        hvac.stroke({color:"#000000", pixelLine:true});


        /*hvac.circle(hvac_data.x*values.UNIT , hvac_data.y*values.UNIT, 10)
        
        hvac.moveTo((hvac_data.x-0.5) * values.UNIT, (hvac_data.y-1)*values.UNIT);
        hvac.lineTo((hvac_data.x-0.5) * values.UNIT, (hvac_data.y+1)*values.UNIT);
        hvac.moveTo((hvac_data.x+0.5) * values.UNIT, (hvac_data.y-1)*values.UNIT);
        hvac.lineTo((hvac_data.x+0.5) * values.UNIT, (hvac_data.y+1)*values.UNIT);

        hvac.moveTo((hvac_data.x-1) * values.UNIT, (hvac_data.y-0.5)*values.UNIT);
        hvac.lineTo((hvac_data.x+1) * values.UNIT, (hvac_data.y-0.5)*values.UNIT);
        hvac.moveTo((hvac_data.x-1) * values.UNIT, (hvac_data.y+0.5)*values.UNIT);
        hvac.lineTo((hvac_data.x+1) * values.UNIT, (hvac_data.y+0.5)*values.UNIT);
        hvac.stroke({color:"#000000", pixelLine:true});*/

        hvac.id = hvac_data.id;
        hvac.visible = hvac_data.visible;


        // hvac object btn
        let hvac_btn = document.createElement("tr");
        document.getElementById("hvac_buttons_holder").getElementsByTagName("tbody")[0].appendChild(hvac_btn);
        hvac_btn.style.cursor = "pointer";

        let hvac_empty_td = document.createElement("td");
        hvac_empty_td.className = "m-0 p-0";
        hvac_btn.appendChild(hvac_empty_td);

        let hvac_btn_td = document.createElement("td");
        hvac_btn.appendChild(hvac_btn_td);
        hvac_btn_td.className = "m-0 p-0";
        hvac_btn_td.innerHTML = hvac_data.name;

        // store hvac button inside hvac graphics object
        hvac.object_btn = hvac_btn_td;

        hvac_btn.onclick = (ev)=>{
            show_editor_hvac(hvac_data.id);
        }
    
    }











    // LIGHTS
    for(let light_data of DATA.lights){
        let light = new PIXI.Graphics();
        LIGHTS_CONTAINER.addChild(light);

    

        light
            .circle(light_data.x*values.UNIT , light_data.y*values.UNIT, 10).fill({alpha:0.4, color:"#f6c500"})
            .circle(light_data.x*values.UNIT , light_data.y*values.UNIT, 3)
            .circle(light_data.x*values.UNIT , light_data.y*values.UNIT, 5)

            .moveTo(light_data.x*values.UNIT , light_data.y*values.UNIT)
            .lineTo((light_data.x*values.UNIT)-7 , (light_data.y*values.UNIT)+7)
            .lineTo((light_data.x*values.UNIT)+7 , (light_data.y*values.UNIT)-7)

            .moveTo(light_data.x*values.UNIT , light_data.y*values.UNIT)
            .lineTo((light_data.x*values.UNIT)-7 , (light_data.y*values.UNIT)-7)
            .lineTo((light_data.x*values.UNIT)+7 , (light_data.y*values.UNIT)+7)
            .stroke({color:"#000000", pixelLine:true});
        light.id = light_data.id;
        //light.id = light_data.id;
        light.visible = light_data.visible;




        // light object btn
        let light_btn = document.createElement("tr");
        document.getElementById("light_buttons_holder").getElementsByTagName("tbody")[0].appendChild(light_btn);
        light_btn.style.cursor = "pointer";

        let light_empty_td = document.createElement("td");
        light_empty_td.className = "m-0 p-0";
        light_btn.appendChild(light_empty_td);

        let light_btn_td = document.createElement("td");
        light_btn.appendChild(light_btn_td);
        light_btn_td.className = "m-0 p-0";
        light_btn_td.innerHTML = light_data.name;

        // store door button inside door graphics object
        light.object_btn = light_btn_td;

        light_btn.onclick = (ev)=>{
            show_editor_light(light_data.id);
        }
    }


    


    // TEXTS
    for(let i=0; i < DATA.texts.length; i++){
        let text_data = DATA.texts[i];

        let text = new PIXI.Text({
            anchor:0.5,
            style:{
                fill:"#000000",
                fontSize:15
            },
            text:text_data.text
        });
        TEXTS_CONTAINER.addChild(text);
        text.id = text_data.id;
        text.text = text_data.text;
        text.visible = text_data.visible;
        text.x = text_data.x * values.UNIT;
        text.y = text_data.y * values.UNIT;



        // text object btn
        let text_btn = document.createElement("tr");
        document.getElementById("text_buttons_holder").getElementsByTagName("tbody")[0].appendChild(text_btn);
        text_btn.style.cursor = "pointer";

        let text_empty_td = document.createElement("td");
        text_empty_td.className = "m-0 p-0";
        text_btn.appendChild(text_empty_td);

        let text_btn_td = document.createElement("td");
        text_btn.appendChild(text_btn_td);
        text_btn_td.className = "m-0 p-0";
        text_btn_td.innerHTML = text_data.text;

        // store block button inside block graphics object
        text.object_btn = text_btn_td;

        
        text_btn.onclick = (ev)=>{
            show_editor_text(text_data.id);
        }


    }







    // WINDOWS
    for(let window_data of DATA.windows){
        let _window = new PIXI.Graphics();
        WINDOWS_CONTAINER.addChild(_window);
        _window.id = window_data.id;
        _window.visible = window_data.visible;

        if(window_data.type == "window 1"){
            _window.moveTo((window_data.x-1)*values.UNIT, window_data.y*values.UNIT);
            _window.lineTo((window_data.x+1)*values.UNIT, window_data.y*values.UNIT);
            _window.stroke({color:"#CAE1E5", width:WINDOW_THICKNESS});
            _window.lineTo((window_data.x-1)*values.UNIT, window_data.y*values.UNIT);
            _window.stroke({color:"#8699A7", width:1});

        }else if(window_data.type == "window 2"){
            _window.moveTo(window_data.x*values.UNIT, (window_data.y-1)*values.UNIT);
            _window.lineTo(window_data.x*values.UNIT, (window_data.y+1)*values.UNIT);
            _window.stroke({color:"#CAE1E5", width:WINDOW_THICKNESS});
            _window.lineTo(window_data.x*values.UNIT, (window_data.y-1)*values.UNIT);
            _window.stroke({color:"#8699A7", width:1});
        }

        


        // window object btn
        let window_btn = document.createElement("tr");
        document.getElementById("window_buttons_holder").getElementsByTagName("tbody")[0].appendChild(window_btn);
        window_btn.style.cursor = "pointer";

        let window_empty_td = document.createElement("td");
        window_empty_td.className = "m-0 p-0";
        window_btn.appendChild(window_empty_td);

        let window_btn_td = document.createElement("td");
        window_btn.appendChild(window_btn_td);
        window_btn_td.className = "m-0 p-0";
        window_btn_td.innerHTML = window_data.name;

        // store block button inside block graphics object
        _window.object_btn = window_btn_td;

        window_btn.onclick = (ev)=>{
            show_editor_window(window_data.id);
        }
    }
}
















// DEFAULT VALUES
if(localStorage.getItem("MODE")){
    if(localStorage.getItem("MODE") == "block 1")  set_mode_block(1);
    if(localStorage.getItem("MODE") == "block 2")  set_mode_block(2);
    if(localStorage.getItem("MODE") == "block 3")  set_mode_block(3);
    if(localStorage.getItem("MODE") == "block 4")  set_mode_block(4);
    if(localStorage.getItem("MODE") == "block 5")  set_mode_block(5);

    if(localStorage.getItem("MODE") == "door 1")  set_mode_door(1);
    if(localStorage.getItem("MODE") == "door 2")  set_mode_door(2);
    if(localStorage.getItem("MODE") == "door 3")  set_mode_door(3);
    if(localStorage.getItem("MODE") == "door 4")  set_mode_door(4);
    if(localStorage.getItem("MODE") == "door 5")  set_mode_door(5);
    if(localStorage.getItem("MODE") == "door 6")  set_mode_door(6);
    if(localStorage.getItem("MODE") == "door 7")  set_mode_door(7);
    if(localStorage.getItem("MODE") == "door 8")  set_mode_door(8);
    if(localStorage.getItem("MODE") == "door 9")  set_mode_door(9);
    if(localStorage.getItem("MODE") == "door 10")  set_mode_door(10);
    if(localStorage.getItem("MODE") == "door 11")  set_mode_door(11);
    if(localStorage.getItem("MODE") == "door 12")  set_mode_door(12);

    if(localStorage.getItem("MODE") == "hvac 1")  set_mode_hvac(1);

    if(localStorage.getItem("MODE") == "light 1")  set_mode_light(1);

    if(localStorage.getItem("MODE") == "text 1")  set_mode_text(1);

    if(localStorage.getItem("MODE") == "window 1")  set_mode_window(1);
    if(localStorage.getItem("MODE") == "window 2")  set_mode_window(2);
}else{
    set_mode_block(1);
}














// LOAD PROJECT DATA
let project_data = JSON.parse(document.getElementById("project_data").innerHTML);
if(project_data != undefined){
    DATA = project_data;
    update();
}















