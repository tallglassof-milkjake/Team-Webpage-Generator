// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Manager extends Employee {
    constructor (name, id, email, office) {
        super(name, id, email);
        this.office = office;
    }

    getOffice() {
        return this.office;
    }

    getRole() {
        let currentJob = "Manager";
        return currentJob;
    }
}

module.exports = Manager;