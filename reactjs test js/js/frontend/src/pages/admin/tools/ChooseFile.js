import React from "react";

function chooseFile() {
  return (
    <Popup
      trigger={<Button variant="outline-primary">Choose File</Button>}
      modal
    >
      <Row>
        <Col>
          <Form.Label className="font-weight-bold">Upload a image</Form.Label>
          <Form.Control
            className="border-0"
            type="file"
            {...register("file")}
            name="file"
            onChange={handleChange}
            accept="image/png, image/jpeg"
          />
        </Col>
        <Col>
          <Row>
            <Form.Label className="font-weight-bold">
              Choose an image from the cloud
            </Form.Label>
          </Row>
          <Row>
            <Popup
              trigger={
                <Button variant="outline-primary" onClick={showGallery}>
                  Choose
                </Button>
              }
              modal
            >
              <span> Modal content </span>
            </Popup>
          </Row>
        </Col>
      </Row>
    </Popup>
  );
}
