import React, { Component } from 'react'
import axios from 'axios'
import AddFavorites from './AddFavorites'
import FavoriteComponent from './FavoriteComponent'

class Main extends Component {
    constructor(){
        super()
        this.state = {
            weatherResponse: '',
            input: '',
            favorites: []
        }
    this.deleteFavorite = this.deleteFavorite.bind(this)
    }

    requestWeather(){
        axios.get(`/api/coordinates/${this.state.input}`)
        .then(response=>{
          this.setState({
            weatherResponse: response.data.currently.summary
          })
          console.log(this.state.weatherResponse)
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
      editFavorite(id,location){
          axios.put(`/api/favorites/${id}`, location)
      }

    render(){
        return (
            <div>
                <h1>Weather Finder</h1>
                <input onChange={(event)=>this.handleChange(event.target.value)} />
                <button onClick={()=>this.requestWeather()}>Find Weather</button>
                <button onClick={()=>this.addFavorite()}>Add to Favorites</button>
                <div>{this.state.weatherResponse}</div>
                <AddFavorites favorites = {this.state.favorites}/>
                <div>{this.state.favorites.map((element, i)=>{
                    return(
                        <FavoriteComponent key={i} deleteFavorite={this.deleteFavorite} location={element.location} id={element.id}/>
                    )
                })}</div>
            </div>
        )
    }
}
export default Main