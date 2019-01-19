var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.start = function () {
        console.log("Your car with " + this.engine + " started");
    };
    return Car;
}());
var car = new Car("V12");
car.start();
//# sourceMappingURL=Car.js.map