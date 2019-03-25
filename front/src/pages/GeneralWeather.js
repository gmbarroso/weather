import React, { Component } from 'react';
import './generalWeather.css';

class GeneralWeather extends Component {
  render() {
    return (
      <div className="general">
        <div className="capitals">
          <h1>Previsão do Tempo</h1>
          <hr />
          <h2 className="capitalsTitle">Capitais</h2>
        </div>
      </div>
    );
  }
}

export default GeneralWeather;
