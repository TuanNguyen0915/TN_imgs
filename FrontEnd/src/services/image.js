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
export { allImages, imageSaved };
