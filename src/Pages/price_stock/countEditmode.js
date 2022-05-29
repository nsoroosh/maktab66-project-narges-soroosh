import React, { Component , useState} from 'react';
import EasyEdit from 'react-easy-edit';
export default function CountEditmode(props) {
    const [data, setdata] = useState(props.data)
    const save = (value) => {
      setdata({
        count:value
      }
      )
      props.changecount(props.id,data)
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