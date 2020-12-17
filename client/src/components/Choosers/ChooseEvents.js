import React, { useEffect } from 'react';
import Selector from 'react-select';
import network from '../../services/network';
import './ChooseLabel.css';

const ChooseEvents = ({
  chooseEvents,
  setChooseEvents,
  eventsOptions,
  setEventsOptions,
  darkMode,
}) => {
  useEffect(() => {
    (async () => {
      try {
        const { data: allEvents } = await network.get('/api/v1/webhooks/admin/events');
        setEventsOptions(allEvents.map((event) => ({
          value: event.id,
          label: event.name,
        })));
      } catch (error) {
      }
    })();
  }, [setEventsOptions]);

  const selectionChange = (chosens) => {
    setChooseEvents(chosens);
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
        value={chooseEvents}
        className="selectLabels"
        maxMenuHeight={300}
        placeholder="select events"
        isMulti
        name="events"
        onChange={selectionChange}
        closeMenuOnSelect={false}
        options={eventsOptions}
        styles={customStyles}
      />
    </div>
  );
};

export default ChooseEvents;
