import React, { Component } from 'react'
import axios from 'axios'
import AddFavorites from './AddFavorites'

class Main extends Component {
    constructor(){
        super()
        this.state = {
            weatherResponse: {},
            input: '',
            favorites: {}
        }
    }

    requestWeather(){
        axios.get(`/api/coordinates/${this.state.input}`)
        .then(response=>{
          this.setState({
            weatherResponse: response
          })
          console.log(this.state.weatherResponse.data.currently.summary)
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
                  favorites : response
              })
              console.log(this.state.input)
              console.log(this.state.favorites)
          })
      }

    render(){
        return (
            <div>
                <h1>Weather Finder</h1>
                <input onChange={(event)=>this.handleChange(event.target.value)} />
                <button onClick={()=>this.requestWeather()}>Find Weather</button>
                <button onClick={()=>this.addFavorite()}>Add to Favorites</button>
                <AddFavorites favorites = {this.state.favorites}/>
            </div>
        )
    }
}
export default Main