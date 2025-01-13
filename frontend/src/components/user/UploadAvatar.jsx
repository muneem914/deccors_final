import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUploadAvatarMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import ProfileFrame from '../layout/ProfileFrame';
import "./profile.scss"

const UploadAvatar = () => {
    const {user} = useSelector((state) => state.auth);
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
    );
    const navigate = useNavigate();
    const [uploadAvatar, {isLoading, error, isSuccess}] = useUploadAvatarMutation();
    
    useEffect(() => {
        if(error){
            toast.error(error?.data?.message);
        }
        if(isSuccess){
            toast.success("Avatar Updated")
            navigate("/me/profile")
        }
    }, [error, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            avatar
        }
        uploadAvatar(userData);
    }

    const onChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
  return (
   <>
   <MetaData title='Profile'/>
   <ProfileFrame>
   <div className="formWrapper">
        <form  onSubmit={submitHandler}>
          <h2>Upload Avatar</h2>
          <div className="avatarBody">
              <div className="imgContainer">
                  <img src={avatarPreview} alt="image" />
              </div>
              <div className="fileInput">
                <label for="imgInput">
                  Choose Profile Picture
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="imgInput"
                  accept="images/*"
                  onChange={onChange}
                />
              </div>
            </div>

          <button
            // id="register_button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
   </ProfileFrame>
    
   </>
  )
}

export default UploadAvatar