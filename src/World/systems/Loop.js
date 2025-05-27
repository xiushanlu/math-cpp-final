import { Clock } from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';

const clock = new Clock();

class Loop{
    constructor(camera, scene, renderer, interactables){
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
        this.interactables = interactables; // store reference
    }

    start(){
        // start the loop
        // setAnimationLoop is created using requestAnimationFrame, but it schedules frames in sync with the monitor's refresh rate and will reduce the frame rate if your hardware can't keep up
        this.renderer.setAnimationLoop(() => {
            // tell every animated object to tick forward one frame
            this.tick();
            
            // render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop(){
        // stop the loop
        renderer.setAnimationLoop(null);
    }

    tick(){
        // only call the getDelta function once per frame!
        const delta = clock.getDelta();

        for(const object of this.updatables) {
            object.tick(delta);
        }

        this.interactables.forEach(obj => {
            if (obj.userData.falling) {
                // works because the floor and the objects are all gas (physics based animation)
                const dt = 1 / 60;
                obj.userData.velocity += obj.userData.acceleration * dt;
                obj.position.y += obj.userData.velocity * dt;

                // DOESNT WORK BECAUSE I APPLIED ALL TRANSFORMATIONS BEFORE EXPORTING. NOW EVERYTHING IS AT 0,0,0
                /* 
                if (obj.position.y <= 0.01) {
                    obj.position.y = 0.01;
                    obj.userData.falling = false;
                    obj.userData.velocity = 0;

                    // Play clunk sound
                    const audio = new Audio('/assets/sounds/clunk.mp3');
                    audio.play();
                }
                */
            }
        });
    }
}

export { Loop };