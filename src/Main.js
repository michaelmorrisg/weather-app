import React, { Component } from 'react'
import axios from 'axios'
import FavoritesHeadline from './FavoritesHeadline'
import FavoriteComponent from './FavoriteComponent'
import WeatherDetails from './WeatherDetails'
import WeatherImage from './WeatherImage'


class Main extends Component {
    constructor(){
        super()
        this.state = {
            weatherConditionResponse: '',
            weatherTempResponse: 0,
            iconResponse: '',
            input: '',
            favorites: [],
            weatherIcons: [{status:"clear-day", image:"https://cdn4.iconfinder.com/data/icons/daytime-weather/100/day-sunny-512.png"},
        {status: "clear-night", image:"http://icon-park.com/imagefiles/simple_weather_icons_night.png"}, 
        {status:'partly-cloudy-day', image:"https://cdn1.iconfinder.com/data/icons/weather-forecast-meteorology-color-1/128/weather-partly-sunny-512.png"},
        {status:'party-cloudy-night', image:"http://icon-park.com/imagefiles/simple_weather_icons_cloudy_night.png"},
        {status:'cloudy', image:"http://icon-park.com/imagefiles/simple_weather_icons_cloudy.png"},
        {status:'rain', image:"http://icon-park.com/imagefiles/simple_weather_icons_mixed_rain_and_thunderstorms.png"},
        {status:'sleet', image:"https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX20617801.jpg"},
        {status:'snow', image:"http://icon-park.com/imagefiles/simple_weather_icons_snow.png"},
        {status:'wind', image:"https://cdn3.iconfinder.com/data/icons/weather-321/96/weather_windHigh-512.png"},
        {status:'fog', image:"https://cdn3.iconfinder.com/data/icons/weather-321/96/weather_fog-512.png"}]
        }
    this.deleteFavorite = this.deleteFavorite.bind(this)
    this.editFavorite = this.editFavorite.bind(this)
    }
    componentDidMount(){
        axios.get('/api/favorites')
        .then(response=>{
            this.setState({
                favorites: response.data
            })
        })
    }

    requestWeather(){
        axios.get(`/api/coordinates/${this.state.input}`)
        .then(response=>{
          this.setState({
            weatherConditionResponse: response.data.currently.summary,
            weatherTempResponse: response.data.currently.temperature,
            iconResponse: response.data.currently.icon
          })
          console.log(response.data.currently)
        })
      }
      handleChange(input){
          this.setState({
              input : input
          })
      }
      addFavorite(){
          if(this.state.input === ''){
              alert("Please enter a location :)")
          }else{
          axios.post('/api/favorites',{location:this.state.input})
          .then(response=> {
              this.setState({
                  favorites : response.data
              })
              console.log(this.state.input)
              console.log(this.state.favorites)
          })
      }}
      deleteFavorite(id){
          axios.delete(`/api/favorites/${id}`)
          .then(response=>{
              this.setState({
                  favorites : response.data
              })
          })
      }
      editFavorite(id,input){
          axios.put(`/api/favorites/${id}`, {location:input})
          .then(response=>{
              this.setState({
                  favorites: response.data
              })
          })
      }

    render(){
        return (
            <div>
                <h1>Weather Finder</h1>
                <input onChange={(event)=>this.handleChange(event.target.value)} />
                <button onClick={()=>this.requestWeather()}>Find Weather</button>
                <button onClick={()=>this.addFavorite()}>Add to Favorites</button>
                <p></p>
                <div>
                    <WeatherDetails temp={this.state.weatherTempResponse} condition={this.state.weatherConditionResponse}/>
                    <WeatherImage icons={this.state.weatherIcons} iconResponse={this.state.iconResponse}/>
                </div>
                <FavoritesHeadline />
                <div>{this.state.favorites.map((element, i)=>{
                    return(
                        <FavoriteComponent className="favorite" key={i} editFavorite={this.editFavorite} deleteFavorite={this.deleteFavorite} location={element.location} id={element.id}/>
                    )
                })}</div>
            </div>
        )
    }
}
export default Main