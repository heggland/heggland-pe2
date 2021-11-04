import Layout from "../components/Layout/Layout";
import { DESCRIPTION_CONTACT, TITLE_CONTACT } from "../constants/meta";
import Heading from "../components/Common/Heading";
import ContactForm from "../modules/contact/contactForm/contactForm";
import * as Style from "./contact.style";

export default function Home() {
  return (
    <Layout title={TITLE_CONTACT} description={DESCRIPTION_CONTACT}>
      <Style.Container>
        <Heading>Get in Touch</Heading>
        <ContactForm />
      </Style.Container>
    </Layout>
  );
}
