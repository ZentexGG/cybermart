import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
const ProductCard = () => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="inherit" component="div">
            Lizard
          </Typography>
          <Typography variant="inherit" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProductCard;
