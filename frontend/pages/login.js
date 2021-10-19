import Layout from "../components/Layout/Layout";
import Heading from "../components/Layout/Heading";

import FormError from "../components/Common/FormError";

import { BASE_URL, TOKEN_PATH } from "../constants/api";

import AuthContext from "../context/AuthContext";

import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { DESCRIPTION_LOGIN, TITLE_LOGIN } from "../constants/meta";

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

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);
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
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
      history.push("/admin");
    }
  }

  return (
    <Layout title={TITLE_LOGIN} description={DESCRIPTION_LOGIN}>
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
    </Layout>
  );
};

export default Login;
