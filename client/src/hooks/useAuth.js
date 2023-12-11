import { useState, useCallback } from "react";
import userService from "../services/user";

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});


  const loginUser = useCallback((username, password) => {
    setLoading(true);
    return userService.login({ username, password })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
        return response.data

      })
  }, [])

  return { user, loginUser, loading }
}
export default useAuth