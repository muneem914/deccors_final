import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ item }) => {
  const timestampString = "2024-06-28T11:54:17.507Z";

  // Parse the timestamp string into a Date object (assuming UTC timezone)
  const date = new Date(item?.createdAt);

  // Format the date object into the desired format
  const formattedDate = new Date(item?.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  console.log(formattedDate); // Output: 28 Mar 2024

  return (
    <div className="singleBlog">
      <Link>
        <div className="blogImage">
          <img src={
                item?.images[0]
                  ? item?.images[0]?.url
                  : "/images/default_product.png"
              }
              alt={item?.name} />
        </div>
      </Link>
      <div className="blogContent">
        <div className="dateComment">
          <p className="date">{formattedDate}</p>
          <p className="comment">{item?.comments?.length} Comment</p>
        </div>
        <Link to={`/blogs/${item?._id}`} className="name">{item?.title}</Link>
        <p className="description">{item?.description.substring(0, 240)}...</p>
        <Link to={`/blogs/${item?._id}`} className="readBtn">read more</Link>
      </div>
    </div>
  );
};

export default BlogItem;
