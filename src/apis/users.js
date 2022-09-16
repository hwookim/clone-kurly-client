import request from './utils/request';
import auth from '../utils/auth';
import { createSearchParams } from 'react-router-dom';
import { KAKAO_KEY, KAKAO_REDIRECT_URI } from '../config';

const users = {
  async get() {
    if (!auth.isLoggedIn()) {
      return;
    }
    return await request.get('/profile').catch(() => auth.clear());
  },

  async login(values) {
    const accessToken = await request.post('/login', values);
    auth.set(accessToken);
  },

  signup(values) {
    return request.post('/signup', values);
  },

  async kakaoLogin(code) {
    const data = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: createSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_KEY,
        redirect_uri: KAKAO_REDIRECT_URI,
        code,
      }).toString(),
    }).then((response) => response.json());

    auth.set(data.access_token);
  },
};

export default users;
