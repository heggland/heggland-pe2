import * as Style from "./viewMessage.style";
import Modal from "react-modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as close } from "@fortawesome/free-solid-svg-icons";
import Col from "../../../components/Col/Col";
import Row from "../../../components/Row/Row";
import FormatDate from "../../../components/Common/FormatDate";
import Paragraph from "../../../components/Paragraph/Paragraph";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minHeight: "40%",
    maxHeight: "60%",
  },
};

const ViewMessage = ({ id, name, content, created, published }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Style.Span onClick={openModal}>Preview message</Style.Span>
      <div id={`textbox` + id}>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <Style.Header>
            <Col xs={12}>
              <Row alignItems="center">
                <Col xs={11}>
                  <h3> Message from {name}</h3>
                </Col>
                <Col xs={1}>
                  <Style.CloseModal onClick={closeModal}>
                    <FontAwesomeIcon icon={close} transform="grow-5" />
                  </Style.CloseModal>
                </Col>
              </Row>
              <Style.Date>
                Created at <FormatDate date={created} />
              </Style.Date>
            </Col>
          </Style.Header>
          <Paragraph>{content}</Paragraph>
        </Modal>
      </div>
    </>
  );
};

export default ViewMessage;
