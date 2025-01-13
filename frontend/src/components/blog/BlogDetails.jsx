import React, { useEffect, useState } from "react";
import {
  useAddCommentMutation,
  useGetBlogDetailsQuery,
} from "../../redux/api/blogApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import PageFrame from "../layout/PageFrame";
import MainFrame from "../layout/MainFrame";

import { FaXTwitter } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

import { Box } from "@mui/material";
import { LuDot } from "react-icons/lu";
import { IoCalendarOutline, IoPersonOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const BlogDetails = () => {
  const params = useParams();
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
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const { data } = useGetBlogDetailsQuery(params?.id);
  const navigate = useNavigate();
  const [addComment, { isSuccess, isLoading, error }] = useAddCommentMutation();
  //   const { isAuthenticated } = useSelector((state) => state.auth);
  const blog = data?.blog;

  const date = new Date(blog?.createdAt);

  // Format the date object into the desired format
  const formattedDate = date.toLocaleString("en-US", {
    month: "long", // Full month name (June)
    day: "numeric", // Day of the month with padding (28)
    hour: "numeric", // Hour in 24-hour format (11)
    minute: "numeric", // Minutes with padding (54)
    // You can optionally include other options like time zone with timeZone property
  });

  const text = `${blog?.description}`;
  const words = text.split(" ");
  const avgWords = Math.ceil(words.length / 4);
  const joinWords = (start, end) => {
    let part = words.slice(start, end).join(" ");
    if (!part.trim().endsWith(".")) {
      part += "-";
    }
    return part;
  };
  const part1 = joinWords(0, avgWords);
  const part2 = joinWords(avgWords, avgWords * 2);
  const part3 = joinWords(avgWords * 2, avgWords * 3);
  const part4 = joinWords(avgWords * 3, words.length);

  // Handle input changes
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

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Your comment is now public on this blog");
      navigate(`/blogs/${params.id}`);
    }
  }, [error, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };
    // Handle form submission
    addComment({ id: params?.id, body: dataToSubmit });
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      message: "",
    });
    setAgreeToTerms(false);
    setIsFormValid(false);
  };

  return (
    <>
      <MetaData title={blog?.title} />
      <PageFrame>
        <div className="imageContainer faq">
          <div className="row">
            <h1 style={{textTransform: 'capitalize'}}>{blog?.title}</h1>
            <p>
              <Link to="/">Home</Link> <span>|</span>{" "}
              <Link to="/blogs">Blogs</Link> <span>|</span> {blog?.title}
            </p>
          </div>
        </div>
        <MainFrame>
          <div className="blogDetails">
            <div className="imgContainer">
              <img
                src={
                  blog?.images[0]
                    ? blog?.images[0]?.url
                    : "/images/default_product.png"
                }
                alt={blog?.name}
              />
            </div>
            <div className="authorDateComment">
              <p>{blog?.user?.name}</p>
              <p>
                {formattedDate}
                <span>/</span>
                {blog?.comments?.length} Comment
              </p>
            </div>
            <h2>{blog?.title}</h2>
            {blog?.subtitle ? <h3>{blog?.subtitle}</h3> : ""}
            <p className="description para1">{part1}</p>
            {blog?.quote1 ? (
              <blockquote>
                <p className="quote1">{blog?.quote1}</p>
              </blockquote>
            ) : (
              ""
            )}
            <p className="description para2">{part2}</p>
            <div className="multiImages">
              {blog?.images?.slice(1).map((img) => (
                <img width={100} height={100} src={img?.url} alt="image_name" />
              ))}
            </div>
            <p className="description para3">{part3}</p>
            {blog?.quote2 ? (
              <blockquote>
                <p className="quote1">{blog?.quote2}</p>
              </blockquote>
            ) : (
              ""
            )}
            <p className="description para4">{part4}</p>
          </div>
          <div className="blogShare">
            <p>Share With Us:</p>
            <Box className="socialLinks">
              <Link>
                <FaXTwitter />
              </Link>
              <Link>
                <GrFacebookOption />
              </Link>
              <Link>
                <FaPinterest />
              </Link>
              <Link>
                <FaInstagram />
              </Link>
            </Box>
          </div>
          <div className="blogForm">
            <h4>Leave a reply</h4>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={!!user}
              />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="off"
                disabled={!!user}
              />
              <textarea
                rows="5"
                type="text"
                name="message"
                id="message"
                placeholder="Your Message"
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
              <div className="button">
                <button type="submit" disabled={!isFormValid || isLoading}>
                  submit now
                </button>
              </div>
            </form>
          </div>
          <div className="comments">
            <h4>{blog?.comments?.length} Comment</h4>
            {blog?.comments?.length > 0 ? (
              blog.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment?.message}</p>
                  <p>
                    <IoPersonOutline />
                    {comment?.name}
                    <span>
                      <LuDot />
                    </span>
                    <IoCalendarOutline />
                    {comment?.createdAt}
                  </p>
                </div>
              ))
            ) : (
              <p className="noComment">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </MainFrame>
      </PageFrame>
    </>
  );
};

export default BlogDetails;
