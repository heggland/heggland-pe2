import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import * as Style from "./EnquiryForm.style";
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
      <Style.Form onSubmit={handleSubmit(onSubmit)}>
        {formError && <Error>{formError}</Error>}
        <Row>
          <Style.Input type="text" placeholder="Name *" {...register("name")} />
          {errors.name && (
            <div>
              <Style.Error>{errors.name.message}</Style.Error>
            </div>
          )}
        </Row>
        <Row>
          <Col xs={6}>
            <Style.Input
              type="email"
              placeholder="Email *"
              {...register("email")}
            />
            {errors.email && (
              <div>
                <Style.Error>{errors.email.message}</Style.Error>
              </div>
            )}
          </Col>
          <Col xs={6}>
            <Style.Input
              type="text"
              placeholder="Phone *"
              {...register("phone")}
            />
            {errors.phone && (
              <div>
                <Style.Error>
                  {(errors.phone.message.includes("NaN") && (
                    <>Please enter digits only</>
                  )) ||
                    errors.phone.message}
                </Style.Error>
              </div>
            )}
          </Col>
        </Row>
        <Style.Group>
          <Row>
            <Col xs={6}>
              <Row>
                <Col xs={5}>
                  <label htmlFor="people">People </label>
                </Col>
                <Col>
                  <select
                    name="people"
                    defaultValue="1"
                    {...register("people")}
                  >
                    {[...Array(people).keys()].map((i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
              {errors.people && (
                <div>
                  <Style.Error>{errors.people.message}</Style.Error>
                </div>
              )}
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={5}>
                  <label htmlFor="rooms">Rooms </label>
                </Col>
                <Col>
                  <select name="rooms" defaultValue="1" {...register("rooms")}>
                    {[...Array(rooms).keys()].map((i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
              {errors.rooms && (
                <div>
                  <Style.Error>{errors.rooms.message}</Style.Error>
                </div>
              )}
            </Col>
          </Row>
        </Style.Group>
        <Row justifyContent="center">
          <Col xs={5.5}>
            <Style.Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date_from")}
            />
            {errors.date_from && (
              <div>
                <Style.Error>{errors.date_from.message}</Style.Error>
              </div>
            )}
          </Col>
          <Col xs={1} />
          <Col xs={5.5}>
            <Style.Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date_to")}
            />
            {errors.date_to && (
              <div>
                <Style.Error>{errors.date_to.message}</Style.Error>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Style.Textarea
            as="textarea"
            placeholder="Additional message *"
            rows={3}
            {...register("message")}
          />
          {errors.message && (
            <div>
              <Style.Error>{errors.message.message}</Style.Error>
            </div>
          )}
        </Row>
        <Row>
          <Col>
            <button type="submit">
              {(submitting && "Sending..") || "Send"}
            </button>
          </Col>
          <Col>{sent && <Style.Success>Message sent</Style.Success>}</Col>
        </Row>
      </Style.Form>
    </Container>
  );
};

export default EnquiryForm;
