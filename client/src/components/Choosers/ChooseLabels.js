import React, { useEffect } from 'react';
import Selector from 'react-select';
import network from '../../services/network';
import './ChooseLabel.css';

const ChooseLabels = ({
  labels,
  chooseLabels,
  setChooseLabels,
  submitFilter,
  darkMode,
}) => {
  useEffect(
    // gets existing labels
    () => {
      (async () => {
        try {
          const { data } = await network.get('/api/v1/labels');
          const optionsForSelector = data.map((labelData) => ({
            value: labelData.id,
            label: labelData.name,
          }));
          setChooseLabels(optionsForSelector);
        } catch (error) { console.error(error); }
      })();
    }, [setChooseLabels],
  );

  const selectionChange = (choosens) => {
    submitFilter(choosens);
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      borderBottom: '1px dotted black',
      color: darkMode ? 'white' : 'blue',
      backgroundColor: darkMode ? 'rgb(51,51,51)' : 'white',
      height: '100%',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'neutral30',
    }),
  };
  return (
    <div className="labelFilter">
      <Selector
        value={labels}
        className="selectLabels"
        maxMenuHeight={300}
        placeholder="select labels"
        isMulti
        name="labels"
        onChange={selectionChange}
        closeMenuOnSelect={false}
        options={chooseLabels}
        styles={customStyles}
      />
    </div>
  );
};

export default ChooseLabels;
