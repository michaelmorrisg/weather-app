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
         axios.get(`/api/coordinates/${this.props.location}`)
         .then(response=>{
           this.setState({
             childWeatherConditionResponse: response.data.currently.summary,
             childWeatherTempResponse: response.data.currently.temperature,
             childIconResponse: response.data.currently.icon
           })
         })
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
            if(this.state.childWeatherConditionResponse===''){
        return(
            <div className="hello">
            <p className="title">{this.props.location}</p>
            {/* <p>{this.state.childWeatherConditionResponse} with a temperature of {this.state.childWeatherTempResponse} degrees</p> */}
            {/* <p>{this.state.childWeatherConditionResponse}</p>
            <p>{this.state.childWeatherTempResponse}</p> */}
            <div className="buttons">
                <button onClick={()=>this.props.deleteFavorite(this.props.id)}><img className="trashIcon"src="https://findicons.com/files/icons/1580/devine_icons_part_2/128/trash_recyclebin_empty_closed.png"/></button>
                <button onClick={()=>this.toggleEdit()}><img className="trashIcon" src="https://image.flaticon.com/icons/svg/61/61456.svg"/></button>
            </div>
        </div>
        )}else if(this.state.childWeatherConditionResponse !=''){
            return(
                <div className="hello">
                <p className="title">{this.props.location}</p>
                <p>{this.state.childWeatherConditionResponse} with a temperature of {Math.round(this.state.childWeatherTempResponse)} degrees</p>
                {/* <p>{this.state.childWeatherConditionResponse}</p>
                <p>{this.state.childWeatherTempResponse}</p> */}
                <div className="buttons">
                    <button onClick={()=>this.props.deleteFavorite(this.props.id)}><img className="trashIcon"src="https://findicons.com/files/icons/1580/devine_icons_part_2/128/trash_recyclebin_empty_closed.png"/></button>
                    <button onClick={()=>this.toggleEdit()}><img className="trashIcon" src="https://image.flaticon.com/icons/svg/61/61456.svg"/></button>
                </div>
            </div>
            )}}
                else{
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