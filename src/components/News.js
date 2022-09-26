import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {


    static defaultProps = {

        country: 'in',
        pageSize: 6,
        category: 'general'

    }

    static propTypes = {

        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }

    capitalizeFirstLetter = (string) => {

        return string.charAt(0).toUpperCase() + string.slice(1);

    }

    constructor(props) {
        super(props);

        this.state = {

            article: [],
            loading: false,
            page: 1,
            totalResults: 0

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Finder`
    }

    async updateNews() {

        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({

            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,

        });

        this.props.setProgress(100);

    }

    async componentDidMount() {

        this.updateNews();
    }

    handlePrev = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4dbe5ab177ac497788c9f4d88958e19f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();

        // this.setState({

        //     page: this.state.page - 1,
        //     article: parsedData.articles,
        //     loading: false

        // })

        this.setState({

            page: this.state.page - 1

        })

        this.updateNews();

    }



    handleNext = async () => {

        // if(this.state.page+ 1 > Math.ceil(this.state.totalResults/20)){

        // } else {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4dbe5ab177ac497788c9f4d88958e19f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();

        //     this.setState({

        //         page: this.state.page + 1,
        //         article: parsedData.articles,
        //         loading: false

        //     })

        // }


        this.setState({

            page: this.state.page + 1

        })

        this.updateNews();
    }

    fetchMoreData = async () => {

        this.setState({

            page: this.state.page + 1

        })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({

            article: this.state.article.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });


    }




    render() {

        return (

            // new version with infinite scroll

            <>
                <h2 className='text-center my-4'>News Finder - Top Trending News</h2>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Spinner/>}>


                    <div className="container">
                        <div className="row">
                            {this.state.article?.map((element) => {

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
}

export default News
