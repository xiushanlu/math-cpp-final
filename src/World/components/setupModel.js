import { AnimationMixer } from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js';

function setupModel(data){
    const model = data.scene.children[0];
    const clip = data.animations[0];

    const mixer = new AnimationMixer(model);
    /* const action = mixer.clipAction(clip);
    action
    .startAt(2) // when the animation starts
    .setEffectiveTimeScale(0.5) // how fast the animation plays
    .setEffectiveWeight(0.75) // how powerful the animation is at manipulating the skeleton
    .play(); */

    model.tick = (delta) => mixer.update(delta);

    return model;
}

export { setupModel };