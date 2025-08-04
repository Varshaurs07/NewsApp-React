import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Sppiner'
import PropTypes from 'prop-types'

export class News extends Component {
  static deafultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor(){
        super();
        console.log("This is a constructor from news app.");
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
    }

  async updateNews(){
    console.log("cdm");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13a915b3319b454ba559432f08347efb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, 
      loading: false, 
      totalResults: parsedData.totalResults });
  }
  async componentDidMount() {
   this.updateNews();
  }

  handlePrevClick = async ()=> {
    this.setState({page: this.state.page - 1});
    this.updateNews();
    }
  
  handleNextClick = async ()=>{
    this.setState({page: this.state.page + 1});
    this.updateNews();
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    console.log("Rendering with articles:", this.state.articles);
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles?.map((element)=>{
          return <div className="col-md-4"  key={element.url}>
              <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt}
              source={element.source.name}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
