import React from 'react'


export default function weatherDetails(props){
    if(props.condition===''){
    return(
        <div></div>
    )}else{
        return (
            <div>
                <p>{props.condition} with a temperature of {props.temp} degrees</p>
            </div>
        )
    }
}