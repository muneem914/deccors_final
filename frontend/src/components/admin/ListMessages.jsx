import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminFrame from "../layout/AdminFrame";
import { Typography } from "@mui/material";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";

import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { DataGrid } from "@mui/x-data-grid";
import { useDeleteContactMutation, useGetAllContactsQuery } from "../../redux/api/contactApi";
import { useSelector } from "react-redux";
import { useGetAdminUsersQuery } from "../../redux/api/userApi";

const ListMessages = () => {
  const { data: contactsData, error, isLoading } = useGetAllContactsQuery();
  const { data: usersData, isLoading: isUsersLoading } = useGetAdminUsersQuery();
  const [
    deleteContact,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteContactMutation();

  const deleteContactHandler = (id) => {
    deleteContact(id);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Contact Deleted with all messages");
    }
  }, [error, deleteError, isSuccess]);

  if (isLoading) return <Loader />;



  // Helper function to check if email exists in users' list
  const emailExistsInUsers = (email) => {
    return usersData?.users?.some((user) => user.email === email);
  };


  const columns = [
    { field: "createdAt", headerName: "Created At", width: 120 },
    { field: "id", headerName: "ID", width: 230 },
    { field: "name", headerName: "Name", width: 140 },
    { field: "email", headerName: "Email", width: 270 },
    { field: "messages", headerName: "Messages", width: 150 },
    {
      field: "account",
      headerName: "Account",
      width: 110,
      renderCell: (params) => (
        emailExistsInUsers(params.row.email) ? <FaRegCheckCircle color="green" size={24} /> : <FaRegTimesCircle color="red" size={24} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Link to={`/admin/messages/${params.row.id}`}>
            <CiEdit size={24} color="blue" style={{ marginRight: "15px" }} />
          </Link>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => deleteContactHandler(params?.row?.id)}
            disabled={isDeleteLoading}
          >
            <HiOutlineTrash
              size={24}
              color="red"
              style={{ marginRight: "5px" }}
            />
          </span>
        </>
      ),
    },
  ];

  const rows = contactsData?.contacts?.map((contact) => ({
    createdAt: contact?.createdAt?.substring(0, 10),
    id: contact?._id,
    name: contact?.name,
    email: contact?.email,
    messages: `${contact?.messages?.length} Messages`,
  }));
  return (
    <>
      <MetaData title={"All Users"} />

      <AdminFrame>
        <Typography sx={{ my: 2, fontSize: "20px" }}>
          Message From <strong>{contactsData?.contacts?.length}</strong> Users
        </Typography>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50]}
          />
        </div>
      </AdminFrame>
    </>
  );
};

export default ListMessages;
