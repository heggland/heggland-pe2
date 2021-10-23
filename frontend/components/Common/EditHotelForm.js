import { BASE_URL, HOTELS_PATH, HOTEL_PATH } from "../../constants/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EDIT_HOTEL_SCHEMA } from "../../constants/schema";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import { useRouter } from "next/router";

const EditForm = ({
  id,
  name,
  description,
  address,
  city,
  zip_code,
  hotel_facilities,
  image,
  state,
}) => {
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EDIT_HOTEL_SCHEMA),
  });

  const http = useAxios();

  async function onSubmit(data) {
    console.log(data);
    setUpdated(false);
    // setSubmitting(true);
    // setError(null);

    data.id = id && data.id;

    data.published_at =
      data.state.toLowerCase() === "published" ? new Date() : null;

    try {
      // checks if id is passed in, if true update item: if false create new item
      let response;
      if (id) {
        response = await http.put(BASE_URL + HOTEL_PATH + id, data);
      } else {
        response = await http.post(BASE_URL + HOTELS_PATH, data);
      }

      setUpdated(true);
      console.log(response);
      console.log(response.data.name);
      //setSubmitting(false);
    } catch (error) {
      //setError(error.toString());
      console.log(error);
    }
  }

  async function deleteButton(e) {
    // setSubmitting(true);
    // setError(null);
    e.preventDefault();

    try {
      // checks if id is passed in, if true update item: if false create new item
      let response;
      if (id) {
        response = await http.delete(BASE_URL + HOTEL_PATH + id);
      }

      router.back();
    } catch (error) {
      //setError(error.toString());
      console.log(error);
    }
  }

  const goBack = () => router.push("/admin/hotels");

  let img;
  if (image && image.length != 0) {
    img = <img src={BASE_URL + image[0].url} height="200px" />;
  }

  return (
    <>
      <button onClick={goBack}>Go back</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="name *"
            defaultValue={name && name}
            {...register("name")}
            type="text"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <input
            placeholder="address *"
            defaultValue={address && address}
            {...register("address")}
            type="text"
          />
          {errors.address && <span>{errors.address.message}</span>}
        </div>
        <div>
          <input
            placeholder="city *"
            defaultValue={city && city}
            {...register("city")}
            type="text"
          />
          {errors.city && <span>{errors.city.message}</span>}
        </div>
        <div>
          <input
            placeholder="zip_code *"
            defaultValue={zip_code && zip_code}
            {...register("zip_code")}
            type="text"
          />
          {errors.zip_code && (
            <span>
              {(errors.zip_code.message && <>Please enter +4 digits</>) ||
                errors.zip_code.message}
            </span>
          )}
        </div>
        <div>
          <textarea
            placeholder="description *"
            defaultValue={description && description}
            {...register("description")}
            type="text"
            rows="10"
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        {/*       <div>
        <input defaultValue={hotel_facilities} />
      </div> */}
        <select
          defaultValue={(state && "published") || "draft"}
          {...register("state")}
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <div>{(img && img) || "todo: image uploader"}</div>
        <button type="submit">Save</button>

        {updated && <span>updated</span>}
      </form>
      {id && (
        <form>
          <button onClick={deleteButton}>Delete</button>
        </form>
      )}
    </>
  );
};

export default EditForm;
