import axios from "axios";
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

import { P, Span, Button, Header } from "../../styles/common";
import Col from "../../components/Col/Col";
import Row from "../../components/Row/Row";

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
        setEnquiries(response.data);
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  console.log(enquiries);

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
        title="Delete enquirie"
      >
        {error ? "Error" : <FontAwesomeIcon icon={Trash} />}
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

    const updatedEnquiries = enquiries;

    console.log(updatedEnquiries);
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
      //setError(error.toString());
      console.log(error);
    }
  }

  return (
    <AdminLayout title={TITLE_ADMIN_ENQUIRIES}>
      <Row margin="0 0 0 1rem">
        <Row margin="2rem 0" width="100%">
          <Col md={11}>
            <Header>
              <Heading>User enquiries</Heading>
            </Header>
          </Col>
        </Row>
        <Col xs={12} md={11}>
          <Row backgroundColor="rgb(243 243 243)">
            <Col xs={1} md={1}>
              <P weight="bold" padding="0 0 0 0.5rem">
                Id
              </P>
            </Col>
            <Col xs={2} md={3}>
              <P weight="bold">Name</P>
            </Col>
            <Col xs={2} md={2}>
              <P weight="bold">Accommodation</P>
            </Col>
            <Col xs={2} md={2}>
              <P weight="bold">Email</P>
            </Col>
            <Col xs={2} md={2}>
              <P weight="bold">State</P>
            </Col>
            <Col xs={2} md={2}>
              <Row>
                <Col xs={6} md={6}>
                  <P weight="bold">Edit</P>
                </Col>
                <Col xs={6} md={6}>
                  <P weight="bold">Delete</P>
                </Col>
              </Row>
            </Col>
          </Row>
          {error && <span>{error}</span>}
          <Col box="white-table">
            {(enquiries.length !== 0 &&
              enquiries.map(
                ({ id, name, email, published_at, accommondation_id }) => {
                  return (
                    <Row
                      padding="1rem 0 1rem 0"
                      borderColor="rgb(243 243 243 / 70%)"
                      hover="rgb(243 243 243 / 70%)"
                      key={id}
                    >
                      <Col xs={1} md={1}>
                        <Span padding="0 0 0 0.5rem">{id}</Span>
                      </Col>

                      <Col xs={2} md={3}>
                        <Span>{name}</Span>
                      </Col>
                      <Col xs={2} md={2}>
                        <Span>
                          {(accommondation_id.length !== 0 &&
                            accommondation_id[0].name) ||
                            "Invalid"}
                        </Span>
                      </Col>
                      <Col xs={2} md={2}>
                        <Span>{email}</Span>
                      </Col>
                      <Col xs={2} md={2}>
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
                      <Col xs={2} md={2}>
                        <Row>
                          <Col xs={6} md={6}>
                            <a href={`enquirie/${id}`}>
                              <FontAwesomeIcon icon={Edit} />
                            </a>
                          </Col>
                          <Col xs={6} md={6}>
                            <DeleteButton id={id}>
                              <FontAwesomeIcon icon={Trash} />
                            </DeleteButton>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                }
              )) || <span>No enquiries in the database</span>}
          </Col>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Enquiries;
