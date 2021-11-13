import Heading from "../../../components/Common/Heading";
import { BASE_URL } from "../../../constants/api";
import EnquiryForm from "../enquiry/enquiryForm";
import * as Style from "./details.style";
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

Modal.setAppElement("#enquiryForm");

const Details = ({ accommodation }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  let img;
  let alt;
  if (accommodation.image.length != 0) {
    img = BASE_URL + accommodation.image[0].url;
    alt = accommodation.image[0].alternativeText;
  }

  return (
    <Style.Container>
      <Row justifyContent="center" padding="5% 0 0 0">
        <Col md={6}>
          <Style.Image src={img} alt={alt} width="100%" />
          <Heading>{accommodation.name}</Heading>
          <Style.Text>{accommodation.description}</Style.Text>

          <Heading size={3}>Locaction</Heading>
          <Row>
            <Col md={6}>
              <address>
                <Style.Text>{accommodation.city}</Style.Text>
                <Style.Text>{accommodation.address}</Style.Text>
                <Style.Text>{accommodation.zip_code}</Style.Text>
              </address>
            </Col>
            <Col md={6}>
              <button onClick={openModal}>Order Now! DO IT NOW!</button>
              <div id="enquiryForm">
                <Modal isOpen={modalIsOpen} style={customStyles}>
                  <Style.CloseModal onClick={closeModal}>
                    <FontAwesomeIcon icon={close} />
                  </Style.CloseModal>
                  <EnquiryForm accommondationId={accommodation.id} />
                </Modal>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Style.Container>
  );
};

export default Details;
