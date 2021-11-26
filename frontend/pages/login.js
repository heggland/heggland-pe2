import Head from "../components/Common/Head";
import Heading from "../components/Common/Heading";

import { BASE_URL, TOKEN_PATH } from "../constants/api";

import AuthContext from "../context/AuthContext";

import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { DESCRIPTION_LOGIN, TITLE_LOGIN } from "../constants/meta";
import { LOGIN_SCHEMA } from "../constants/schema";

import styled, { css } from "styled-components";

import Col from "../components/Col/Col";
import Row from "../components/Row/Row";
import Container from "../components/Container/Container";
import Paragraph from "../components/Paragraph/Paragraph";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner as Spinner,
  faExclamation as Exclamation,
} from "@fortawesome/free-solid-svg-icons";
import Error from "../modules/error/error";

import Notification from "../modules/notification/notification";
import { ErrorSearch } from "../modules/searchBox/searchBox.style";

const LoginContainer = styled.div`
  background-color: white;
  margin: 10px 0;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 20px rgb(227 233 243);
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const LoginNavigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const InputError = styled.div`
color: red;
font-weight: bold;
position: relative;
left: -20px;
font-family: monospace;
font-size: 1.5rem;
}
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  margin-top: 10px;
  width: 100px;
  color: white;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 50px;
  border: 0;

  &:hover {
    cursor: pointer;
  }

  ${({ bgColor }) =>
    (bgColor === "success" &&
      css`
      background-color: rgb(0 114 182); 
      }
`) ||
    (bgColor === "warning" &&
      css`
      background-color: rgb(174 13 27); 
      }
`)}
`;

const Input = styled.input`
  border-radius: 3px;
  border: none;
  border-bottom: 2px solid rgb(227 233 243);

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border-bottom: 1px solid rgb(0 114 182);
    -webkit-text-fill-color: black;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  width: 100%;
  height: 40px;
  padding: 0 10px;

  margin: 10px 0;

  ${({ error }) =>
    error &&
    css`
      border: 1px solid rgb(174 13 27);
      box-shadow: 0px 0px 13px -3px rgb(174, 13, 27, 0.2);
    `}
`;

const LoginForm = styled.form`
  font-size: 1.1rem;
`;

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();

  if (auth) {
    router.push("/admin");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setError(null);

    const strapiData = {
      identifier: data.username,
      password: data.password,
    };

    try {
      const response = await axios.post(BASE_URL + TOKEN_PATH, strapiData);

      if (response.data.jwt) {
        setSubmitting(false);
        setLoggedIn(true);
      }

      setAuth({
        token: response.data.jwt,
        username: response.data.user.username,
      });

      router.push("/admin");
    } catch (error) {
      setSubmitting(false);
      setError(error.toString());
      setTimeout(() => {
        setError(null);
      }, 1500);
    }
  }

  return (
    <>
      <Head title={TITLE_LOGIN} description={DESCRIPTION_LOGIN} />

      <LoginNavigation>
        <Row justifyContent="center">
          <Link href="/">
            <a>
              <Paragraph>Go back to Holidaze</Paragraph>
            </a>
          </Link>
        </Row>
      </LoginNavigation>

      <Container placeContent="center" backgroundColor="even" height={100}>
        <Row justifyContent="center">
          <LoginContainer>
            <Row justifyContent="center" padding="0 0 25px 0">
              <Heading>Login</Heading>
            </Row>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
              <InputContainer>
                <Col>
                  <Input
                    {...register("username")}
                    type="username"
                    error={errors.username && true}
                    name="username"
                    placeholder="Email"
                    autoComplete="on"
                    autoFocus
                  />
                </Col>
                {errors.username && (
                  <InputError>{errors.username.message}</InputError>
                )}
              </InputContainer>

              <Col>
                <InputContainer>
                  <Input
                    {...register("password")}
                    error={errors.password && true}
                    type="password"
                    name="password"
                    placeholder="Passord"
                    autoComplete="on"
                  />
                  {errors.password && (
                    <InputError>{errors.password.message}</InputError>
                  )}
                </InputContainer>
              </Col>

              <Row justifyContent="center" padding="25px 0">
                <Col>
                  {submitting ? (
                    <LoginButton width={100} bgColor="success" type="submit">
                      <FontAwesomeIcon icon={Spinner} spin />
                    </LoginButton>
                  ) : (
                    (error && (
                      <LoginButton width={100} bgColor="warning" type="submit">
                        <FontAwesomeIcon icon={Exclamation} />
                      </LoginButton>
                    )) || (
                      <LoginButton width={100} bgColor="success" type="submit">
                        {(loggedIn && "Success") || "Login"}
                      </LoginButton>
                    )
                  )}
                </Col>
              </Row>

              {error && (
                <Notification type="error">
                  <Error string={error} path="login" />
                </Notification>
              )}
            </LoginForm>
          </LoginContainer>
        </Row>
      </Container>
    </>
  );
};

export default Login;
