const chai = require('chai');
const {expect} = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const {listOfValues, userInfo, calculateSum, calculateSumWithCb, CalculationController, asyncFunc} = require('../../controllers/userController');

describe('test numArray', () => {

    it('check type of listOfValues', () => {
        expect(listOfValues).to.be.a('array');
    })

    it('test the length of listOfValues', () => {
        expect(listOfValues).to.have.lengthOf(5);
    })

    it('test the value at index', () => {
        expect(listOfValues[2]).to.equal(30);
    })

    it('test if a value is present', () => {
        expect(listOfValues).to.include(23)
    })
})

describe('test userInfo', () => {
    it('test if properties exist', () => {
        expect(userInfo).to.have.property('username');
        expect(userInfo).to.have.property('session');
        expect(userInfo).to.have.property('totalExp');
        expect(userInfo).to.have.property('address');

        // all properties
        expect(userInfo).to.have.key('username', 'session', 'totalExp', 'role', 'subjects', 'address');
    })

    it('test property type property', () => {
        expect(userInfo).to.have.property('username').to.be.a('string');
        expect(userInfo).to.have.property('totalExp').to.be.a('number');
        expect(userInfo).to.have.property('subjects').to.include('Node');
    })

    it('test nested property', () => {
       expect(userInfo).to.have.nested.property('address.city').to.equal('Delhi');
    //    expect(userInfo).to.have.nested.include({'address.city': 'Delhi'});

    })
})

describe.only('test calculateSum function', () => {
    it('test return value', () => {
        expect(calculateSum(5,10)).to.equal(15);
    })

    it('test if a function passed to calculateSumWithCb is called', () => {
        const cb = sinon.spy(); //created a dummy / spy function
        calculateSumWithCb(5,10, cb);
        expect(cb.calledOnce).to.be.true;
    })

    it('test if a function passed to calculateSumWithCb is called with first argument we pass', () => {
        const cb = sinon.spy(); //created a dummy / spy function
        calculateSumWithCb(5,10, cb);
        expect(cb.calledWith(5)).to.be.true;
    })
})

describe('test dependent functions withIn an object', () => {

    let mockedSum;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        mockedSum = sandbox.stub(CalculationController, 'sum');
        mockedSum.withArgs(10,15).returns(25);
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('test sum function from CalculationController', () => {
        expect(CalculationController.sum(10, 15)).to.equal(25);
    })

    it('test multiplicationOfSum function from CalculationController', () => {
        expect(CalculationController.multiplicationOfSum(10, 15, 2)).to.equal(50);
    })

    it('test multiplicationOfSum function should internally make call to Sum fn', () => {
        //creates a spy of sum method
        CalculationController.multiplicationOfSum(10,15, 2);
        expect(mockedSum.calledOnce).to.be.true;
    })

    it('test multiplicationOfSum function should internally make call to Sum fn with first and second argument passed to multiplicationOfSum', () => {
        // const mockedSum = sinon.spy(CalculationController, 'sum'); //creates a spy of sum method
        CalculationController.multiplicationOfSum(10,15, 2);
        expect(mockedSum.calledWith(10,15)).to.be.true;
    })
})

// async promise testing
describe(' test async function', (complete) => {

    it('async function', () => {
        asyncFunc()
        .then((res) => {
            expect(res).to.equal('data1234');
            // complete()
        })
    })

    it('async function test using chai', () => {
        expect(asyncFunc()).to.eventually.equal('data')
    })

})