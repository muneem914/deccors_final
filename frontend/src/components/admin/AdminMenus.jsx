import React, { useState } from "react";
import { Box, Drawer, Typography } from "@mui/material";

import { LuPackagePlus } from "react-icons/lu";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiNotePencilBold } from "react-icons/pi";
import { RiBloggerLine } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuClipboardList } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";

const AdminMenus = ({
  drawerWidth,
  isMobile,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const menuItems = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: <AiOutlineDashboard size={20} />,
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: <AiOutlineProduct size={20} />,
    },
    {
      name: "New Product",
      url: "/admin/product/new",
      icon: <LuPackagePlus size={20} />,
    },
    {
      name: "Orders",
      url: "/admin/orders",
      icon: <LuClipboardList size={20} />,
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: <LiaUsersCogSolid size={20} />,
    },
    {
      name: "Reviews",
      url: "/admin/reviews",
      icon: <MdOutlineRateReview size={20} />,
    },
    {
      name: "Blogs",
      url: "/admin/blogs",
      icon: <RiBloggerLine size={20} />,
    },
    {
      name: "New Blog",
      url: "/admin/blog/new",
      icon: <PiNotePencilBold size={20} />,
    },
    {
      name: "Messages",
      url: "/admin/messages",
      icon: <TfiEmail size={20} />,
    },
  ];

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2, fontWeight: 600 }}>
        Deccor
      </Typography>
      <Box
        sx={{ textAlign: "left", mt: 4, pl: 2 }}
        className="verticalMenu dashboardMenu"
      >
        {menuItems?.map((item, index) => (
          <Link key={index} to={item.url} 
          className={activeMenuItem.includes(item.url) ? 'active' : ""}
          onClick={() => handleMenuItemClick(item.url)}
          aria-current={activeMenuItem.includes(item.url) ? "true" : "false"}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </Box>
    </Box>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, zIndex: 1 }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen || !isMobile}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AdminMenus;
