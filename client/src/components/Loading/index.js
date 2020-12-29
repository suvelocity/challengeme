import React, { useCallback } from 'react';
import './Loading.css';
// import LoadingMatrix from './LoadingAnimation';

function Loading({ firstLoading }) {
  const getBackground = useCallback(() => {
    if (firstLoading) {
      return { backgroundColor: 'white' };
    }
    return { backgroundColor: 'transparent' };
  }, [firstLoading]);
  return (
    <div style={getBackground()} className="loaderContainer">
      <div className="loader" />
      {/* // <LoadingMatrix /> */}
    </div>
  );
}

export default Loading;
