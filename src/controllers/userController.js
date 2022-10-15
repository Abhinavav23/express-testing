let listOfValues = [1, 7, 30, 55, 23];

const userInfo = {
    username: 'Abhinav',
    role: 'Instructor',
    totalExp: 7,
    session: true,
    subjects: ['Html', 'css', 'Js', 'React', 'Node', 'mongo'],
    address: {
        city: 'Delhi',
        country: 'India'
    }
}

const calculateSum = (a,b) => {
    return a+b
}

const calculateSumWithCb = (a,b, callback) => {
    callback(a);
    return a+b
}

let CalculationController = {
    sum: (a,b) => {
        return a+b
    }, 
    multiplicationOfSum: (a,b, c) => {
        const sumValue = CalculationController.sum(a,b);
        return sumValue * c
    }
}

const asyncFunc = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('')
        }, 1000)
    })
}

console.log(`${userInfo.username}`);

module.exports = {listOfValues, 
    userInfo, 
    calculateSum,
    calculateSumWithCb,
    CalculationController,
    asyncFunc
}

10, 34, 8

// total no of data = 50
// no of data per page= 5
// page no = 10
// 50/5

// 1 2 3 4 5 6 7 8 9 10

// page 6 ----> 26 to 30

// TotalData = 58 ---> available on server
// pageNo = 6 ---> get from user
// noOfDataPerPage = 10

// total no of pages --> 6
// at page 6 ----> 8 data ---> 51 to 58
