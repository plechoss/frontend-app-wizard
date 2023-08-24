import axios from 'axios';

const BASE_URL = 'https://reqres.in/api/users'

export default {
  /**
   * Creates a new user 
   * @param {Object} userData Data of the user to be created
   * @returns {Promise} Server response
   */
  async addUser(userData) {
    return await axios.post(BASE_URL, userData);
  },
  /**
   * Deletes a user
   * @param {Number} id ID of the user to be deleted
   * @returns {Promise} Server response
   */
  async deleteUser(id) {
    return await axios.delete(`${BASE_URL}/${id}`);
  },
  /**
   * Updates the user's data
   * @param {Number} id ID of the user to be updated
   * @param {Object} newUserData New data to assign to the user
   * @returns {Promise} Server response
   */
  async editUser(id, newUserData) {
    return await axios.put(`${BASE_URL}/${id}`, newUserData);
  },

  /**
   * Fetches the list of users for a given page number
   * @param {Number} pageNum Number of the page to be fetched
   * @returns {Promise} Server response
   */
  async getUsers(pageNum) {
    return await axios.get(BASE_URL, { params: { page: pageNum } });
  }
}