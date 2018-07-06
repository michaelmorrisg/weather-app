import React from 'react'


export default function weatherDetails(props){
    if(props.condition===''){
    return(
        <div></div>
    )}else{
        return (
            <div>
                {props.condition} with a temperature of {props.temp} degrees
            </div>
        )
    }
}