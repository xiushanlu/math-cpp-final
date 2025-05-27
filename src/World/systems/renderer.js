import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';
import { WebGLRenderer } from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';

function createRenderer(){
    const renderer = new WebGLRenderer({ antialias: true });

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.setClearColor(0xffffff, 0);

    return renderer;
}

export { createRenderer };