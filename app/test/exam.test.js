const fetch = require("node-fetch");
const request = require('supertest');
const config  = require('../../config'); // get our config file
var app = require("../routes/exams");
var url = process.env.HEROKU || "http://localhost:3000/home/exams";
const jwt     = require('jsonwebtoken');

it('app module should be defined', () => {
    expect(app).toBeDefined();
});  

describe('Protected API /home/exams', () => {

    // Moking User.findOne method
    let userSpy;
  
    beforeAll(() => {
      const User = require('../models/exam');
      userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
        return {
          id: 1212,
          name: 'John'
        };
      });
    });
  
    afterAll(() => {
      userSpy.mockRestore();
    });

    var payload = {
        id: 1212,
        name: 'john',
        surname: 'john'
    };
    var options = {
        expiresIn: 86400 // expires in 24 hours
    };
    var token = jwt.sign(payload, config.superSecret, options);

    it('GET /home/exams should return 200', async () => {
        //expect.assertions(1)
        var response = await fetch(url+'?token='+token)
        expect(response.status).toBe(200)
    });
    
    it('POST /home/assignmets should return  201', async () => {
        //expect.assertions(1)
        var response = await fetch(url+'?token='+token, {
            method: 'POST',
            body: JSON.stringify({name: 'analisi', data:'19/12/2018'}),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        var json = await response.json()
        expect(response.status).toEqual(201)
    })
    
    it('PUT /home/exams/:{id} should return 200', async () => {
       // expect.assertions(1)
        var response = await fetch(url+'/1?token='+token, {
            method: 'PUT',
            body: JSON.stringify({name: 'prova', data:'19/12/2018'}),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        var json = await response.json()
        expect(response.status).toEqual(200)
    })
});