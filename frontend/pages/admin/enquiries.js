import axios from "axios";
import { useEffect, useState } from "react";
import Heading from "../../components/Layout/Heading";
import { AdminLayout } from "../../components/Layout/Layout";
import {
  BASE_URL,
  ENQUIRIES_PATH,
  ENQUIRIES_STATE_PATH,
} from "../../constants/api";
import { TITLE_ADMIN_ENQUIRIES } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

import {
  Row,
  Col,
  P,
  Span,
  Button,
  Header,
} from "../../components/Common/Styles/Common";

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
      <Row margin={30}>
        <Col size={6}>
          <Header>
            <Heading>User enquiries</Heading>
          </Header>
        </Col>
      </Row>
      <Col size={12}>
        <Row bg_color="rgb(243 243 243)">
          <Col size={1}>
            <P weight="bold" padding_left={10}>
              Id
            </P>
          </Col>
          <Col size={3}>
            <P weight="bold">Name</P>
          </Col>
          <Col size={2}>
            <P weight="bold">Hotel</P>
          </Col>
          <Col size={2}>
            <P weight="bold">Email</P>
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
        {(enquiries.length !== 0 &&
          enquiries.map(({ id, name, email, published_at, hotel_id }) => {
            return (
              <Row
                margin={20}
                padding_bottom={18}
                border_size="1"
                border_color="rgb(243 243 243)"
                key={id}
              >
                <Col size={1}>
                  <Span padding_left={10}>{id}</Span>
                </Col>

                <Col size={3}>
                  <Span>{name}</Span>
                </Col>
                <Col size={2}>
                  <Span>{hotel_id[0].name}</Span>
                </Col>
                <Col size={2}>
                  <Span>{email}</Span>
                </Col>
                <Col size={2}>
                  <Span>
                    <button
                      onClick={updateState}
                      data-id={id}
                      data-state={published_at !== null ? "publish" : "draft"}
                    >
                      {published_at !== null ? "NEW" : "FULFILLED"}
                    </button>
                  </Span>
                </Col>
                <Col size={2}>
                  <Row>
                    <Col size={6}>
                      <a href={`enquirie/${id}`}>
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
          })) || <span>No enquiries in the database</span>}
      </Col>
    </AdminLayout>
  );
};

export default Enquiries;
