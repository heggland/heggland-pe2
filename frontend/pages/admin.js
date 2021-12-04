import { DESCRIPTION_ADMIN, TITLE_ADMIN } from "../constants/meta";
import Heading from "../components/Common/Heading";
import { AdminLayout } from "../components/Layout/Layout";

import styled from "styled-components";

import Col from "../components/Col/Col";
import Row from "../components/Row/Row";

import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { BASE_URL, ENQUIRIES_PATH, CONTACT_PATH } from "../constants/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope as iconMessage,
  faInbox as iconEnquirie,
} from "@fortawesome/free-solid-svg-icons";
import Error from "../modules/error/error";

const Note = styled.div`
  background-color: #ffff4a;
  min-width: 50%;
  max-width: 300px;
  box-shadow: 0px 0px 15px 9px rgba(165, 165, 165, 0.4);
  border-top: 30px solid rgb(245 245 8);
  margin-bottom: 20px;
`;

const NoteHeader = styled.div`
  padding-top: 5%;
  padding-left: 10%;
`;

const NoteBody = styled.div`
  padding-left: 10%;
  padding-bottom: 60px;
  width: fit-content;
`;

const NoteLink = styled.a`
  margin-bottom: 10%;
  width: fit-content;
  &:hover {
    border-bottom: 1px solid rgb(0, 126, 255);
  }
`;

const NoteFooter = styled.div`
  padding-left: 10%;
  padding-bottom: 10%;
  width: fit-content;
`;

const Admin = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorenquiries, setErrorEnquiries] = useState(false);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const responseMessages = await http.get(BASE_URL + CONTACT_PATH);
        setMessages(responseMessages.data);
      } catch (error) {
        setErrorMessage(error.toString());
      }

      try {
        const responseEnquiries = await http.get(BASE_URL + ENQUIRIES_PATH);
        setEnquiries(responseEnquiries.data);
      } catch (error) {
        setErrorEnquiries(error.toString());
      }
    }
    fetchData();
  }, []);

  return (
    <AdminLayout title={TITLE_ADMIN} description={DESCRIPTION_ADMIN}>
      <Row margin="2rem 0 0 1rem">
        <Heading>Dashboard</Heading>

        <Col xs={12}>
          <Row alignItemsMobile="center">
            <Col xs={12} lg={6}>
              <Note>
                <NoteHeader>
                  <NoteLink href="/admin/messages">
                    <Row>
                      <Heading xs={3}>Messages</Heading>
                    </Row>
                  </NoteLink>
                </NoteHeader>
                <Row>
                  {(messages.length >= 1 && (
                    <NoteBody>
                      <span>
                        <NoteLink href="/admin/messages">
                          <FontAwesomeIcon icon={iconMessage} />
                          &nbsp; There {messages.length >= 1 ? "are" : "is"}
                          &nbsp;
                          {messages.length}
                          &nbsp;new message{messages.length >= 2 && "s"}!
                        </NoteLink>
                      </span>
                    </NoteBody>
                  )) || (
                    <NoteBody>
                      {(errorMessage && <Error string={errorMessage} />) || (
                        <span>
                          <FontAwesomeIcon icon={iconMessage} />
                          &nbsp;No new visitor messages
                        </span>
                      )}
                    </NoteBody>
                  )}
                </Row>
              </Note>
            </Col>
            <Col xs={12} lg={6}>
              <Note>
                <NoteHeader>
                  <NoteLink href="/admin/enquiries">
                    <Row>
                      <Heading xs={3}>Enquiries</Heading>
                    </Row>
                  </NoteLink>
                </NoteHeader>
                {(enquiries.length >= 1 && (
                  <NoteBody>
                    <span>
                      <NoteLink href="/admin/enquiries">
                        <FontAwesomeIcon icon={iconEnquirie} />
                        &nbsp; There {enquiries.length >= 1 ? "are" : "is"}
                        &nbsp;
                        {enquiries.length}&nbsp; new order
                        {enquiries.length >= 2 && "s"}!
                      </NoteLink>
                    </span>
                  </NoteBody>
                )) || (
                  <NoteBody>
                    {(errorenquiries && <Error string={errorenquiries} />) || (
                      <span>
                        <FontAwesomeIcon icon={iconEnquirie} />
                        &nbsp;No new visior orders
                      </span>
                    )}
                  </NoteBody>
                )}
              </Note>
            </Col>
          </Row>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Admin;
