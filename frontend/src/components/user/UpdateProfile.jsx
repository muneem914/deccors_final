import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateProfileMutation } from '../../redux/api/userApi'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import MetaData from '../layout/MetaData';
import ProfileFrame from '../layout/ProfileFrame';
import './profile.scss'

const UpdateProfile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const [updateProfile, {isLoading, error, isSuccess}] = useUpdateProfileMutation();
    const {user} = useSelector((state) => state.auth)
    useEffect(() => {
        if(user){
            setName(user?.name);
            setEmail(user?.email);
        }
        if (error) {
            toast.error(error?.data?.message);
        }
        if(isSuccess){
            toast.success("user updated");
            navigate("/me/profile")
        }
    }, [user, error, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            name, email
        }
        updateProfile(userData)
    }

  return (
    <>
    <MetaData title='Profile'/>
    <ProfileFrame>
    <div className="formWrapper">
        <form onSubmit={submitHandler} >
          <h2>Update Profile</h2>
            <label for="name"> Name </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label for="email"> Email </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
    </div>
    </ProfileFrame>
        
    </>
  )
}

export default UpdateProfile