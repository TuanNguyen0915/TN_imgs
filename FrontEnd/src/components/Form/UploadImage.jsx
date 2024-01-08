import {AiOutlineCloudUpload} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const UploadImage = () => {

  return (
    <div>UploadImage
      <MdDelete />
      <AiOutlineCloudUpload />
    </div>
  )
}

export default UploadImage