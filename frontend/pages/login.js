import Head from "../components/Common/Head";
import Heading from "../components/Common/Heading";

import FormError from "../components/Common/FormError";

import { BASE_URL, TOKEN_PATH } from "../constants/api";

import AuthContext from "../context/AuthContext";
import { useCookies } from "react-cookie";

import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { DESCRIPTION_LOGIN, TITLE_LOGIN } from "../constants/meta";
import { LOGIN_SCHEMA } from "../constants/schema";

import {
  LoginForm,
  Placement,
  P,
  LoginButton,
  LoginNavigation,
} from "../styles/common";

import Col from "../components/Col/Col";
import Row from "../components/Row/Row";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  //const [cookie, setCookie] = useCookies(["token"]);

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
      console.log(response);

      setAuth({
        token: response.data.jwt,
        username: response.data.user.username,
      });
      /* setCookie("token", JSON.stringify(response.data.jwt), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      }); */

      router.push("/admin");
    } catch (error) {
      setSubmitting(false);
      setLoginError(
        (error.toString().includes("400") && "Invalid login") ||
          error.toString()
      );
    }
  }

  return (
    <>
      <Head title={TITLE_LOGIN} description={DESCRIPTION_LOGIN} />

      <LoginNavigation>
        <Row justifyContent="center">
          <Link href="/">
            <a>
              <P>Holidaze</P>
            </a>
          </Link>
          <Link href="/login">
            <a>
              <P padding_left={10}>Login</P>
            </a>
          </Link>
        </Row>
      </LoginNavigation>

      <Placement placeContent="center" height="100%">
        <Row justifyContent="center" textAlignLast="center">
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            {loginError && <FormError>{loginError}</FormError>}
            <Col>
              <Heading size={4}>Email address</Heading>
            </Col>
            <Col>
              <input
                {...register("username")}
                type="username"
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
              <input
                {...register("password")}
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
                <LoginButton width={100} type="submit">
                  Loggin in...
                </LoginButton>
              ) : (
                <LoginButton width={100} type="submit">
                  Login
                </LoginButton>
              )}
            </Col>
          </LoginForm>
        </Row>
      </Placement>
    </>
  );
};

export default Login;
