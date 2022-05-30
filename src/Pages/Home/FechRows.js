import React , {useEffect , useState} from "react";
import ActionAreaCard from "./Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function FechRows(props) {
  const [data, setData] = useState([ ]);
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
    productdata(props.item);
  }, []);
  // console.log(data);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }


  return (
    <div class="row">
      {data.map((result) => (
        <div class="card">
          <ActionAreaCard
            name={result.name}
            price={result.price}
            image={result.image}
          />
        </div>
      ))}
    </div>
  );
}
