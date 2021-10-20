import Layout from "../components/Layout/Layout";
import { DESCRIPTION_CONTACT, TITLE_CONTACT } from "../constants/meta";
import Heading from "../components/Layout/Heading";
import ContactForm from "../components/Contact/ContactForm";

export default function Home() {
  return (
    <Layout title={TITLE_CONTACT} description={DESCRIPTION_CONTACT}>
      <Heading>Contact</Heading>

      <main>
        <ContactForm />
      </main>
    </Layout>
  );
}
