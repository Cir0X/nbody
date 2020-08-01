import Vector from './vector.js';

export default class Planet {

    constructor(mass, position, velocity, acceleration) {
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
}