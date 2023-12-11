import { UserOutlined, HomeOutlined, CarOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";


function useSidebar() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (window.location.pathname.includes("dashboard")) {
      const currentItems = [{ key: "home", label: "Inicio", icon: React.createElement(HomeOutlined) },
      { key: "user", label: "Usuario", icon: React.createElement(UserOutlined) },
      { key: "cars", label: "Autos", icon: React.createElement(CarOutlined) }];
      setItems(currentItems);
    }
  }, [window.location])

  return { items }
}
export default useSidebar;