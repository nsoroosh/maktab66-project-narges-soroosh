import * as React  from 'react';
import { useEffect  , useState} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ActionAreaCard from '../Home/Card';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FullWidthGrid from '../../Lyouts/Sidebar'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function RowAndColumnSpacing() {
  let params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(true);
  async function productdata(input) {
    try {
      const response = await axios
        .get(`http://localhost:3002/products`)
        .then((res) => {
          const subcategorydata = res.data.filter(
            (value) => value.subcategory == input
          );
          setData(subcategorydata);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    productdata(params.productcatagory);
  }, []);
  console.log(data);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {data.map((result) => (
         <Grid item xs={12} sm={6} md={6}>
         <ActionAreaCard
          name={result.name}
          price={result.price}
          image={result.image}
          onclick={()=> navigate(`/product/${result.name}`)}
          
          />
           
         </Grid>
      ))}
       
        
      </Grid>
      <Outlet/>
    </Box>
  );
}
export default (RowAndColumnSpacing)