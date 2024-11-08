
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  // res.send("Server is up and running.");
});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const units = "metric";
  const apiKey = "9ea96ea9dce0c0cbb182ca0011bc6f50";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" + units;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";

      res.write("<p>The weather is currently " + weatherDescription + "</p>")
      res.write("<h1>The Temperature in "+query+" is " + temp + " degrees Celcius.</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    })
  })
})




app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
