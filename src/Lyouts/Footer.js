import { Container, Grid  , Paper} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from "react";
import { styled } from '@mui/material/styles';


const style={
  
  position: "fixed",
  left: "0",
  bottom: "0",
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
