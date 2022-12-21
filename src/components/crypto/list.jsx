import React from "react";
import CryptoTile from "./cryptotiles";
import { useState, useEffect } from "react";

import crypto_list_request from "../../utils/requests/crypto/get_cryptos";

// Fun fact -- в девелопменте реакт рендерит все компонеты дважды




export default function CryptoList (){
    const [cryptos, setCryptos] = useState([])
    const [pageinit, setPageInit] = useState(true)
    const [page, setPage] = useState(1)
    const [have_next, setHaveNext] = useState(false)
    const [have_prev, setHavePrev] = useState(false)

    useEffect(() => {
        if (pageinit){
            get_cryptos(page)
            setPageInit(false)
            //setCryptos(dcryptos)
        }
        
    })

    const get_cryptos = async (page) => {
        const data = await crypto_list_request(page)
        console.log(data)
        setCryptos(data.results)
        setHaveNext(data.next == null ? false : true)
        setHavePrev(data.previous == null ? false : true)
    }

    const prev_page = () => {
        
        get_cryptos(page - 1)
        setPage(page - 1)
    }
    const next_page = () => {
        
        get_cryptos(page + 1)
        setPage(page + 1)
    }
    
    
    return <div>
        <div className="listtiles">
        {cryptos.map((crypto, index) => {
            return <CryptoTile data={crypto} key={"crypto"+index}></CryptoTile>
        })}
        </div>
    
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