import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Heading from "../../components/Layout/Heading";
import Head from "../../components/Layout/Head";

const Home = () => {
  return (
    <>
      <Head title="Holidaze" />
      <Heading> Home </Heading>
      <Row className="justify-content-center mb-5 mx-1">
        <Col></Col>
      </Row>
    </>
  );
};

export default Home;

/*   

import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { orderBy } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(function () {
    async function getCharacters() {
      try {
        const response = await http.get("character");

        const filtered = response.data.docs.filter(function (character) {
          return character.name !== "MINOR_CHARACTER";
        });

        const data = orderBy(filtered, ["race"], ["asc"]);

        setCharacters(data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <>
        <Head title="Home" description="Course assignment." />
        <Row className="justify-content-center mb-5 mx-1">
          <Heading> Home </Heading>
        </Row>
        <Row className="justify-content-center">
          <FontAwesomeIcon icon={faSpinner} spin transform="grow-10" />
        </Row>
      </>
    );

  if (error) return <div>{error.toString()}</div>; 
  */
