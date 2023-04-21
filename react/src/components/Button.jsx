import { React, useState } from 'react'
import '../assets/css/header.css'

export default function Button(props) {
    return (
        <div className="dropdown" href="">
            <div className="buttons">{props.name}</div>
            <div className="dropdown-content">
                {props.contents.map((item, i) => <a key={i}>{item}</a>)}
            </div>
        </div>
    )
}