import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import useSidebar from "../../hooks/useSidebar";

const { Header, Content, Footer, Sider } = Layout;

function MainLayout({ children }) {
  const { items } = useSidebar();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const headerItems = [
    { key: "operations-link", label: "Operaciones" },
    { key: "agenda-link", label: "Agenda" },
    { key: "billing-link", label: "Facturacion" },
  ];

  const userItems = [
    { key: "user-settings", label: "Opciones de usuario" },
    { key: "logout", label: "Cerrar sesion" },
  ];

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="80"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={"operations-link"}
            items={headerItems}
            style={{ flex: 1, minWidth: 0 }}
          />
          <Button
            shape="circle"
            size="large"
            style={{ margin: "auto", marginRight: "15px" }}
          >
            <UserOutlined />
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Autoexpress S.A.S ©2023 Created by keilev.
        </Footer>
      </Layout>
    </Layout>
  );
}
export default MainLayout;
