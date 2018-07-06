import React from 'react'


export default function WeatherImage(props){
   return props.icons.map((element)=>{
        if(element.status === props.iconResponse){
            return (
                <div><img src={element.image} alt={element.status}/></div>
            )
        }else{
            return (
                <div></div>
            )
        }
    })
}