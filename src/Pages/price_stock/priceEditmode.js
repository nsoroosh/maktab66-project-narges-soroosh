import React, { Component, useState } from "react";
import EasyEdit from "react-easy-edit";
export default function PriceEditmode(props) {
  const [data, setdata] = useState(props.data);
  const save = (value) => {
    let newdata = {};
    newdata = {
      price: value,
      image: data.image,
      name: data.name,
      artist: data.artist,
      count: data.count,
      description: data.description,
      subcategory: data.subcategory,
    };
props.changeprice(props.id,newdata)
    console.log(newdata);
    // props.changeprice(props.id,data)
  };

  const cancel = () => {
    alert("Cancelled");
  };

  return (
    <>
      {/* {console.log(props.data)} */}
      <EasyEdit
        type="text"
        value={props.value}
        onSave={save}
        onCancel={cancel}
        saveButtonLabel="Save "
        cancelButtonLabel="Cancel "
        attributes={{ name: "awesome-input", id: 1 }}
      />
    </>
  );
}
