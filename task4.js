import { EventEmitter } from "events";

const studentTracker = new EventEmitter();

studentTracker.on("login", (studentName) => {
    console.log(`${studentName} logged in.`);
});

studentTracker.on("courseRegistration", (courseName) => {
    console.log(`Course registered: ${courseName}`);
});

studentTracker.on("notification", (message) => {
    console.log(`Notification: ${message}`);
});

studentTracker.on("logout", (studentName) => {
    console.log(`${studentName} logged out.`);
});

// Activity sequence
studentTracker.emit("login", "Rahul");

studentTracker.emit("courseRegistration", "Full Stack Development");

studentTracker.emit("notification", "Your course registration is successful.");

studentTracker.emit("logout", "Rahul");