import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs(props) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          {props.category}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/products/${props.subcategoryId}`}
        >
          {props.subcategory}
        </Link>
        <Typography color="text.primary">{props.name}</Typography>
      </Breadcrumbs>
    </div>
  );
}
