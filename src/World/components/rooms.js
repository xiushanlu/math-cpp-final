import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadRooms(src) {
    const loader = new GLTFLoader();

    const [roomData] = await Promise.all([
        loader.loadAsync(src),
    ]);

    console.log('Portfolio loaded!', roomData);

    const room = setupModel(roomData);
    room.position.set(0, 0, 0);

    return { room };
}

export { loadRooms };