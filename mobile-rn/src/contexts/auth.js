import React, { createContext, useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '../services/auth';

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else if (!storageUser && !storageToken) {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn(email, password) {
    const response = await auth.signIn(email, password);

    setUser(response.data.user);

    console.log(response.data.token);

    await AsyncStorage.setItem(
      '@RNAuth:user',
      JSON.stringify(response.data.user)
    );
    await AsyncStorage.setItem('@RNAuth:token', response.data.token);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user: {}, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
