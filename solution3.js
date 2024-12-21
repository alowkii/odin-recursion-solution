// javascript-hashmap

function hash(key) {
    let hash = 0;

    const primeNumber = 31;
    for(let i = 0; i < key.length; i++) {
        hash = (hash * primeNumber + key.charCodeAt(i)) % 1013;
    }

    return  hash;
}

class HashMap {
    constructor() {
        this.map = [];
        this.size = 0;
        this.load_factor = 0.75;
        this.capacity = 7;
    }

    hash(key) {
        let hash = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * primeNumber + key.charCodeAt(i)) % 1013;
        }
        return hash;
    }

    resize() {
        this.capacity *= 2;
        const oldMap = this.map;
        this.map = [];
        this.size = 0;

        for (const bucket of oldMap) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    this.set(key, value);
                }
            }
        }
    }

    set(key, value) {
        if (this.size / this.capacity > this.load_factor) {
            this.resize();
        }

        const index = this.hash(key) % this.capacity;
        if (!this.map[index]) {
            this.map[index] = [];
        }

        for (let i = 0; i < this.map[index].length; i++) {
            if (this.map[index][i][0] === key) {
                this.map[index][i][1] = value;
                return;
            }
        }

        this.map[index].push([key, value]);
        this.size++;
    }

    get(key) {
        const index = this.hash(key) % this.capacity;
        if (this.map[index]) {
            for (const [k, v] of this.map[index]) {
                if (k === key) return v;
            }
        }
        return undefined;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    remove(key) {
        const index = this.hash(key) % this.capacity;
        if (this.map[index]) {
            for (let i = 0; i < this.map[index].length; i++) {
                if (this.map[index][i][0] === key) {
                    this.map[index].splice(i, 1);
                    this.size--;
                    return;
                }
            }
        }
    }

    length() {
        return this.size;
    }

    clear() {
        this.map = [];
        this.size = 0;
        this.capacity = 7;
    }

    keys() {
        const keys = [];
        for (const bucket of this.map) {
            if (bucket) {
                for (const [key] of bucket) {
                    keys.push(key);
                }
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (const bucket of this.map) {
            if (bucket) {
                for (const [, value] of bucket) {
                    values.push(value);
                }
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (const bucket of this.map) {
            if (bucket) {
                for (const entry of bucket) {
                    entries.push(entry);
                }
            }
        }
        return entries;
    }
}


const map = new HashMap();
map.set('name', 'John');
map.set('age', 30);
map.set('location', 'USA');

console.log(map.get('name')); // John
console.log(map.get('age')); // 30
console.log(map.get('location')); // USA

console.log(map.has('name')); // true
console.log(map.has('age')); // true

map.remove('age');
console.log(map.get('age')); // undefined

console.log(map.keys()); // ['name', 'location']
console.log(map.values()); // ['John', 'USA']
console.log(map.entries()); // [['name', 'John'], ['location', 'USA']]

console.log(map.keys()); // []
console.log(map.values()); // []
console.log(map.entries()); // []

map.clear();
console.log(map.entries()); // []

const test = new HashMap() // or HashMap() if using a factory
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.log(test.entries());

//Trigger growth functionality
test.set('moon', 'silver');

test.set('apple', 'green'); // Try toggling this and checking results
console.log(test.entries());
