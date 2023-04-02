// Project related to building an weather app using weather API.

const express = require("express");
const app = express();
const http = require("node:http");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "e0684202ad38403d9bf163240232903";
    const apiURL = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + query + "&aqi=yes";
    http.get(apiURL, response => {
        response.on("data", d => {
            const weatherInfo = JSON.parse(d);       
            const temp = weatherInfo.current.temp_c;
            const condition = weatherInfo.current.condition.text;
            const location = weatherInfo.location.name;
            const icon = weatherInfo.current.condition.icon;
            res.write("<h1>The temperature of " + location + " is " + temp + " degree Celcius.</h1>");
            res.write("<h2>The current weather condition is " + condition + ".</h2>");
            res.write("<img src=" + icon + ">");
            res.send();
        });
    });
});

app.listen(port, () => {
    console.log("The server is running at port " + port);
});