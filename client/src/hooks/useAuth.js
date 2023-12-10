import { useState } from "react";
import userService from "../services/user";
import { notification } from "antd";
function useAuth() {
  const [user, setUser] = useState({})

  function loginUser(username, password) {
    return userService.login({ username, password })
      .then((response) => {
        setUser(response.data)
        notification.success({ message: "Solicitud realizada con exito" })

      })
      .catch((err) => {
        notification.error({ message: "Solicitud fallida", description: err.message })
      })
  }

  return { user, loginUser }
}
export default useAuth