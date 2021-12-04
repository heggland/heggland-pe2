import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/Layout/Layout";
import {
  BASE_URL,
  ACCOMMONDATION_PATH,
  ACCOMMONDATION_STATE_PATH,
} from "../../constants/api";
import { TITLE_ADMIN_ACCOMMONDATION } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

import Heading from "../../components/Common/Heading";

import Col from "../../components/Col/Col";
import Row from "../../components/Row/Row";
import Button from "../../components/Button/Button";
import Span from "../../components/Span/Span";
import Paragraph from "../../components/Paragraph/Paragraph";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as Trash,
  faPencilAlt as Edit,
  faPlusCircle as Plus,
  faStar as Star,
} from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/Container/Container";
import Error from "../../modules/error/error";

const Accommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [error, setError] = useState(false);
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
            setAccommodations(newArray);
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
        title="Delete accommodation"
      >
        {error ? (
          "Error"
        ) : (
          <FontAwesomeIcon onClick={handleDelete} icon={Trash} />
        )}
      </Button>
    );
  };

  return (
    <AdminLayout title={TITLE_ADMIN_ACCOMMONDATION}>
      <Row margin="0 1rem 0 1rem">
        <Col xs={12} md={11}>
          <Row margin="2rem 0" alignItems="center">
            <Col md={6}>
              <Heading>Manage accommodations</Heading>
            </Col>
            <Col md={6}>
              <Container float="right">
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
              </Container>
            </Col>
          </Row>
          <Col md={12}>
            <Row backgroundColor="rgb(243 243 243)" xs="none">
              <Col sm={1}>
                <Paragraph weight="bold" padding="0 0 0 0.5rem">
                  Id
                </Paragraph>
              </Col>
              <Col sm={3}>
                <Paragraph weight="bold">Name</Paragraph>
              </Col>
              <Col sm={2}>
                <Paragraph weight="bold">Address</Paragraph>
              </Col>
              <Col sm={2}>
                <Paragraph weight="bold">City</Paragraph>
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
              {(accommodations.length !== 0 &&
                accommodations.map(
                  ({ id, name, city, address, published_at, featured }) => {
                    return (
                      <Row
                        key={id}
                        padding="1rem 0 1rem 0"
                        borderColor="rgb(243 243 243)"
                        hover="rgb(243 243 243 / 70%)"
                        cursor="pointer"
                        alignItemsSm="center"
                        direction="column-mobile"
                      >
                        <Col xs={11} sm={1}>
                          <Row>
                            <Col xs={3} sm="none">
                              ID:
                            </Col>
                            <Span padding="0 0 0 0.5rem">
                              {id}&nbsp;
                              {featured && (
                                <FontAwesomeIcon
                                  icon={Star}
                                  transform="shrink-6"
                                  color="orange"
                                />
                              )}
                            </Span>
                          </Row>
                        </Col>
                        <Col xs={11} sm={3} hover="grey">
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
                              Address:
                            </Col>
                            <Col overflow="hidden">
                              <Span>{address}</Span>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={11} sm={2}>
                          <Row>
                            <Col xs={3} sm="none">
                              City:
                            </Col>
                            <Col overflow="hidden">
                              <Span>{city}</Span>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={11} sm={2} overflow="hidden">
                          <Row>
                            <Col xs={3} sm="none">
                              State:
                            </Col>
                            <Col overflow="hidden">
                              <Span>
                                {(published_at && "Published") || "Draft"}
                              </Span>
                            </Col>
                          </Row>
                        </Col>
                        <Col sm={2}>
                          <Row>
                            <Col xs={3} sm="none">
                              Tools:
                            </Col>
                            <Col xs={2} sm="none">
                              <a href={`accommodation/edit/${id}`}>Edit</a>
                            </Col>
                            <Col xs={1} sm={6}>
                              <a href={`accommodation/edit/${id}`}>
                                <Button href={`accommodation/edit/${id}`}>
                                  <FontAwesomeIcon icon={Edit} />
                                </Button>
                              </a>
                            </Col>
                            <Col xs={2} sm="none">
                              Delete
                            </Col>
                            <Col xs={1} sm={6}>
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
                (!error && <span>No accommodations in the database</span>) || (
                  <Error string={error} />
                )}
            </Col>
          </Col>
        </Col>
      </Row>
      <Row alignItems="center" padding="20px 20px ">
        <FontAwesomeIcon icon={Star} transform="shrink-6" color="orange" />-
        featured establishment
      </Row>
    </AdminLayout>
  );
};

export default Accommodation;
