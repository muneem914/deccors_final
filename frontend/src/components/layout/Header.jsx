import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout'; 
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { HiMenuAlt1 } from "react-icons/hi";
import Collapse from '@mui/material/Collapse';

import { LuLayoutDashboard } from "react-icons/lu";
import { BsPersonGear } from "react-icons/bs";
import { LuBaggageClaim } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { useGetUserWishlistQuery } from "../../redux/api/wishlistApi";
import "./style.scss";
import { Avatar, Slide, useScrollTrigger } from "@mui/material";


const Header = ({props}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

// profile dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const openE1 = Boolean(anchorEl);
  const openE2 = Boolean(anchorE2);
  const openE3 = Boolean(anchorE3);
  const handleClickEl = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickE2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClickE3 = (event) => {
    setAnchorE3(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorE2(null);
    setAnchorE3(null);
  };
  // for nested list
  const [openNested, setOpenNested] = React.useState(false);
  const handleClickNested = () => {
    setOpenNested(!openNested);
  };
  const [openNested2, setOpenNested2] = React.useState(false);
  const handleClickNested2 = () => {
    setOpenNested2(!openNested2);
  };

  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const { data } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const {
    data: wishlist,
    error: wishlistError,
    isLoading: wishlistLoading,
    refetch
  } = useGetUserWishlistQuery();

  useEffect(() => {
    if (user) {
      refetch(); 
    }
  }, [user, refetch]);

  useEffect(() => {
    if (wishlistError) {
      console.log(wishlistError?.data?.message);
    }
  }, [wishlistError]);

  const wishlistCount = wishlistLoading ? ".." : wishlist?.wishlist?.products?.length >=0 ? wishlist.wishlist.products.length : 0
const fLetter = user?.name?.charAt(0).toUpperCase()
console.log(fLetter);

  // const logoutHandler = () => {
  //   logout();
  //   navigate(0);
  // };


  const logoutHandler = async () => {
    try {
      const response = await logout().unwrap(); // Unwrap the promise to handle the response
      console.log(response.message); // Confirm logout
      // Clear any auth-related state here (if you are using Redux or Context)
  
      // Redirect to home page after successful logout
      navigate(0);
    } catch (error) {
      console.error("Logout failed", error); // Handle the error appropriately
    }
  };



  


    // function HideOnScroll(props) {
    //   const { children } = props;
    //   const trigger = useScrollTrigger();
    //   return (
    //     <Slide appear={false} direction="down" in={!trigger}>
    //       {children}
    //     </Slide>
    //   );
    // }

  const drawerWidth = 240; 
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2, fontWeight: 600 }}>
      <Link to='/' onClick={handleDrawerToggle} style={{textDecoration: 'none', color: "black", fontWeight: 600,}}>Deccors</Link>
      </Typography>
      <Box sx={{textAlign: 'left'}} className="verticalMenu">
          <Link to="/">Home</Link>
          <Link onClick={handleClickNested2}>
            Shops{openNested2 ? <ExpandLess sx={{position: 'absolute', mt: '2px', ml: "5px", fontSize:20}} /> : <ExpandMore sx={{position: 'absolute', mt: '2px', ml: "5px", fontSize:20}}/>}
          </Link>
          <Collapse in={openNested2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="nestedMenu">
              <Typography sx={{fontSize: '14px'}}>Living Room Furniture</Typography>
              <Divider/>
              <div className="menus">
                  <Link>Decorative </Link>
                  <Link>FAQ</Link>
                  <Link>Contact</Link>
              </div>
              <Typography sx={{fontSize: '14px'}}>Lamps & Lightings</Typography>
              <Divider/>
              <div className="menus">
                  <Link>Decorative </Link>
                  <Link>FAQ</Link>
                  <Link>Contact</Link>
              </div>
              <Typography sx={{fontSize: '14px'}}>Modular Kitchen</Typography>
              <Divider/>
              <div className="menus">
                  <Link>Decorative </Link>
                  <Link>FAQ</Link>
                  <Link>Contact</Link>
              </div>
            </List>
          </Collapse>
          <Link to='/collections' onClick={handleDrawerToggle}>Collections</Link>
          <Link to='/blogs' onClick={handleDrawerToggle}>Blog</Link>
          <Link onClick={handleClickNested}>
            Pages{openNested ? <ExpandLess sx={{position: 'absolute', mt: '2px', ml: "5px", fontSize:20}} /> : <ExpandMore sx={{position: 'absolute', mt: '2px', ml: "5px", fontSize:20}}/>}
          </Link>
          <Collapse in={openNested} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="nestedMenu">
              <Link to='/pages/about' onClick={handleDrawerToggle}>About</Link>
              <Link to='/pages/faq' onClick={handleDrawerToggle}>FAQ</Link>
              <Link to='/pages/contact' onClick={handleDrawerToggle}>Contact</Link>
            </List>
          </Collapse>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <HideOnScroll {...props}> */}
      <AppBar component="nav" sx={{ minHeight: '70px', zIndex: 10, backgroundColor: "white", display: 'flex',padding: "10px 20px" }}>
          <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <HiMenuAlt1 color="#B17A3A" />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1,padding: 1, display: {xs: 'none', sm: 'block'} }}
            >
              <Link to='/' style={{textDecoration: 'none', color: "black", fontWeight: 600,}}>Deccors</Link>
            </Typography>
            <Box
              sx={{ display: { xs: "none", md: "block" } }}
              className="headerNav"
            >
              <Link to='/'>Home</Link>
              <Link id="pages-button"
                aria-controls={openE3 ? 'pages-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openE3 ? 'true' : undefined}
                onClick={handleClickE3}
                    >Shops {openE3 ? <ExpandLess sx={{position: 'absolute', mt: '5px',  fontSize:16}} /> : <ExpandMore sx={{position: 'absolute', mt: '5px',  fontSize:16}}/>}</Link>
              <Link to='/collections'>Collections</Link>
              <Link to="/blogs">Blog</Link>
              <Link id="pages-button"
                aria-controls={openE2 ? 'pages-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openE2 ? 'true' : undefined}
                onClick={handleClickE2}
                    >Pages {openE2 ? <ExpandLess sx={{position: 'absolute', mt: '5px',  fontSize:16}} /> : <ExpandMore sx={{position: 'absolute', mt: '5px',  fontSize:16}}/>}</Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Search/>
              {user ? (
                <Link to='/wishlist'>
                <IconButton>
                  <Badge badgeContent={wishlistCount} color="info">
                    <FavoriteBorderIcon sx={{ color: "black" }} />
                  </Badge>
                </IconButton>
              </Link>
              ) : ""}
              <Link to='/cart'>
                <IconButton>
                  <Badge badgeContent={cartItems?.length} color="info">
                    <AddShoppingCartIcon sx={{ color: "black" }} />
                  </Badge>
                </IconButton>
              </Link>
              {user ? (
                <Link>
                <IconButton
                onClick={handleClickEl}
                size="small"
                // sx={{ ml: 2 }}
                aria-controls={openE1 ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openE1 ? 'true' : undefined}>
                <Avatar alt={user?.name} sx={{ width: 32, height: 32 }} src={user?.avatar?.url || fLetter}/>
                </IconButton>
              </Link>
              ) : <Link to='/login'><PersonOutlineOutlinedIcon sx={{ color: "black", fontSize: 30 }}/></Link>}
            </Box>
            <Menu className="headerMenu"
                anchorEl={anchorEl}
                sx={{mt:1.8}}
                open={openE1}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
            >
                {user?.role === "admin" && (
                  <Link to="/admin/dashboard">
                  <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                      <LuLayoutDashboard size={20} />
                  </ListItemIcon>
                  Dashboard
                </MenuItem></Link>
                )}
                <Link to="/me/profile">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                      <BsPersonGear size={20} />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                </Link>
                <Link to="/me/orders">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                      <LuBaggageClaim size={20} />
                  </ListItemIcon>
                  Orders
                </MenuItem>
                </Link>
                <Link to='/' onClick={logoutHandler}>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                      <LuLogOut size={20} />
                  </ListItemIcon>

                  Logout
                </MenuItem>
                </Link>
            </Menu>
            {/* =================== pages Menu ================ */}
            <Menu
                id="pages-menu"
                anchorEl={anchorE2}
                open={openE2}
                sx={{mt:2.5}}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'pages-button',
                }}
                className="headerMenu"
            >
                <Link to='/pages/about'><MenuItem onClick={handleClose}>About Us</MenuItem></Link>
                <Link to='/pages/faq'><MenuItem onClick={handleClose}>FAQ</MenuItem></Link>
                <Link to='/pages/contact'><MenuItem onClick={handleClose}>Contact Us</MenuItem></Link>
            </Menu>
            {/* =================== shops Menu ================ */}
            <Menu
                id="shops-menu"
                anchorEl={anchorE3}
                open={openE3}
                sx={{mt: 2.4, }}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'shops-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
            >
                <div className="megaMenuContainer">
                    <div className="menuItem">
                        <img src="/images/furniture02.jpg" alt="furniture" />
                    </div>
                    <div className="menuItem">
                        <div className="text">Living Room Furniture</div>
                        <Divider/>
                        <div className="menus">
                            <Link>About</Link>
                            <Link>FAQ</Link>
                            <Link>Contact</Link>
                        </div>
                    </div>
                    <div className="menuItem">
                        <div className="text">Lamps & Lightings</div>
                        <Divider/>
                        <div className="menus">
                            <Link>About</Link>
                            <Link>FAQ</Link>
                            <Link>Contact</Link>
                        </div>
                    </div>
                    <div className="menuItem">
                        <div className="text">Modular Kitchen</div>
                        <Divider/>
                        <div className="menus">
                            <Link>sfs sf sdf s sdfsd sdf sd sf s </Link>
                            <Link>FAQ</Link>
                            <Link>Contact</Link>
                        </div>
                    </div>
                    <div className="menuItem">
                        <img src="/images/furniture.jpg" alt="furniture" />
                    </div>
                </div>
            </Menu>
          </Box>
      </AppBar>
      {/* </HideOnScroll> */}

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};



export default Header;
