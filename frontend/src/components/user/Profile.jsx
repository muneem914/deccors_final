import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import ProfileFrame from "../layout/ProfileFrame";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  function dateFormatter(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    return formattedDate;
  }
  return (
    <>
      <MetaData title="Profile" />
      <ProfileFrame>
        <div className="profilePage">
          <div className="profileContainer">
            <div className="profileImageContainer">
              <img
                src={
                  user?.avatar
                    ? user?.avatar?.url
                    : "../images/default_avatar.jpg"
                }
                alt={user?.name}
              />
            </div>

            <div className="profileDetails">
              <h4>Full Name</h4>
              <p className="name">{user?.name}</p>
              <hr />

              <h4>Email Address</h4>
              <p>{user?.email}</p>
              <hr />
              <h4>Joined On</h4>
              <p>{dateFormatter(user?.createdAt)}</p>
            </div>
          </div>
        </div>
      </ProfileFrame>
    </>
  );
};

export default Profile;
