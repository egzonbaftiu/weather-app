import { ImageBackground, ScrollView } from "react-native";
import SearchCity from "./component/SearchCity";
import DailyForeCast from "./component/DailyForeCast";
import React, { useEffect, useState } from "react";
import backgroundImage from "./assets/earth.png";
import styled from "styled-components/native";
import CurrentWeather from "./component/CurrentWeather";
import Toast from "react-native-toast-message";
import env from "./config/constants";

export default function App() {
  const [toggleSearch, setToggleSearch] = useState("city");
  const [city, setCity] = useState("Kosovo");
  const [lat, setLat] = useState(42.6026);
  const [long, setLong] = useState(20.903);
  const [weather, setWeather] = useState({});

  const controller = new AbortController();
  const signal = controller.signal;

  const fetchCity = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${env.APP_ID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLat(data.coord.lat);
        setLong(data.coord.lon);
        Toast.show({
          type: "success",
          text1: "Successfully found " + city,
        });
      })
      .catch((err) =>
        Toast.show({
          type: "error",
          text1: "Not found this city " + city,
        })
      );
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${env.APP_ID}`,
      { signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {});
    return () => controller.abort();
  }, [lat, long]);

  return (
    <Container>
      <ImageBackground
        source={backgroundImage}
        style={{ width: "100%", height: "100%" }}
      >
        <SearchCity
          city={city}
          setCity={setCity}
          fetchCity={fetchCity}
          toggleSearch={toggleSearch}
          setToggleSearch={setToggleSearch}
        />
        <CurrentWeather currentWeather={weather} timezone={weather.timezone} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
          <FutureForecastContainer>
            {weather.daily ? (
              weather.daily.map((day, index) => {
                if (index !== 0) {
                  return <DailyForeCast key={day.dt} day={day} index={index} />;
                }
              })
            ) : (
              <NoWeather>No Weather to show</NoWeather>
            )}
          </FutureForecastContainer>
        </ScrollView>
      </ImageBackground>
      <Toast position="top" topOffset={35} visibilityTime={1400} />
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const NoWeather = styled.Text`
  text-align: center;
  color: white;
`;
const FutureForecastContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;
