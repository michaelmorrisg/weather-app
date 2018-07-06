import React, { Component} from 'react'
import axios from 'axios'
import './faveComponent.css';

class FavoriteComponent extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            isToggled : false,
            editInputDefault: '',
            childWeatherConditionResponse: '',
            childWeatherTempResponse: 0,
            childIconResponse: ''
        }
    }
    componentDidMount(){
        this.setState({
            editInputDefault : this.props.location
        })
        //////////DISABLED TO AVOID EXCESSIVE API CALLS//////////
    //     axios.get(`/api/coordinates/${this.props.location}`)
    //     .then(response=>{
    //       this.setState({
    //         childWeatherConditionResponse: response.data.currently.summary,
    //         childWeatherTempResponse: response.data.currently.temperature,
    //         childIconResponse: response.data.currently.icon
    //       })
    //     })
        }
    handleChange(input){
        this.setState({
            editInputDefault: input
        })
    }
    toggleEdit(){
        this.setState({
            isToggled : true
        })
    }


    render(props){
        const amIToggled=this.state.isToggled
        if(amIToggled===false){
        return(
            <div className="hello">
            <p>{this.props.location}</p>
            <p>{this.state.childWeatherConditionResponse}</p>
            {/* <p>{this.state.childWeatherTempResponse}</p> */}
            <button onClick={()=>this.props.deleteFavorite(this.props.id)}>Remove from Favorites</button>
            <button onClick={()=>this.toggleEdit()}>Edit</button>
        </div>
        )}else{
            return(
                <div>
                    <input onChange={(event)=>this.handleChange(event.target.value)}value={this.state.editInputDefault}/>
                    <button onClick={()=>
                        {this.props.editFavorite(this.props.id,this.state.editInputDefault)
                            this.setState({
                                isToggled: false
                            })
                        }}>Confirm</button>
                </div>
            )
        }
    }
}


export default FavoriteComponent