import React, { Component , useState} from 'react';
import EasyEdit from 'react-easy-edit';
export default function CountEditmode(props) {
    const [data, setdata] = useState(props.data)
    const save = (value) => {
      let newdata = {};
    newdata = {
      price: data.price,
      image: data.image,
      name: data.name,
      artist: data.artist,
      count: value,
      description: data.description,
      subcategory: data.subcategory,
    };
      props.changecount(props.id,newdata)
    }
  

  const cancel = () => {alert("Cancelled")}
  
  return (
    <EasyEdit
      type="text"
      value={props.value}
      onSave={save}
      onCancel={cancel}
      saveButtonLabel="Save "
      cancelButtonLabel="Cancel "
      attributes={{ name: "awesome-input", id: 1}}
    />
  );
}