import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title , desc , urlToImage , url} = this.props;
    return (
      <div>
        <div className="card">
            <img src= {urlToImage} className="card-img-top" alt="..."/>
            <div className="card-body" style={{cursor : 'pointer'}}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <a href= {url} target = "_blank" className="btn btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
