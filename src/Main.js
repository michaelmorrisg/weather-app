import React, { Component } from 'react'
import axios from 'axios'
import FavoritesHeadline from './FavoritesHeadline'
import FavoriteComponent from './FavoriteComponent'
import WeatherDetails from './WeatherDetails'

class Main extends Component {
    constructor(){
        super()
        this.state = {
            weatherConditionResponse: '',
            weatherTempResponse: 0,
            iconResponse: '',
            input: '',
            favorites: []
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
          axios.post('/api/favorites',{location:this.state.input})
          .then(response=> {
              this.setState({
                  favorites : response.data
              })
              console.log(this.state.input)
              console.log(this.state.favorites)
          })
      }
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
                </div>
                <FavoritesHeadline />
                <div>{this.state.favorites.map((element, i)=>{
                    return(
                        <FavoriteComponent key={i} editFavorite={this.editFavorite} deleteFavorite={this.deleteFavorite} location={element.location} id={element.id}/>
                    )
                })}</div>
            </div>
        )
    }
}
export default Main