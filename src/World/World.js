/* Six-step program for setting up a three.js scene:
1. Initial setup
2. Create the scene
3. Create a camera
4. Create the cube and add it to the scene
5. Create a renderer */

import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { loadRooms } from './components/rooms.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
// import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

// These variables are module-scoped: we cannot access them from outside the module
// NOTE: This will not work if there are multiple instances of the World class (they will be overwritten)
let camera, renderer, scene, loop, controls, src;
let interactables = [];

class World{
    // Create an instance of the World app
    constructor(container, source){
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        container.append(this.renderer.domElement);
        this.src = source;

        const { ambientLight, light } = createLights();
        this.light = light; // Store reference for mouse movement

        const resizer = new Resizer(container, this.camera, this.renderer);

        this.scene.add(ambientLight, light);

        // Add mousemove event listener
        this.renderer.domElement.addEventListener('mousemove', (event) => {
            const rect = this.renderer.domElement.getBoundingClientRect();
            const mouse = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, this.camera);

            // Raycast against all interactable meshes
            const intersects = raycaster.intersectObjects(interactables, true);

            if (intersects.length > 0) {
                const point = intersects[0].point;
                // Restrict y to a fixed value (e.g., y = 1)
                this.light.position.set(point.x, point.y, 1);
            }
        });
    }

    async init(){
        // asynchronous setup here
        // load bird models
        const { room } = await loadRooms(this.src);

        // move the target to the center of the front bird
        // controls.target.copy(room.position);

        // loop.updatables.push(room);
        this.scene.add(room);

        this.scene.traverse((child) => {
            if (child.isMesh) {
            // Set shadow flags if needed
            child.castShadow = true;
            child.receiveShadow = true;

            // Example: set userData for clicks
            if (child.name === 'ClickableCatCanvas') {
                child.userData.onClick = () => {
                console.log('Cat canvas clicked!');
                };
            }

            // Or just add all clickable meshes to an array:
            interactables.push(child);
            }
        });
    }

    // Render the scene
    render(){
        // draw a single frame
        this.renderer.render(this.scene, this.camera);
    }

    start(){
        this.loop.start();
    }

    stop(){
        this.loop.stop();
    }
}

export{ World };