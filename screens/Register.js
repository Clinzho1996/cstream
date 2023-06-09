/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const Register = ({navigation}) => {
  const [hidden, setHidden] = useState(false);
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  function Register() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        Alert.alert('Success', 'User account created & signed in!');
        navigation.navigate('Loading');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert('Error', 'That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('Error', 'That email address is invalid!');
        }

        console.error(error);
      });
  }
  return (
    <View
      style={{
        backgroundColor: '#121212',
        alignItems: 'center',
        height: height,
        paddingTop: 0,
      }}>
      <StatusBar
        backgroundColor="#121212"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Icon name="videocam" color="#fff" size={70} />
        <Text
          style={{
            fontSize: 26,
            fontWeight: '600',
            color: '#ffb43a',
            marginLeft: 10,
          }}>
          C-Stream
        </Text>
      </View>
      <View style={styles.container}>
        <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
          <Text
            style={{
              paddingTop: 20,
              fontSize: 16,
              lineHeight: 24,
              color: '#828282',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            Create an account by providing {'\n'} your basic details below
          </Text>
        </View>
        <View style={styles.input}>
          <Icon
            name="person-outline"
            color="#808080"
            size={20}
            style={{
              borderWidth: 1,
              padding: 5,
              borderRadius: 6,
              borderColor: '#808080',
            }}
          />
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#808080"
            value={email}
            onChangeText={text => setEmail(text)}
            style={{fontSize: 16, color: '#808080', paddingLeft: 20}}
          />
        </View>
        <View style={styles.input}>
          <Icon
            name="lock-closed-outline"
            color="#808080"
            size={20}
            style={{
              borderWidth: 1,
              padding: 5,
              borderRadius: 6,
              borderColor: '#808080',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor="#808080"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={text => setPassword(text)}
              style={{
                fontSize: 16,
                color: '#808080',
                paddingLeft: 20,
                width: 240,
              }}
            />
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                marginTop: 10,
              }}
              onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={'#C4C4C4'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.input}>
          <Icon
            name="lock-closed-outline"
            color="#808080"
            size={20}
            style={{
              borderWidth: 1,
              padding: 5,
              borderRadius: 6,
              borderColor: '#808080',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#808080"
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              style={{
                fontSize: 16,
                color: '#808080',
                paddingLeft: 20,
                width: 240,
              }}
            />
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                marginTop: 10,
              }}
              onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={'#C4C4C4'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity style={styles.btn} onPress={Register}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 40, alignItems: 'center'}}>
          <Text style={{color: '#828282', fontSize: 16}}>Or Continue with</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 80,
            paddingVertical: 20,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F1F5F9',
              borderRadius: 6,
              padding: 10,
            }}>
            <Icon name="logo-google" size={15} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F1F5F9',
              borderRadius: 6,
              padding: 10,
            }}>
            <Icon name="logo-twitter" size={15} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F1F5F9',
              borderRadius: 6,
              padding: 10,
            }}>
            <Icon name="logo-facebook" size={15} color={'#000'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={{color: '#828282', fontSize: 16, marginRight: 10}}>
            Already a User?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: '#ffb43a',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#232323',
    margin: 20,
    borderRadius: 10,
    padding: 6,
    borderWidth: 1,
    borderColor: '#303030',
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: '#ffb43a',
    marginTop: 20,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
