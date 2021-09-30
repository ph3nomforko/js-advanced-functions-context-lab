/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
let createEmployeeRecord = function(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees) {
    return employees.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

let hoursWorkedOnDate = function(requestedDate) {
    let inTime = this.timeInEvents.find(function(e){
        return e.date === requestedDate
    })
    let outTime = this.timeOutEvents.find(function(e){
        return e.date === requestedDate
    })
    return (outTime.hour - inTime.hour) / 100
}

let wagesEarnedOnDate = function(requestedDate) {
    let wage = hoursWorkedOnDate.call(this, requestedDate) * this.payPerHour
    return wage
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(employee) {
        return employee.firstName === firstName
    })
}

let calculatePayroll = function(arrayOfEmployees) {
    return arrayOfEmployees.reduce(function(accumulator, currentValue) {
        return accumulator + allWagesFor.call(currentValue)
    }, 0)
}