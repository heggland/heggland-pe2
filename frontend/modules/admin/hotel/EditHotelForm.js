import { BASE_URL, HOTELS_PATH, HOTEL_PATH } from "../../../constants/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EDIT_HOTEL_SCHEMA } from "../../../constants/schema";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useRouter } from "next/router";
import Heading from "../../../components/Layout/Heading";
import FileUpload from "./fileUpload";

import { Col, Row, Textarea } from "../../../components/Common/Styles/Common";

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
  const [imagePreview, setImagePreview] = useState(false);

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
    setUpdated(false);
    // setSubmitting(true);
    // setError(null);

    // set published / draft state
    data.published_at =
      data.state.toLowerCase() === "published" ? new Date() : null;

    // set id, if id is passed in => editting item. if not = new item is being created.
    data.id = id && data.id;

    try {
      console.log(data.image);
      if (data.image) {
        const formData = new FormData();
        formData.append("files", data.image[0]);
        const imgResponse = await http.post(BASE_URL + "/upload", formData);
        console.log(imgResponse);
        data.image = imgResponse.data[0];
        data.image.related__contentType = "Hotels";
        data.image.related.id = id;
        data.image.related.name = data.name;
      }
      console.log(data.image);

      // checks if id is passed in, if true update item - if false create new item
      let response;
      if (id) {
        response = await http.put(BASE_URL + HOTEL_PATH + id, data);
      } else {
        response = await http.post(BASE_URL + HOTELS_PATH, data);
      }
      console.log(response);

      // if new item is successfully created, push to edit route of the new item
      if (!id) {
        router.push("/admin/hotel/edit/" + response.data.id);
      }

      setUpdated(true);
      //console.log(response);
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

  let oldImage;
  if (image && image.length !== 0) {
    oldImage = BASE_URL + image[0].url;
  }

  const handleImageChange = (e) =>
    setImagePreview(URL.createObjectURL(e.target.files[0]));

  return (
    <>
      <Row padding_bottom={10}>
        <button onClick={goBack}>Go back</button>
      </Row>
      {id && (
        <Row padding_bottom={5}>
          <Heading>{id && name}</Heading>
        </Row>
      )}
      <Col size={11}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row padding_bottom={20}>
            <Heading size={5}>DESCRIPTION</Heading>
            <Textarea
              placeholder="description *"
              defaultValue={description && description}
              {...register("description")}
              type="text"
              rows="10"
            />
            {errors.description && <span>{errors.description.message}</span>}
          </Row>
          <Row padding_bottom={20}>
            <Col size={6}>
              <Heading size={5}>NAME</Heading>
              <input
                placeholder="name *"
                defaultValue={name && name}
                {...register("name")}
                type="text"
              />
              {errors.name && <span>{errors.name.message}</span>}
            </Col>
            <Col size={6}>
              <Heading size={5}>ADDRESS</Heading>
              <input
                placeholder="address *"
                defaultValue={address && address}
                {...register("address")}
                type="text"
              />
              {errors.address && <span>{errors.address.message}</span>}
            </Col>
          </Row>
          <Row padding_bottom={20}>
            <Col size={6}>
              <Heading size={5}>CITY</Heading>
              <input
                placeholder="city *"
                defaultValue={city && city}
                {...register("city")}
                type="text"
              />
              {errors.city && <span>{errors.city.message}</span>}
            </Col>
            <Col size={6}>
              <Heading size={5}>ZIP CODE</Heading>
              <input
                placeholder="zip_code *"
                defaultValue={zip_code && zip_code}
                {...register("zip_code")}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            {errors.zip_code && (
              <span>
                {(errors.zip_code.message && <>Please enter +4 digits</>) ||
                  errors.zip_code.message}
              </span>
            )}
          </Row>
          {/*       <div>
        <input defaultValue={hotel_facilities} />
      </div> */}
          <Row padding_bottom={20}>
            <Heading size={6}>STATE</Heading>
            <Col>
              <select
                defaultValue={(state && "published") || "draft"}
                {...register("state")}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </Col>
          </Row>

          <Row padding_bottom={20}>
            <Heading size={6}>IMAGE</Heading>
            <Col>
              {!imagePreview ? (
                (oldImage && (
                  <>
                    <img
                      src={oldImage}
                      width="300px"
                      alt={image.alternativeText}
                    />
                    <button>Change image</button>
                  </>
                )) || (
                  <>
                    <div onChange={handleImageChange}>
                      <input type="file" name="image" {...register("image")} />
                    </div>
                    <button>Change image</button>
                    <span>
                      {errors.image && <span>{errors.image.message}</span>}
                    </span>
                  </>
                )
              ) : (
                <img
                  src={imagePreview}
                  width="300px"
                  alt={image.alternativeText}
                />
              )}
              <span>
                TODO: edit images, delete image, edit image-show media gallery
                and or upload new
              </span>
            </Col>
          </Row>

          <Row>
            <Col size={1}>
              <Row padding_bottom={20}>
                <button type="submit">Save</button>
              </Row>
            </Col>

            {id && (
              <Col size={1}>
                <Row padding_bottom={20}>
                  <button onClick={deleteButton}>Delete</button>
                </Row>
              </Col>
            )}
            {updated && <span>updated</span>}
          </Row>
        </form>
      </Col>
    </>
  );
};

export default EditForm;
