import React from 'react';
import './Loading.css';
// import LoadingMatrix from './LoadingAnimation';

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
      {/* // <LoadingMatrix /> */}
    </div>
  );
}

export default Loading;
