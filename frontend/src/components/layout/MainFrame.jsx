import { Box } from '@mui/material'
import React from 'react'

const MainFrame = ({children}) => {
  return (
    <Box
        sx={{
        //   flexGrow: 1,
          px: {lg: 20, md: 10, sm: 5, xs: 2},
          my: 4,
          overflowX: 'hidden'
        }}
      >
        {children}
      </Box>
  )
}

export default MainFrame