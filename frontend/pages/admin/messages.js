import { useEffect, useState } from "react";
import Heading from "../../components/Layout/Heading";
import { AdminLayout } from "../../components/Layout/Layout";
import { BASE_URL, CONTACT_PATH } from "../../constants/api";
import { TITLE_ADMIN_MESSAGES } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(BASE_URL + CONTACT_PATH);
        setMessages(response.data);
      } catch (error) {
        setError(error.toString());
      }
    }
    fetchData();
  }, []);

  async function deleteButton(e) {
    e.preventDefault();

    const id = e.target.dataset.id;

    try {
      // checks if id is passed in, if true update item: if false create new item
      let response;
      response = await http.delete(BASE_URL + CONTACT_PATH + id);
      console.log(response);
      if ((response.status = 200)) {
        const newArray = messages.filter(function (data) {
          return data.id !== response.data.id;
        });
        setMessages(newArray);
      }
    } catch (error) {
      //setError(error.toString());
      console.log(error);
    }
  }

  return (
    <AdminLayout title={TITLE_ADMIN_MESSAGES}>
      <Heading>Messages</Heading>
      {error && <span>{error}</span>}
      {(messages.length !== 0 &&
        messages.map(({ id, name, message }) => {
          return (
            <div key={id}>
              <p>{name}</p>
              <p>{message}</p>
              <button onClick={deleteButton} data-id={id}>
                X
              </button>
            </div>
          );
        })) || <span>No new messages</span>}
    </AdminLayout>
  );
};

export default Messages;
