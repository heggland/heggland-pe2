import { useEffect, useState } from "react";
import Heading from "../../components/Common/Heading";
import { AdminLayout } from "../../components/Layout/Layout";
import {
  BASE_URL,
  ENQUIRIES_PATH,
  ENQUIRIES_STATE_PATH,
} from "../../constants/api";
import { TITLE_ADMIN_ENQUIRIES } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

import Error from "../../modules/error/error";

import Col from "../../components/Col/Col";
import Row from "../../components/Row/Row";
import Button from "../../components/Button/Button";
import Span from "../../components/Span/Span";
import Paragraph from "../../components/Paragraph/Paragraph";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as Trash,
  faPencilAlt as Edit,
} from "@fortawesome/free-solid-svg-icons";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(BASE_URL + ENQUIRIES_STATE_PATH);
        const sortedResponse = response.data.sort((a, b) => {
          return a.id - b.id;
        });
        setEnquiries(sortedResponse);
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  const DeleteButton = ({ id }) => {
    const [error, setError] = useState(null);

    async function handleDelete() {
      const confirmDelete = window.confirm("Delete this enquirie?");
      if (confirmDelete) {
        try {
          const response = await http.delete(BASE_URL + ENQUIRIES_PATH + id);

          if ((response.status = 200 && response.statusText === "OK")) {
            const newArray = enquiries.filter(function (data) {
              return data.id !== response.data.id;
            });
            setEnquiries(newArray);
          }
        } catch (error) {
          setError(error);
        }
      }
    }

    return (
      <Button
        data-toggle="tooltip"
        data-placement="top"
        title="Delete enquirie"
      >
        {error ? (
          "Error"
        ) : (
          <FontAwesomeIcon onClick={handleDelete} icon={Trash} />
        )}
      </Button>
    );
  };

  function UpdateButton({ id, state }) {
    const [error, setError] = useState(null);
    const data = new Object();

    const newState = (state === null && new Date()) || null;
    data.published_at = newState;
    data.id = id;

    const updatedEnquiries = enquiries;

    async function handleUpdate() {
      try {
        const response = await http.put(BASE_URL + ENQUIRIES_PATH + id, data);
        if ((response.status = 200)) {
          for (let i = 0; i < updatedEnquiries.length; i++) {
            if (updatedEnquiries[i].id === id) {
              updatedEnquiries[i].published_at = newState;
              setEnquiries([]);
              setEnquiries(updatedEnquiries);
              break;
            }
          }
        }
      } catch (error) {
        setError(error.toString());
      }
    }

    return (
      <Span>
        <button onClick={handleUpdate}>
          {!error && state !== null ? "NEW" : "Read" || "error"}
        </button>
      </Span>
    );
  }

  return (
    <AdminLayout title={TITLE_ADMIN_ENQUIRIES}>
      <Row margin="0 1rem 0 1rem">
        <Row margin="2rem 0" width="100%">
          <Col md={11}>
            <Row>
              <Heading>User enquiries</Heading>
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
            <Col sm={2} overflow="hidden">
              <Paragraph weight="bold">Email</Paragraph>
            </Col>
            <Col sm={3} overflow="hidden">
              <Paragraph weight="bold">Accommodation</Paragraph>
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
          <Col box="white-table">
            {(enquiries.length !== 0 &&
              enquiries.map(
                ({ id, name, email, published_at, accommondation_id }) => {
                  return (
                    <Row
                      padding="1rem 0 1rem 0"
                      borderColor="rgb(243 243 243 / 70%)"
                      hover="rgb(243 243 243 / 70%)"
                      direction="column-mobile"
                      key={id}
                    >
                      <Col xs={11} sm={1}>
                        <Row>
                          <Col xs={3} sm="none">
                            Id:
                          </Col>
                          <Col sm={1}>
                            <Span padding="0 0 0 0.5rem">{id}</Span>
                          </Col>
                        </Row>
                      </Col>

                      <Col xs={11} sm={2}>
                        <Row>
                          <Col xs={3} sm="none">
                            Name:
                          </Col>
                          <Col overflow="hidden">
                            <Span>{name}</Span>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={11} sm={2}>
                        <Row>
                          <Col xs={3} sm="none">
                            Email:
                          </Col>
                          <Col overflow="hidden">
                            <Span>{email}</Span>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={11} sm={3}>
                        <Row>
                          <Col xs={3} sm="none">
                            Accom:
                          </Col>
                          <Col overflow="hidden">
                            <Span>
                              {(accommondation_id.length !== 0 &&
                                accommondation_id[0].name) ||
                                "Invalid"}
                            </Span>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={11} sm={2}>
                        <Row>
                          <Col xs={3} sm="none">
                            State:
                          </Col>
                          <Col>
                            <UpdateButton id={id} state={published_at} />
                          </Col>
                        </Row>
                      </Col>
                      <Col sm={2}>
                        <Row>
                          <Col xs="none" sm={6}>
                            <a href={`enquirie/${id}`}>
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
              )) ||
              (error && <Error string={error} />) || (
                <span>No enquiries in the database</span>
              )}
          </Col>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Enquiries;
