/* Your Code Here */


function createEmployeeRecord(employeeInfoArray) {
    return {
      firstName: employeeInfoArray[0],
      familyName: employeeInfoArray[1],
      title: employeeInfoArray[2],
      payPerHour: employeeInfoArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }


  function createEmployeeRecords(employeeInfoArrays) {
    return employeeInfoArrays.map(function(employeeInfoArray) {
      return createEmployeeRecord(employeeInfoArray);
    });
  }
  

  function createTimeInEvent(dateTime) {
    const [date, hour] = dateTime.split(" ")
  
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    })
  
    return this;
  }

  
function createTimeOutEvent(dateTime) {
  const [date, hour] = dateTime.split(' ');

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
}

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(function (event) {
    return event.date === date
  })

  const timeOut = this.timeOutEvents.find(function (event) {
    return event.date === date
  })

  if (timeIn && timeOut) {
    return (timeOut.hour - timeIn.hour) / 100
  } else {
    return 0
  }
}

function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date)
  const payRate = this.payPerHour

  return hoursWorked * payRate
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function (employee) {
    return employee.firstName === firstName
  })
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function (totalPay, employee) {
    return totalPay + allWagesFor.call(employee)
  }, 0)
}
