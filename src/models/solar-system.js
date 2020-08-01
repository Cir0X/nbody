import Planet from './planet.js';
import Vector from './vector.js';

export default class SolarSystem {
    constructor(planets, origin) {
        this.planets = planets;
        this.origin = origin;
        this.n = planets.length;
    }

    computeAccelerations() {
        var gc = 150;
        for (var i = 0; i < this.n; ++i) {
            this.planets[i].acceleration = this.origin;
            for (var j = 0; j < this.n; ++j) {
                if (i !== j) {
                    var tmp = gc * this.planets[j].mass / Math.pow((this.planets[i].position.sub(this.planets[j].position)).mod(), 3);
                    if (tmp === Infinity || isNaN(tmp)) {
                        tmp = 0;
                    }

                    const a = this.planets[i].acceleration.add(this.planets[j].position.sub(this.planets[i].position));
                    this.planets[i].acceleration = a.mul(tmp);
                }
            }
        }
    }

    computePositions() {
        for (var i = 0; i < this.n; ++i) {
            this.planets[i].position = this.planets[i].position
                .add(this.planets[i].velocity)
                .add(this.planets[i].acceleration)
                .mul(0.5);
        }
    }

    computeVelocities() {
        for (var i = 0; i < this.n; ++i) {
            this.planets[i].velocity = this.planets[i].velocity
            .add(this.planets[i].acceleration);
        }
    }

    resolveCollisions() {
        for (var i = 0; i < this.n; ++i) {
            for (var j = 0; j < this.n; ++j) {
                if (this.planets[i].position.equals(this.planets[j].position)) {
                    var tmp = {};
                    Object.assign(tmp, this.planets[i].velocity);
                    this.planets[i].velocity = this.planets[j].velocity;
                    this.planets[j].velocity = new Vector(tmp.x, tmp.y, tmp.z);
                }
            }
        }
    }

    tick() {
        this.computeAccelerations();
        this.computePositions();
        this.computeVelocities();
        this.resolveCollisions();
    }
}