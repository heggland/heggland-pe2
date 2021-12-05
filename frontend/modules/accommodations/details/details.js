import Heading from "../../../components/Common/Heading";
import { BASE_URL } from "../../../constants/api";
import EnquiryForm from "../enquiry/enquiryForm";
import * as Style from "./details.style";
import Container from "./../../../components/Container/Container";
import Col from "./../../../components/Col/Col";
import Row from "./../../../components/Row/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as close } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Details = ({ accommodation }) => {
  if (!isNaN(accommodation)) {
    return <Row justifyContent="center">error fetching accommodation...</Row>;
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  let img;
  let alt;
  if (accommodation.image.length != 0) {
    img = accommodation.image[0].url;
    alt = accommodation.image[0].alternativeText;
  }

  return (
    <Style.Container>
      <Row justifyContent="center">
        <Col md={6}>
          <Row>
            <Style.Image src={img} alt={alt} width="100%" />
          </Row>
          <Row justifyContent="center">
            <Col xs={11} md={12}>
              <Row>
                <Heading>{accommodation.name}</Heading>
              </Row>
              <Row>
                <Style.Text>{accommodation.description}</Style.Text>
              </Row>
              <Row>
                <Heading size={3}>Locaction</Heading>
              </Row>
              <Row>
                <address>
                  <Style.Text>{accommodation.city}</Style.Text>
                  <Style.Text>{accommodation.address}</Style.Text>
                  <Style.Text>{accommodation.zip_code}</Style.Text>
                </address>
              </Row>
            </Col>
          </Row>
          <Container padding="5% 0">
            <Row justifyContent="center">
              <Style.OrderButton onClick={openModal}>
                Order now
              </Style.OrderButton>
              <div id="enquiryForm">
                <Modal
                  isOpen={modalIsOpen}
                  style={customStyles}
                  ariaHideApp={false}
                >
                  <Row justifyContent="center" margin="0">
                    <Heading size={4}>Enquiry</Heading>
                    <Style.CloseModal onClick={closeModal}>
                      <FontAwesomeIcon icon={close} transform="shrink-1" />
                    </Style.CloseModal>
                  </Row>
                  <EnquiryForm accommodation={accommodation.id} />
                </Modal>
              </div>
            </Row>
          </Container>
        </Col>
      </Row>
    </Style.Container>
  );
};

export default Details;
