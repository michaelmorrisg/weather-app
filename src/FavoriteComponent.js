import React, { Component} from 'react'

class FavoriteComponent extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            isToggled : false
        }
    }

    handleChange(input){
        this.setState({
            input: input
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
            <div>
            <p>{this.props.location}</p>
            <button onClick={()=>this.props.deleteFavorite(this.props.id)}>Remove from Favorites</button>
            <button onClick={()=>this.toggleEdit()}>Edit</button>
        </div>
        )}else{
            return(
                <div>
                    <input onChange={(event)=>this.handleChange(event.target.value)}value={this.state.input}/>
                    <button>Confirm</button>
                </div>
            )
        }
    }
}


export default FavoriteComponent