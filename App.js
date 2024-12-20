import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '9be63a5de386c5c99c613001fa96a5a0';
  const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

  const fetchWeatherData = async () => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // ใช้หน่วย Celsius
        },
      });

      setWeatherData(response.data);
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูลอากาศได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ค้นหาข้อมูลอากาศ</Text>
      <TextInput
        style={styles.input}
        placeholder="กรอกชื่อเมือง"
        value={city}
        onChangeText={setCity}
      />
      <Button title="ค้นหาข้อมูลอากาศ" onPress={fetchWeatherData} />
      
      {loading && <Text>กำลังโหลดข้อมูล...</Text>}
      
      {error && <Text style={styles.error}>{error}</Text>}

      {weatherData && (
        <View style={styles.weatherInfo}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text>อุณหภูมิ: {weatherData.main.temp} °C</Text>
          <Text>สภาพอากาศ: {weatherData.weather[0].description}</Text>
          <Text>ความชื้น: {weatherData.main.humidity} %</Text>
          <Text>ความเร็วลม: {weatherData.wind.speed} m/s</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default WeatherApp;