$(document).ready(function(){

        var city = [];  
        var myKey = "efad8afe60e461868cc2f32160703ba5";
        var state_icon = "";
        var state_bg = "";
    
        var w_box = `
        <li>
            <div class="top">
                <div class="cur_icon"><i class="wi"></i></div>
                <div class="info">
                    <p class="temp"><span>10</span>&nbsp;˚C</p>
                    <h4>Cloud</h4>
                    <p><span class="city">NewYork</span>,&nbsp;<span class="nation">US</span></p>
                </div>
            </div>
            <div class="bottom">
                <div class="wind">
                    <i class="wi wi-strong-wind"></i>
                    <p><span>1.2</span>&nbsp;m/s</p>
                </div>
                <div class="humidity">
                    <i class="wi wi-humidity"></i>
                    <p><span>50</span>&nbsp;%</p>
                </div>
                <div class="cloud">
                    <i class="wi wi-cloud"></i>
                    <p><span></span>&nbsp;%</p>
                </div>
            </div>
        </li>
        `;
    
        function w_info(){

            $("#weather ul").empty();

            for(i=0; i<city.length; i++){
                $("#weather ul").append(w_box);
            }
    
            $("#weather ul li").each(function(index){
                $.ajax({
                    url:"https://api.openweathermap.org/data/2.5/weather?q=" + city[index] + "&appid=" + myKey,
                    dataType:"json",
                    success:function(data){
                        console.log(data);
                        console.log("현재 온도(˚C) : " + parseInt(data.main.temp - 273.15));
                        var temp = parseInt(data.main.temp - 273.15);
                        console.log("현재 습도(%) : " + data.main.humidity);
                        var humidity = data.main.humidity;
                        console.log("현재 날씨 : " + data.weather[0].main);
                        var weather = data.weather[0].main;
                        console.log("현재 풍속(m/s) : " + data.wind.speed);
                        var wind = data.wind.speed;
                        console.log("국가명 : " + data.sys.country);
                        var nation = data.sys.country;
                        console.log("도시명 : " + data.name);
                        var region = data.name;
                        console.log("구름 양(%) : " + data.clouds.all);
                        var cloud = data.clouds.all;
    
                        if(weather == "Clear"){
                            state_icon = "wi-day-sunny"; 
                            state_bg = "sunny.jpg";                           
                        }else if(weather == "Clouds"){
                            state_icon = "wi-cloudy";
                            state_bg = "cloudy.jpg";
                        }else if(weather == "Rain"){
                            state_icon = "wi-rain";
                            state_bg = "rain.jpg";
                        }else if(weather == "Snow"){
                            state_icon = "wi-snow";
                            state_bg = "snow.jpg";
                        }else if(weather == "Haze"){
                            state_icon = "wi-day-haze";
                            state_bg = "haze.jpg";
                        }else if(weather == "Drizzle"){
                            state_icon = "wi-day-rain-mix";
                            state_bg = "drizzle.jpg";
                        }else if(weather == "Smoke"){
                            state_icon = "wi-smoke";
                            state_bg = "smoke.jpg";
                        }else if(weather == "Fog"){
                            state_icon = "wi-day-fog";
                            state_bg = "fog.jpg";
                        }else if(weather == "Cloud"){
                          state_icon = "wi-cloud";
                          state_bg = "clouds.jpg";
                        }else if(weather == "Mist"){
                          state_icon = "wi-day-fog";
                          state_bg = "mist.jpg";
                        }  
                        console.log(state_bg); 
                        $("#weather li").eq(index).find(".cur_icon i").addClass(state_icon);                    
                        $("#weather li").eq(index).find(".temp span").text(temp);
                        $("#weather li").eq(index).find(".info h4").text(weather);
                        $("#weather li").eq(index).find(".city").text(region);
                        $("#weather li").eq(index).find(".nation").text(nation);
                        $("#weather li").eq(index).find(".wind span").text(wind);
                        $("#weather li").eq(index).find(".humidity span").text(humidity);
                        $("#weather li").eq(index).find(".cloud span").text(cloud);
                    }
                });
            });
        }
    
    
        $(".cities button").click(function(){
            var $city_txt = $(this).text();  
            city.push($city_txt);
            console.log(city);
            $(this).prop("disabled",true);
            w_info();
        });
        
        function search(){
          var $search_val = $("#search_box").val();
          $("#search_box").val("");
          if($search_val.length < 1){  
              alert("검색어를 넣어주세요.");
          }else{
              city.push($search_val);
              w_info();
          }
      }
  
      $(".search button").click(function(){
          search();
      });
  
      $(".search").keypress(function(event){
          var $keyCode = event.keyCode;
          if($keyCode == 13){
              search();
          }
      });

    $(".title").click(function(){
            location.reload();
    });
    




    
});














