// a
function reverseArr<T>(items: T[]): T[] {
  return items.reverse();
}

console.log(
  reverseArr<string>(["a", "b", "c"])
);
console.log(
  reverseArr<number>([1, 2, 3])
);
console.log(
  reverseArr<boolean>([true, true, false])
);
//console.log(reverseArr<number>(["a","b","c"])); FAILS

// b
class DataHolder<T> {
  private _value: T;
  constructor(value: T) {
    this._value = value;
  }
  get value(): T {
    return this._value;
  }
  set value(value: T) {
    this._value = value;
  }
}

let d = new DataHolder<string>("Hello");
console.log(d.value);
d.value = "World";
console.log(d.value);

let d2 = new DataHolder<number>(123);
console.log(d2.value);
d2.value = 500;
console.log(d2.value);

//d2.setValue("asds"); NOT ALLOWED

// c
// DONE
