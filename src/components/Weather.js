import React, { Component } from 'react';
import axios from 'axios';
import weather from './weather.png';


class Weather extends Component {
  state = {
    country: 'Canada',
    countryCode: '',
    countryShow: 'CA',
    city: 'Toronto',
    citySearch: 'Toronto',
    date: Date.now,
    lat: 0,
    long: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    weather: '',
    sunrise: '',
    sunset: '',
    owner: ''
  }


  componentDidMount() {
    const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
    let code = this.state.countryCode;
    let country_valid = true;

    axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://react-api-ascalmon.herokuapp.com/users/1`)
      .then(res => {
        console.log(res.data);
        this.setState({owner: res.data.username});
      })

      .catch(err => {
        console.log(err);
      })

      if (this.state.citySearch !== '' && this.state.country !== ''){
        //console.log(`ttps://restcountries.eu/rest/v2/name/${this.state.country}`);
        axios
        .get(
          `https://restcountries.eu/rest/v2/name/${this.state.country}`)
          .then(res => {
            //console.log(res.data);
            this.setState({countryCode: res.data[0].alpha2Code});
            code = `,${res.data[0].alpha2Code}`;
            this.setState({country: res.data[0].name});
            //console.log('Country' , this.state.country, 'Code' , code);
          })
          .catch(err => {
            //console.log(err);
            country_valid = false;
          })

        if (country_valid !== false){
          axios
          .get(
            `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${this.state.citySearch}&${code}$units=metric&apikey=${API_KEY}`)
            .then(res => {
              //console.log(res.data);
              this.setState({countryShow: res.data.sys.country});
              this.setState({weather: res.data.weather[0].description});
              let dateSunrise = new Date(res.data.sys.sunrise * 1000).toLocaleTimeString("en-US");
              this.setState({sunrise: dateSunrise});
              let dateSunset = new Date(res.data.sys.sunset * 1000).toLocaleTimeString("en-US");
              this.setState({sunset: dateSunset});
              this.setState({city: res.data.name});
              this.setState({humidity: res.data.main.humidity});
              this.setState({pressure: res.data.main.pressure});
              this.setState({temp: res.data.main.temp});
              this.setState({temp_max: res.data.main.temp_max});
              this.setState({temp_min: res.data.main.temp_min});
            })
            .catch(err => {
              //console.log(err);

            });
        }
      }
    }

  getCityName = (event) => {
    this.setState({citySearch: event.target.value});
  }
  getCountryName = (event) => {
    this.setState({country: event.target.value});
  }

  onSubmit = (event) => {
    this.componentDidMount();
    var x = document.getElementById("city");
    var y = document.getElementById("country");
    x.value = '';
    y.value = '';

  }


  changeStarColor = (event) => {
    let actual = event.target.id;
    for (let i = actual; i >= 1; i--){
      let item = document.getElementById(i);
      item.classList.replace('far', 'fas');
    }
    actual++;
    for (let j = actual; j < 6; j++){
      let item = document.getElementById(j);
      item.classList.replace('fas', 'far');
    }
  }


  render() {
    return (
      <div className="center">
        <img className="card-img-top weather_card" src={weather} alt="Card" />
        <div className="card center" style={{width:'70%'}}>
          <React.Fragment>
            <h5 className="card-title text-center">Weather Condition for: <strong style={{color:'red'}}>{this.state.city} - {this.state.countryShow}</strong></h5>
            <p className="card-title text-center">Requested by: <small style={{color:'red'}}>{this.state.owner}</small></p>
            <h5 className="card-title text-center"><strong style={{color:'blue'}}>Weather: {this.state.weather}</strong></h5>
            <h5 className="card-title text-center"><strong style={{color:'#cccc00'}}>Sunrise: {this.state.sunrise}</strong></h5>
            <h5 className="card-title text-center"><strong style={{color:'gray'}}>Sunset: {this.state.sunset}</strong></h5>
          </React.Fragment>
        </div>
        <br />
        <div className="card center" style={{width:'70%'}}>
          <ul className="">
            <li className="text-center card-title">
              <p className="card-text card_data">Temperature: {Math.round(this.state.temp - 273.15)}</p>
            </li>
            <li className="text-center card-title">
              <p className="card-text card_data">Max Temp.: {Math.round(this.state.temp_max- 273.15)}</p>
            </li>
            <li className="text-center card-title">
              <p className="card-text card_data">Min Temp.: {Math.round(this.state.temp_min- 273.15)}</p>
            </li>
            <li className="text-center card-title">
              <p className="card-text card_data">Humidity: {this.state.humidity} %</p>
            </li>
            <li className="text-center card-title">
              <p className="card-text card_data">Pressure: {this.state.pressure} hpa</p>
            </li>
          </ul>
        </div>
          <form>
            <button type="button" id="star1" className="center" onClick={this.changeStarColor}>
              <i className="fas fa-star" id="1"/>
              <i className="far fa-star" id="2"/>
              <i className="far fa-star" id="3"/>
              <i className="far fa-star" id="4"/>
              <i className="far fa-star" id="5"/>
            </button>
            <br />
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">City and Country Name</span>
              </div>
              <input type="text" id="city"    className="form-control" onChange={this.getCityName}  />
              <input type="text" id="country" className="form-control" onChange={this.getCountryName}/>
            </div>
          </form>
          <br />
          <button type="submit" className="btn btn-primary center" onClick={this.onSubmit}>Search
          </button>
      </div>
    )
  }
}


export default Weather;
