import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'
import { useNavigate } from 'react-router-dom'
import { useUpdatePasswordMutation } from '../../redux/api/userApi'
import toast from 'react-hot-toast'
import MetaData from '../layout/MetaData'
import ProfileFrame from '../layout/ProfileFrame'
import "./profile.scss"

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [updatePassword, {isLoading, error, isSuccess}] = useUpdatePasswordMutation()
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
        if(isSuccess){
            toast.success("user updated");
            navigate("/me/profile")
        }
    }, [error, isSuccess])

    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            oldPassword,
            password
        }
        updatePassword(userData)
    }

  return (
    <>
        <MetaData title='Update password' />
        <ProfileFrame>
        <div className="formWrapper">
        <form onSubmit={submitHandler}>
          <h2 className="mb-4">Update Password</h2>
            <label for="old_password_field">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label for="new_password_field">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          <button type="submit">
            Update Password
          </button>
        </form>
    </div>
        </ProfileFrame>
    </>
  )
}

export default UpdatePassword