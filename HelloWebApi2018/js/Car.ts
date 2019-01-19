class Car {
    engine;
    constructor(engine) {
        this.engine = engine;
    }
    start() {
        console.log("Your car with " + this.engine + " started");
    }
}

var car = new Car("V12");
car.start();