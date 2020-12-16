import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

// this component takes an array state and his setter
// and provides a ui to handle changing him
function ArrayForm({ data, setData, name }) {
  const [element, setElement] = useState("");
  const [remove, setRemove] = useState("");

  const addData = async () => {
    if (element.length > 0) {
      setData([...data, element]);
      setElement("");
    }
  };

  const removeData = async () => {
    if (remove) {
      const newData = [...data];
      newData.splice(remove, 1);
      setData(newData);
      setRemove("");
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>{name}:</h3>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {data.length > 0
          ? data.map((element) => {
              return <Chip key={element} label={element} />;
            })
          : null}
      </div>
      <br />
      <div style={{ textAlign: "center" }}>Enter a {name} to Add:</div>
      <br />
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <TextField
          onChange={(event) => setElement(event.target.value)}
          value={element}
          id="keyword-basic"
          label="KeyWord"
        />
        <Button onClick={() => addData()} variant="contained" color="primary">
          Add
        </Button>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>Choose a {name} to Delete:</div>
      <br />
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <select
          onChange={(event) => setRemove(event.target.value)}
          name="keywords"
          id="keywords"
        >
          <option value="">select...</option>
          {data.length > 0
            ? data.map((element, index) => {
                return (
                  <option key={element} value={index}>
                    {element}
                  </option>
                );
              })
            : null}
        </select>
        <Button
          onClick={() => removeData()}
          variant="contained"
          color="primary"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ArrayForm;
