import axios from 'axios';

const BASE_URL = 'https://reqres.in/api/users'

export default {
  async addUser(userData) {
    return await axios.post(BASE_URL, userData);
  },
  async deleteUser(id) {
    return await axios.delete(`${BASE_URL}/${id}`);
  },
  async editUser(id, newUserData) {
    return await axios.put(`${BASE_URL}/${id}`, newUserData);
  },
  async getUsers(pageNum) {
    return await axios.get(BASE_URL, { params: { page: pageNum } });
  }
}