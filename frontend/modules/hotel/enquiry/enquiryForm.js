import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import { Form, Row, Col, Error, Success } from "./EnquiryForm.style";
import axios from "axios";
import { BASE_URL, ENQUIRIES_PATH } from "../../../constants/api";
import { ENQUIRY_SCHEMA } from "../../../constants/schema";

const EnquiryForm = ({ hotelId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [sent, setSent] = useState(false);

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

    data.hotel_id = hotelId;

    console.log(data);

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
    <>
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
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
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
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
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
    </>
  );
};

export default EnquiryForm;
