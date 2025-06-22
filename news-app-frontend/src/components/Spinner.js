import React, { Component } from 'react'
import loading from './loader.gif'

export default class spinner extends Component {
  render() {
    return (
      <div>
        <img src = {loading} alt = "loading"></img>
      </div>
    )
  }
}
