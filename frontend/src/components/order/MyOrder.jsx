import React, { useEffect } from "react";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
import PageFrame from "../layout/PageFrame";
import MainFrame from "../layout/MainFrame";
import { Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
import { FaRegEye } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import MetaData from "../layout/MetaData";

const MyOrder = () => {
  const { data, isLoading, error } = useMyOrdersQuery();
  const [searchParams] = useSearchParams();
  const orderSuccess = searchParams.get("order_success");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    { field: "createdAt", headerName: "Placed At", width: 120 },
    { field: "id", headerName: "Order ID", width: 250 },
    { field: "amount", headerName: "Amount", width: 100 },
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
          {params.value === "Processing" ? (
            <Chip
              label={params.value}
              size="small"
              color="warning"
              variant="outlined"
            />
          ) : params.value === "Shipped" ? (
            <Chip
              label={params.value}
              size="small"
              color="info"
              variant="outlined"
            />
          ) : params.value === "Delivered" ? (
            <Chip
              label={params.value}
              size="small"
              color="success"
              variant="outlined"
            />
          ) : params.value === "Canceled" ? (
            <Chip
              label={params.value}
              size="small"
              color="error"
              variant="outlined"
            />
          ) : (
            <Chip label={params.value} size="small" variant="outlined" />
          )}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Link to={`/me/order/${params.row.id}`}>
            <FaRegEye size={24} color="blue" style={{ marginRight: "15px" }} />
          </Link>
          <Link to={`/invoice/order/${params.row.id}`}>
            <MdPrint size={24} color="green" style={{ marginRight: "15px" }} />
          </Link>
        </>
      ),
    },
  ];

  const rows = data?.orders?.map((order) => ({
    createdAt: order?.createdAt?.substring(0, 10),
    id: order?._id,
    amount: order?.totalAmount,
    paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
    orderStatus: order?.orderStatus,
  }));

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (orderSuccess) {
      // clear cart
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [error]);
  if (isLoading) return <Loader />;
  return (
    <>
    <MetaData title={"My orders"} />
    
    <PageFrame>
      <MainFrame>
        <Typography sx={{ my: 2, fontSize: "20px" }}>
          <strong>{data?.orders?.length}</strong> Orders You've Made
        </Typography>
        <div style={{ height: 500, width: "100%" }}>
          {data?.orders?.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10, 25, 50]}
            />
          ) : (
            "No orders"
          )}
        </div>
      </MainFrame>
    </PageFrame>
    </>
  );
};

export default MyOrder;
