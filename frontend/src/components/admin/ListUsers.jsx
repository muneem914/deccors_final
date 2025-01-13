import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetAdminUsersQuery,
} from "../../redux/api/userApi";
import AdminFrame from "../layout/AdminFrame";
import { Typography } from "@mui/material";

import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { DataGrid } from "@mui/x-data-grid";

const ListUsers = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();
  const [
    deleteUser,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteUserMutation();

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product Deleted");
    }
  }, [error, deleteError, isSuccess]);

  if (isLoading) return <Loader />;

  const columns = [
    { field: "createdAt", headerName: "Created At", width: 120 },
    { field: "id", headerName: "ID", width: 230 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 270 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Link to={`/admin/users/${params.row.id}`}>
            <CiEdit size={24} color="blue" style={{ marginRight: "15px" }} />
          </Link>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => deleteUserHandler(params.row.id)}
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

  const rows = data?.users?.map((user) => ({
    createdAt: user?.createdAt?.substring(0, 10),
    id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  }));

  return (
    <>
      <MetaData title={"All Users"} />

      <AdminFrame>
        <Typography sx={{ my: 2, fontSize: "20px" }}>
          <strong>{data?.users?.length}</strong> Users
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

export default ListUsers;
