import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title, description, date, author, source, imageUrl, newsUrl} = this.props;

    return (
      <div className="my-3">
        <div className="card">
            <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
              
              <span className="badge rounded-pill bg-danger"> {source}</span>
            
            </div>
            <img src={!imageUrl?"https://i.ytimg.com/vi/xnpa3WnRHn8/maxresdefault_live.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"> <small className="text-muted">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_Blank" className="btn btn-sm btn-primary">Read More</a>
                
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
