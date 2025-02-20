function getAPI(apiURL){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",apiURL,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

// Get the location
function getLocationFromIP() {
  apiURL = "https://ipapi.co/json/";
  var json_obj = JSON.parse(getAPI(apiURL));
  thisLat = json_obj.latitude;
  thisLong = json_obj.longitude;
}
thisLat = 0;
thisLong = 0;
window.onload = getLocationFromIP()

// Get the weather from an external API
currentTemp = 0;
function getWeather() {
apiURL = "https://api.open-meteo.com/v1/forecast?latitude=" + thisLat + "&longitude=" + thisLong + "&current=temperature_2m&hourly=precipitation_probability&daily=sunrise,sunset,sunshine_duration&timezone=auto&forecast_days=2";
json_obj = JSON.parse(getAPI(apiURL));
timeNow = new Date();
}

function LEDclock(context) {
    var T = true, F = false;
    var ctx = context;
    var font = [
         //0
        [F, T, T, T, F,
         T, F, F, F, T,
         T, F, F, F, T,
         T, F, F, F, T,
         T, F, F, F, T,
         T, F, F, F, T,
         F, T, T, T, F],
         //1
        [F, F, T, F, F,
         F, T, T, F, F,
         F, F, T, F, F,
         F, F, T, F, F,
         F, F, T, F, F,
         F, F, T, F, F,
         F, T, T, T, F],
         //2
        [F, T, T, T, F,
         T, F, F, F, T,
         F, F, F, F, T,
         F, T, T, T, F,
         T, F, F, F, F,
         T, F, F, F, F,
         T, T, T, T, T],
         //3
        [F, T, T, T, F,
         T, F, F, F, T,
         F, F, F, F, T,
         F, F, T, T, F,
         F, F, F, F, T,
         T, F, F, F, T,
         F, T, T, T, F],
         //4
        [F, F, F, T, F,
         F, F, T, T, F,
         F, T, F, T, F,
         T, F, F, T, F,
         T, T, T, T, T,
         F, F, F, T, F,
         F, F, F, T, F],
         //5
        [T, T, T, T, T,
         T, F, F, F, F,
         T, F, F, F, F,
         T, T, T, T, F,
         F, F, F, F, T,
         T, F, F, F, T,
         F, T, T, T, F],
         //6
        [F, F, T, T, F,
         F, T, F, F, F,
         T, F, F, F, F,
         T, T, T, T, F,
         T, F, F, F, T,
         T, F, F, F, T,
         F, T, T, T, F],
         //7
        [T, T, T, T, T,
         F, F, F, F, T,
         F, F, F, T, F,
         F, F, T, F, F,
         F, T, F, F, F,
         F, T, F, F, F,
         F, T, F, F, F],
         //8
        [F, T, T, T, F,
         T, F, F, F, T,
         T, F, F, F, T,
         F, T, T, T, F,
         T, F, F, F, T,
         T, F, F, F, T,
         F, T, T, T, F],
         //9
        [F, T, T, T, F,
         T, F, F, F, T,
         T, F, F, F, T,
         F, T, T, T, T,
         F, F, F, F, T,
         T, F, F, F, T,
         F, T, T, T, F]];
    var that = this;
    this.radius = 22;
    this.grid = 60;
    this.led_on = 'rgb(200,0,0)';
    this.led_m = 'rgb(0,200,0)';
    this.led_h = 'rgb(50,50,255)';
    this.led_off = 'rgb(40,0,0)';
    this.background = 'rgb(0,0,0)';
    this.time = new Date();

    function draw_matrix(digit) {
        //Draws a 7x5 dot matrix digit. Origin is the central dot.
        var i, x, y;
        for (i in font[digit]){
            x = (i%5 - 2) * that.grid;
            y = ((0^(i/5)) - 3) * that.grid;
            ctx.beginPath();
            ctx.fillStyle = (font[digit][i]? that.led_on: that.led_off);
            ctx.arc(x, y, that.radius, 0, 2*Math.PI);
            ctx.fill();
        }
    }

    function draw_clock_digits() {
        //Draw dot-matrix digits.
        //draw big digits
        ctx.save();
        ctx.translate(-10*that.grid, 0);
        if(that.time.getSeconds() > 9 && that.time.getSeconds() < 15) { draw_matrix(0^(thisPrecipitation/10)); } else if(that.time.getSeconds() > 39 && that.time.getSeconds() < 45) { draw_matrix(0^(sunTime.getHours()/10)); } else { draw_matrix(0^(that.time.getHours()/10)); }
        ctx.translate(6*that.grid, 0);
        if(that.time.getSeconds() > 9 && that.time.getSeconds() < 15) { draw_matrix(thisPrecipitation%10); } else if(that.time.getSeconds() > 39 && that.time.getSeconds() < 45) { draw_matrix(sunTime.getHours()%10); } else { draw_matrix(that.time.getHours()%10); }
        ctx.translate(8*that.grid, 0);
        if(that.time.getSeconds() > 9 && that.time.getSeconds() < 15) { draw_matrix(0^(nextPrecipitation/10)); } else if(that.time.getSeconds() > 39 && that.time.getSeconds() < 45) { draw_matrix(0^(sunTime.getMinutes()/10)); } else { draw_matrix(0^(that.time.getMinutes()/10)); }
        ctx.translate(6*that.grid, 0); 
        if(that.time.getSeconds() > 9 && that.time.getSeconds() < 15) { draw_matrix(nextPrecipitation%10); } else if(that.time.getSeconds() > 39 && that.time.getSeconds() < 45) { draw_matrix(sunTime.getMinutes()%10); } else { draw_matrix(that.time.getMinutes()%10); }
        ctx.restore();

        //draw small digits
        ctx.save();
        ctx.translate(0, 8*that.grid);
        ctx.scale(0.7, 0.7);
        ctx.translate(-3*that.grid, 0);
        if(that.time.getSeconds() > 9 && that.time.getSeconds() < 15) { draw_matrix(0^(currentTemp/10)); } else if(that.time.getSeconds() > 39 && that.time.getSeconds() < 45) { draw_matrix(0^(sunshineTime/10)); } else { draw_matrix(0^(that.time.getSeconds()/10)); }
        ctx.translate(6*that.grid, 0);
        if(that.time.getSeconds() > 9 && that.time.getSeconds() < 15) { draw_matrix(currentTemp%10); } else if(that.time.getSeconds() > 39 && that.time.getSeconds() < 45) { draw_matrix(sunshineTime%10); } else { draw_matrix(that.time.getSeconds()%10); }
        ctx.restore();

        //draw central colon
        ctx.fillStyle = (that.led_on);
        ctx.beginPath();
        ctx.arc(0, -1*that.grid, that.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, that.grid, that.radius, 0, 2*Math.PI);
        ctx.fill();
    }

    function draw_radial_leds(distance, angle, data) {
        /**
         *  Draws radial led scale.
         *  @param distance Scale radius
         *  @param angle Angle between LEDs -- in radians
         *  @param data An itreable of bool data representing LED status
         */
        var i;
        ctx.save();
        for (i in data) {
            ctx.beginPath();
            ctx.fillStyle = (data[i]? that.led_on: that.led_off);
            ctx.arc(0, -distance, that.radius, 0, 2*Math.PI);
            ctx.fill();
            ctx.rotate(angle);
        }
        ctx.restore();
    }

    // There is almost certainly a better way to do this than these two additional functions, but I'm too lazy to spend time working it out right now
    function draw_radial_ledsM(distance, angle, data) {
        var i;
        ctx.save();
        for (i in data) {
            ctx.beginPath();
            ctx.fillStyle = (data[i]? that.led_m: that.led_off);
            ctx.arc(0, -distance, that.radius, 0, 2*Math.PI);
            if(i == that.time.getMinutes()) { ctx.fill(); }
            ctx.rotate(angle);
        }
        ctx.restore();
    }
    function draw_radial_ledsH(distance, angle, data) {
        var i;
        ctx.save();
        for (i in data) {
            ctx.beginPath();
            ctx.fillStyle = (data[i]? that.led_h: that.led_off);
            ctx.arc(0, -distance, that.radius, 0, 2*Math.PI);
            if(i == that.time.getHours()) { ctx.fill(); }
            ctx.rotate(angle);
        }
        ctx.restore();
    }


    function draw_led_scale() {
        if(!thisLat) { thisLat = 52.4; thisLong = -1.9; }
        // We only want to poll for the weather every half an hour so as not to spam the API
        if(((that.time.getMinutes() == 0 || that.time.getMinutes() == 30) && that.time.getSeconds() == 0) || !currentTemp) {
          getWeather();
          
          currentTemp = (json_obj.current.temperature_2m).toFixed(0);
          if(timeNow.getHours() <= 22)
          {
            thisPrecipitation = json_obj.hourly.precipitation_probability[timeNow.getHours()];
            nextPrecipitation = json_obj.hourly.precipitation_probability[timeNow.getHours()+1];
          }
          else if(timeNow.getHours() == 23)
          {
            thisPrecipitation = json_obj.hourly.precipitation_probability[23];
            nextPrecipitation = json_obj.hourly.precipitation_probability[24];
          }
          else
          {
            thisPrecipitation = json_obj.hourly.precipitation_probability[24];
            nextPrecipitation = json_obj.hourly.precipitation_probability[25];
          }
          if(thisPrecipitation == 100) { thisPrecipitation = 99; }
          if(nextPrecipitation == 100) { nextPrecipitation = 99; }
          sunriseTimeToday = new Date(json_obj.daily.sunrise[0]);
          sunsetTimeToday = new Date(json_obj.daily.sunset[0]);
          sunriseTimeTomorrow = new Date(json_obj.daily.sunrise[1]);
          sunshineDurationToday = ((json_obj.daily.sunshine_duration[0]/60)/60).toFixed(0);
          sunshineDurationTomorrow = ((json_obj.daily.sunshine_duration[1]/60)/60).toFixed(0);
          sunTime = sunriseTimeToday;
          if(timeNow >= sunTime) { sunTime = sunsetTimeToday; }
          if(timeNow >= sunTime) { sunTime = sunriseTimeTomorrow; sunshineTime = sunshineDurationTomorrow; }
          sunshineTime = sunshineDurationToday;
          console.log(json_obj.hourly.precipitation_probability[timeNow.getHours()]);
          console.log(json_obj.hourly.precipitation_probability[timeNow.getHours()+1]);
          console.log(timeNow);
       }
 
        // Draws circular scale with LEDs.
        var pointsHM = [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F];
        draw_radial_leds(13.8*that.grid, Math.PI/30, pointsHM);

        var points = [T, T, T, T, T, T, T, T, T, T, T, T];
        draw_radial_leds(13.8*that.grid, Math.PI/6, points);

        var ledcircle = [];
        for (var i=0; i<60; i++) {
            ledcircle[i] = ((i <= that.time.getSeconds())? T: F);
        }
        draw_radial_leds(15*that.grid, Math.PI/30, ledcircle);
      
        // These two bits also are almost certainly not the best ways to do this. I've got music to make now so I may come back in due course and fix my damned inefficiency later
        var ledcircleH = [];
        for (var j=0; j<24; j++) {
            ledcircleH[j] = ((j <= that.time.getHours())? T: F);
        }
        draw_radial_ledsH(13.8*that.grid, Math.PI/6, ledcircleH);
      
        var ledcircleM = [];
        for (var k=0; k<60; k++) {
            ledcircleM[k] = ((k == that.time.getMinutes())? T: F);
        }
        draw_radial_ledsM(13.8*that.grid, Math.PI/30, ledcircleM);      
    }

    this.draw = function () {
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        var diameter = Math.min(width, height);
        ctx.beginPath();
        ctx.fillStyle = that.background;
        ctx.rect(0, 0, width, height);
        ctx.fill();

        ctx.save();
        //set up resolution independent canvas with
        //origin in the middle and radius of 1000 points
        ctx.translate(width/2.0, height/2.0);
        ctx.scale(diameter/2000.0, diameter/2000.0);
        draw_led_scale();
        draw_clock_digits();
        ctx.restore();
    };
}
