import React from "react";
import CryptoTile from "./cryptotiles";
import { useState, useEffect } from "react";

import crypto_list_request from "../../utils/requests/crypto/get_cryptos";

import { CryptoCanvas } from "./cryptodetail";
import { get_crypto_prices } from "../../utils/requests/crypto/get_cryptos";
import { Link } from "react-router-dom";
import { nFormatter } from "../../utils/actions/random/digitFormatter";

// Fun fact -- в девелопменте реакт рендерит все компонеты дважды


export function CryptoListItem (props){
    const [pageinit, setPageInit] = useState(true)
    const [haveCanvas, setHaveCanvas] = useState(false)
    const [pricePoints, setPricePoints] = useState([])
    const get_detail = async () => {
        const pdata = await get_crypto_prices(props.data.name, 1)
        
        if (pdata != null){
            setPricePoints(pdata)
            
            setHaveCanvas(true)    
            
        }
         
        
    }
    useEffect(()=>{
        if (pageinit){
            get_detail()
            setPageInit(false)
            
        }
    })

    return <div className="CryptoListItem">
        <div className="imageholder">
            <img src={props.data.image} alt="" />
        </div>
        <div className="nameholder">
            <h3><Link to={"/crypto/"+props.data.name+"/"}>{props.data.name}</Link></h3>
        </div>
        <div className="dataholder">
            <span>Marker cap $:</span><span>{nFormatter(props.data.market_cap, 2)}</span>
            <span>24H volume $:</span><span>{nFormatter(props.data.volume, 2)}</span>
            <span>24h transactions:</span><span>{nFormatter(props.data.transactions_count, 2)}</span>
        </div>
        <div className="canvasholder">
            {haveCanvas == true ? <CryptoCanvas points={pricePoints} > </CryptoCanvas> : <span>Data unavailable</span>}
        </div>
        
    </div>
}

export default function CryptoList (){
    const [cryptos, setCryptos] = useState([])
    const [pageinit, setPageInit] = useState(true)
    const [page, setPage] = useState(1)
    const [have_next, setHaveNext] = useState(false)
    const [have_prev, setHavePrev] = useState(false)

    const [min_mkt_cap, setMinCap] = useState(null)
    const [max_mkt_cap, setMaxCap] = useState(null)
    
    const [min_price, setMinPrice] = useState(null)
    const [max_price, setMaxPrice] = useState(null)

    const [searchname, setSearchName] = useState("")

    useEffect(() => {
        if (pageinit){
            get_cryptos(page)
            setPageInit(false)
            //setCryptos(dcryptos)
        }
        
    })

    const get_cryptos = async (page) => {
        const data = await crypto_list_request(page)
        
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
        <div className="cryptosearch">
            <div className="cryptofilters">
                <span className="title">Filters</span>
                <hr />
                <div className="filteritem">
                    <span className="textTitle">Name</span>
                    <input type="text" value={searchname}/>

                </div>
                <div className="filteritem">
                    <span className="textTitle">Market_cap</span><br />
                    <span className="numd numd1" >From:</span><input value={min_mkt_cap} type="number" placeholder="0,005" className="numd"/> <span>to</span><input value={max_mkt_cap} type="number" />

                </div>
                <div className="filteritem">
                    <span className="textTitle">Price</span><br />
                    <span className="numd numd1">From:</span><input value={min_price} onChange={(e) => {setMinPrice(e.target.value)}} type="number" className="numd"/> <span>to</span><input value={max_price} onChange={(e) => {setMaxPrice(e.target.value)}} type="number" />

                </div>
                <button>Search</button>
            </div>
            <div className="cryptolist">
            {cryptos.map((crypto, index) => {
                return <CryptoListItem data={crypto} key={"crypto"+index}></CryptoListItem>
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
        
            
        </div>
        
    </div>
    
    
}