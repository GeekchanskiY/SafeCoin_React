import { useState, useEffect } from "react"
import { get_crypto, get_crypto_prices } from "../../utils/requests/crypto/get_cryptos"
import { useParams } from "react-router-dom"


export function CryptoCanvas(props){
    let points = props.points
    console.log(points)
    const graph_height = 295
    const graph_width = 900
    const drawcanvas = (e) => {
        let p;
        let ctx = e.getContext('2d');
        ctx.lineWidth = 4;
        ctx.clearRect(0, 0, graph_width, graph_height);
        let min_price = points[0].price, max_price = points[0].price;
        let prev_price = points[0].price;
        let prev_x = 0
        let prev_y = 0
        let now_x;
        let now_y;
        
        for (let i = 0; i < points.length; i++ ){
            p = points[i]
            
            if (p["price"] > max_price){
                max_price = p["price"];
            }
            if (p["price"] < min_price){
                min_price = p["price"]
            }
        }
        let point_len = graph_width / points.length
        let unit_height =   (max_price - min_price) / graph_height
        prev_price = points[0].price
        prev_y = graph_height - (points[0].price - min_price)/unit_height
        
        for (let i = 0; i < points.length; i++){
            ctx.beginPath()
            ctx.moveTo(prev_x, prev_y)
            p = points[i]
            now_x = i*point_len
            now_y = (graph_height - (p.price - min_price)/unit_height)

            ctx.lineTo(now_x, now_y)
            if (now_y < prev_y){
                ctx.strokeStyle = "green"
            } else {
                ctx.strokeStyle = "red"
            }
            ctx.arc(now_x, now_y, 3, 0, 360)
            ctx.stroke()
            prev_x = now_x
            prev_y = now_y
            ctx.closePath()
        }
        
        
    }
    useEffect(() => {
        let graph = document.getElementById("detailcanvas")
        
        drawcanvas(graph)
    })

    if (points.length == 0){
        return <div> cant load graphic </div>
    } else {
        return <canvas width="900px" height="300px" id="detailcanvas"></canvas>
    }
}

export default function CryptoDetail (props){
    const [pageinit, setPageInit] = useState(true)
    
    const { name } = useParams()
    const [crypto, setCrypto] = useState(undefined)
    const [pricePoints, setPricePoints] = useState(undefined)
    
    const [cpage, setCPage] = useState(1)

    const [minprice_period, setMinPriceP] = useState(0)
    const [maxprice_period, setMaxPriceP] = useState(0)

    const [min_date, setMinDate] = useState(new Date())
    const [max_date, setMaxDate] = useState(new Date())
    const dateoptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const get_detail = async () => {
        const data = await get_crypto(name)
        const pdata = await get_crypto_prices(name, cpage)
        setCrypto(data)
        if (pdata == null){
            
            return
        }
        let max_price = pdata[0].price;
        let min_price = pdata[0].price;

        

        let max_datet = Date.parse(pdata[0].time)
        let min_datet = Date.parse(pdata[pdata.length - 1].time)
        let max_date = new Date()
        let min_date = new Date()
        max_date.setTime(max_datet)
        min_date.setTime(min_datet)
        setMaxDate(max_date)
        setMinDate(min_date)
        let p;
        for (let i = 0; i < pdata.length; i++ ){
            p = pdata[i]
            
            if (p["price"] > max_price){
                max_price = p["price"];
            }
            if (p["price"] < min_price){
                min_price = p["price"]
            }
        }
        
        setPricePoints(pdata)
        setMaxPriceP(max_price)
        setMinPriceP(min_price)
    }

    useEffect(() => {
        if (pageinit){
            get_detail()
            setPageInit(false)
        }
        
    })
    if (crypto === undefined){
        return <div>
            <h1>{name} is loading, please wait...</h1>
        </div>
    } else {
        return <div className="cryptoDetailBlock">
            <h3>{crypto.name}</h3>
            {pricePoints != undefined ?
            <div className="CanvasHolder">
                 <CryptoCanvas points={pricePoints}></CryptoCanvas> 
                 <br />
                <span>Price dia: {minprice_period} - {maxprice_period}</span> <br />
                <span>Time dia: {min_date.toLocaleDateString('en-us', dateoptions)} - {max_date.toLocaleDateString('en-us', dateoptions)}</span> <br />
                <div className="paginator">
                    <button>Prev page</button>
                    <span>{cpage}</span>
                    <button>Next page</button>
                </div>
                
            </div>
            : <div><span>data is currently unavailable</span></div>}
            
            
        </div>
    }
    
}