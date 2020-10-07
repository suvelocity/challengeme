import React, { useEffect, useState } from 'react';

const ChooseCategory =({updateFilters}) => {
  const [selected,setSelected]  = useState([])
    const categories = [
      'React',
      'Node.js',
      'Express.js',
      'JavaScript',
      'HTML',
      'CSS',
      'TypeScript',
      'SQL',
      'ORM ',
      'MongoDB',
      'Object-Oriented ',
      'Secure Coding',
      'Git workflow',
      'Package management'
    ]

  const selectCategory= (e) => {
    const {target} = e 
    const {value,checked} = target
    console.log(checked)
    if(checked){
      const newSelection = [...selected]
      newSelection.push(value)
      console.log(newSelection)
      setSelected(newSelection)
    }else{
      const newSelection = [...selected]
      .filter(category=>category!==value)
      setSelected(newSelection)
    }
  }
  const selectAllCategories = (e)=>{
    const {checked} =e.target
    if(checked){
      setSelected(categories)
    }else{
      setSelected([])
    }
  }
  const submit= () => {
    updateFilters('categories',selected)
  }
  return (
    <div className='filter'>
      <div style={{color:selected.length?'royalblue':'white'}} className='category'>
        {"choose Category (none = all):"}
        <label htmlFor='all'>
          <input type='checkbox' 
          onChange={selectAllCategories} 
          // checked={selected.length===categories.length} 
          defaultChecked={false}
          name='all' 
          />
          {'all'}
        </label>
        {categories.map(cat=>{
          return <label htmlFor={cat}
            key={cat} 
          >
            <input type='checkbox' 
            key={cat} 
            onChange={selectCategory} 
            checked={selected.includes(cat)} 
            // checked={true} 
            name={cat} 
            value={cat}
            />
            {cat}
          </label>
        })}
    </div>
      <button onClick={submit}>confirm</button>
      
    </div>
  );
}
export default ChooseCategory 