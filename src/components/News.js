import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
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
            page: 1,
            totalResults: 0
        }
    }

  async updateNews(){
    this.props.setProgress(10);
    console.log("cdm");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13a915b3319b454ba559432f08347efb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, 
      loading: false, 
      totalResults: parsedData.totalResults });
      this.props.setProgress(100);
  }
   async componentDidMount() {
  await this.updateNews();
}

  handlePrevClick = async ()=> {
    this.setState(
  (prevState) => ({ page: prevState.page + 1 }),
  this.updateNews
  );
    }
  
  handleNextClick = async ()=>{
    this.setState({page: this.state.page + 1});
    this.updateNews();
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 fetchMoreData = async () => {
  const nextPage = this.state.page + 1;
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13a915b3319b454ba559432f08347efb&page=${nextPage}&pageSize=${this.props.pageSize}`;
  this.setState({ loading: true });
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({
    articles: this.state.articles.concat(parsedData.articles || []),
    totalResults: parsedData.totalResults || 0,
    page: nextPage,
    loading: false
  });
}

  render() {
    console.log("Rendering with articles:", this.state.articles);
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
          <div className="container">
        <div className="row">
        {this.state.articles?.map((element)=>{
          return <div className="col-md-4"  key={element.url}>
              <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt}
              source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
       
      </>
    )
  }
}

export default News
