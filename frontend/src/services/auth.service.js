import VueCookies from 'vue-cookies';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password,
      })
      .then((res) => {
        if (res.data.accessToken) VueCookies.set('user', res.data);

        return res.data;
      });
  }

  logout() {
    VueCookies.remove('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }

  verify(email, token) {
    return axios.put(API_URL + 'verify', {
      email,
      token,
    });
  }
}

export default new AuthService();
