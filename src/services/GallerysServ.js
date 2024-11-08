async function createGallery(params) {}
export async function getGallery(params) {
  const url = "http://127.0.0.1:8000/api/gallery/" + params.id;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
  // const response = await fetch("http://127.0.0.1:8000/api/gallery/1");
  // const data=response.json()
  // console.log(data);
  // return data;
  //  {
  //   id: 1,
  //   name: "gallery1",
  //   wallsTex: ["w1", "w2", "w3"],
  //   scale: [2, 1, 4],
  // };
}
export async function getUserGallerys({ token }) {
  console.log(token);
  try {
    const response = await fetch("http://127.0.0.1:8000/api/user_gallerys/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (response.status == 200) {
      return response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}
export async function updateGallery(form) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/gallery", {
      method: "POST",
      // headers:{},
      body: form,
    });
    if (!response.status == 200) {
      return "got an error";
    }
    return response;
  } catch (e) {
    return e;
  }
}

async function deleteGallery(params) {}

export async function loadImg(url) {
  return await fetch(url);
}
