import axios from "axios"
const userService = {
  login(data) {
    return axios.post("http://localhost:5000/api/auth/login", { ...data }).then((response) => response)
  },
  createUser(data) {
    return axios.post(`http://localhost:5000/api/auth/register`, payload, {
      headers: { Authorization: `JWT ${token}` },
    });
  }
}
export default userService