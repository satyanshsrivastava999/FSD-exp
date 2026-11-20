const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
let registrations = [
    {
        id: 501,
        participantName: "Riya Sharma",
        eventName: "Tech Fest",
        department: "CSE",
        ticketCount: 2,
        paymentStatus: "Paid"
    },
    {
        id: 502,
        participantName: "Arjun Mehta",
        eventName: "Code Sprint",
        department: "IT",
        ticketCount: 3,
        paymentStatus: "Pending"
    },
    {
        id: 503,
        participantName: "Neha Verma",
        eventName: "Tech Fest",
        department: "ECE",
        ticketCount: 1,
        paymentStatus: "Paid"
    }
];
let nextId =
    Math.max(...registrations.map(registration => registration.id)) + 1;
function validateRegistration(body) {
    const data =
        body && typeof body === "object" && !Array.isArray(body)
            ? body
            : {};

    const errors = [];

    if (
        typeof data.participantName !== "string" ||
        data.participantName.trim() === ""
    ) {
        errors.push("participantName must be a non-empty string");
    }

    if (
        typeof data.eventName !== "string" ||
        data.eventName.trim() === ""
    ) {
        errors.push("eventName must be a non-empty string");
    }

    if (
        typeof data.department !== "string" ||
        data.department.trim() === ""
    ) {
        errors.push("department must be a non-empty string");
    }

    if (!Number.isInteger(data.ticketCount) || data.ticketCount <= 0) {
        errors.push("ticketCount must be a positive integer");
    }

    if (!["Paid", "Pending"].includes(data.paymentStatus)) {
        errors.push("paymentStatus must be Paid or Pending");
    }

    return {
        errors,
        value: {
            participantName:
                typeof data.participantName === "string"
                    ? data.participantName.trim()
                    : "",
            eventName:
                typeof data.eventName === "string"
                    ? data.eventName.trim()
                    : "",
            department:
                typeof data.department === "string"
                    ? data.department.trim()
                    : "",
            ticketCount: data.ticketCount,
            paymentStatus: data.paymentStatus
        }
    };
}

app.get("/api/registrations", (req, res) => {
    res.status(200).json(registrations);
});

app.post("/api/registrations", (req, res) => {
    const { errors, value } = validateRegistration(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Invalid registration data",
            errors: errors
        });
    }

    const newRegistration = {
        id: nextId++,
        ...value
    };

    registrations.push(newRegistration);

    res.status(201).json({
        message: "Registration created successfully",
        registration: newRegistration
    });
});
app.get("/api/registrations/filter", (req, res) => {
    const department = req.query.department;

    if (typeof department !== "string" || department.trim() === "") {
        return res.status(400).json({
            message: "Please provide a department query parameter"
        });
    }

    const filteredRegistrations = registrations.filter(
        registration =>
            registration.department.toLowerCase() ===
            department.trim().toLowerCase()
    );

    res.status(200).json(filteredRegistrations);
});
app.get("/api/registrations/pending", (req, res) => {
    const pendingRegistrations = registrations.filter(
        registration => registration.paymentStatus === "Pending"
    );

    res.status(200).json(pendingRegistrations);
});
function parseRegistrationId(rawId) {
    const id = Number(rawId);

    if (!Number.isInteger(id) || id <= 0) {
        return null;
    }

    return id;
}
app.get("/api/registrations/:id", (req, res) => {
    const id = parseRegistrationId(req.params.id);

    const registration = registrations.find(
        registration => registration.id === id
    );

    if (!registration) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    res.status(200).json(registration);
});
app.put("/api/registrations/:id", (req, res) => {
    const id = parseRegistrationId(req.params.id);

    const index = registrations.findIndex(
        registration => registration.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    const { errors, value } = validateRegistration(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Invalid registration data",
            errors: errors
        });
    }
    registrations[index] = {
        id: registrations[index].id,
        ...value
    };

    res.status(200).json({
        message: "Registration updated successfully",
        registration: registrations[index]
    })

})

app.delete("/api/registrations/:id", (req, res) => {
    const id = parseRegistrationId(req.params.id);

    const index = registrations.findIndex(
        registration => registration.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }
    const deletedRegistration = registrations.splice(index, 1)[0];

    res.status(200).json({
        message: "Registration deleted successfully",
        registration: deletedRegistration
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            message: "Invalid JSON request body"
        });
    }

    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Event Registration API running at http://localhost:${PORT}`);
});