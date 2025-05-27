import { PerspectiveCamera, MathUtils } from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(0, 5, 18);

  let speed = 1;

  camera.tick = (delta) => {
    camera.position.z += speed * delta;
    if (camera.position.z > 20) { speed = -1;} 
    else if (camera.position.z <10) { speed = 1; }
  }

  return camera;
}

export { createCamera };