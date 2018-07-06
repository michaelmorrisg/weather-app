import React from 'react'
import axios from 'axios'


export default function AddFavorites(props){
    return (
        <div>
            <h2>Favorites</h2>
            <div>{Object.keys(props.favorites).map((obj,i)=>{
                return(
                    <div key={i}>
                        {props.favorites[obj].i}
                    </div>
                )
            })}</div>
        </div>
    )
}



