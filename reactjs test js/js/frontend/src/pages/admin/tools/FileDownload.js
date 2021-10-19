import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";

export default function FileDownload() {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = process.env.REACT_APP_BASE_URL;

  useEffect(
    function () {
      async function getMedia() {
        try {
          const response = await axios.get(url + "wp/v2/media?per_page=100");
          setFiles(response.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }

      getMedia();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (loading)
    return (
      <Row className="justify-content-md-center">
        <div>Loading gallery...</div>
      </Row>
    );

  return (
    <Container className="mt-5">
      {error && <>{error}</>}
      <Row className="justify-content-center">
        {files &&
          files.map((gallery) => {
            return (
              <Col key={gallery.id} xs={4}>
                <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    src={gallery.media_details.sizes.thumbnail.source_url}
                    alt={gallery.title.rendered}
                  />
                  <Figure.Caption>{gallery.title.rendered}</Figure.Caption>
                </Figure>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}
