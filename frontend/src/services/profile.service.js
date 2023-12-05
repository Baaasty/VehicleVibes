import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/v1/profile/';

class ProfileService {
  getProfile() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new ProfileService();
