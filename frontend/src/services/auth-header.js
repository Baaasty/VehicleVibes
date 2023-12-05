import VueCookies from 'vue-cookies';

export default function authHeader() {
  const user = VueCookies.get('user');

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}
