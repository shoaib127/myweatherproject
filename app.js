const express = require('express');

const app = express();

const https = require('https');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));

app.listen(3000,function(){
  console.log("weather project server has started");
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  var city = req.body.city;
  var units = req.body.units;
  const apikey = "f5690b5678f2778a101b2d8f2136b695";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+units+"#";

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const jdata = JSON.parse(data);
      // console.log(jdata);

      var stdata = JSON.stringify(jdata);
      console.log(stdata);
      var temp=jdata.main.temp;
      var climate = jdata.weather[0].description;
      var icon = jdata.weather[0].icon;
      const iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature in "+city+" is "+temp+"</h1>");
      res.write("<h1>The climate there is "+city+" is "+climate+"</h1>");
      res.write("<img src="+iconurl+">");
      res.send();
    })
  })

});
