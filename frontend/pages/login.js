import Head from "../components/Common/Head";
import Heading from "../components/Common/Heading";

import FormError from "../components/Common/FormError";

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

const LoginNavigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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
  // prop: error
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
  const [loginError, setLoginError] = useState(null);
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
    setLoginError(null);

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
      setLoginError(
        (error.toString().includes("400") && "Invalid login") ||
          error.toString()
      );
      setTimeout(() => {
        setLoginError(null);
      }, 3000);
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

      <Container placeContent="center" height={100}>
        <Row justifyContent="center" textAlignLast="center">
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <Col>
              <Heading size={4}>Email address</Heading>
            </Col>
            <Col>
              <Input
                {...register("username")}
                type="username"
                error={errors.username && true}
                name="username"
                placeholder="ola@nordmann.no"
                autoComplete="on"
              />
            </Col>
            {errors.username && (
              <div className="text-muted">{errors.username.message}</div>
            )}

            <Col>
              <Heading size={4}>Password</Heading>
            </Col>
            <Col>
              <Input
                {...register("password")}
                error={errors.password && true}
                type="password"
                name="password"
                placeholder="Passord"
                autoComplete="on"
              />

              {errors.password && (
                <div className="text-muted">{errors.password.message}</div>
              )}
            </Col>

            <Col>
              {submitting ? (
                <LoginButton width={100} bgColor="success" type="submit">
                  <FontAwesomeIcon icon={Spinner} spin />
                </LoginButton>
              ) : (
                (loginError && (
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
            <Row justifyContent="center" margin="10px 0 0 0">
              {loginError && <FormError>{loginError}</FormError>}
            </Row>
          </LoginForm>
        </Row>
      </Container>
    </>
  );
};

export default Login;
