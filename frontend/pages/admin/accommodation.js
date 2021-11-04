import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "../../components/Layout/Layout";
import {
  BASE_URL,
  ACCOMMONDATION_PATH,
  ACCOMMONDATION_STATE_PATH,
} from "../../constants/api";
import { TITLE_ADMIN_ACCOMMONDATION } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

import Heading from "../../components/Common/Heading";
import {
  Row,
  Col,
  P,
  Span,
  Button,
  Placement,
  LinkHover,
  Header,
} from "../../styles/common";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as Trash,
  faPencilAlt as Edit,
  faPlusCircle as Plus,
} from "@fortawesome/free-solid-svg-icons";

const Accommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [error, setError] = useState([]);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(
          BASE_URL + ACCOMMONDATION_PATH + ACCOMMONDATION_STATE_PATH
        );
        setAccommodations(response.data);
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  console.log(accommodations);

  const DeleteButton = ({ id }) => {
    const [error, setError] = useState(null);

    async function handleDelete() {
      const confirmDelete = window.confirm("Delete this accommodation?");

      if (confirmDelete) {
        try {
          const response = await http.delete(
            BASE_URL + ACCOMMONDATION_PATH + id
          );

          if ((response.status = 200 && response.statusText === "OK")) {
            const newArray = accommodations.filter(function (data) {
              return data.id !== response.data.id;
            });
            setHotels(newArray);
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
        title="Delete accommodation"
      >
        {error ? "Error" : <FontAwesomeIcon icon={Trash} />}
      </Button>
    );
  };

  return (
    <AdminLayout title={TITLE_ADMIN_ACCOMMONDATION}>
      <Row margin="0 0 0 1rem">
        <Col size={11}>
          <Row margin="2rem 0">
            <Col size={6}>
              <Header>
                <Heading>Manage accommodations</Heading>
              </Header>
            </Col>
            <Col size={6}>
              <Placement float="right">
                <a href={`accommodation/new`}>
                  <Button
                    backgroundColor="rgb(0, 126, 255)"
                    color="white"
                    padding="10px 25px"
                  >
                    <FontAwesomeIcon icon={Plus} />
                    &nbsp;&nbsp;Add new accommodation
                  </Button>
                </a>
              </Placement>
            </Col>
          </Row>
          <Col size={12}>
            <Row bg_color="rgb(243 243 243)">
              <Col size={1}>
                <P weight="bold" padding="0 0 0 0.5rem">
                  Id
                </P>
              </Col>
              <Col size={3}>
                <P weight="bold">Name</P>
              </Col>
              <Col size={2}>
                <P weight="bold">Address</P>
              </Col>
              <Col size={2}>
                <P weight="bold">City</P>
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
            <Col box="white-table">
              {(accommodations.length !== 0 && (
                <>
                  {accommodations.map(
                    ({ id, name, city, address, published_at }) => {
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
                          <Col size={3} hover="grey">
                            <LinkHover href={`/accommodation/${id}`}>
                              <Span>{name}</Span>
                            </LinkHover>
                          </Col>
                          <Col size={2}>
                            <Span>{address}</Span>
                          </Col>
                          <Col size={2}>
                            <Span>{city}</Span>
                          </Col>
                          <Col size={2}>
                            <Span>
                              {(published_at && "Published") || "Draft"}
                            </Span>
                          </Col>
                          <Col size={2}>
                            <Row>
                              <Col size={6}>
                                <Button>
                                  <a href={`accommodation/edit/${id}`}>
                                    <FontAwesomeIcon icon={Edit} />
                                  </a>
                                </Button>
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
                    }
                  )}
                </>
              )) || <span>No accommodations in the database</span>}
            </Col>
          </Col>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Accommodation;
