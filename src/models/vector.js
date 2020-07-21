
export default class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    sub(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    mul(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    mod() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    equals(vector) {
        return this.x === vector.x && this.y === vector.y && this.z === this.z;
    }

}