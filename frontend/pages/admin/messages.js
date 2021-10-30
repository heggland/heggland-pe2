import { useEffect, useState } from "react";
import Heading from "../../components/Layout/Heading";
import { AdminLayout } from "../../components/Layout/Layout";
import {
  BASE_URL,
  CONTACT_PATH,
  CONTACT_STATE_PATH,
} from "../../constants/api";
import { TITLE_ADMIN_MESSAGES } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

import { Row, Col, P, Span, Button, Header } from "../../styles/common";

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
          console.log(error);
          setError(error);
        }
      }
    }

    return (
      <Button
        variant="danger"
        className="delete"
        onClick={handleDelete}
        data-toggle="tooltip"
        data-placement="top"
        title="Delete message"
      >
        {error ? "Error" : <FontAwesomeIcon icon={Trash} />}
      </Button>
    );
  };

  async function deleteButton(e) {
    e.preventDefault();
    setErrorDelete(null);

    const id = e.target.dataset.id;

    try {
      // checks if id is passed in, if true update item: if false create new item
      let response;
      response = await http.delete(BASE_URL + CONTACT_PATH + id);

      if ((response.status = 200)) {
        const newArray = messages.filter(function (data) {
          return data.id !== response.data.id;
        });
        setMessages(newArray);
      }
    } catch (error) {
      setErrorDelete(error.toString());
      console.log(error);
    }
  }

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
      console.log(error);
    }
  }

  return (
    <AdminLayout title={TITLE_ADMIN_MESSAGES}>
      <Row margin="0 0 0 1rem">
        <Row margin="2rem 0" width="100%">
          <Col size={6}>
            <Header>
              <Heading>Messages</Heading>
            </Header>
          </Col>
        </Row>
        <Col size={11}>
          <Row bg_color="rgb(243 243 243)">
            <Col size={1}>
              <P weight="bold" padding="0 0 0 0.5rem">
                Id
              </P>
            </Col>
            <Col size={2}>
              <P weight="bold">Name</P>
            </Col>
            <Col size={2}>
              <P weight="bold">Email</P>
            </Col>
            <Col size={3}>
              <P weight="bold">Message</P>
            </Col>
            <Col size={2}>
              <P weight="bold">State</P>
            </Col>
            <Col size={2}>
              <Row>
                <Col size={6}>
                  <P weight="bold">Edit</P>
                </Col>
                <Col size={6}>
                  <P weight="bold">Delete</P>
                </Col>
              </Row>
            </Col>
          </Row>
          {error && <span>{error}</span>}
          {errorDelete && <>delete error: {errorDelete}</>}
          <Col box="white-table">
            {(messages.length !== 0 &&
              messages.map(({ id, name, email, message, published_at }) => {
                return (
                  <Row
                    padding="1rem 0 1rem 0"
                    border_size="1"
                    border_color="rgb(243 243 243)"
                    hover="table"
                    key={id}
                  >
                    <Col size={1}>
                      <Span padding="0 0 0 0.5rem">{id}</Span>
                    </Col>
                    <Col size={2}>
                      <Span>{name}</Span>
                    </Col>
                    <Col size={2}>
                      <Span>{email}</Span>
                    </Col>
                    <Col size={3}>
                      <Span>{message}</Span>
                    </Col>
                    <Col size={2}>
                      <Span>
                        <button
                          onClick={updateState}
                          data-id={id}
                          data-state={
                            published_at !== null ? "publish" : "draft"
                          }
                        >
                          {published_at !== null ? "NEW" : "FULFILLED"}
                        </button>
                      </Span>
                    </Col>
                    <Col size={2}>
                      <Row>
                        <Col size={6}>
                          <a href={`message/${id}`}>
                            <FontAwesomeIcon icon={Edit} />
                          </a>
                        </Col>
                        <Col size={6}>
                          <DeleteButton id={id}>
                            <FontAwesomeIcon icon={Trash} />
                          </DeleteButton>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                );
              })) || <span>No messages in the database</span>}
          </Col>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Messages;

// handle id on a reactjs way?
