
export default class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    mul(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    mod() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    equals(v) {
        return this.x === v.x && this.y === v.y && this.z === this.z;
    }

}