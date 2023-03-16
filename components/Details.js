/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import dateFormat from 'dateformat';
import StarRating from 'react-native-star-rating';
import VideoPlayer from 'react-native-video-controls';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Details = ({route, navigation}) => {
  const {movie} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          resizeMode="cover"
          overlay="rgba(69,85,117,0.7">
          <View style={styles.innerHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: '#bcbcbb',
                padding: 10,
                borderRadius: 20,
                width: 40,
                marginTop: 20,
              }}>
              <Icon name="arrow-back" color="#fff" size={20} />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: '#181818',
                padding: 20,
                marginTop: 60,
                borderRadius: 10,
                marginBottom: -100,
                elevation: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    paddingRight: 40,
                    fontWeight: '600',
                  }}>
                  {movie.title}
                </Text>
                <Icon name="reader-outline" size={25} color="#fff" />
              </View>
              <Text style={{color: '#999999', fontSize: 16, marginTop: 10}}>
                Release Date: {dateFormat(movie.release_date, 'mmmm dS, yyyy')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{color: '#999999', fontSize: 16}}>
                  Movie Rating:
                </Text>
                <StarRating
                  disabled={true}
                  fullStarColor={'#ffb43a'}
                  starSize={22}
                  maxStars={5}
                  rating={movie.vote_average / 2}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/user.jpg')}
                  style={{width: 50, height: 50, borderRadius: 10}}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#fff',
                    width: 80,
                    marginLeft: 20,
                  }}>
                  Emonena Confidence
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#404040',
                    padding: 12,
                    borderRadius: 10,
                  }}
                  onPress={() => setModalVisible(true)}>
                  <Text style={{color: '#fff', fontSize: 14}}>
                    <Icon name="play" size={20} /> Watch Trailer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Movie Sypnosis */}
        <View
          style={{marginTop: 80, paddingHorizontal: 20, paddingBottom: 100}}>
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              fontWeight: '600',
            }}>
            Sypnosis
          </Text>

          <Text style={{color: '#999999', fontSize: 16, marginTop: 10}}>
            {movie.overview}
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Book Movie Ticket</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <VideoPlayer
                onBack={() => {
                  setModalVisible(!modalVisible);
                }}
                onEnd={() => {
                  setModalVisible(!modalVisible);
                }}
                tapAnywhereToPause={true}
                fullscreenOrientation="all"
                source={require('../assets/everything.mp4')}
                navigator={navigation}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    height: height,
    width: width,
  },
  innerHeader: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(69,85,117,0.7)',
  },
  btn: {
    backgroundColor: '#ffb43a',
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    width: width,
    height: height,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
