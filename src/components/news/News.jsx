import React from "react";
import get_news_request from "../../utils/requests/news/get_news_request";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "../../styles/news/news.scss"


function NewsPreview(props){
    useEffect(() =>{
        console.log(props)
    })
    return <div className="NewsPreview">
        <h3>{props.news.title}</h3>
        <Link to={'/news/'+props.news.id}>{props.news.title}</Link>
    </div>
}

export default function News() {
    const [pageinit, setPageInit] = useState(true)
    const [news, setNews] = useState([])
    const [page, setPage] = useState(1)
    const [have_next, setHaveNext] = useState(false)
    const [have_prev, setHavePrev] = useState(false)

    useEffect(() => {
        if (pageinit){
            console.log("NEWS PAGE INITIALIZATION")
            get_news(page);
            setPageInit(false)
        }
    })

    const get_news = async (page) => {
        const data = await get_news_request(page)
        setNews(data.results)
        setHaveNext(data.next == null ? false : true)
        setHavePrev(data.previous == null ? false : true)
        
    }

    const prev_page = () => {
        
        get_news(page - 1)
        setPage(page - 1)
    }
    const next_page = () => {
        
        get_news(page + 1)
        setPage(page + 1)
    }

    return <div>
        {news.map((news, index) =>{
            return <div key={"news"+index}>
                <NewsPreview news={news}></NewsPreview>
                
                
            </div>
        })}
        <div className="pagination">
            {have_next ?
                <button onClick={next_page}>next</button>
                :
                null
            }
            <span className="current_page">{page}</span>
            {have_prev ?
                <button onClick={prev_page}>prev</button>
                :
                null
            }
        </div>
    </div>
}
