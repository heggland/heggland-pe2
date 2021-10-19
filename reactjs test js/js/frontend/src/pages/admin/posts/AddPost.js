import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../../components/Common/FormError";
import Heading from "../../../components/Layout/Heading";
import UseAxios from "../../../hooks/useAxios";
import AuthContext from "../../../context/AuthContext";
import FileUpload from "../tools/FileUpload";
import FileDownload from "../tools/FileDownload";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Please enter a title")
    .min(3, "Title must be at least 3 characters long"),
  content: yup
    .string()
    .required("Please enter text")
    .min(6, "Text must be at least 6 characters long"),
  file: yup.mixed(),
});

export default function AddPost() {
  const [fileUpload, setFileUpload] = useState(null);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSave] = useState(false);
  const [serverError, setServerError] = useState(null);

  const [auth] = useContext(AuthContext);

  const history = useHistory();

  if (!auth) {
    history.push("/");
  }

  const http = UseAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleChange(e) {
    const img = URL.createObjectURL(e.target.files[0]);
    setFile(img);
    setFileUpload(e.target.files[0]);
  }

  function resetFile() {
    setFile(false);
  }

  function handleClick() {
    history.goBack();
  }

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    if (fileUpload) {
      data.featured_media = await FileUpload(fileUpload);
    }

    try {
      const response = await http.post("/wp/v2/posts", data);
      if (response.status === 200 || response.status === 201) {
        const comfirm = window.confirm(
          "Open the new post in a seperate window?"
        );
        if (comfirm) {
          window.open("/posts/" + response.data.id, "_blank");
        }
        history.push("/admin");
      }
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  async function onSave(data) {
    setSave(true);
    setServerError(null);

    data.status = "draft";

    if (fileUpload) {
      data.featured_media = await FileUpload(fileUpload);
    }

    try {
      const response = await http.post("/wp/v2/posts", data);
      if (response.status === 200 || response.status === 201) {
        const comfirm = window.confirm(
          "Open the new post in a seperate window?"
        );
        if (comfirm) {
          window.open("/admin/draft/" + response.data.id, "_blank");
        }

        history.push("/admin");
      }
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSave(false);
    }
  }

  // style to popup
  const contentStyle = {
    overflow: "auto",
    height: "80vh",
    textAlign: "center",
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={10}>
          <Row className="justify-content-md-center">
            <Heading content="New post" />
          </Row>

          <Form>
            {serverError && <FormError>{serverError}</FormError>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="font-weight-bold">Title</Form.Label>
              <Form.Control
                {...register("title")}
                type="text"
                name="title"
                placeholder="Title"
                autoComplete="on"
              />
              {errors.title && (
                <Form.Text className="text-muted">
                  {errors.title.message}
                </Form.Text>
              )}
            </Form.Group>

            {file ? (
              <>
                <Form.Group controlId="formFile" className="mb-3 border-none">
                  <Row>
                    <Col>
                      <Form.Label className="font-weight-bold">
                        Header image
                      </Form.Label>
                      <div />
                      <img
                        src={file}
                        alt="preview of file"
                        width="150px"
                        height="150px"
                      />
                      <div className="ml-2" onClick={resetFile}>
                        <Row>
                          <small
                            className="btn btn-sm font-weight-bold"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Click me to upload a new image"
                          >
                            Set a new image?
                          </small>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Form.Group>
              </>
            ) : (
              <Form.Group className="mb-3">
                <Form.Group controlId="formFile">
                  <Form.Label className="font-weight-bold">
                    Header image
                  </Form.Label>
                </Form.Group>
                <Popup
                  trigger={
                    <Button variant="outline-primary">Choose File</Button>
                  }
                  modal
                  nested
                >
                  <Row>
                    <Col>
                      <Form.Label className="font-weight-bold">
                        Upload a image
                      </Form.Label>
                      <Form.Control
                        className="border-0"
                        type="file"
                        {...register("file")}
                        name="file"
                        onChange={handleChange}
                        accept="image/png, image/jpeg"
                      />
                    </Col>
                    <Col>
                      <Row>
                        <Form.Label className="font-weight-bold">
                          <strike>Choose an image from the cloud</strike>
                        </Form.Label>
                      </Row>
                      <Row>
                        <Popup
                          trigger={
                            <div>
                              <Button variant="outline-primary">Choose</Button>{" "}
                              <small>
                                &nbsp; &nbsp; Not finished yet, only shows
                                gallery
                              </small>
                            </div>
                          }
                          modal
                          nested
                          {...{
                            contentStyle,
                          }}
                        >
                          <FileDownload />
                        </Popup>
                      </Row>
                    </Col>
                  </Row>
                </Popup>
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="font-weight-bold">Content</Form.Label>
              <Form.Control
                as="textarea"
                {...register("content")}
                type="text"
                name="content"
                placeholder="Content"
                autoComplete="on"
              />
              {errors.content && (
                <Form.Text className="text-muted">
                  {errors.content.message}
                </Form.Text>
              )}
            </Form.Group>
            <Container>
              <Row className="justify-content-md-center my-4">
                <Col xs={2}>
                  {submitting ? (
                    <Button
                      className="mr-2 w-100"
                      variant="success"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Submitting...
                    </Button>
                  ) : (
                    <Button
                      className="mr-2 w-100"
                      variant="success"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Publish
                    </Button>
                  )}
                </Col>
                <Col xs={2}>
                  {saving ? (
                    <Button
                      className="ml-2 w-100"
                      variant="warning"
                      onClick={handleSubmit(onSave)}
                    >
                      Saving...
                    </Button>
                  ) : (
                    <Button
                      className="ml-2 w-100"
                      variant="warning"
                      onClick={handleSubmit(onSave)}
                    >
                      Save
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="justify-content-md-center my-4">
                <Button variant="danger" onClick={handleClick}>
                  Close
                </Button>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
