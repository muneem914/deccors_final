import React from "react";
import MetaData from "../layout/MetaData";
import AdminFrame from "../layout/AdminFrame";
import { Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { RxSlash } from "react-icons/rx";
import { useGetContactDetailsQuery } from "../../redux/api/contactApi";
import Divider from '@mui/material/Divider';

const MessageDetails = () => {
  const params = useParams();
  const { data } = useGetContactDetailsQuery(params?.id);
  const messageClasses = ['green', 'red', 'blue', 'violet'];
  return (
    <>
      <MetaData title={"All Users"} />

      <AdminFrame>
        <Box className="breadcrumb">
          <Link to="/admin/messages">Messages</Link> <RxSlash />{" "}
          <Link>Message Details</Link>
        </Box>
        <Box className="messageBody">
          <p className="sender"><span>Sender Name:</span> {data?.contact?.name}</p>
          <p className="mai;"><span>Sender Email:</span> {data?.contact?.email}</p>
          <div className="divider"></div>
          <p className="countSms"><span>{data?.contact?.messages?.length}</span> Messages</p>
          {data?.contact?.messages?.length > 0
            ? data?.contact?.messages?.map((item, index) => <span key={index} className={`message ${messageClasses[index % messageClasses.length]}`}>{item.message}</span>)
            : "No messages to show"}
        </Box>
      </AdminFrame>
    </>
  );
};

export default MessageDetails;
