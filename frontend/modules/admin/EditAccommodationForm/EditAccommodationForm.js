import { BASE_URL, ACCOMMONDATION_PATH } from "../../../constants/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EDIT_ACCOMMONDATION_SCHEMA } from "../../../constants/schema";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useRouter } from "next/router";
import Heading from "../../../components/Common/Heading";
// import Image from "next/image";

import Error from "../../../modules/error/error";

import Col from "../../../components/Col/Col";
import Row from "../../../components/Row/Row";

import {
  Button,
  BackButton,
  ButtonGroup,
  ButtonDelete,
  InformationGroup,
  Container,
  Textarea,
} from "./EditAccommodationForm.style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft as chevron,
  faTrashAlt as trash,
} from "@fortawesome/free-solid-svg-icons";
import FormatDate from "../../../components/Common/FormatDate";

const EditForm = ({
  id,
  name,
  description,
  address,
  city,
  zip_code,
  image,
  state,
  updated_at,
  featured,
}) => {
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [updatedState, setUpdatedState] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [stateButton, setStateButton] = useState(true);
  const [imagePreview, setImagePreview] = useState(false);
  const [imageRevertButton, setImageRevertButton] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [newUpload, setNewUpload] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EDIT_ACCOMMONDATION_SCHEMA),
  });

  const http = useAxios();

  async function onSubmit(data) {
    setUpdated(false);
    setError(null);

    console.log(data);

    // set id, if id is passed in => editting item. if not = new item is being created.
    data.id = id && data.id;
    // set default state to draft

    if (!updated_at) {
      data.published_at = null;
    }

    try {
      if (data.image && data.image.length !== 0) {
        const formData = new FormData();
        formData.append("files", data.image[0]);
        const imgResponse = await http.post(BASE_URL + "/upload", formData);
        data.image = imgResponse.data[0];
        data.image.related__contentType = "Accommondation";
        data.image.related.id = id;
        data.image.related.name = data.name;
      } else {
        delete data.image;
      }

      // checks if id is passed in, if true update item - if false create new item
      let response;
      if (id) {
        response = await http.put(BASE_URL + ACCOMMONDATION_PATH + id, data);
      } else {
        response = await http.post(BASE_URL + ACCOMMONDATION_PATH, data);
      }

      console.log(response);

      // if new item is successfully created, push to edit route of the new item
      if (!id) {
        router.push("/admin/accommodation/edit/" + response.data.id);
      }

      setImageRevertButton(false);
      setUpdated(true);
      setUpdatedAt(response.data.updated_at);
    } catch (error) {
      setError(error.toString());
      console.log(error);
    }
  }
  async function deleteButton(e) {
    setError(null);
    e.preventDefault();

    const confirmDelete = window.confirm("Delete this message?");

    if (confirmDelete) {
      try {
        // checks if id is passed in, if true update item: if false create new item
        let response;
        if (id) {
          response = await http.delete(BASE_URL + ACCOMMONDATION_PATH + id);
        }

        if ((response.status = 200)) {
          router.push("/admin/accommodation");
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

      try {
        const response = await http.put(
          BASE_URL + ACCOMMONDATION_PATH + id,
          data
        );

        if ((response.status = 200)) {
          console.log("updated status");
        }

        const status =
          response.data.published_at !== null ? "Unpublish" : "Publish";
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

  const goBack = () => router.push("/admin/accommodation");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagePreview(true);
      setImageFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const revertImage = () => {
    setImagePreview(false);
    setImageFile(null);
  };

  const newImageUpload = () => {
    setNewUpload(true);
  };

  let accommodationImage;
  if (image && image.length !== 0) {
    if (image[0].url) {
      accommodationImage = BASE_URL + image[0].url;
    }
  }

  const disableStateButton = () => setStateButton(false);

  return (
    <Container>
      <BackButton onClick={goBack}>
        <FontAwesomeIcon icon={chevron} size="lg" />
      </BackButton>
      {error && <Error string={error} />}
      {updated && <span>updated</span>}
      <Col xs={12} md={11} margin="0 0 0 2rem">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={id && disableStateButton}
        >
          <Row padding="0px 0px 5px 0px" alignItems="center">
            <Col md={6}>
              <Heading>{(id && name) || "Create a new accommodation"}</Heading>
            </Col>

            <Col xs={12} md={6} alignSelf="center">
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
                        (state && "Unpublish") ||
                        "Publish"}
                    </Button>
                  )}
                  <Button
                    disabled={id && stateButton && true}
                    type="submit"
                    bgColor="rgb(109, 187, 26)"
                    color="white"
                    margin="0 0 0 1rem"
                    disabledChange={id && stateButton && true}
                  >
                    Save
                  </Button>
                </ButtonGroup>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={11} md={9} box="white-card">
              <Row padding="0px 0px 20px 0px">
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
              <Row padding="0px 0px 20px 0px">
                <Col xs={11} md={6}>
                  <Heading size={5}>NAME</Heading>
                  <input
                    placeholder="name *"
                    defaultValue={name && name}
                    {...register("name")}
                    type="text"
                    autoFocus
                  />
                  {errors.name && <span>{errors.name.message}</span>}
                </Col>
                <Col xs={11} md={6}>
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
              <Row padding="0px 0px 20px 0px">
                <Col xs={11} md={6}>
                  <Heading size={5}>CITY</Heading>
                  <input
                    placeholder="city *"
                    defaultValue={city && city}
                    {...register("city")}
                    type="text"
                  />
                  {errors.city && <span>{errors.city.message}</span>}
                </Col>
                <Col xs={11} md={6}>
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
              <Row padding="0px 0px 20px 0px">
                <Col xs={11} md={6}>
                  <Row>
                    <Col md={6}>
                      <Heading size={6}>IMAGE</Heading>

                      {(imagePreview && (
                        <>
                          <img
                            src={imageFile}
                            width="300px"
                            alt="preview image"
                          />

                          <div onChange={handleImageChange}>
                            <input
                              type="file"
                              name="image"
                              {...register("image")}
                            />
                          </div>
                          {imageRevertButton && (
                            <button onClick={revertImage}>Revert image</button>
                          )}
                        </>
                      )) || (
                        <>
                          {accommodationImage && (
                            <img src={accommodationImage} width="300px" />
                          )}

                          <div onChange={handleImageChange}>
                            {(newUpload && (
                              <input
                                type="file"
                                name="image"
                                {...register("image")}
                              />
                            )) || (
                              <Button
                                onClick={newImageUpload}
                                bgColor="rgb(0 126 255)"
                                color="white"
                                padding="7px 10px"
                              >
                                Upload new image?
                              </Button>
                            )}
                          </div>
                          <span>
                            {errors.image && (
                              <span>{errors.image.message}</span>
                            )}
                          </span>
                        </>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col xs={11} md={6}>
                  <Heading size={5}>Featured</Heading>
                  <input
                    type="checkbox"
                    defaultChecked={featured && featured}
                    name="featured"
                    {...register("featured")}
                  />
                  {errors.featured && <span>{errors.featured.message}</span>}
                </Col>
              </Row>
            </Col>
            <Col md={1} />
            <Col xs={11} md={2} box="white-card">
              <InformationGroup>
                <Row>
                  <Heading size={5}>INFORMATION</Heading>
                </Row>
                <Row padding="10px 0">
                  Last update:&nbsp;
                  {(!updatedAt && updated_at && (
                    <FormatDate date={updated_at} />
                  )) || <FormatDate date={updatedAt} />}
                </Row>
                {id && (
                  <Row padding="10px 0">
                    <ButtonDelete onClick={deleteButton}>
                      <FontAwesomeIcon icon={trash} size="lg" />
                      &nbsp;Delete this accommodation
                    </ButtonDelete>
                  </Row>
                )}
              </InformationGroup>
            </Col>
          </Row>
        </form>
      </Col>
    </Container>
  );
};

export default EditForm;

// TODO: redesign image upload, revert button place at the right corner of image- x indicate remove image. Look into multiple image upload
