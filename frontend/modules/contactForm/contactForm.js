import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import * as Style from "./contactForm.style";
import axios from "axios";
import { BASE_URL, CONTACT_PATH } from "../../constants/api";
import { CONTACT_SCHEMA } from "../../constants/schema";

import Error from "../../modules/error/error";

import Col from "../../components/Col/Col";
import Row from "../../components/Row/Row";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CONTACT_SCHEMA),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(BASE_URL + CONTACT_PATH, data);
      console.log(response);
      setSubmitting(false);
      setSent(true);
    } catch (error) {
      setError(error.toString());
    }
  }

  return (
    <>
      <Style.Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12}>
            <Style.FormGroup>
              <Row padding="0 0 10px 0">
                <Style.InputField
                  type="text"
                  placeholder="Name *"
                  {...register("name")}
                />
              </Row>
              {errors.name && <Style.Error>{errors.name.message}</Style.Error>}
            </Style.FormGroup>
          </Col>
          <Col xs={12}>
            <Style.FormGroup>
              <Row padding="0 0 10px 0">
                <Style.InputField
                  type="email"
                  placeholder="Email *"
                  {...register("email")}
                />
              </Row>
              {errors.email && (
                <Style.Error>{errors.email.message}</Style.Error>
              )}
            </Style.FormGroup>
          </Col>
        </Row>

        <Style.FormGroup>
          <Row padding="0 0 10px 0">
            <Style.InputTextArea
              as="textarea"
              placeholder="Message *"
              rows={3}
              {...register("message")}
            />
          </Row>
          {errors.message && (
            <Style.Error>{errors.message.message}</Style.Error>
          )}
          {error && <Error string={error} path="contact" />}
          {sent && (
            <Style.Thanks>
              <Row padding="5px 0 0 0">Thank you for your message</Row>
            </Style.Thanks>
          )}
        </Style.FormGroup>

        <Row>
          <Col>
            <Row margin="10px 0 30px 0">
              <Col>
                <Style.Button
                  type="submit"
                  disabled={(error && true) || (sent && true) || false}
                  error={(error && true) || false}
                  sent={(sent && true) || false}
                >
                  {(sent && "Sent") ||
                    (error && "error") ||
                    (submitting && "Sending..") ||
                    "Send"}
                </Style.Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Style.Form>
    </>
  );
};

export default ContactForm;
