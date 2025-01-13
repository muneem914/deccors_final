import React, { useEffect } from "react";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useGetAdminBlogsQuery,
} from "../../redux/api/blogApi";
import MetaData from "../layout/MetaData";
import AdminFrame from "../layout/AdminFrame";

import { Typography } from "@mui/material";

import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { DataGrid } from "@mui/x-data-grid";

const ListBlogs = () => {
  const { data, isLoading, error } = useGetAdminBlogsQuery();
  const [
    deleteBlog,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteBlogMutation();
  const deleteBlogHandler = (id) => {
    deleteBlog(id);
    toast.success("Blog deleted");
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
    { field: "createdAt", headerName: "Created At", width: 100 },
    { field: "id", headerName: "ID", width: 230 },
    { field: "title", headerName: "Title", width: 350 },
    // { field: "quote", headerName: "Quote", width: 270 },
    { field: "comments", headerName: "Comments", width: 120 },
    { field: "postedBy", headerName: "Posted By", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Link to={`/admin/blogs/edit/${params.row.id}`}>
            <CiEdit size={24} color="blue" style={{ marginRight: "15px" }} />
          </Link>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => deleteBlogHandler(params.row.id)}
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

  const rows = data?.blogs?.map((blog) => ({
    createdAt: blog?.createdAt?.substring(0, 10),
    id: blog?._id,
    title: blog?.title,
    // quote: blog?.quote1 ? blog?.quote1 : blog?.quote2,
    comments: `${blog?.comments?.length} Comments`,
    postedBy: blog?.user?.name,
  }));

  return (
    <>
      <MetaData title="All Blogs" />
      <AdminFrame>
        <Typography sx={{ my: 2, fontSize: "20px" }}>
          <strong>{data?.blogs?.length}</strong> Blogs
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

export default ListBlogs;
