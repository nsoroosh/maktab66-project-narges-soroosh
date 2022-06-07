import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";




export default function ActionAreaCard(props) {
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardActionArea onclick={() => navigate(`/product/${props.name}`)}>
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:3002${props.image}`}
          alt={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/product/${props.name}`}>
            {props.name}

            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
