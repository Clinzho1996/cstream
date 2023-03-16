/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const API_KEY = 'aa00e3d2a883067d5c64c3b57d3d99f7';
const BASE_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
const TV_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

const Home = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTwo, setLoadingTwo] = useState(true);
  const [query, setQuery] = useState('');

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [tv, setTv] = useState([]);

  useEffect(() => {
    fetch(UPCOMING_URL)
      .then(response => response.json())
      .then(dataTwo => setUpcomingMovies(dataTwo.results))
      .then(setLoadingTwo(false))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .then(setLoading(false))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch(TV_URL)
      .then(response => response.json())
      .then(data => setTv(data.results))
      .then(setLoading(false))
      .catch(error => console.error(error));
  }, []);

  const [hidden, setHidden] = useState(false);
  const changeStatusBarVisibility = () => setHidden(!hidden);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const handlePress = async movieId => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
      );
      const data = await response.json();
      navigation.navigate('Details', {movie: data});
    } catch (error) {
      console.error(error);
    }
  };

  const searchMovies = async () => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handlePress(item.id)}
      style={{marginVertical: 10, alignItems: 'center', margin: 10}}>
      <Image
        style={{width: 260, height: 300, borderRadius: 10}}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
      />
      <View style={{marginLeft: 10, alignItems: 'center', marginTop: 10}}>
        {loading ? (
          <View style={{marginTop: 20, flex: 1}}>
            <Text>Loading</Text>
          </View>
        ) : (
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
            {item.title}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: '#999999', fontSize: 16}}>Rated:</Text>
          <StarRating
            disabled={true}
            fullStarColor={'#ffb43a'}
            starSize={22}
            maxStars={5}
            rating={item.vote_average / 2}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  //   const renderItemSearch = ({item}) => (
  //     <View>
  //       <Text>{item.title}</Text>
  //       <Text>{item.overview}</Text>
  //     </View>
  //   );
  return (
    <View>
      <ScrollView style={styles.container}>
        <StatusBar
          backgroundColor="#121212"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        {/* Header section */}
        <View style={styles.header}>
          <View>
            <Text style={{color: '#c1c1c1', textTransform: 'capitalize'}}>
              Hi, {user.email}👋
            </Text>
            <Text style={{color: '#fff', fontSize: 18}}>
              Let's relax and watch a movie.
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <Image
                source={require('../assets/user.jpg')}
                style={{width: 50, height: 50, borderRadius: 5}}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Functionality */}
        <View style={styles.search}>
          <TextInput
            placeholder="Search movie, cinema, genre..."
            placeholderTextColor="#808080"
            value={query}
            onChangeText={text => setQuery(text)}
            style={{fontSize: 16, color: '#808080'}}
          />

          <TouchableOpacity onPress={searchMovies}>
            <Icon name="search-outline" color="#fff" size={25} />
          </TouchableOpacity>
        </View>

        {/* Now Playing */}
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Now Playing</Text>
          <TouchableOpacity>
            <Text style={{color: '#ffb43a', fontSize: 16}}>See All</Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* Slider Image */}
          {loading ? (
            <View style={{marginTop: 20, flex: 1}}>
              <ActivityIndicator size="large" color="#ffb43a" />
            </View>
          ) : (
            <View style={{marginTop: 20}}>
              {/* <SliderBox Image={movie} /> */}
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={movies}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </View>
        {/* Upcoming Movies */}
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Upcoming Movies</Text>
          <TouchableOpacity>
            <Text style={{color: '#ffb43a', fontSize: 16}}>See All</Text>
          </TouchableOpacity>
        </View>
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

        {/* Upcoming Movies */}
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Top Rated Movies</Text>
          <TouchableOpacity>
            <Text style={{color: '#ffb43a', fontSize: 16}}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingBottom: 100}}>
          {loading ? (
            <View style={{marginTop: 20, flex: 1}}>
              <ActivityIndicator size="large" color="#ffb43a" />
            </View>
          ) : (
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={tv}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    height: height,
    width: width,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  search: {
    backgroundColor: '#232323',
    margin: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    borderWidth: 1,
    borderColor: '#303030',
  },
});
