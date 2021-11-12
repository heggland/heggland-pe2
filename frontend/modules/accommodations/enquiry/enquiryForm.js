import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import { Form, Error, Success } from "./EnquiryForm.style";
import Container from "../../../components/Container/Container";
import Col from "../../../components/Col/Col";
import Row from "../../../components/Row/Row";
import axios from "axios";
import { BASE_URL, ENQUIRIES_PATH } from "../../../constants/api";
import { ENQUIRY_SCHEMA } from "../../../constants/schema";

const EnquiryForm = ({ accommondationId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [sent, setSent] = useState(false);

  const rooms = 10;
  const people = 20;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ENQUIRY_SCHEMA),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setFormError(null);

    data.accommondation_id = accommondationId;

    try {
      const response = await axios.post(BASE_URL + ENQUIRIES_PATH, data);
      console.log(response);
      setSubmitting(false);
      setSent(true);
    } catch (error) {
      setFormError(error.toString());
    }
  }

  return (
    <Container padding="20px">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formError && <Error>{formError}</Error>}
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
            <input type="email" placeholder="Email *" {...register("email")} />
            {errors.email && (
              <div>
                <Error>{errors.email.message}</Error>
              </div>
            )}
          </div>
        </Col>
        <Col>
          <div>
            <input type="text" placeholder="Phone *" {...register("phone")} />
            {errors.phone && (
              <div>
                <Error>
                  {(errors.phone.message.includes("NaN") && (
                    <>Please enter digits only</>
                  )) ||
                    errors.phone.message}
                </Error>
              </div>
            )}
          </div>
        </Col>
        <Col>
          <div>
            <label htmlFor="people">People </label>
            <select name="people" defaultValue="1" {...register("people")}>
              {[...Array(people).keys()].map((i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.people && (
              <div>
                <Error>{errors.people.message}</Error>
              </div>
            )}
          </div>
        </Col>
        <Col>
          <div>
            <label htmlFor="rooms">Rooms </label>
            <select name="rooms" defaultValue="1" {...register("rooms")}>
              {[...Array(rooms).keys()].map((i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {errors.rooms && (
              <div>
                <Error>{errors.rooms.message}</Error>
              </div>
            )}
          </div>
        </Col>
        <Col>
          <div>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date_from")}
            />
            {errors.date_from && (
              <div>
                <Error>{errors.date_from.message}</Error>
              </div>
            )}
          </div>
        </Col>
        <Col>
          <div>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date_to")}
            />
            {errors.date_to && (
              <div>
                <Error>{errors.date_to.message}</Error>
              </div>
            )}
          </div>
        </Col>

        <div>
          <input
            as="textarea"
            placeholder="Additional message *"
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
    </Container>
  );
};

export default EnquiryForm;
