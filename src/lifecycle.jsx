import React, { Component } from 'react'
export class LifeCycle extends Component {

    constructor(props) {

      super(props)

     alert("Constructor method executed")

    }

    componentDidMount(){

        alert("Componenet created successfully")

    }

  render() {

    alert("Render method executed");

    return (

      <div>

      </div>
    )
}
}
export default LifeCycle