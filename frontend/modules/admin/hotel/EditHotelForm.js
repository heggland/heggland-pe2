import { BASE_URL, HOTELS_PATH, HOTEL_PATH } from "../../../constants/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EDIT_HOTEL_SCHEMA } from "../../../constants/schema";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useRouter } from "next/router";
import Heading from "../../../components/Layout/Heading";
// import Image from "next/image";

import { Col, Row, Textarea } from "../../../components/Common/Styles/Common";
import {
  BackButton,
  ButtonGroup,
  Button,
  ButtonDelete,
  InformationGroup,
} from "./EditHotelForm.style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft as chevron,
  faTrashAlt as trash,
} from "@fortawesome/free-solid-svg-icons";

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
  updated_at
}) => {
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [updatedState, setUpdatedState] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [stateButton, setStateButton] = useState(true);
  const [imagePreview, setImagePreview] = useState(false);
  const [imageFile, setImageFile] = useState(null);

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
    setError(null);

    // set id, if id is passed in => editting item. if not = new item is being created.
    data.id = id && data.id;
    // set default state
    data.state = "draft";

    try {
      if (data.image.length >= 1) {
        const formData = new FormData();
        formData.append("files", data.image[0]);
        const imgResponse = await http.post(BASE_URL + "/upload", formData);
        console.log(imgResponse);
        data.image = imgResponse.data[0];
        data.image.related__contentType = "Hotels";
        data.image.related.id = id;
        data.image.related.name = data.name;
      }

      console.log(data);

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
      setUpdatedAt(response.data.updated_at);
    } catch (error) {
      setError(error.toString());
      console.log(error);
    }
  }
  console.log(state);
  async function deleteButton(e) {
    setError(null);
    e.preventDefault();

    const confirmDelete = window.confirm("Delete this message?");

    if (confirmDelete) {
      try {
        // checks if id is passed in, if true update item: if false create new item
        let response;
        if (id) {
          response = await http.delete(BASE_URL + HOTEL_PATH + id);
        }

        if ((response.status = 200)) {
          router.push("/admin/hotels");
        }
      } catch (error) {
        setError(error.toString());
        console.log(error);
      }
    }
  }

  async function updateButton(e) {
    setUpdated(false);
    setError(null);
    e.preventDefault();

    const confirmUpdate = window.confirm("Update state?");

    if (confirmUpdate) {
      const data = new Object();
      data.id = id;
      console.log(data.published_at);
      if (updatedState === null) {
        data.published_at = state === null ? new Date() : null;
      } else {
        data.published_at = updatedState === "draft" ? new Date() : null;
      }

      console.log(data);
      try {
        const response = await http.put(BASE_URL + HOTEL_PATH + id, data);

        if ((response.status = 200)) {
          console.log("updated status");
        }

        const status =
          response.data.published_at !== null ? "published" : "draft";
        setUpdatedState(status);
        setUpdatedAt(response.data.updated_at);
        setUpdated(true);
        console.log(response);
      } catch (error) {
        setError(error.toString());
        console.log(error);
      }
    }
  }

  const goBack = () => router.push("/admin/hotels");

  const handleImageChange = (e) => {
    setImagePreview(true);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  };

  console.log(image);
  let hotelImage;
  if (image && image.length !== 0) {
    if (image[0].url) {
      hotelImage = BASE_URL + image[0].url;
    }
  }

  // todo: when the user revert the changes, set state button to true
  const disableStateButton = () => setStateButton(false);

  return (
    <>
      <BackButton onClick={goBack}>
        <FontAwesomeIcon icon={chevron} size="lg" />
      </BackButton>
      {error && <span>{error}</span>}
      {updated && <span>updated</span>}
      <Col size={11} margin="0 0 0 2rem">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={id && disableStateButton}
        >
          <Row padding_bottom={5}>
            <Col size={6}>
              <Heading>{(id && name) || "Create a new hotel"}</Heading>
            </Col>

            <Col size={6} alignSelf="center">
              <Row justifyContent="right">
                <ButtonGroup>
                  {id && (
                    <Button
                      disabled={!stateButton && true}
                      onClick={updateButton}
                      bgColor="rgb(0, 126, 255)"
                      color="white"
                      disabledChange={!stateButton && true}
                    >
                      {(updatedState && updatedState) ||
                        (state && "published") ||
                        "draft"}
                    </Button>
                  )}
                  <Button
                    disabled={id && stateButton && true}
                    type="submit"
                    bgColor="rgb(109, 187, 26)"
                    color="white"
                    disabledChange={id && stateButton && true}
                  >
                    Save
                  </Button>
                </ButtonGroup>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col size={9} box="white-card">
              <Row padding_bottom={20}>
                <Heading size={5}>DESCRIPTION</Heading>
                <Textarea
                  placeholder="description *"
                  defaultValue={description && description}
                  {...register("description")}
                  type="text"
                  rows="10"
                />
                {errors.description && (
                  <span>{errors.description.message}</span>
                )}
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
                  {errors.zip_code && <span>{errors.zip_code.message}</span>}
                </Col>
              </Row>
              {/*       <div>
                  <input defaultValue={hotel_facilities} />
                 </div> */}
              <Row padding_bottom={20}>
                <Heading size={6}>IMAGE</Heading>
                <Col>
                  {(imagePreview && (
                    <>
                      <img src={imageFile} width="300px" alt="preview image" />
                      <Row>
                        <div onChange={handleImageChange}>
                          <input
                            type="file"
                            name="image"
                            {...register("image")}
                          />
                        </div>
                      </Row>
                    </>
                  )) || (
                    <>
                      {hotelImage && <img src={hotelImage} width="300px" />}
                      <Row>
                        <div onChange={handleImageChange}>
                          <input
                            type="file"
                            name="image"
                            {...register("image")}
                          />
                        </div>
                        <span>
                          {errors.image && <span>{errors.image.message}</span>}
                        </span>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
            <Col size={1} />
            <Col size={2} box="white-card">
              <InformationGroup>
                <Row>
                  <Heading size={5}>INFORMATION</Heading>
                </Row>
                <Row padding="10px 0">Last update: {!updatedAt && updated_at && <small>{updated_at}</small> || <small>{updatedAt}</small>}</Row>
                {id && (
                  <Row padding="10px 0">
                    <ButtonDelete onClick={deleteButton}>
                      <FontAwesomeIcon icon={trash} size="lg" />
                      &nbsp;Delete this hotel
                    </ButtonDelete>
                  </Row>
                )}
              </InformationGroup>
            </Col>
          </Row>
        </form>
      </Col>
    </>
  );
};

export default EditForm;

// TODO: redesign save / delete button. Look into multiple image upload
