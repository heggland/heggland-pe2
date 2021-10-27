import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/Layout/Layout";
import {
  BASE_URL,
  HOTELS_PATH,
  HOTEL_PATH,
  HOTEL_STATE_PATH,
} from "../../constants/api";
import { TITLE_ADMIN_HOTELS } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

import Heading from "../../components/Layout/Heading";
import {
  Row,
  Col,
  P,
  Span,
  Button,
  Placement,
  LinkHover,
  Header,
} from "../../components/Common/Styles/Common";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt as Trash,
  faPencilAlt as Edit,
  faPlusCircle as Plus,
} from "@fortawesome/free-solid-svg-icons";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(
          BASE_URL + HOTELS_PATH + HOTEL_STATE_PATH
        );
        setHotels(response.data);
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);
  console.log(hotels);

  const DeleteButton = ({ id }) => {
    const [error, setError] = useState(null);

    async function handleDelete() {
      const confirmDelete = window.confirm("Delete this hotel?");

      if (confirmDelete) {
        try {
          const response = await http.delete(BASE_URL + HOTEL_PATH + id);

          if ((response.status = 200 && response.statusText === "OK")) {
            const newArray = hotels.filter(function (data) {
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
        title="Delete hotel"
      >
        {error ? "Error" : <FontAwesomeIcon icon={Trash} />}
      </Button>
    );
  };

  return (
    <AdminLayout title={TITLE_ADMIN_HOTELS}>
      <Row margin={30}>
        <Col size={6}>
          <Header>
            <Heading>Manage hotels</Heading>
          </Header>
        </Col>
        <Col size={6}>
          <Placement float="right">
            <a href={`hotel/new`}>
              <Button
                backgroundColor="rgb(0, 126, 255)"
                color="white"
                padding="10px 25px"
              >
                <FontAwesomeIcon icon={Plus} />
                &nbsp;&nbsp;Add New Hotel
              </Button>
            </a>
          </Placement>
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
        {(hotels.length !== 0 && (
          <>
            {hotels.map(({ id, name, city, address, published_at }) => {
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
                  <Col size={3} hover="grey">
                    <LinkHover href={`/hotel/${id}`}>
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
                    <Span>{(published_at && "Published") || "Draft"}</Span>
                  </Col>
                  <Col size={2}>
                    <Row>
                      <Col size={6}>
                        <Button>
                          <a href={`hotel/edit/${id}`}>
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
            })}
          </>
        )) || <span>No hotels in the database</span>}
      </Col>
    </AdminLayout>
  );
};

export default Hotels;
