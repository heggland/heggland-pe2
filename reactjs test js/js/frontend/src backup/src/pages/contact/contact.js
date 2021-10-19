import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Heading from "../../components/Layout/Heading";
import Head from "../../components/Layout/Head";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(10, "Name must be atleast 3 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

const Contact = () => {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
    setSent(true);

    // send contact to api
    // make useState on submitting..
    // disable contact form when submitted
  }

  return (
    <>
      <Head title="Contact" />
      <Heading>Contact</Heading>

      <Row className="justify-content-md-center my-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="align-items-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Name *"
                    {...register("name")}
                  />
                  {errors.name && (
                    <div>
                      <span className="mx-2 error">{errors.name.message}</span>
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email *"
                    {...register("email")}
                  />
                  {errors.email && (
                    <div>
                      <span className="error">{errors.email.message}</span>
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Message *"
                rows={3}
                {...register("message")}
              />
              {errors.message && (
                <div>
                  <span className="mx-2 error">{errors.message.message}</span>
                </div>
              )}
            </Form.Group>
            <Row className="align-items-center">
              <Col>
                <Button type="submit" variant="outline-success">
                  Submit
                </Button>
              </Col>
              <Col>
                {sent && <span className="success">Message was sent.</span>}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Contact;
