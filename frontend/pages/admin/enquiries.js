import axios from "axios";
import { useEffect, useState } from "react";
import Heading from "../../components/Layout/Heading";
import { AdminLayout } from "../../components/Layout/Layout";
import { BASE_URL, ENQUIRIES_PATH } from "../../constants/api";
import { TITLE_ADMIN_ENQUIRIES } from "../../constants/meta";
import useAxios from "../../hooks/useAxios";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await http.get(BASE_URL + ENQUIRIES_PATH);
        setEnquiries(response.data);
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
      response = await http.delete(BASE_URL + ENQUIRIES_PATH + id);
      if ((response.status = 200)) {
        const newArray = enquiries.filter(function (data) {
          return data.id !== response.data.id;
        });
        setEnquiries(newArray);
      }
    } catch (error) {
      //setError(error.toString());
      console.log(error);
    }
  }

  return (
    <AdminLayout title={TITLE_ADMIN_ENQUIRIES}>
      <Heading>User enquiries</Heading>
      {error && <span>{error}</span>}
      {(enquiries.length !== 0 &&
        enquiries.map(({ id, name, message }) => {
          return (
            <div key={id}>
              <p>{name}</p>
              <p>{message}</p>{" "}
              <button onClick={deleteButton} data-id={id}>
                X
              </button>
            </div>
          );
        })) || <span>No new enquiries</span>}
    </AdminLayout>
  );
};

export default Enquiries;
