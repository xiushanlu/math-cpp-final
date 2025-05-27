import { Clock } from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';

const clock = new Clock();

class Loop{
    constructor(camera, scene, renderer){
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
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
    }
}

export { Loop };