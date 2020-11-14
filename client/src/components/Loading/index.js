import React from 'react';
import './Loading.css';

function Loading({ darkMode, firstLoading }) {
  const getBackground = () => {
    if (firstLoading) {
      return { backgroundColor: 'white' };
    } if (darkMode) {
      return { backgroundColor: 'transparent' };
    }
    return { backgroundColor: 'transparent' };
  };
  return (
    <div style={getBackground()} className="loaderContainer">
      <div className="loader" />
    </div>
  );
}

export default Loading;
