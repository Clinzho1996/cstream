/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const API_KEY = 'aa00e3d2a883067d5c64c3b57d3d99f7';
const BASE_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

const Upcoming = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => setUpcomingMovies(data.results))
      .then(setLoading(false))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({item}) => {
    <TouchableOpacity
      style={{
        backgroundColor: '#272727',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <Image
        style={{width: 80, height: 100, borderRadius: 10}}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
      />
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
          {item.title}
        </Text>
        <Text style={{fontSize: 14, color: '#c1c1c1'}}>
          Release Date: {item.release_date}
        </Text>
      </View>
    </TouchableOpacity>;
  };

  return (
    <View>
      {loading ? (
        <View style={{marginTop: 20, flex: 1}}>
          <ActivityIndicator size="large" color="#ffb43a" />
        </View>
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={upcomingMovies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Upcoming;

const styles = StyleSheet.create({});
