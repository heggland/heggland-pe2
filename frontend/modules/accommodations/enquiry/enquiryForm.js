import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import Error from "../../../modules/error/error";

import * as Style from "./EnquiryForm.style";
import Container from "../../../components/Container/Container";
import Col from "../../../components/Col/Col";
import Row from "../../../components/Row/Row";
import axios from "axios";
import { BASE_URL, ENQUIRIES_PATH } from "../../../constants/api";
import { ENQUIRY_SCHEMA } from "../../../constants/schema";

const EnquiryForm = ({ accommodation }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  // default rooms, people values. future improvements - make dynamic with a new database for rooms on each accommodation
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
    setError(null);

    data.accommondation_id = accommodation;

    try {
      const response = await axios.post(BASE_URL + ENQUIRIES_PATH, data);

      setSubmitting(false);
      setSent(true);
    } catch (error) {
      setError(error.toString());
    }
  }

  return (
    <Container padding="20px">
      <Style.Form onSubmit={handleSubmit(onSubmit)}>
        <Row margin="10px 0 30px 0">
          <Col xs={12}>
            <Style.Input
              type="text"
              placeholder="Name *"
              autoFocus
              {...register("name")}
            />
            {errors.name && (
              <div>
                <Style.Error>{errors.name.message}</Style.Error>
              </div>
            )}
          </Col>
        </Row>
        <Row margin="10px 0 30px 0">
          <Col xs={5.5}>
            <Style.Input
              type="email"
              placeholder="Email *"
              {...register("email")}
            />
            {errors.email && <Style.Error>{errors.email.message}</Style.Error>}
          </Col>
          <Col xs={1} />
          <Col xs={5.5}>
            <Style.Input
              type="text"
              placeholder="Phone *"
              {...register("phone")}
            />
            {errors.phone && (
              <div>
                <Style.Error>
                  {(errors.phone.message.includes("NaN") &&
                    "Please enter phone number") ||
                    errors.phone.message}
                </Style.Error>
              </div>
            )}
          </Col>
        </Row>
        <Style.Group>
          <Row margin="10px 0 30px 0">
            <Col xs={5.5}>
              <Row>
                <Col xs={6}>
                  <label htmlFor="people">People </label>
                </Col>
                <Col xs={1} />
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
            <Col xs={1} />
            <Col xs={5.5}>
              <Row>
                <Col xs={6}>
                  <label htmlFor="rooms">Rooms </label>
                </Col>
                <Col xs={1} />
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
        <Row margin="10px 0 30px 0" justifyContent="center">
          <Col xs={5.5}>
            <Style.Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date_from")}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            {errors.date_from && (
              <div>
                <Style.Error>
                  {(errors.date_from.message.includes("type") &&
                    "Please choose a date") ||
                    errors.date_from.message}
                </Style.Error>
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
                <Style.Error>
                  {(errors.date_to.message.includes("type") &&
                    "Please choose a date") ||
                    errors.date_to.message}
                </Style.Error>
              </div>
            )}
          </Col>
        </Row>
        <Row margin="10px 0 30px 0">
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

        {error && <Error string={error} path="enquirie" />}
        <Row margin="10px 0 30px 0" justifyContent="center">
          {sent && (
            <Style.Thanks>
              <Row justifyContent="center" margin="-10px 0 0 0">
                Thank you for your order
              </Row>
            </Style.Thanks>
          )}
          <Col>
            {(!sent && (
              <Style.Button
                type="submit"
                disabled={(error && true) || false}
                error={(error && true) || false}
                sent={(sent && true) || false}
              >
                {(sent && "Sent") ||
                  (error && "error") ||
                  (submitting && "Sending..") ||
                  "Send"}
              </Style.Button>
            )) || <Style.SentButton>Sent</Style.SentButton>}
          </Col>
        </Row>
      </Style.Form>
    </Container>
  );
};

export default EnquiryForm;
