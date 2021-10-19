import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../../components/Common/FormError";
import Heading from "../../../components/Layout/Heading";
import UseAxios from "../../../hooks/useAxios";
import AuthContext from "../../../context/AuthContext";
import FileUpload from "../tools/FileUpload";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FileDownload from "../tools/FileDownload";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  file: yup.mixed(),
});

export default function EditPost() {
  const [file, setFile] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [post, setPost] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const [auth] = useContext(AuthContext);

  const history = useHistory();

  if (!auth) {
    history.push("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = UseAxios();

  let { id } = useParams();

  const url = `wp/v2/posts/${id}`;

  useEffect(
    function () {
      async function getPost() {
        try {
          const response = await http.get(url + "?_embed");
          setPost(response.data);
          if (response.data.featured_media) {
            setFile(true);
          }
        } catch (error) {
          console.log(error);
          setFetchError(error.toString());
        } finally {
          setFetchingPost(false);
        }
      }

      getPost();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function onSubmit(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);

    if (fileUpload) {
      data.featured_media = await FileUpload(fileUpload);
    }

    try {
      const response = await http.put(url, data);
      if (response.status === 200 || response.status === 201) {
        setUpdated(true);
      }
      setUpdated(true);
    } catch (error) {
      setUpdateError(error.toString());
    } finally {
      setUpdatingPost(false);
    }
  }

  if (fetchingPost)
    return <Row className="justify-content-center">Loading...</Row>;

  if (fetchError) return <div>Error loading post</div>;

  function handleChange(e) {
    const img = URL.createObjectURL(e.target.files[0]);
    setFile(img);
    setFileUpload(e.target.files[0]);
  }

  function resetFile() {
    setFile(false);
    setFileUpload(false);
  }

  function handleClick() {
    history.goBack();
  }

  let link = "/posts/" + id;
  if (post.status === "draft") {
    link = "/admin/draft/" + id;
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
          <Row className="justify-content-center">
            <Heading content="Edit post" />
          </Row>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {updated && post.status === "publish" ? (
              <div className="success justify-content-center">
                The post was updated. Click
                <a href={link} target="_blank" rel="noreferrer">
                  &nbsp;here&nbsp;
                </a>
                to go to the post.
              </div>
            ) : updated && post.status === "draft" ? (
              <div className="success justify-content-center">
                The post was saved. Click
                <a href={link} target="_blank" rel="noreferrer">
                  &nbsp;here&nbsp;
                </a>
                to preview the post.
              </div>
            ) : (
              ""
            )}

            {updateError && <FormError>{updateError}</FormError>}
            <fieldset disabled={updatingPost}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-weight-bold">Title</Form.Label>
                <Form.Control
                  {...register("title")}
                  type="text"
                  name="title"
                  placeholder="Title"
                  autoComplete="on"
                  defaultValue={post.title.rendered}
                />
                {errors.title && (
                  <Form.Text className="text-muted">
                    {errors.title.message}
                  </Form.Text>
                )}
              </Form.Group>

              {file && !fileUpload ? (
                <>
                  <Form.Group controlId="formFile" className="mb-3 border-none">
                    <Row>
                      <Col>
                        <Form.Label className="font-weight-bold">
                          Header image
                        </Form.Label>
                        <div />
                        <img
                          src={
                            post._embedded["wp:featuredmedia"][0].media_details
                              .sizes.thumbnail.source_url
                          }
                          alt={post._embedded["wp:featuredmedia"][0].alt_text}
                          className="btn"
                          onClick={resetFile}
                        />
                        <div className="ml-2" onClick={resetFile}>
                          <Row>
                            <small
                              className="btn btn-sm font-weight-bold ml-3"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Click me to upload a new image"
                            >
                              Upload a new image?
                            </small>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                </>
              ) : !fileUpload ? (
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
                                <Button variant="outline-primary">
                                  Choose
                                </Button>
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
              ) : (
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
                        className="btn"
                        onClick={resetFile}
                      />
                      <div className="ml-2" onClick={resetFile}>
                        <Row>
                          <small
                            className="btn btn-sm font-weight-bold ml-3"
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
              )}

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="font-weight-bold">Content</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("content")}
                  type="text"
                  name="content"
                  placeholder="Content"
                  defaultValue={post.content.rendered}
                  rows="10"
                />

                {errors.content && (
                  <Form.Text className="text-muted">
                    {errors.content.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Container>
                <Row className="justify-content-center my-4">
                  {post.status === "publish" ? (
                    <Button variant="outline-success" type="submit">
                      Submit Edit
                    </Button>
                  ) : (
                    <Button variant="outline-success" type="submit">
                      Save Edit
                    </Button>
                  )}
                </Row>
              </Container>
            </fieldset>
          </Form>
          <Row className="justify-content-center">
            <Button variant="outline-danger" onClick={handleClick}>
              Close
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
