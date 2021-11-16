import { useEffect, useState } from "react";
import Heading from "../../components/Common/Heading";
import { AdminLayout } from "../../components/Layout/Layout";
import {
  BASE_URL,
  CONTACT_PATH,
  CONTACT_STATE_PATH,
} from "../../constants/api";
import { TITLE_ADMIN_MESSAGES } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

import Col from "../../components/Col/Col";
import Row from "../../components/Row/Row";
import Button from "../../components/Button/Button";
import Span from "../../components/Span/Span";
import Paragraph from "../../components/Paragraph/Paragraph";
import ViewMessage from "../../modules/admin/viewMessage/viewMessage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as Trash,
  faPencilAlt as Edit,
} from "@fortawesome/free-solid-svg-icons";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [errorDelete, setErrorDelete] = useState(null);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(BASE_URL + CONTACT_STATE_PATH);
        setMessages(response.data);
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  const DeleteButton = ({ id }) => {
    const [error, setError] = useState(null);

    async function handleDelete() {
      const confirmDelete = window.confirm("Delete this message?");

      if (confirmDelete) {
        try {
          const response = await http.delete(BASE_URL + CONTACT_PATH + id);

          if ((response.status = 200 && response.statusText === "OK")) {
            const newArray = messages.filter(function (data) {
              return data.id !== response.data.id;
            });
            setMessages(newArray);
          }
        } catch (error) {
          setError(error);
        }
      }
    }

    return (
      <Button
        variant="danger"
        data-toggle="tooltip"
        data-placement="top"
        title="Delete message"
      >
        {error ? (
          "Error"
        ) : (
          <FontAwesomeIcon onClick={handleDelete} icon={Trash} />
        )}
      </Button>
    );
  };

  async function updateState(e) {
    e.preventDefault();

    const id = Number(e.target.dataset.id);
    const state = e.target.dataset.state;

    const data = new Object();

    const newState =
      state === "publish" ? null : state === "draft" && new Date();
    data.published_at = newState;
    data.id = id;

    const updatedMessages = messages;

    try {
      const response = await http.put(
        BASE_URL + CONTACT_PATH + id + "?_publicationState=preview",
        data
      );
      if ((response.status = 200)) {
        for (let i = 0; i < updatedMessages.length; i++) {
          if (updatedMessages[i].id === id) {
            updatedMessages[i].published_at = newState;
            setMessages([]);
            setMessages(updatedMessages);
            break;
          }
        }
      }
    } catch (error) {
      //setError(error.toString());
      //console.log(error);
    }
  }

  return (
    <AdminLayout title={TITLE_ADMIN_MESSAGES}>
      <Row margin="0 1rem 0 1rem">
        <Row margin="2rem 0" width="100%">
          <Col md={6}>
            <Row>
              <Heading>Visitor messages</Heading>
            </Row>
          </Col>
        </Row>
        <Col xs={12} md={11}>
          <Row backgroundColor="rgb(243 243 243)" xs="none">
            <Col sm={1}>
              <Paragraph weight="bold" padding="0 0 0 0.5rem">
                Id
              </Paragraph>
            </Col>
            <Col sm={2}>
              <Paragraph weight="bold">Name</Paragraph>
            </Col>
            <Col sm={2}>
              <Paragraph weight="bold">Email</Paragraph>
            </Col>
            <Col sm={3}>
              <Paragraph weight="bold">Message</Paragraph>
            </Col>
            <Col sm={2}>
              <Paragraph weight="bold">State</Paragraph>
            </Col>
            <Col sm={2}>
              <Row>
                <Col sm={6}>
                  <Paragraph weight="bold">Edit</Paragraph>
                </Col>
                <Col sm={6}>
                  <Paragraph weight="bold">Delete</Paragraph>
                </Col>
              </Row>
            </Col>
          </Row>
          {error && <span>{error}</span>}
          {errorDelete && <>delete error: {errorDelete}</>}
          <Col box="white-table">
            {(messages.length !== 0 &&
              messages.map(
                ({
                  id,
                  name,
                  email,
                  message,
                  created_at,
                  published_at,
                  updated_at,
                }) => {
                  return (
                    <Row
                      padding="1rem 0 1rem 0"
                      borderColor="rgb(243 243 243)"
                      hover="rgb(243 243 243 / 70%)"
                      alignItemsSm="center"
                      direction="column-mobile"
                      key={id}
                    >
                      <Col xs={11} sm={1}>
                        <Row>
                          <Col xs={3} sm="none">
                            Id:
                          </Col>
                          <Col>
                            <Span padding="0 0 0 0.5rem">{id}</Span>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={11} sm={2}>
                        <Row>
                          <Col xs={3} sm="none">
                            Name:
                          </Col>
                          <Col>
                            <Span>{name}</Span>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={11} sm={2}>
                        <Row>
                          <Col xs={3} sm="none">
                            Email:
                          </Col>
                          <Col>
                            <Span>{email}</Span>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={11} sm={3}>
                        <Row>
                          <Col xs={3} sm="none">
                            Message:
                          </Col>
                          <Col>
                            <ViewMessage
                              id={id}
                              name={name}
                              content={message}
                              created={created_at}
                              published={published_at}
                              updated={updated_at}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={11} sm={2}>
                        <Row>
                          <Col xs={3} sm="none">
                            State:
                          </Col>
                          <Col>
                            <Span>
                              <button
                                onClick={updateState}
                                data-id={id}
                                data-state={
                                  published_at !== null ? "publish" : "draft"
                                }
                              >
                                {published_at !== null ? "NEW" : "Read"}
                              </button>
                            </Span>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={11} sm={2}>
                        <Row>
                          <Col xs="none" sm={6}>
                            <a href={`message/${id}`}>
                              <FontAwesomeIcon icon={Edit} />
                            </a>
                          </Col>
                          <Col xs={3} sm="none">
                            Delete:
                          </Col>
                          <Col sm={6}>
                            <DeleteButton id={id}>
                              <FontAwesomeIcon icon={Trash} />
                            </DeleteButton>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                }
              )) || <span>No messages in the database</span>}
          </Col>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Messages;
