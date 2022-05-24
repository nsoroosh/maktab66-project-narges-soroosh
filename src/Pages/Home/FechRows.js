import React , {useEffect , useState} from "react";
import ActionAreaCard from "./Card";
import axios from "axios";
export default function FechRows(props) {
  const [data, setData] = useState([
    {
      artist: "نینا براون",
      count: "12",
      description:
        "نرم اما جسورانه، ارگانیک و در عین حال هندسی. سری Solid Shapes دانمارکی Nina Bruun دارای بیانی بی انتها و زبانی آرام از شکل و رنگ است.",
      id: 1,
      image: "/files/55109876038a989f3367290f71783828",
      name: "فرم های جامد ",
      price: "120000",
      subcategory: "1",
      thumbnail: "/files/55109876038a989f3367290f71783828",
    },
  ]);
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
  console.log(data);
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
