import * as THREE from "THREE";
import { OrbitControls } from "OrbitControls";








// HTML DOM ELEMNTS
let EDITOR = document.getElementById("3d_editor");



const UNIT = 2;









let scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
EDITOR.appendChild(renderer.domElement);

let project_group = new THREE.Group();
scene.add(project_group);

scene.background = new THREE.Color(0x555555);

camera.position.x = 15;
camera.position.y = 15;
camera.position.z = 15;
camera.lookAt(0, 0, 0);


























// FUNCTIONS

function create_brick_texture(width, height){
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            const brick_w = 32, brick_h = 16, mortar = 2;

            for(let y = 0; y < canvas.height; y += brick_h + mortar){
                for(let x = 0; x < canvas.width; x+= brick_w + mortar){
                    
                    ctx.fillStyle = (x/(brick_w+mortar) + y/(brick_h+mortar)) % 2 ? "#000000" : "#787878";
                    ctx.fillRect(x + mortar/2, y + mortar/2, brick_w, brick_h);

                    
                    ctx.fillStyle = "#C0C0CC";
                    if(y === 0) ctx.fillRect(x, y, brick_w + mortar, mortar);
                    if(x === 0) ctx.fillRect(x, y, mortar, brick_h + mortar);
                }
            }
            return canvas
}









        function create_brick_texture2(width, height){
            const brick_w = 32, brick_h = 16, mortar = 2;

            const canvas = document.createElement("canvas");
            canvas.width = brick_w*width;
            canvas.height = brick_h*height;
            const ctx = canvas.getContext("2d");


            for(let y = 0; y < canvas.height; y += brick_h + mortar){
                for(let x = 0; x < canvas.width; x+= brick_w + mortar){
                    
                    ctx.fillStyle = (x/(brick_w+mortar) + y/(brick_h+mortar)) % 2 ? "#000000" : "#787878";
                    ctx.fillRect(x + mortar/2, y + mortar/2, brick_w, brick_h);

                    
                    ctx.fillStyle = "#C0C0C0";
                    if(y === 0) ctx.fillRect(x, y, brick_w + mortar, mortar);
                    if(x === 0) ctx.fillRect(x, y, mortar, brick_h + mortar);
                }
            }
            return canvas
        }


































function clear_scene(){
    for(let i = project_group.children.length; i >=0; i--){
        project_group.remove(project_group.children[i]);
    }
}





function create_floors(){
    let FLOORS_DATA = JSON.parse(localStorage.getItem("FLOORS"));
    let WALLS_DATA = JSON.parse(localStorage.getItem("WALLS"));

    // find center of bulding shape
    let min_x= Infinity, min_y = Infinity, min_z = Infinity;
    let max_x= -Infinity, max_y = -Infinity, max_z = -Infinity;
    let points = [];
    for(let wall_data of WALLS_DATA.objects){
        points.push([[wall_data.start.x, wall_data.start.y, 0], [wall_data.end.x, wall_data.end.y, 0]])
            
        min_x = Math.min(min_x, wall_data.start.x, wall_data.end.x);
        max_x = Math.max(max_x, wall_data.start.x, wall_data.end.x);

        min_y = Math.min(min_y, wall_data.start.y, wall_data.end.y);
        max_y = Math.max(max_y, wall_data.start.y, wall_data.end.y);

        min_z = Math.min(min_z, wall_data.start.z, wall_data.end.z);
        max_z = Math.max(max_z, wall_data.start.z, wall_data.end.z);
    }
    const center_x = (min_x + max_x) / 2;
    const center_y = (min_y + max_y) / 2;
    const center_z = (min_z + max_z) / 2;



    for(let floor_data of FLOORS_DATA.objects){
        let geometry = new THREE.BoxGeometry((floor_data.end.x-floor_data.start.x)*UNIT, 0.1, (floor_data.end.y-floor_data.start.y)*UNIT);
        geometry.translate((floor_data.end.x-floor_data.start.x), 0 , (floor_data.end.y-floor_data.start.y));


        const texture = new THREE.CanvasTexture(create_brick_texture((floor_data.end.x-floor_data.start.x), (floor_data.end.y-floor_data.start.y)));
        // const texture = new THREE.CanvasTexture(create_brick_texture2((floor_data.end.x-floor_data.start.x), (floor_data.end.y-floor_data.start.y)));
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        const material = new THREE.MeshBasicMaterial({map:texture, side:THREE.DoubleSide});
        
        let mesh = new THREE.Mesh(geometry, material);
        project_group.add(mesh);

        mesh.position.x = floor_data.start.x * UNIT;
        mesh.position.z = floor_data.start.y * UNIT;
    }

    
}





function create_walls(){
    let WALLS_DATA = JSON.parse(localStorage.getItem("WALLS"));

    

    // find center of bulding shape
    let min_x= Infinity, min_y = Infinity, min_z = Infinity;
    let max_x= -Infinity, max_y = -Infinity, max_z = -Infinity;
    let points = [];
    for(let wall_data of WALLS_DATA.objects){
        points.push([[wall_data.start.x, wall_data.start.y, 0], [wall_data.end.x, wall_data.end.y, 0]])
            
        min_x = Math.min(min_x, wall_data.start.x, wall_data.end.x);
        max_x = Math.max(max_x, wall_data.start.x, wall_data.end.x);

        min_y = Math.min(min_y, wall_data.start.y, wall_data.end.y);
        max_y = Math.max(max_y, wall_data.start.y, wall_data.end.y);

        min_z = Math.min(min_z, wall_data.start.z, wall_data.end.z);
        max_z = Math.max(max_z, wall_data.start.z, wall_data.end.z);
    }
    const center_x = (min_x + max_x) / 2;
    const center_y = (min_y + max_y) / 2;
    const center_z = (min_z + max_z) / 2;

    



    // create the wall geometry
    const wall_thickness = 1;

    for(let wall_data of WALLS_DATA.objects){
        let t_sx = wall_data.start.x - center_x;
        let t_sy = wall_data.start.y - center_y;
        let t_sz = wall_data.start.z - center_z;

        let t_ex = wall_data.end.x - center_x;
        let t_ey = wall_data.end.y - center_y;
        let t_ez = wall_data.end.z - center_z;

        if(wall_data.direction == "horizontal"){
            const geometry = new THREE.BoxGeometry((wall_data.end.x-wall_data.start.x)*UNIT, wall_data.height, wall_thickness);
            geometry.translate((wall_data.end.x-wall_data.start.x), (wall_data.height/2), (wall_data.end.y-wall_data.start.y));


            const texture = new THREE.CanvasTexture(create_brick_texture2((wall_data.end.x-wall_data.start.x), wall_data.height));
            // const texture = new THREE.CanvasTexture(create_brick_texture((wall_data.end.x-wall_data.start.x), wall_data.height));
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            const material = new THREE.MeshBasicMaterial({map:texture});


            const cube = new THREE.Mesh( geometry, material );
            /*cube.position.x = ((t_sx+t_ex) / 2) * UNIT;
            cube.position.z = ((t_sy + t_ey) / 2) * UNIT;*/
            cube.position.x = wall_data.start.x * UNIT;
            cube.position.z = wall_data.start.y * UNIT;
            project_group.add( cube );
        }


        if(wall_data.direction == "vertical"){
            const geometry = new THREE.BoxGeometry(wall_thickness, wall_data.height, (wall_data.end.y - wall_data.start.y)*UNIT);
            geometry.translate((wall_data.end.x-wall_data.start.x), (wall_data.height/2), (wall_data.end.y-wall_data.start.y));

            

            const texture = new THREE.CanvasTexture(create_brick_texture2((wall_data.end.y-wall_data.start.y), wall_data.height));
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            const material = new THREE.MeshBasicMaterial({map:texture});
                

            const cube = new THREE.Mesh( geometry, material );
            // cube.position.x = ((t_sx + t_ex) / 2) * UNIT;
            // cube.position.z = ((t_sy + t_ey) / 2) * UNIT;
            cube.position.x = wall_data.start.x * UNIT;
            cube.position.z = wall_data.start.y * UNIT;
            project_group.add( cube );
        }          
    }


}





function update(){
    clear_scene();


    
    let origin_geometry = new THREE.BoxGeometry(1,1,1);
    let origin_material = new THREE.MeshBasicMaterial();
    let origin_mesh = new THREE.Mesh(origin_geometry, origin_material);
    project_group.add(origin_mesh);



    create_floors();
    create_walls();
}
update();















// CALLED WHEN EDITOR IS SELECTED
EDITOR.addEventListener("editor_selected", (ev)=>{
    update();
});




























const controls = new OrbitControls( camera, renderer.domElement );
function animate() {
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );