import Head from "../components/Layout/Head";
import Heading from "../components/Layout/Heading";

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
  Row,
  Col,
  LoginForm,
  Placement,
  P,
  LoginButton,
} from "../components/Common/Styles/Common";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
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
      setSubmitting(false);
      router.push("/admin");
    } catch (error) {
      setLoginError(error.toString());
    }
  }

  return (
    <>
      <Head title={TITLE_LOGIN} description={DESCRIPTION_LOGIN} />
      <Placement
        position="fixed"
        top={0}
        align="center"
        width={100}
        alignItems="center"
      >
        <Row>
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
      </Placement>
      <Placement place="center" align="center" height={100}>
        <Row justifyContent="center">
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            {loginError && <FormError>{loginError}</FormError>}
            <Row>
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
            </Row>

            <Row padding_bottom={10}>
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
            </Row>

            <Col>
              {submitting ? (
                <LoginButton
                  width={100}
                  className="w-100"
                  variant="primary"
                  type="submit"
                >
                  Loggin in...
                </LoginButton>
              ) : (
                <LoginButton
                  width={100}
                  className="w-100"
                  variant="outline-primary"
                  type="submit"
                >
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
