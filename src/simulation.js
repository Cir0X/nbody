import Vector from './models/vector.js';
import Planet from './models/planet.js';
import SolarSystem from './models/solar-system.js';


const origin = new Vector(1.0, 1.0, 1.0);

export default function simulate(n, runs) {
    const planets = generatePlanets(n);
    const solarSystem = new SolarSystem(planets, origin);
    for (var i = 0; i < runs; ++i) {
        solarSystem.tick();
    }
}

function generatePlanets(n) {
    var planets = [];
    for (var i = 0; i < n; ++i) {
        const startMass = i;
        const startVelocity = new Vector(i, i, i);
        const startAcceleration = new Vector(i, i, i);
        const planet = new Planet(startMass, origin, startVelocity, startAcceleration);
        planets.push(planet);
    }
    return planets;
}