import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';


export default function AlertInvertedColors({color,text,botton,icon ,openn}) {
  return (
   <div  style={{display:'flex',display:openn,justifyContent:'center',alignItems:"center",height:"100vh"}}>
     <Stack  spacing={2} sx={{maxWidth:400}} >
   <Alert
   
     variant="soft"
     color={color}
     style= {{}}
     invertedColors
     startDecorator={
       <CircularProgress size="lg">
         {icon} 
       </CircularProgress>
     }
     sx={{ alignItems: 'flex-start', gap: '8rem' }}
   >
     <Box sx={{ flex: 1 }}>
       <Typography level="body-md">
        {text}
       </Typography>
       <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
         <Link to="../All">
         <Button variant="outlined" size="sm">
           {botton}
         </Button>
         </Link>
       </Box>
     </Box>
   </Alert>
 </Stack>
    </div>
  );
}