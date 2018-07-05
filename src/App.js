import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import axios from "axios";


const API_KEY = "e8204b87c1d91c3b9d28784d6accacce";

class App extends React.Component{
  
  state = {
    temperature: undefined,
    city : undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  
  getWeather = async (e) => {
    
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api_call.json();
    
    //checking weather city and country and null or not
    if(city && country){
      

    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description:data.weather[0].description,
      error:""
    })
    
    }else{
      this.setState({
      temperature: undefined,
      city : undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "please enter data"
      })
    }
    
  }
  
  render(){
    return (
     <div className="App row">
      <Titles/>

      <div className="rightComponent col-md-7">
        <Form getWeather={this.getWeather}/>
        <Weather 
        temperature={this.state.temperature}
        city = {this.state.city}
        country = {this.state.country}
        humidity = {this.state.humidity}
        description = {this.state.description}
        error = {this.state.error}
        />        
      </div>

     </div>
    );
  }
};

export default App;

