import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas){
    const controls = new OrbitControls(camera, canvas);
    
    // damping and auto rotation require
    // the controls to be updated each frame
    // controls.autoRotate = true;
    controls.enableDamping = true;

    controls.target.y = 1;

    controls.tick = () => controls.update();

    return controls;
}

export { createControls };