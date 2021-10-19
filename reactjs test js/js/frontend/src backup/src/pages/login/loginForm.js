import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import FormError from "../../components/Common/FormError";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

const url = BASE_URL + TOKEN_PATH;
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Please enter a username")
    .min(3, "Username must be at least 3 characters long"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters long"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  /*
  if (auth) {
    history.push("/admin");
  }
  */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);

      console.log(response);
      setAuth(response.data);
      history.push("/admin");
      // window.location.href = "/admin";
    } catch (error) {
      // error msg handle
      let errorStatus = error.toString();
      errorStatus = errorStatus.includes("403")
        ? "Wrong credentials"
        : errorStatus.includes("429")
        ? "Too many requests"
        : errorStatus;
      setLoginError(errorStatus);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormError>{loginError}</FormError>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("username")}
            type="username"
            name="username"
            placeholder="ola@nordmann.no"
            autoComplete="on"
          />
          {errors.username && (
            <Form.Text className="text-muted">
              {errors.username.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password")}
            type="password"
            name="password"
            placeholder="Passord"
            autoComplete="on"
          />
          {errors.password && (
            <Form.Text className="">{errors.password.message}</Form.Text>
          )}
        </Form.Group>
        <Container>
          <Row className="justify-content-md-center my-4">
            {submitting ? (
              <Button className="w-100" variant="primary" type="submit">
                Loggin in...
              </Button>
            ) : (
              <Button className="w-100" variant="outline-primary" type="submit">
                Login
              </Button>
            )}
          </Row>
        </Container>
      </Form>
    </>
  );
}
