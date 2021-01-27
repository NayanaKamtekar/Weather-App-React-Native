import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";

import { getWeatherByCityName } from "../services/index";
import SearchCity from "./HomeComponents/SearchCity";
import List from "./HomeComponents/List";

export const HomeScreen = () => {
  const [city, setCity] = useState("Copenhagen");
  const [cityWeather, setCityWeather] = useState({});

  const searchCity = (text) => {
    setCity(text);
  };

  useEffect(() => {
    (async () => {
      try {
        const weather = await getWeatherByCityName(city);
        console.log(weather);
        setCityWeather(weather);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [city]);

  const handleDateTime = () => {
    let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let tzoffset = new Date().getTimezoneOffset() * 60 * 1000;

    let currentDateTime = new Date(Date.now() + tzoffset + cityWeather?.timezone * 1000);
    let getDate = `${weekDays[currentDateTime.getDay()]}, ${currentDateTime.getDate()} ${
      monthNames[currentDateTime.getMonth()]
    } ${currentDateTime.getFullYear()}`;

    let timeString = `${currentDateTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDateTime.getMinutes().toString().padStart(2, "0")}`;
    return (
      <View style={styles.dateTimeView}>
        <Text style={styles.cityDateTime}>{getDate}</Text>
        <Text style={styles.cityDateTime}>{timeString}</Text>
      </View>
    );
  };

  let sunRise = new Date((cityWeather?.sys?.sunrise + cityWeather?.timezone) * 1000).toISOString().substr(11, 5);
  let sunSet = new Date((cityWeather?.sys?.sunset + cityWeather?.timezone) * 1000).toISOString().substr(11, 5);
  const backgroundImage = require("../../assets/background.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <SearchCity searchCity={searchCity} />

        {handleDateTime()}

        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${cityWeather?.weather?.[0]?.icon}@2x.png`,
          }}
          style={styles.weatherImg}
        />
        <Text style={styles.weatherDes}>
          {" "}
          {cityWeather?.weather?.[0]?.description
            .split(" ")
            .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(" ")}
        </Text>
        <Text style={styles.cityTemp}> {Math.round(parseFloat(cityWeather?.main?.temp))}°C</Text>

        <List
          allRowMembers={[
            {
              measureName: "Feels Like",
              measureValue: `${Math.round(parseFloat(cityWeather?.main?.feels_like))} °C`,
              measureIcon: "thermometer",
            },
            {
              measureName: "Humidity",
              measureValue: `${cityWeather?.main?.humidity} %`,
              measureIcon: "droplet",
            },
            {
              measureName: "Pressure",
              measureValue: `${cityWeather?.main?.pressure} hPa`,
              measureIcon: "compass",
            },
            {
              measureName: "Wind Speed",
              measureValue: `${cityWeather?.wind?.speed} m/s`,
              measureIcon: "wind",
            },
            {
              measureName: "Sunrise",
              measureValue: `${sunRise}`,
              measureIcon: "sunrise",
            },
            {
              measureName: "Sunset",
              measureValue: `${sunSet}`,
              measureIcon: "sunset",
            },
          ]}
          noCols={3}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateTimeView: {
    alignItems: "center",
  },
  cityTemp: {
    color: "#232363",
    fontSize: 90,
    textAlign: "center",
  },
  cityDateTime: {
    color: "#232363",
    // color: "#fcfafa",
    fontSize: 18,
    textAlign: "center",
    alignItems: "center",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
  },

  weatherImg: {
    height: 150,
    resizeMode: "cover",
    // backgroundColor:"red",
    margin: 20,
  },
  weatherDes: {
    color: "#fcfafa",
    fontSize: 30,
    textAlign: "center",
  },
});
