const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

myEmitter.on("exit", () => {
    console.log("Program is exiting...");
});

myEmitter.emit("greet", "Ssd");

myEmitter.emit("exit");