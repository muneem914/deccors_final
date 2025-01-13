import React from 'react'
import MainFrame from './MainFrame';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaXTwitter } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
  return (
    <footer>
      <Box sx={{px: {lg: 20, md: 10, sm: 5, xs: 2},}}>
      <Box className='footerContainer'>
        <Box>
          <h1>Deccors</h1>
          <p>Habitant morbi tristique senectus et netus et malesuada. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Id diam maecenas ultricies mi eget mauris pharetra et. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci.</p>
          <Box className='socialLinks'>
            <Link><FaXTwitter/></Link>
            <Link><GrFacebookOption/></Link>
            <Link><FaPinterest/></Link>
            <Link><FaInstagram/></Link>
          </Box>
        </Box>
        <Box>
          <h4>Information</h4>
          <ul>
            <li><Link>Orders</Link></li>
            <li><Link>Gallery</Link></li>
            <li><Link>Store Location</Link></li>
            <li><Link>Testimonials</Link></li>
            <li><Link>Sitemap</Link></li>
          </ul>
        </Box>
        <Box>
          <h4>Support</h4>
          <ul>
          <li><Link>Search</Link></li>
          <li><Link>Help</Link></li>
          <li><Link>Delivery Information</Link></li>
          <li><Link>Privacy Policy</Link></li>
          <li><Link>Terms & conditions</Link></li>
          <li><Link>Shipping Details</Link></li>
          </ul>
        </Box>
        <Box>
          <h4>Contact Us</h4>
          <p>No: 58A, East Madison Street,</p>
          <p>Baltimore, MD, USA 4508</p>
          <p>+000-123456789</p>
          <br />
          <p>No:1225 D, Marvel Avenue, Ottawa,</p>
          <p>Canada 4680</p>
          <p>+000 - 123-456789</p>
        </Box>
      </Box>
    </Box >
    <Box sx={{px: 5}}>
    <Box className='footerBottom'>
      <p>&copy; Copyright, Deccor, {new Date().getFullYear()}</p>
      <img src="/images/footerImg.png" alt="footerImg" />
     <p>Developed By, <a href="mailto:codevortexlab@gmail.com" >Code Vortex Lab</a></p> 
    </Box>
    </Box>
    </footer>
  )
}

export default Footer