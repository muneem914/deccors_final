import React, { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [resetPassword, {isLoading, error, isSuccess}] = useResetPasswordMutation();
    const {isAuthenticated} = useSelector((state) => state.auth);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
        if(error){
            toast.error(error?.data?.message)
        }
        if(isSuccess){
            toast.success("Password reset successfully.")
            navigate("/login")
        }
    }, [isAuthenticated, error, isSuccess])


    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            return toast.error("password doesn't match")
        }
        const data = {password, confirmPassword}
        resetPassword({token: params?.token, body: data})
    }

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">New Password</h2>

          <div className="mb-3">
            <label for="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="confirm_password_field" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button id="new_password_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
            {isLoading ? "Setting new password" : "Set password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword