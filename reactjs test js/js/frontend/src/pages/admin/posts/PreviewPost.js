import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../../logo.svg";
import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { BASE_URL } from "../../../constants/api";
import FormatDate from "../../../components/Common/FormatDate";
import Heading from "../../../components/Layout/Heading";
import AuthContext from "../../../context/AuthContext";
import UseAxios from "../../../hooks/useAxios";

export default function PreviewPost() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [auth] = useContext(AuthContext);

  const history = useHistory();

  if (!auth) {
    history.push("/");
  }

  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  const http = UseAxios();

  useEffect(
    function () {
      async function getPost() {
        try {
          const response = await http.get(
            BASE_URL + "wp/v2/posts/" + id + "?status=draft&_embed"
          );

          setPost(response.data);
        } catch (error) {
          console.log(error);
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }

      getPost();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  if (loading)
    return (
      <Row className="justify-content-md-center">
        <div>Loading post...</div>
      </Row>
    );

  if (error) return <div>{}</div>;

  function createMarkup(data) {
    return { __html: data };
  }

  return (
    <Container className="justify-content-md-center">
      <Row className="justify-content-md-center">
        <Col md={10}>
          <Row className="justify-content-md-center">
            <Col md={10}>
              <Row className="justify-content-md-center">
                <Heading content={post.title.rendered} />
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-md-center my-5">
            <Col md={8}>
              <img
                className="w-100"
                alt={post.title}
                src={
                  post.featured_media !== 0
                    ? post._embedded["wp:featuredmedia"][0].source_url
                    : logo
                }
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={10}>
              <div
                className="text-md-center"
                dangerouslySetInnerHTML={createMarkup(post.content.rendered)}
              />
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col md={8}>
              <Row className="justify-content-md-between my-5">
                <Row className="justify-content-md-start text-muted">
                  <Heading size="6" content="Published" />
                  <span>&nbsp;</span>
                  <h6>
                    <FormatDate date={new Date()} />
                  </h6>
                </Row>
                <Row className="justify-content-md-end text-muted">
                  <Heading size="6" content="By" />
                  <span>&nbsp;</span>
                  <Heading size="6" content={post._embedded.author[0].name} />
                </Row>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
