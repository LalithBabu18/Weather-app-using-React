import React, { Component } from 'react';
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'


const API_KEY = "83380ba52d173a59bb5b11852af3ad2d";


class App extends Component{

    state={
        temperature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:undefined
    }

    getWeather =  (e) => {
        e.preventDefault()
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`

        fetch(API_URL).then(response => {
            console.log(response);
            return response.json();
          }).then(data => {
            // Work with JSON data here
            console.log(data);

            if(city&&country){
                this.setState({
                    temperature:data.main.temp,
                    city:data.name,
                    country:data.sys.country,
                    humidity:data.main.humidity,
                    description:data.weather[0].description,
                    error:undefined

                })
            }else{
                this.setState({
                    temperature:undefined,
                    city:undefined,
                    country:undefined,
                    humidity:undefined,
                    description:undefined,
                    error:"please enter the city and country"
                })
            }
            
          }).catch(err => {
            // Do something for an error here
            console.log("Error Reading data " + err);
          });

       
    }

render(){
    return (<div>
        
<div className="wrapper">
	<div className="main">
		<div className="container">
            <div className="row">
                <div className="col-xs-5 title-container">
                    <Titles />
                </div> 
                <div className="col-xs-7 form-container">
                     <Form weatherprop={this.getWeather}/>
                     <Weather   temperature={this.state.temperature}
                                city={this.state.city}
                                country={this.state.country}
                                humidity={this.state.humidity}
                                description={this.state.description}
                                error={this.state.error}
                                />
                </div>          
            </div>
		</div>
	</div>
</div>

    </div>)
}

}

export default App



        
      
        