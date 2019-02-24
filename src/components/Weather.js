import React, { Component } from 'react';
import axios from 'axios';
import weather from './weather.png';


class Weather extends Component {
  state = {
    country: 'Brazil',
    countryCode: 'br',
    city: 'Barueri',
    citySearch: '',
    date: Date.now,
    lat: 0,
    long: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }

  getCityName = (event) => {
    console.log(event.target.value);
    this.setState({citySearch: event.target.value});
  }

  onSubmit = (event) => {
    console.log('Submit', this.state.citySearch);
  }


  changeStarColor = (event) => {
    //let item = document.getElementById(event.target.id).className;
    let actual = event.target.id;
    //console.log(actual);
    for (let i = actual; i >= 1; i--){
      let item = document.getElementById(i);
      item.classList.replace('far', 'fas');
    }
    //console.log("Final");
    actual++;
    for (let j = actual; j < 6; j++){
     //console.log(j);
      let item = document.getElementById(j);
      item.classList.replace('fas', 'far');
    }
  }



  componentDidMount() {
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
      axios
      .get(
        `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.countryCode}&apikey=${API_KEY}`)
        .then(res => {
          //console.log(res.data);
          this.setState({country: res.data.sys.country});
          this.setState({city: res.data.name});
          this.setState({humidity: res.data.main.humidity});
          this.setState({pressure: res.data.main.pressure});
          this.setState({temp: res.data.main.temp});
          this.setState({temp_max: res.data.main.temp_max});
          this.setState({temp_min: res.data.main.temp_min});
        })
        .catch(err => console.log(err));
    }

  render() {
    return (
      <div className="card">
        <img className="card-img-top weather_card" src={weather} alt="Card" />
        <div className="card-body">
          <h5 className="card-title text-center">Weather Condition for: <strong style={{color:'red'}}>{this.state.city}</strong></h5>
          <ul>
            <li className="text-center">
              <p className="card-text">Temperature: {Math.floor(this.state.temp / 10)}</p>
            </li>
            <li className="text-center">
              <p className="card-text">Max Temp.: {Math.floor(this.state.temp_max / 10)}</p>
            </li>
            <li className="text-center">
              <p className="card-text">Min Temp.: {Math.floor(this.state.temp_min / 10)}</p>
            </li>
            <li className="text-center">
              <p className="card-text">Humidity: {this.state.humifity}</p>
            </li>
            <li className="text-center">
              <p className="card-text">Pressure: {this.state.pressure}</p>
            </li>
          </ul>
          <form>
            <button type="button" id="star1" className="center" onClick={this.changeStarColor}>
              <i className="fas fa-star" id="1"/>
              <i className="far fa-star" id="2"/>
              <i className="far fa-star" id="3"/>
              <i className="far fa-star" id="4"/>
              <i className="far fa-star" id="5"/>
            </button>
            <br />
            <input className="center" type="text" placeholder="Enter city name" onChange={this.getCityName} />
          </form>
          <br />
          <button type="submit" className="btn btn-primary center" onClick={this.onSubmit}>Search
          </button>
        </div>
      </div>
    )
  }
}


export default Weather;
