import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import MainFrame from "../layout/MainFrame";
import PageFrame from "../layout/PageFrame";
import "./pages.scss";
import { Box } from "@mui/material";
import { PiPhoneCallLight, PiMapPinAreaBold } from "react-icons/pi";
import { PiEnvelopeLight } from "react-icons/pi";
import { FaRegMap } from "react-icons/fa6";
import { useAddOrUpdateMessageMutation } from "../../redux/api/contactApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Contact = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    message: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        message: "",
      });
    }
  }, [user]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [addOrUpdateMessage, { isLoading, isSuccess, error }] =
    useAddOrUpdateMessageMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Your message has been submitted.");
    }
  }, [error, isSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };

  useEffect(() => {
    const { name, email, message } = formData;
    setIsFormValid(
      name.trim() !== "" &&
        email.trim() !== "" &&
        message.trim() !== "" &&
        agreeToTerms
    );
  }, [formData, agreeToTerms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateMessage(formData);
    // Clear the form and disable the submit button
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      message: "",
    });
  };
  return (
    <>
      <MetaData title="Contact Us" />
      <PageFrame>
        <div className="imageContainer contact">
          <div className="row">
            <h1>Contact Us</h1>
            <p>
              <Link to="/">Home</Link> <span>|</span> Contact us
            </p>
          </div>
        </div>
        <MainFrame>
          <Box className="contactMain">
            <Box className="contactLocation">
              <Box className="mainText">
                <p>contact us</p>
                <h1>our office location -</h1>
              </Box>
              <h4>USA Head Office</h4>
              <div className="locationDetails">
                <div className="location">
                  <FaRegMap />
                  <div>
                    <h5>Visit our office branch</h5>
                    <p>
                      No: 58 A, East Madison Street, Baltimore, MD, USA 4508
                    </p>
                  </div>
                </div>
                <div className="location">
                  <PiEnvelopeLight />
                  <div>
                    <h5>Chat to us</h5>
                    <p>Info@example.com</p>
                  </div>
                </div>
                <div className="location">
                  <PiPhoneCallLight />
                  <div>
                    <h5>Call us</h5>
                    <p>
                      <a href="callto:+000-123456789">+000-123456789</a>
                    </p>
                  </div>
                </div>
              </div>
            </Box>
            <Box className="contactForm">
              <h1>get in touch for enquires & offers</h1>
              <p>
                Volutpat diam ut venenatis tellus in metus vulputate eu. Egestas
                sed sed risus pretium quam vulputate dignissim.
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={!!user}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={!!user}
                  autoComplete="off"
                />
                <textarea
                  rows={3}
                  type="text"
                  name="message"
                  placeholder="Comment"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
                <div className="checker">
                  <input
                    type="checkbox"
                    id="checked"
                    // name="agreeToTerms"
                    checked={agreeToTerms}
                    onChange={handleCheckboxChange}
                    required
                  />
                  <label for="checked">
                    Save my name, email, and website in this browser.
                  </label>
                </div>
                <div className="buttonDiv">
                  <button type="submit" disabled={!isFormValid || isLoading}>
                    send
                  </button>
                </div>
              </form>
            </Box>
          </Box>
        </MainFrame>
        <Box sx={{ m: 0, p: 0 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12103.101637649888!2d89.37305358981452!3d24.850682752063737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc54e7e81df441%3A0x27133ed921fe73f4!2sBogura!5e0!3m2!1sen!2sbd!4v1722625949036!5m2!1sen!2sbd"
            width="100%"
            height="500"
            style={{
              border: "none",
              outline: 0,
              boxShadow: "none",
              margin: 0,
              padding: 0,
              display: "block",
              filter: "grayscale(100%)",
            }}
            allowfullscreen
            loading="lazy"
            title="location map"
            referrerpolicy="no-referrer-when-downgrade"
          >
            Browser not compatible
          </iframe>
        </Box>
      </PageFrame>
    </>
  );
};

export default Contact;
