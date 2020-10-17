import React, { useEffect, useState } from "react";
import network from "../../services/network";
import Selector from "react-select";

const ChooseLabels = ({ submitFilter }) => {
  const [labels, setLabels] = useState([]);

  useEffect(
    // gets existing labels
    () => {
      (async () => {
        try {
          const { data } = await network.get(`/api/v1/labels`);
          const optionsForSelector = data.map((labelData) => ({
            value: labelData.id,
            label: labelData.name,
          }));
          setLabels(optionsForSelector);
          console.log(data);
        } catch {}
      })();
    },
    []
  );

  const selectionChange = (a) => {
    submitFilter(a ? a.map((x) => x.value) : []);
  };

  return (
    <div className='labelFilter'>
      <Selector
        className='selectLabels'
        maxMenuHeight={100}
        placeholder='select labels'
        isMulti
        name='labels'
        onChange={selectionChange}
        closeMenuOnSelect={false}
        options={labels}
      />
    </div>
  );
};

export default ChooseLabels;
