import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import UseAxios from "../../hooks/useAxios";
import Editbutton from "./tools/EditButtons";
import DeleteButton from "./tools/DeleteButton";
import StatusButton from "./tools/StatusButton";
import TitleLink from "./tools/TitleLink";
import { StatusProvider as PostProvider } from "../../context/StatusContext";
import PostDate from "./tools/PostDate";

export default function GetPanelContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = UseAxios();
  useEffect(function () {
    async function getPostsList() {
      try {
        // info regarding usage of ?per_page=100 wordpress pagination method should be used in final build
        const response = await axios.get(
          BASE_URL + "wp/v2/posts?per_page=100&_embed"
        );
        const responseDraft = await http.get(
          BASE_URL + "wp/v2/posts?status=draft&per_page=100&_embed"
        );
        const data = response.data.reverse().concat(responseDraft.data);

        setPosts(data.reverse());
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getPostsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <Row className="justify-content-md-center">
        <div>Loading posts...</div>
      </Row>
    );

  if (error) return <div>{}</div>;
  return (
    <>
      {posts.map((content) => {
        return (
          <PostProvider
            key={content.id}
            className="border-bottom"
            status={content.status}
          >
            <Row className="my-5" id={"item-" + content.id}>
              <Col xs={5} md={3} className="align-self-center">
                <TitleLink id={content.id} status={content.status}>
                  {content.title.rendered}
                </TitleLink>
              </Col>
              <Col md={2} className="align-self-center d-none d-md-block">
                {content._embedded.author[0].name}
              </Col>
              <Col md={2} className="align-self-center d-none d-md-block">
                <PostDate date={content.date} modifiedDate={content.modified} />
              </Col>
              <Col xs={2} md={2} className="align-self-center">
                <Row className="justify-content-center">
                  <StatusButton
                    status={content.status}
                    identity={content.id}
                    title={content.title.rendered}
                  />
                </Row>
              </Col>
              <Col className="align-self-center">
                <Row>
                  <Col>
                    <Row className="justify-content-center">
                      <Editbutton type="edit" id={content.id}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Editbutton>
                    </Row>
                  </Col>
                  <Col>
                    <Row className="justify-content-center">
                      <DeleteButton id={content.id}>
                        <FontAwesomeIcon icon={faTrash} />
                      </DeleteButton>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </PostProvider>
        );
      })}
    </>
  );
}
