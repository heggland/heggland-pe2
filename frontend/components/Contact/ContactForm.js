import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import { Form, Row, Col, Error, Success } from "./ContactForm.style";
import axios from "axios";
import { BASE_URL, CONTACT_PATH } from "../../constants/api";
import { CONTACT_SCHEMA } from "../../constants/schema";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
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
    setFormError(null);

    console.log(data);

    try {
      const response = await axios.post(BASE_URL + CONTACT_PATH, data);
      console.log(response);
      setSubmitting(false);
      setSent(true);
    } catch (error) {
      setFormError(error.toString());
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formError && <Error>{formError}</Error>}
        <Row>
          <Col>
            <div>
              <input type="text" placeholder="Name *" {...register("name")} />
              {errors.name && (
                <div>
                  <Error>{errors.name.message}</Error>
                </div>
              )}
            </div>
          </Col>
          <Col>
            <div>
              <input
                type="email"
                placeholder="Email *"
                {...register("email")}
              />
              {errors.email && (
                <div>
                  <Error>{errors.email.message}</Error>
                </div>
              )}
            </div>
          </Col>
        </Row>

        <div>
          <input
            as="textarea"
            placeholder="Message *"
            rows={3}
            {...register("message")}
          />
          {errors.message && (
            <div>
              <Error>{errors.message.message}</Error>
            </div>
          )}
        </div>
        <Row>
          <Col>
            <button type="submit">
              {(submitting && "Sending..") || "Send"}
            </button>
          </Col>
          <Col>{sent && <Success>Message sent</Success>}</Col>
        </Row>
      </Form>
    </>
  );
};

export default ContactForm;
