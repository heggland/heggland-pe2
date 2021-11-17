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
} from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/Container/Container";

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

  // TODO: add a marker for each accommodation that is featured

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
                  ({ id, name, city, address, published_at }) => {
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
                            <Span padding="0 0 0 0.5rem">{id}</Span>
                          </Row>
                        </Col>
                        <Col xs={11} sm={3} hover="grey">
                          <Row>
                            <Col xs={3} sm="none">
                              Name:
                            </Col>
                            {/* <a href={`/accommodation/${id}`} target="_blank"> */}
                            <Span>{name}</Span>
                            {/*  </a> */}
                          </Row>
                        </Col>
                        <Col xs={11} sm={2}>
                          <Row>
                            <Col xs={3} sm="none">
                              Address:
                            </Col>
                            <Span>{address}</Span>
                          </Row>
                        </Col>
                        <Col xs={11} sm={2}>
                          <Row>
                            <Col xs={3} sm="none">
                              City:
                            </Col>
                            <Span>{city}</Span>
                          </Row>
                        </Col>
                        <Col xs={11} sm={2}>
                          <Row>
                            <Col xs={3} sm="none">
                              State:
                            </Col>
                            <Span>
                              {(published_at && "Published") || "Draft"}
                            </Span>
                          </Row>
                        </Col>
                        <Col xs="none" sm={2}>
                          <Row>
                            <Col sm={6}>
                              <a href={`accommodation/edit/${id}`}>
                                <Button href={`accommodation/edit/${id}`}>
                                  <FontAwesomeIcon icon={Edit} />
                                </Button>
                              </a>
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
                )) || <span>No accommodations in the database</span>}
            </Col>
          </Col>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Accommodation;
