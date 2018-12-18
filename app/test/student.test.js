const fetch = require("node-fetch");
const request = require('supertest');
const config  = require('../../config'); // get our config file
var app = require("../routes/students");
var url = process.env.HEROKU || "http://localhost:3000/home/students";
const jwt     = require('jsonwebtoken');

it('app module should be defined', () => {
    expect(app).toBeDefined();
});  

describe('Protected API /home/students', () => {

    // Moking User.findOne method
    let userSpy;
  
    beforeAll(() => {
      const User = require('../models/student');
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

    it('GET /home/students should return 200', async () => {
        //expect.assertions(1)
        var response = await fetch(url+'?token='+token)
        expect(response.status).toBe(200)
    });
    
    it('POST /home/assignmets should return  201', async () => {
        //expect.assertions(1)
        var response = await fetch(url+'?token='+token, {
            method: 'POST',
            body: JSON.stringify({name: 'nome', surname:'cognome', password: 'skrt'}),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        var json = await response.json()
        expect(response.status).toEqual(201)
    })
    
    it('PUT /home/students/:{id} should return 200', async () => {
       // expect.assertions(1)
        var response = await fetch(url+'/1?token='+token, {
            method: 'PUT',
            body: JSON.stringify({name: 'nome', surname:'cognome', password: 'skrt'}),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        var json = await response.json()
        expect(response.status).toEqual(200)
    })
});