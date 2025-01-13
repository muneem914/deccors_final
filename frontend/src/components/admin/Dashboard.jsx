import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import AdminLayout from "../layout/AdminLayout";
import SalesChart from "../charts/SalesChart";
import {
  useGetAdminOrdersQuery,
  useLazyGetDashboardSalesQuery,
} from "../../redux/api/orderApi";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import AdminFrame from "../layout/AdminFrame";
import { useSelector } from "react-redux";
import { RiCoinsFill, RiCoinsLine } from "react-icons/ri";
import { GoChecklist } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { FaBoxes } from "react-icons/fa";
import { RiBloggerFill } from "react-icons/ri";
import { useGetAdminUsersQuery } from "../../redux/api/userApi";
import { useGetAdminProductsQuery } from "../../redux/api/productsApi";
import { useGetAdminBlogsQuery } from "../../redux/api/blogApi";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { FaArrowRightLong } from "react-icons/fa6";

const Dashboard = () => {
  const [clock, setClock] = useState();
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());
  const { user } = useSelector((state) => state.auth);
  const [getDashboardSales, { error, data, isLoading }] =
    useLazyGetDashboardSalesQuery();

  const { data: userList } = useGetAdminUsersQuery();
  const { data: productsList } = useGetAdminProductsQuery();
  const { data: blogsList } = useGetAdminBlogsQuery();
  const { data: ordersList } = useGetAdminOrdersQuery();

  const recentOrders = ordersList?.orders.slice(-4);
  let productList = [];
  recentOrders?.forEach((order) => {
    productList = [...productList, ...order.orderItems];
  });
  const productsToDisplay = productList.slice(0, 3);

  const recentUsers = [...(userList?.users || [])] // Create a copy of the array
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
    .slice(0, 3); // Get the last 4 orders

  const submitHandler = () => {
    console.log(new Date(startDate).toISOString());
    console.log(endDate.toISOString());
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (startDate && endDate && !data) {
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [error]);

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

  if (isLoading) return <Loader />;

  console.log(data);
  return (
    <>
      <MetaData title={"Admin Dashboard"} />
      <AdminFrame>
        <div className="welcome">
          <div className="info">
            <h4>Welcome, {user?.name}.</h4>
            <p>Good to see you back. </p>
          </div>
          <div className="clock">
            <h5>Time: {clock}</h5>
          </div>
        </div>
        <hr />

        <div className="cardContainer">
          <div className="singleCard">
            <div className="icon">
              <RiCoinsFill color="#b3e5fc" size={60} />
            </div>
            <div className="info">
              <p>Sales</p>
              <h4>${data?.totalSales?.toFixed(2)}</h4>
            </div>
          </div>
          <div className="singleCard">
            <div className="icon">
              <GoChecklist color="#f8bbd0" size={60} />
            </div>
            <div className="info">
              <p>orders</p>
              <h4>{data?.totalNumOrders}</h4>
            </div>
          </div>
          <div className="singleCard">
            <div className="icon">
              <FaUsers color="#dce775" size={60} />
            </div>
            <div className="info">
              <p>users</p>
              <h4>{userList?.users?.length}</h4>
            </div>
          </div>
          <div className="singleCard">
            <div className="icon">
              <FaBoxes color="#ffcc80" size={60} />
            </div>
            <div className="info">
              <p>products</p>
              <h4>{productsList?.products?.length}</h4>
            </div>
          </div>
          <div className="singleCard">
            <div className="icon">
              <RiBloggerFill color="#a5d6a7" size={60} />
            </div>
            <div className="info">
              <p>blogs</p>
              <h4>{blogsList?.blogs?.length}</h4>
            </div>
          </div>
        </div>

        <div className="dashboardContent">
          <div className="dataCharts">
            <div className="dateFetch">
              <div className="singleInp">
                <label>From</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="dateInp"
                />
              </div>
              <div className="singleInp">
                <label>To</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="dateInp"
                />
              </div>
              <button onClick={submitHandler}>Fetch</button>
            </div>
            <div className="figCanvas">
              <h5>Sales and Order Data (Fetch from Date)</h5>
              <SalesChart salesData={data?.sales} />
            </div>
          </div>
          <div className="activityShorts">
            <div className="recentOrder">
              <h5>Recent Orders</h5>
              {productsToDisplay?.map((product, index) => (
                <div className="singleProduct">
                  <Avatar
                    alt={product?.name}
                    sx={{ width: 36, height: 36 }}
                    src={product?.image}
                  />
                  <div className="">
                    <h6 key={index}>{product?.name}</h6>
                    <span>$ {product?.price}</span>
                  </div>
                </div>
              ))}
              <Link to="/admin/orders">
                See All <FaArrowRightLong />
              </Link>
            </div>
            <div className="recentUser">
              <h5>Recent Users</h5>
              {recentUsers?.map((user, index) => (
                <div className="singleUser">
                  <Avatar
                    alt={user?.name}
                    sx={{ width: 36, height: 36 }}
                    src={
                      user?.avatar?.url || user?.name?.charAt(0).toUpperCase()
                    }
                  />
                  <div className="">
                    <h6 key={index}>
                      {user?.name} |{" "}
                      <span
                        className={user?.role === "admin" ? "admin" : "user"}
                      >
                        {user?.role}
                      </span>
                    </h6>
                    <span>{user?.email}</span>
                  </div>
                </div>
              ))}
              <Link to="/admin/users">
                See All <FaArrowRightLong />
              </Link>
            </div>
          </div>
        </div>
      </AdminFrame>
    </>
  );
};

export default Dashboard;
