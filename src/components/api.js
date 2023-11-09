import axios from "axios";

class User {
  constructor(userName, password, email) {
    this.userName = userName;
    this.password = password;
    this.email = email;
  }
}

class Auth {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async registerUser(user) {
    const url = `${this.apiUrl}/account/register`;
    try {
      const response = await axios.post(url, user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async loginUser(email, password) {
    const url = `${this.apiUrl}/account/login`;
    const data = { email, password };
    try {
      const response = await axios.post(url, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

export { User, Auth };
