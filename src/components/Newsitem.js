import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title, description, imageUrl, url, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{position: 'relative'}} >
          <span className="badge bg-warning" style={{position: 'absolute',right: '10px', top: '10px', zIndex: '1'}}>{source}</span> 
            <img
              src={imageUrl ? imageUrl : "https://via.placeholder.com/300x180.png?text=No+Image"}
              className="card-img-top"
              alt="News"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x180.png?text=Image+Unavailable";
              }}
            />

            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date (date).toGMTString()} </small></p>
                <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
</div>
      </div>
    )
  }
}

export default Newsitem
