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
      <Link href="/">
        <a className="link">Holidaze</a>
      </Link>
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormError>{loginError}</FormError>}
        <div>
          <div>Email address</div>
          <input
            {...register("username")}
            type="username"
            name="username"
            placeholder="ola@nordmann.no"
            autoComplete="on"
          />
          {errors.username && (
            <div className="text-muted">{errors.username.message}</div>
          )}
        </div>

        <div>
          <div>Password</div>
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
        </div>

        {submitting ? (
          <button className="w-100" variant="primary" type="submit">
            Loggin in...
          </button>
        ) : (
          <button className="w-100" variant="outline-primary" type="submit">
            Login
          </button>
        )}
      </form>
    </>
  );
};

export default Login;
