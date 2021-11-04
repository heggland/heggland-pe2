import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import * as Style from "./contactForm.style";
import axios from "axios";
import { BASE_URL, CONTACT_PATH } from "../../../constants/api";
import { CONTACT_SCHEMA } from "../../../constants/schema";
import { Col, Row } from "../../../styles/common";

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
      <Style.Form onSubmit={handleSubmit(onSubmit)}>
        {formError && <Error>{formError}</Error>}
        <Row>
          <Col>
            <Style.FormGroup>
              <Style.InputField
                type="text"
                placeholder="Name *"
                {...register("name")}
              />
              {errors.name && (
                <div>
                  <Error>{errors.name.message}</Error>
                </div>
              )}
            </Style.FormGroup>
          </Col>
          <Col>
            <Style.FormGroup>
              <Style.InputField
                type="email"
                placeholder="Email *"
                {...register("email")}
              />
              {errors.email && (
                <div>
                  <Error>{errors.email.message}</Error>
                </div>
              )}
            </Style.FormGroup>
          </Col>
        </Row>

        <Style.FormGroup>
          <Style.InputTextArea
            as="textarea"
            placeholder="Message *"
            rows={3}
            {...register("message")}
          />
          {errors.message && (
            <div>
              <Style.Error>{errors.message.message}</Style.Error>
            </div>
          )}
        </Style.FormGroup>
        <Row>
          <Col>
            <button type="submit">
              {(submitting && "Sending..") || "Send"}
            </button>
          </Col>
          <Col>{sent && <Style.Success>Message sent</Style.Success>}</Col>
        </Row>
      </Style.Form>
    </>
  );
};

export default ContactForm;
