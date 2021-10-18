import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Heading from "../../components/Layout/Heading";
import useAxios from "../../hooks/useAxios";
import Head from "../../components/Layout/Head";

const Details = () => {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const history = useHistory();

  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  const http = useAxios();

  useEffect(
    function () {
      async function getOneCharacter() {
        try {
          const response = await http.get("character/" + id);
          const data = response.data.docs[0];
          setCharacter(data);
        } catch (error) {
          console.log(error);
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getOneCharacter();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );

  if (loading)
    return (
      <>
        <Container className="justify-content-md-center">
          <Row className="justify-content-center mb-5">
            <Heading>Character details</Heading>
          </Row>
          <Row className="justify-content-center">
            <FontAwesomeIcon icon={faSpinner} spin transform="grow-10" />
          </Row>
        </Container>
      </>
    );

  if (error) return <div>{error.toString()}</div>;

  return (
    <>
      <Head title="Details" />
      <Container className="justify-content-md-center">
        <Row className="justify-content-center mb-5">
          <Heading>Character details</Heading>
        </Row>
        <Row className="place-content-center">
          <Col>
            <Row className="place-content-center">
              <Heading size="3">{character.name}</Heading>
            </Row>
            <p className="m-0 text-align-center">
              <small>Birth:&nbsp;</small>
              <small>{character.birth}</small>
            </p>
            <p className="m-0 text-align-center">
              <small>Death:&nbsp;</small>
              <small>{character.death}</small>
            </p>
            <p className="m-0 text-align-center">
              <small>Race: &nbsp;</small>
              <small>{character.race}</small>
            </p>
            <p className="m-0 text-align-center">
              <small>Gender: &nbsp;</small>
              <small>{character.gender}</small>
            </p>
            <p className="m-0 text-align-center">
              <small>Hair: &nbsp;</small>
              <small>{character.hair}</small>
            </p>
            <p className="m-0 text-align-center">
              <small>Height: &nbsp;</small>
              <small>{character.height}</small>
            </p>
            <p className="m-0 text-align-center">
              <small>Realm:&nbsp;</small>
              <small>{character.realm}</small>
            </p>
            <p className="m-0 text-align-center">
              <small>Spouse:&nbsp;</small>
              <small>{character.spouse}</small>
            </p>
            <div className="m-0 row place-content-center">
              <button>
                <a
                  href={`https://lotr.fandom.com/wiki/${character.name}`}
                  className="wiki-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Details;
