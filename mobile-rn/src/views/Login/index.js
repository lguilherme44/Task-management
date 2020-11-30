import React, { useState, useContext } from 'react';

import {
  TextInput,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import logo from '../../assets/logo.png';

import styles from './styles';

import AuthContext from '../../contexts/auth';

export default function Login({ navigation }) {
  const { signed, signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        keyboardType='email-address'
        style={styles.input}
        placeholder='E-mail'
        onChangeText={(text) => setEmail(text)}
        value={email}
      ></TextInput>

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      ></TextInput>

      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
