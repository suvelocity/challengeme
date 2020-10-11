import React, { useState } from 'react';
import ChooseLabels from '../Choosers/ChooseLabels'
import './FilterMenu.css'
import './FilterMenuDark.css'
import { Button } from '@material-ui/core';
import ThemeApi from "../../services/Theme"


const FilterMenu =( {updateFilters}) => {
  const [labels,setLabels]  =useState([])
  const [open,setOpen]  = useState(false)
  const darkMode = React.useContext(ThemeApi).darkTheme
  
  const submit= () => {
    updateFilters({labels})
    setOpen(false);
  }

  const clear= () => {
    updateFilters({labels:[]})
    setOpen(false);
  }

  const close= () => {
    setOpen(false);
  }
  
  const toggleOpenClick = () => {
    if(open){
      close()
    }else{
      setOpen(true)
    }
    
  }

  const menuClass = open ? 'open filters' : 'filters'
  const darkClass = darkMode ? 'filterMenu dark' : 'filterMenu'
  
  return (
    <div className={darkClass}>
      <div className={menuClass}>
      <h3>
      FILTERS
      </h3>

      <div>
        <div className='buttons'>

          <Button 
            className='filterSubmit' 
            variant={ darkMode ? 'outlined' : 'contained' } 
            color='primary'
            onClick={submit} >
            submit
          </Button>
          
          <Button 
            className='filterClear' 
            variant={ darkMode ? 'outlined' : 'contained' }
            color='secondary'
            onClick={ clear } >
            clear
          </Button>
          
          <Button 
            className='filterCancel' 
            variant={ darkMode ? 'outlined' : 'contained' }
            color='default'
            onClick={close} >
            cancel
          </Button>
          
        </div>
        <ChooseLabels submitFilter={setLabels} />      
      </div>
      </div>
      <div className='toggleOpen' 
      onClick={toggleOpenClick} />
    </div>
    );
}
export default FilterMenu 