import { DESCRIPTION_ADMIN, TITLE_ADMIN } from "../constants/meta";
import Heading from "../components/Layout/Heading";
import { AdminLayout } from "../components/Layout/Layout";
import {
  Col,
  Row,
  Note,
  NoteHeader,
  NoteBody,
  NoteLink,
} from "../components/Common/Styles/Common";
import { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { BASE_URL, ENQUIRIES_PATH, CONTACT_PATH } from "../constants/api";
import AuthContext from "../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope as iconMessage,
  faInbox as iconEnquirie,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [enquiries, setEnquiries] = useState([]);
  const [messages, setMessages] = useState([]);
  const http = useAxios();
  const [auth] = useContext(AuthContext);

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

  console.log("Enquries", enquiries);
  console.log("Messages", messages);

  return (
    <AdminLayout title={TITLE_ADMIN} description={DESCRIPTION_ADMIN}>
      <Heading>Admin </Heading>
      <Row padding_bottom={30}>
        <span suppressHydrationWarning>Hi {auth && auth.username}!</span>
      </Row>
      <Col size={12}>
        <Row>
          <Col size={6}>
            <Note>
              <NoteHeader>
                <Row>
                  <Heading size={3}>Messages</Heading>
                </Row>
              </NoteHeader>
              <Row>
                {(messages.length >= 1 && (
                  <NoteBody>
                    <span>
                      <NoteLink href="/admin/messages">
                        <FontAwesomeIcon icon={iconMessage} />
                        &nbsp; There {messages.length >= 1 ? "are" : "is"}&nbsp;
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
          <Col size={6}>
            <Note>
              <NoteHeader>
                <Row>
                  <Heading size={3}>Enquiries</Heading>
                </Row>
              </NoteHeader>
              {(enquiries.length >= 1 && (
                <NoteBody>
                  <span>
                    <NoteLink href="/admin/enquiries">
                      <FontAwesomeIcon icon={iconEnquirie} />
                      &nbsp; There {enquiries.length >= 1 ? "are" : "is"}&nbsp;
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
    </AdminLayout>
  );
}
