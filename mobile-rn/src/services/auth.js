import api from './api';

export function signIn(email, password) {
  return api.post('sessions', { email, password });
}
