import React, { useState } from 'react'
import {
    CssBaseline,
    Box,
    Toolbar,
    IconButton,
    Typography,
  } from "@mui/material";
  import SyncAltIcon from '@mui/icons-material/SyncAlt';
  import { useMediaQuery, useTheme } from "@mui/material";
import ProfileMenus from '../user/ProfileMenus';
const drawerWidth = 250;
const ProfileFrame = ({children}) => {

      // for new MUI admin dashboard

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(900));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* sidebar */}
      <ProfileMenus drawerWidth={drawerWidth} isMobile={isMobile} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      {/* main compoment */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: 8,
        }}
      >
        <IconButton
          className="dashDrawer"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{border: '1px solid #B17A3A', borderRadius: '10px', padding: '4px', display: { md: "none" }}}
        >
          <SyncAltIcon sx={{color: "#B17A3A"}} />
        </IconButton>
        {/* ======= main content goes below ========== */}
        {children}
      </Box>
    </Box>
  )
}

export default ProfileFrame