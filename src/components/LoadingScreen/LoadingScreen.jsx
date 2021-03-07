import React from 'react'
import Symbol from './loading.svg';
import './LoadingScreen.css';
const LoadingScreen=()=> {
        return (
          <div className="loading">
            <img src={Symbol} alt='Loading...' />
            </div>
        )
}
export default LoadingScreen;