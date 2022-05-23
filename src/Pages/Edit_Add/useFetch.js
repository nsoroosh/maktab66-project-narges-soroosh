import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export default function Getcategories  ()  {
  const [data, setData] = useState({});
  // const [isloading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  // const url = localhost:3002
  useEffect(() => {
    (axios
      .get("localhost:3002/subcategory")
      .then((res) => {
        console.log(res.data);
        setData(res);
        // setloading(false);
      })
      .catch((err) => {
        seterror(err);
      })
      .finally(() => {
        // setloading(false);
      }))()
  }, []);
  return {data  , error}
};
// export {data , isLoading , error}
