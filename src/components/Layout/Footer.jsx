import { Box, Divider, Typography } from '@mui/material'

const Footer = () => {
    return (
        <div>
            <Divider sx={{ borderColor: 'none', borderStyle: 'none', padding: "40px" }} />
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ backgroundColor: 'wheat', 
                userSelect: 'none', position: 'static', bottom: 0, width: "100%" }}>
                <Typography variant="h8" sx={{ margin: 2, color: "green", justifyContent: "center" }}>
                    Tienda electrónica ficticia con objetivos de aprendizaje. &copy; 2025.</Typography>
            </Box>
        </div>
    )
}
export default Footer