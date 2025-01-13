import { Box } from '@mui/material'
import React from 'react'
import Footer from './Footer'


const PageFrame = ({children}) => {
  return (
    <Box
        sx={{
        //   flexGrow: 1,
        //   p: 3,
          marginTop: 8,
          overflowX: 'hidden'
        }}
      >
        {children}

        <Footer/>
      </Box>
  )
}

export default PageFrame