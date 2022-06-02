import * as React  from 'react';
import { useEffect  , useState} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ActionAreaCard from '../Home/Card';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import {api} from "../../Utils/axios";
import FullWidthGrid from '../../Lyouts/Sidebar'
import { Pagination } from '@mui/material';
import TemporaryDrawer from './categoryList';
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
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState()
  async function productdata(input) {
    try {
      const response = await api
        .get(`/products`, {params:{
          _page:page,
          _limit:6,
          _sort:"createdAt",
          _order:"desc",
          subcategory:input

        }})
        .then((res) => {
          // const subcategorydata = res.data.filter(
          //   (value) => value.subcategory == input
          // );
          setData(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    productdata(params.productcatagory);
  }, [params.productcatagory]);
  console.log(data);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  
  return (
    <Box sx={{ width: '100%' }}>
      <TemporaryDrawer/>
      
      <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
      {data.map((result) => (
        <Grid item xs={12} sm={4} md={4}>
         <ActionAreaCard
          name={result.name}
          price={result.price}
          image={result.image}
          
          />
           
         </Grid>
      ))}
       
        
      </Grid>
      <Pagination count={10} page={page} dir="ltr"  onChange={handleChange} />

    </Box>
  );
}
export default (RowAndColumnSpacing)