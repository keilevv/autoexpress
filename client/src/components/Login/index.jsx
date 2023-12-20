import { useState } from "react";
import { Input, Button, Form, notification } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/autoexpresslogo.png";
import useAuth from "../../hooks/useAuth";
import useViewport from "../../hooks/useViewport";
import "./style.css";

function Login() {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const { loginUser, loading } = useAuth();
  const navigate = useNavigate();
  const { isMobileScreen } = useViewport();

  const onFinish = async (values) => {
    loginUser(values.username, values.password)
      .then(() => {
        notification.success({ message: "Solicitud realizada con exito" });
        navigate("/dashboard")
      })
      .catch((err) => {
        notification.error({
          message: "Solicitud fallida",
          description: err.message,
        });
      });
  };

  return (
    <div className="login-form">
      <div className={`login-form-content ${isMobileScreen ? "mobile" : "desktop"}`}>
        <div className="login-form-col">
          <h1>{isRegisterForm ? "Registrar usuario" : "Iniciar sesion"}</h1>

          <Form name="login-form" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su usuario!",
                },
              ]}
            >
              <Input className="login-input" placeholder="Usuario" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su contrasena!",
                },
              ]}
            >
              <Input.Password
                className="login-input"
                placeholder="Contrasena"
              />
            </Form.Item>
            {isRegisterForm && (
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese un email valido!",
                  },
                ]}
              >
                <Input className="login-input" placeholder="Email" />
              </Form.Item>
            )}
            <Form.Item>
              <Button
                className="login-submit-button"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Ingresar
              </Button>
            </Form.Item>
          </Form>
          <h4>Olvido su usuario o contrasena?</h4>
          <h3
            className="choose-form-button"
            onClick={() => setIsRegisterForm(!isRegisterForm)}
          >
            {isRegisterForm ? "Iniciar sesion" : "Registrar usuario nuevo"}
          </h3>
        </div>
        {!isMobileScreen && (
          <div className="tenant-logo">
            <img src={logo} alt="tenant-logo"></img>
          </div>
        )}
      </div>
    </div>
  );
}
export default Login;
