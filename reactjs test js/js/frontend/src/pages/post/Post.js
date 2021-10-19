import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../logo.svg"; // image template for posts missing image
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import Heading from "../../components/Layout/Heading";
import FormatDate from "../../components/Common/FormatDate";

export default function ViewPost() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const history = useHistory();

  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  useEffect(
    function () {
      async function getPost() {
        try {
          const response = await axios.get(
            BASE_URL + "wp/v2/posts/" + id + "?_embed"
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
    [id]
  );

  if (loading)
    return <Row className="justify-content-center">Loading post...</Row>;

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
                src={
                  post.featured_media !== 0
                    ? post._embedded["wp:featuredmedia"][0].source_url
                    : logo
                }
                alt="{post._embedded['wp:featuredmedia'][0].alt_text}"
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

          <Row className="justify-content-center">
            <Col xs={10} md={8}>
              <Row className="justify-content-between my-5">
                <Row className="justify-content-start text-muted">
                  <Heading
                    size="6"
                    content={
                      post.date === post.modified
                        ? "Published on "
                        : "Modified on"
                    }
                  />
                  <span>&nbsp;</span>
                  <h6>
                    <FormatDate date={post.date} />
                  </h6>
                </Row>
                <Row className="justify-content-end text-muted">
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
