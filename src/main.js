import { World } from './World/World.js';

// create the main function
async function main(){
    // Get a reference to the container element
    const container = document.querySelector('#portfolio');
    const container2 = document.querySelector('#home');
    const container3 = document.querySelector('#contact');

    // Create an instance of the World app
    const world = new World(container, '/assets/models/portfolio.gltf');
    const world2 = new World(container2, '/assets/models/home.gltf');
    const world3 = new World(container3, '/assets/models/contact.gltf');

    // Complete async tasks
    await world.init();
    await world2.init();
    await world3.init();

    // Start the animation loop
    world.start();
    world2.start();
    world3.start();
}

main().catch((err) => {
    console.error(err);
});