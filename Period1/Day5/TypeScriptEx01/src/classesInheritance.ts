// a
abstract class Shape {
  private _color: string;
  constructor(color: string) {
    this._color = color;
  }
  abstract get area(): number;
  abstract get perimeter(): number;
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color;
  }
  toString(): string {
    return `A shape of the color ${this._color}`;
  }
}
//const shape01 = new Shape("Blue");
// TypeScript doesnt allow instances of abstract classes

// b
class Circle extends Shape {
  private _radius: number;
  constructor(color: string, radius: number) {
    super(color);
    this._radius = radius;
  }
  get area(): number {
    return Math.PI * Math.pow(this._radius, 2);
  }
  get perimeter(): number {
    return 2 * Math.PI * this._radius;
  }
  get radius(): number {
    return this._radius;
  }
  set radius(radius: number) {
    this._radius = radius;
  }
}
const circle01 = new Circle("Blue", 10);
circle01.radius = 5;
console.log(circle01.toString());
console.log([circle01.radius, circle01.area, circle01.perimeter].join(", "));

// c
class Cylinder extends Circle {
  private _height: number;
  constructor(color: string, radius: number, height: number) {
    super(color, radius);
    this._height = height;
  }
  get perimeter(): number {
    throw "Not Implemented...";
  }
  get volume(): number {
    return this.area * this._height;
  }
}
const cyl01 = new Cylinder("Red", 3, 6);
console.log(cyl01.toString());
// console.log(cyl01.perimeter); throws error
console.log([cyl01.radius, cyl01.area, cyl01.volume].join(", "));
