const UploadImageForm = ({user, imageUrl}) => {
  return (
  <div>
    <h1>{user.name}</h1>
    {imageUrl && <a href={imageUrl} >{imageUrl}</a>}
  </div>
  )
}

export default UploadImageForm