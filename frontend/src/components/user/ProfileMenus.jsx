import React, { useState } from "react";
import { Box, Drawer, Typography } from "@mui/material";


import { IoPersonOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { PiUserFocus } from "react-icons/pi";
import { TbLockCog } from "react-icons/tb";


import { Link, useLocation } from "react-router-dom";

const ProfileMenus = ({
  drawerWidth,
  isMobile,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const menuItems = [
    {
      name: "Profile",
      url: "/me/profile",
      icon: <IoPersonOutline size={20} />,
    },
    {
      name: "Update Profile",
      url: "/me/update_profile",
      icon: <LiaUserEditSolid size={20} />,
    },
    {
      name: "Update Avatar",
      url: "/me/upload_avatar",
      icon: <PiUserFocus size={20} />,
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: <TbLockCog size={20} />,
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

export default ProfileMenus;
