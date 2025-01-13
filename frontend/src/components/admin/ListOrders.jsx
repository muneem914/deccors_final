import React, { useEffect } from "react";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../redux/api/productsApi";
import Loader from "../layout/Loader";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../redux/api/orderApi";
import AdminFrame from "../layout/AdminFrame";
import { Chip, Typography } from "@mui/material";

import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { DataGrid } from "@mui/x-data-grid";

const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();
  const [
    deleteOrder,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteOrderMutation();

  const deleteOrderHandler = (id) => {
    deleteOrder(id);
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
    { field: "createdAt", headerName: "Placed At", width: 120 },
    { field: "id", headerName: "Order ID", width: 250 },
    { field: "orderedBy", headerName: "Ordered By", width: 170 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 200,
      renderCell: (params) => (
        <span
          style={{
            color:
              params.value === "PAID"
                ? "green"
                : params.value === "NOT PAID"
                ? "red"
                : "black",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 220,
      renderCell: (params) => (
        <>
        {params.value === "Processing" ? <Chip label={params.value} size= 'small'color="warning" variant="outlined" /> :
          params.value === 'Shipped' ? <Chip label={params.value} size='small'color="info" variant="outlined" /> : 
          params.value === 'Delivered' ? <Chip label={params.value} size='small'color="success" variant="outlined" /> :
          params.value === 'Canceled' ? <Chip label={params.value} size='small'color="error" variant="outlined" /> : 
          <Chip label={params.value} size='small' variant="outlined" />
        }
          </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Link to={`/admin/orders/${params.row.id}`}>
            <CiEdit size={24} color="blue" style={{ marginRight: "15px" }} />
          </Link>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => deleteOrderHandler(params.row.id)}
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

  const rows = data?.orders?.map((order) => ({
    createdAt: order?.createdAt?.substring(0, 10),
    id: order?._id,
    orderedBy: order?.user?.name,
    paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
    orderStatus: order?.orderStatus,
  }));
  return (
    <>
      <MetaData title={"All Orders"} />

      <AdminFrame>
        <Typography sx={{ my: 2, fontSize: "20px" }}>
          <strong>{data?.orders?.length}</strong> Orders
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

export default ListOrders;
