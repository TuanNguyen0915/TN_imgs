const SERVER_URL = import.meta.env.VITE_SERVER_URL

const allImages = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/image/all`)
    const json = await res.json()
    return json.data
  } catch (error) {
    throw new Error(error)
  }
}

export {allImages}