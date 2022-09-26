import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


const News = (props) => {


    const capitalizeFirstLetter = (string) => {

        return string.charAt(0).toUpperCase() + string.slice(1);

    }

        const [article, setArticle] = useState([]);
        const [loading, setLoading] = useState(false);
        const [page , setPage] = useState(1);
        const [totalResults, setTotalResults] = useState(0);
    

    const updateNews = async () => {

        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        
        setArticle(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);

    }

    useEffect(() => {
        
        updateNews();
        document.title = `${capitalizeFirstLetter(props.category)} - News Finder`
    }, [])
    

    const handlePrev = async () => {

        setPage(page-1)
        updateNews();

    }



    const handleNext = async () => {

        setPage(page+1)
        updateNews();
    }

    const fetchMoreData = async () => {

        setPage(page+1)

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        
        setArticle(article.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)

    }


        return (

            // new version with infinite scroll

            <>
                <h2 className='text-center my-4'>News Finder - Top Trending News</h2>
                {loading && <Spinner />}

                <InfiniteScroll
                    dataLength={article.length}
                    next={fetchMoreData}
                    hasMore={article.length !== totalResults}
                    loader={<Spinner/>}>


                    <div className="container">
                        <div className="row">
                            {article?.map((element) => {

                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>

                            })}

                        </div>
                    </div>

                </InfiniteScroll>
            </>


            // old version with loading and prev next buttons

            // <div className="container my-3">
            //     <h2 className='text-center'>News Finder - Top Trending News</h2>
            //     {this.state.loading && <Spinner />}
            //     <div className="row">

            //         {/* this state.loading is used to hide news cards while loading */}

            //         {!this.state.loading && this.state.article?.map((element) => {

            //             return <div className="col-md-4" key={element.url}>
            //                 <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            //             </div>

            //         })}

            //     </div>

            //     {/* this loading is used to hide buttons while loading */}

            //     {!this.state.loading && <div className="container my-3 d-flex justify-content-between">

            //         <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrev} className="btn btn-dark">&larr; Previous</button>
            //         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNext} className="btn btn-dark">Next &rarr;</button>

            //     </div>}
            // </div>

        )
    
}

News.defaultProps = {

    country: 'in',
    pageSize: 6,
    category: 'general'

}

News.propTypes = {

    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}

export default News
