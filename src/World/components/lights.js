import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { DirectionalLight, PointLight, SpotLight, RectAreaLight, AmbientLight, HemisphereLight } from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';

function createLights(){
    const ambientLight = new HemisphereLight(
        'white',
        'darkslategrey',
        0.05,
    );

    const light = new THREE.PointLight(0xffffff, 3, 10, 5); 
    light.position.set(1.777, 6.154, 6.202);
    light.decay = 2;  

    light.castShadow = true; 
    light.visible = true;
    light.frustumCulled = true;
    light.renderOrder = 0;

    light.shadow.mapSize.set(2048, 2048);
    light.shadow.bias = -0.001;

    return { ambientLight, light };
}

export { createLights };