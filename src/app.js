import Vector from './models/vector.js';
import Planet from './models/planet.js';
import SolarSystem from './models/solar-system.js';

window.memento = [];
const c = document.getElementById('solar-system-canvas');
const ctx = c.getContext('2d');
const origin = new Vector(c.width / 2, c.height / 2, 0.0);
const startMass = 1.0;
const startVelocity = new Vector(0.1, 0.1, 0.1);
const startAcceleration = new Vector(0.1, 0.1, 0.0);
const planets = [
    new Planet(startMass, origin, startVelocity, startAcceleration, 'black'),
    new Planet(startMass, new Vector(10.0, 10.0, 0.0), startVelocity, startAcceleration, 'red'),
    new Planet(startMass, new Vector(190.0, 190.0, 0.0), startVelocity, startAcceleration, 'green'),
];
const solarSystem = new SolarSystem(planets, origin);
save(solarSystem, 0);

function simulate() {
    const startTime = new Date().getTime();
    solarSystem.tick();
    const endTime = new Date().getTime();
    const diff = endTime - startTime;
    console.log("time taken ", diff, "ms");
    save(solarSystem, diff);
    updateUI(solarSystem);
}

function save(solarSystem, time) {
    window.memento.push({});
    const lastIndex = window.memento.length - 1;
    const lastElement = window.memento[lastIndex];
    Object.assign(lastElement, solarSystem);
    lastElement.time = time;
}

function updateUI(solarSystem) {
    // console.log(memento);

    // ctx.save();
    // ctx.translate(15, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    solarSystem.planets.forEach(planet => {
        ctx.beginPath();
        const x = planet.position.x;
        const y = planet.position.y;
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = planet.color;
        ctx.fill();
    });
}

function init() {
    updateUI(memento[0]);
}

function reset() {
    window.memento = [];
}

window.init = init;
window.reset = reset;
window.simulate = simulate;