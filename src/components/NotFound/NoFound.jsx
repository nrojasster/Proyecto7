import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const NoFound = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (

    <div>
      <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: isSmallScreen ? '60px' : isMediumScreen ? '40px' : '40px' }} />
      <Box sx={{
        width: isSmallScreen ? 250 : isMediumScreen ? 500 : 500,
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        alignContent: 'center',        
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div>
          <Typography variant={isSmallScreen ? "h6" : "h5"}>404 - Página No Encontrada</Typography>
        </div>
        <div>
          <Typography variant={isSmallScreen ? "h6" : "h5"}>Lo sentimos, la página que buscas no existe.</Typography>
        </div>
      </Box>
    </div>
  )
}

export default NoFound