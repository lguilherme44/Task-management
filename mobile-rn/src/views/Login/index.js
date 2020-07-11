import React from 'react';

import {
  TextInput,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import { Button } from 'native-base';

import logo from '../../assets/logo.png';

import styles from './styles';

export default function Login() {
  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>

      <TextInput
        autoCapitalize={false}
        autoCorrect={false}
        keyboardType='email-address'
        style={styles.input}
        placeholder='E-mail'
      ></TextInput>

      <TextInput
        autoCapitalize={false}
        autoCorrect={false}
        style={styles.input}
        placeholder='Password'
      ></TextInput>

      <TouchableOpacity style={styles.buttonLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
