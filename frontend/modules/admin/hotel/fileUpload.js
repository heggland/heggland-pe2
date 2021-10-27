const fileUpload = (file) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  const options = {
    method: "POST",
    body: file,
    headers: {
      "Content-Type": "image",
      "Content-Disposition": `attachment; filename="${file.name}"`,
      Authorization: `Bearer ${auth.token}`,
    },
  };

  console.log(options);

  /*
  try {
    const response = await fetch(url + "wp/v2/media", options);
    const json = await response.json();
    const id = json.id;
    if (id) {
      console.log(json);
      return parseInt(id);
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
  */
};

export default fileUpload;
