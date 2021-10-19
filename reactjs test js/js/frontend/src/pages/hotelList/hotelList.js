import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/api";

export default function GetPosts() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getPostsList() {
      try {
        // info regarding usage of ?per_page=100 wordpress pagination method should be used in final build
        const response = await axios.get(BASE_URL + "/hotels");
        const data = response.data;
        console.log(data);
        setHotels(data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getPostsList();
  }, []);

  if (loading)
    return <Row className="justify-content-center">Loading posts...</Row>;

  if (error) return <div>{}</div>;

  function createMarkup(data) {
    // controll the lenght of the summary text.
    // splitting up string into array
    const arrayData = data.split(" ");

    // loop over, shorten lenght to x words and push to new array
    let newArrayData = [];
    for (let i = 0; i < arrayData.length; i++) {
      if (i === 30) {
        break;
      }
      newArrayData.push(arrayData[i]);
    }

    // array to string, replace comma with space and add dot dot dot at end
    const newData = newArrayData.toString().replace(/,/g, " ") + "...";

    return { __html: newData };
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={11}>
          <Row xs={1} md={3} className="g-4">
            {hotels.map((hotel) => {
              return (
                <Col className="my-2" key={hotel.id}>
                  <Card border="dark">
                    <Link
                      to={`/posts/${hotel.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card.Img
                        variant="top"
                        height="286px"
                        src={BASE_URL + hotel.image[0].url}
                        alt={hotel.name}
                      />
                      <Card.Body
                        className="overflow-hidden"
                        style={{ height: "14rem" }}
                      >
                        <Card.Text className="text-dark">
                          {hotel.city}
                        </Card.Text>
                        <Card.Title className="text-dark">
                          {hotel.title}
                        </Card.Title>
                        <Card.Text
                          className="text-dark"
                          dangerouslySetInnerHTML={createMarkup(
                            hotel.description
                          )}
                        />
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
