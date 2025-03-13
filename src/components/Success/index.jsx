import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate();
  const sendData = async (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <>
      <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "40px" }} />
      <form
        onSubmit={e => {
          sendData(e);
        }}
      >
        <Box alignItems="center" justifyContent= "center" flexDirection="column" sx={{
          width: 500,
          height: 300,
          display: 'flex',
          // justifyContent: 'center',
          margin: 'auto',
          boxShadow: 1,
          backgroundColor: '#FFF9E9',
          borderRadius: '10%',
          '&:hover': {
            backgroundColor: '#FFF9E9',
          },
        }}>
          <div>
            <Typography variant="h4" sx={{ margin: 4, color: "brown" }}>Gracias por tu Compra!</Typography>
          </div>
          <div>
            <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "10px" }} />
            <Button
              variant="contained"
              type="submit"
              sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                padding: '10px 30px',
                borderRadius: '8px',
                alignItems: "center",
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                },
              }}
            >
              Volver al Inicio
            </Button>
          </div>

        </Box>
      </form>
    </>
  )
}

export default Success