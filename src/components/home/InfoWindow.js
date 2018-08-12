import React, { Component } from 'react'

class InfoWindow extends Component {
    state = {
        title: '',
        lembaga: '',
        desc: ''
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <br/>
                
            </div>
        )
    }
}

export default InfoWindow