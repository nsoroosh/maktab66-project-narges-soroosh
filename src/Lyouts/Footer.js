import { Container, Grid  } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from "react";


const style={
  
  position:"fixed",
  bottom:"0",
  left:"0",
  width:"100%",
  height: "90px",
  boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)"
}

export const Footer = () => {
  return (
    <div>
      <Container style={style}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            
                hello this is artxmode gallery
          </Grid>
          <Grid item xs={4}>
               <InstagramIcon/>
                <TwitterIcon/>
                

          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
