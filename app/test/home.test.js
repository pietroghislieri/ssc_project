const fetch = require("node-fetch");
const request = require('supertest')
var app = require("../routes/home")
var url = process.env.HEROKU || "http://localhost:3000/home/"

it('app module should be defined', () => {
    expect(app).toBeDefined();
});  

it('GET / should return 200', async () => {
    expect.assertions(1)
    var response = await fetch(url)
    expect(response.status).toEqual(200)
});