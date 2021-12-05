import { BASE_URL, ACCOMMONDATION_PATH } from "../../../constants/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EDIT_ACCOMMONDATION_SCHEMA } from "../../../constants/schema";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { useRouter } from "next/router";
import Heading from "../../../components/Common/Heading";

import Error from "../../../modules/error/error";

import Col from "../../../components/Col/Col";
import Row from "../../../components/Row/Row";

import * as Style from "./EditAccommodationForm.style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft as chevron,
  faTrashAlt as trash,
  faSpinner as Spinner,
} from "@fortawesome/free-solid-svg-icons";
import FormatDate from "../../../components/Common/FormatDate";
import Notification from "../../notification/notification";

const EditForm = ({
  id,
  name,
  description,
  category,
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
  const [imageFile, setImageFile] = useState(null);
  const [newUpload, setNewUpload] = useState(false);
  const [notification, setNotification] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);

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
    setSaveLoading(true);

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
      setNotification("Saved");

      // if new item is successfully created, push to edit route of the new item
      if (!id) {
        router.push("/admin/accommodation/edit/" + response.data.id);
      }

      setSaveLoading(false);
      setUpdated(true);
      setUpdatedAt(response.data.updated_at);
    } catch (error) {
      setError(error.toString());
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
      }
    }
  }

  async function updateButton(e) {
    e.preventDefault();
    setUpdated(false);
    setError(null);
    setStateLoading(true);

    const confirmUpdate = window.confirm("Update state?");

    if (confirmUpdate) {
      const data = new Object();
      data.id = id;

      if (updatedState === null) {
        data.published_at = state === null ? new Date() : null;
      } else {
        data.published_at = updatedState === null ? new Date() : null;
      }

      try {
        const response = await http.put(
          BASE_URL + ACCOMMONDATION_PATH + id,
          data
        );

        setUpdatedState(response.data.published_at);
        setNotification(
          (updatedState === null && "Published") || "Unpublished"
        );

        setUpdatedAt(response.data.updated_at);
        setUpdated(true);
        setStateLoading(false);
      } catch (error) {
        setError(error.toString());
        setStateLoading(false);
      }
    }
  }
  const goBack = () => router.push("/admin/accommodation");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImagePreview(true);
      setImageFile(URL.createObjectURL(e.target.files[0]));
    } else {
      setImagePreview(false);
      setImageFile(null);
    }
  };

  const newImageUpload = () => {
    setNewUpload(true);
  };

  let accommodationImage;
  if (image && image.length !== 0) {
    if (image[0].url) {
      accommodationImage = image[0].url;
    }
  }

  const disableStateButton = () => {
    // TODO: future imrpovements:
    setStateButton(false);
  };

  return (
    <Style.Container>
      <Style.BackButton onClick={goBack}>
        <FontAwesomeIcon icon={chevron} size="lg" />
      </Style.BackButton>

      {updated && <Notification>{notification}</Notification>}
      <Col xs={12} md={11} margin="0 0 0 2rem">
        {error && (
          <Style.ErrorContainer>
            <Error string={error} />
          </Style.ErrorContainer>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={id && disableStateButton}
        >
          <Row padding="0px 0px 5px 0px" alignItems="center">
            <Col xs={12} md={6}>
              <Heading>{(id && name) || "New accommodation"}</Heading>
            </Col>

            <Col xs="auto" md={6} alignSelf="center">
              <Row justifyContent="right">
                <Style.ButtonGroup>
                  {id && (
                    <Style.Button
                      disabled={!stateButton && true}
                      onClick={updateButton}
                      bgColor="rgb(0, 126, 255)"
                      color="white"
                      disabledChange={!stateButton && true}
                    >
                      {(stateLoading && (
                        <FontAwesomeIcon icon={Spinner} spin />
                      )) ||
                        (updatedState && updatedState === null && "Publish") ||
                        (isNaN(updatedState) && "Unpublish") ||
                        (state && "Unpublish") ||
                        "Publish"}
                    </Style.Button>
                  )}
                  <Style.Button
                    disabled={id && stateButton && true}
                    type="submit"
                    bgColor="rgb(109, 187, 26)"
                    color="white"
                    margin="0 0 0 1rem"
                    disabledChange={id && stateButton && true}
                  >
                    {(saveLoading && <FontAwesomeIcon icon={Spinner} spin />) ||
                      "Save"}
                  </Style.Button>
                </Style.ButtonGroup>
              </Row>
            </Col>
          </Row>
          <Row>
            <Style.Content>
              <Col xs={11} md={9}>
                <Style.Box padding="22px 40px">
                  <Row padding="0px 0px 20px 0px">
                    <Heading size={5}>DESCRIPTION</Heading>
                    <Style.Textarea
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
                    <Col xs={11} md={4}>
                      <Heading size={5}>NAME</Heading>
                      <Style.Input
                        placeholder="name *"
                        defaultValue={name && name}
                        {...register("name")}
                        type="text"
                        autoFocus
                      />
                      {errors.name && <span>{errors.name.message}</span>}
                    </Col>
                    <Col xs={11} md={4}>
                      <Heading size={5}>ADDRESS</Heading>
                      <Style.Input
                        placeholder="address *"
                        defaultValue={address && address}
                        {...register("address")}
                        type="text"
                      />
                      {errors.address && <span>{errors.address.message}</span>}
                    </Col>
                    <Col xs={11} md={4}>
                      <Heading size={5}>ZIP CODE</Heading>
                      <Style.Input
                        placeholder="zip_code *"
                        defaultValue={zip_code && zip_code}
                        {...register("zip_code")}
                        type="text"
                      />
                      {errors.zip_code && (
                        <span>{errors.zip_code.message}</span>
                      )}
                    </Col>
                  </Row>
                  <Row padding="0px 0px 20px 0px">
                    <Col xs={11} md={4}>
                      <Heading size={5}>Category</Heading>
                      <Style.Select
                        defaultValue={(category && category) || ""}
                        {...register("category")}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="hotel">Hotel</option>
                        <option value="apartment">Apartment</option>
                        <option value="resort">Resort</option>
                        <option value="homestay">Homestay</option>
                      </Style.Select>

                      {errors.category && (
                        <span>{errors.category.message}</span>
                      )}
                    </Col>

                    <Col xs={11} md={4}>
                      <Heading size={5}>CITY</Heading>
                      <Style.Input
                        placeholder="city *"
                        defaultValue={city && city}
                        {...register("city")}
                        type="text"
                      />
                      {errors.city && <span>{errors.city.message}</span>}
                    </Col>
                  </Row>
                  <Row padding="0px 0px 20px 0px">
                    <Col xs={11} md={6}>
                      <Row>
                        <Col md={6}>
                          <Heading size={6}>IMAGE</Heading>
                          <Style.ImageContainer>
                            {(imagePreview && (
                              <>
                                <Style.Image
                                  src={imageFile}
                                  alt="preview image"
                                />
                                <div onChange={handleImageChange}>
                                  <input
                                    type="file"
                                    name="image"
                                    {...register("image")}
                                  />
                                </div>
                                {/*                                <button onClick={revertImage}>
                                  Revert image
                                </button> */}
                              </>
                            )) || (
                              <>
                                {accommodationImage && (
                                  <Style.Image src={accommodationImage} />
                                )}

                                {(newUpload && (
                                  <div onChange={handleImageChange}>
                                    <input
                                      type="file"
                                      name="image"
                                      {...register("image")}
                                    />
                                  </div>
                                )) || (
                                  <Style.Button
                                    onClick={newImageUpload}
                                    bgColor="rgb(0 126 255)"
                                    color="white"
                                    padding="7px 10px"
                                  >
                                    {(accommodationImage &&
                                      "Upload new image?") ||
                                      "Upload image"}
                                  </Style.Button>
                                )}

                                <span>
                                  {errors.image && (
                                    <span>{errors.image.message}</span>
                                  )}
                                </span>
                              </>
                            )}
                          </Style.ImageContainer>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Style.Box>
              </Col>

              <Col md={0.5} />

              <Col xs={11} md={2.5}>
                <Style.InformationGroup>
                  <Style.Box margin=" 0 0 10px 0 ">
                    <Row>
                      <Heading size={5}>INFORMATION</Heading>
                    </Row>
                    <Row padding="10px 0" justifyContent="space-between">
                      <Col xs={4}>
                        <span>Featured</span>
                      </Col>
                      <Col xs={8}>
                        <Style.CheckBox
                          type="checkbox"
                          defaultChecked={featured && featured}
                          name="featured"
                          {...register("featured")}
                        />
                      </Col>
                      {errors.featured && (
                        <span>{errors.featured.message}</span>
                      )}
                    </Row>
                    <Row padding="10px 0">
                      Last update:&nbsp;
                      {(!updatedAt && updated_at && (
                        <FormatDate date={updated_at} />
                      )) || <FormatDate date={updatedAt} />}
                    </Row>
                  </Style.Box>
                  {id && (
                    <>
                      <Style.StateInfo
                        state={
                          (updatedState && updatedState === null && "draft") ||
                          (isNaN(updatedState) && "published") ||
                          (state && "published") ||
                          "draft"
                        }
                      >
                        <Row padding="5px 10px">
                          • Editing{" "}
                          {(updatedState && updatedState === null && "draft") ||
                            (isNaN(updatedState) && "published") ||
                            (state && "published") ||
                            "draft"}{" "}
                          version
                        </Row>
                      </Style.StateInfo>
                      <Style.Box padding="5px 10px" margin="10px 0 0 0">
                        <Row padding="10px 0">
                          <Style.ButtonDelete onClick={deleteButton}>
                            <FontAwesomeIcon icon={trash} size="lg" />
                            &nbsp;Delete this accommodation
                          </Style.ButtonDelete>
                        </Row>
                      </Style.Box>
                    </>
                  )}
                </Style.InformationGroup>
              </Col>
            </Style.Content>
          </Row>
        </form>
      </Col>
    </Style.Container>
  );
};

export default EditForm;

// TODO: redesign image upload, revert button place at the right corner of image- x indicate remove image. Look into multiple image upload
