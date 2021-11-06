import { DESCRIPTION_ADMIN, TITLE_ADMIN } from "../constants/meta";
import Heading from "../components/Common/Heading";
import { AdminLayout } from "../components/Layout/Layout";
import { Note, NoteHeader, NoteBody, NoteLink } from "../styles/common";

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

export default function Home() {
  const [enquiries, setEnquiries] = useState([]);
  const [messages, setMessages] = useState([]);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const responseMessages = await http.get(BASE_URL + CONTACT_PATH);
        setMessages(responseMessages.data);
      } catch (error) {
        setError(error.toString());
      }

      try {
        const responseEnquiries = await http.get(BASE_URL + ENQUIRIES_PATH);
        setEnquiries(responseEnquiries.data);
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  return (
    <AdminLayout title={TITLE_ADMIN} description={DESCRIPTION_ADMIN}>
      <Row margin="2rem 0 0 1rem">
        <Heading>Dashboard</Heading>
        <Col xs={12}>
          <Row>
            <Col xs={12} lg={6}>
              <Note>
                <NoteHeader>
                  <Row>
                    <Heading xs={3}>Messages</Heading>
                  </Row>
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
                      <span>
                        <FontAwesomeIcon icon={iconMessage} />
                        &nbsp;No new visitor messages
                      </span>
                    </NoteBody>
                  )}
                </Row>
              </Note>
            </Col>
            <Col xs={12} lg={6}>
              <Note>
                <NoteHeader>
                  <Row>
                    <Heading xs={3}>Enquiries</Heading>
                  </Row>
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
                    <span>
                      <FontAwesomeIcon icon={iconEnquirie} />
                      &nbsp;No new visior orders
                    </span>
                  </NoteBody>
                )}
              </Note>
            </Col>
          </Row>
        </Col>
      </Row>
    </AdminLayout>
  );
}
