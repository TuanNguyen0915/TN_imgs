const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const allImages = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/image/all`);
    const json = await res.json();
    return json.data;
  } catch (error) {
    throw new Error(error);
  }
};

const imageSaved = async (userId, imageId) => {
  const body = {
    userId,
    imageId
  }
  try {
    const res = await fetch(`${SERVER_URL}/image/saved`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return json.data;
  } catch (error) {
    throw new Error(error);
  }
};

const uploadImaged = async (formData, url,token) => {
  try {
    formData = { ...formData, url, token }
    console.log(formData)
    const res = await fetch(`${SERVER_URL}/image/upload-image`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}

const imageDetail = async(imageId) => {
  try {
    const res = await fetch(`${SERVER_URL}/image/${imageId}`)
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}

export { allImages, imageSaved, uploadImaged, imageDetail };
