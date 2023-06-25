// Function to create an employee record
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
// Function to find an employee by first name in a collection of employee records
function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
}


// Function to process an array of arrays into an array of employee records
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeData => createEmployeeRecord(employeeData));
}

// Function to add a timeIn event to an employee's record
function createTimeInEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    this.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour, 10)
    });

    return this;
}

// Function to add a timeOut event to an employee's record
function createTimeOutEvent(dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    this.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour, 10)
    });

    return this;
}

// Function to calculate the hours worked on a specific date
function hoursWorkedOnDate(date) {
    const timeInDaily = this.timeInEvents.find(event => event.date === date);
    const timeOutDaily = this.timeOutEvents.find(event => event.date === date);

    return (timeOutDaily.hour - timeInDaily.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this,date);
    const hourlyRate = this.payPerHour;

    return hoursWorked * hourlyRate;
}

// Function to calculate all wages for an array of employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
        return totalPayroll + allWagesFor.call(employeeRecord);
    }, 0);
}


let allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

