import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {
    articles = []
    page_no = 1;
    totalResults = 0
    page_size = 10

    constructor(){
        super();
        this.state = {
            articles : this.articles,
            page_no : this.page_no,
            totalResults : this.totalResults,
            page_size : this.page_size,
            loading : false
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ea68187f71374f6d8c64a5794237c8c1&page=1&pageSize=${this.state.page_size}`
        this.setState({loading : true})
        let data = await fetch(url);
        let parsed_data = await data.json();

        this.setState({
            articles : parsed_data.articles,
            totalResults : parsed_data.totalResults,
            loading : false
        })
        console.log(this.state.totalResults)
    }

    handlenext = async () => {
        if(this.state.page_no + 1 > Math.ceil(this.state.totalResults/this.state.page_size)){console.log(Math.ceil(this.state.totalResults/this.state.page_size))}
        else{
            console.log("next is clicked")
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ea68187f71374f6d8c64a5794237c8c1&page=${this.state.page_no + 1}&pageSize=${this.state.page_size}`
            this.setState({loading : true})
            let data = await fetch(url);
            let parsed_data = await data.json();

            this.setState({
                articles : parsed_data.articles,
                total_results : parsed_data.totalResults,
                page_no : this.state.page_no + 1,
                loading : false
            })
        }
    }

    handleprev = async () => {
        console.log("prev clicked")
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ea68187f71374f6d8c64a5794237c8c1&page=${this.state.page_no-1}&pageSize=${this.state.page_size}`
        this.setState({loading : true})
        let data = await fetch(url);
        let parsed_data = await data.json();

        this.setState({
            articles : parsed_data.articles,
            total_results : parsed_data.totalResults,
            page_no : this.state.page_no - 1,
            loading : false
        })
    }

  render() {
    return (
        <div class = "container" style = {{marginTop : '5rem'}}>
            <h1 className="text-center my-3">Global News - Latest Updates</h1>
            <div class = "text-center">
            {this.state.loading && <Spinner/>}
            </div>
            <div class = "row">
                {!this.state.loading && this.state.articles.map((element) => {
                    return element.urlToImage && <div className= "col-md-4 my-3" key={element.url}>
                        <NewsItem title ={element.title}  desc = {element.description} urlToImage = {element.urlToImage} url = {element.url}/>
                    </div>
                })}
            </div>
            <div className="d-flex justify-content-between">
                <button type="button" disabled = {this.state.page_no <= 1} onClick = {this.handleprev} className="btn btn-dark">&larr; Prev</button>
                <button type="button" disabled = {this.state.page_no + 1 > Math.ceil(this.state.totalResults/this.state.page_size)} onClick = {this.handlenext} className="btn btn-dark">Next &rarr;</button>
            </div>
        </div>
    )
  }
}

export default News
