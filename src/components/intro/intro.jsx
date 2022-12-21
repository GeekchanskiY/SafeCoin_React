import React from "react";
import introimg1 from "../../img/introimg.png";
import { Link } from "react-router-dom";
import CryptoTile from "../crypto/cryptotiles";
import { useSelector, useDispatch } from 'react-redux';
import { refresh , auth }  from "../../features/JWTSlice";

class IntroStart extends React.Component{
    render(){
        return <div className="introblock1">
            <img src={introimg1} alt="cryptointro" className="introimg1" />
            <div>
            <h3>SafeCoin - more than a crypto tracking service</h3>
            <p>Best crypto tracking platform that allows you to find
            all cryptos in one place, see other’s opinion about
            coins, discuss your experience with other traders
            in out on-line chats securely</p>
            <span>You can begin right now, just drop in <Link to={'/list'}>here</Link></span>
            </div>
            
        </div>
    }
}


class IntroText extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <h3>Quick start in trading</h3>
            <h4>What's cryptocurrency?</h4>
            <p>A cryptocurrency, crypto-currency, or crypto is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it. It is a decentralized system for verifying that the parties to a transaction have the money they claim to have, eliminating the need for traditional intermediaries, such as banks, when funds are being transferred between two entities.</p>
            <h3>Tips before you begin:</h3>
            <h4>1. Caution first:</h4>
            <img src="" alt="" />
            <p>The crypto market is just a decade old and is still in its early stages. Hence, it is much more volatile and still lacks any form of regulation from authorities. This makes it nearly impossible to recover any investments in case of fraud or hacks. To add to this, it is very easy to make a cryptocurrency that looks legitimate but turns out to be a scam.</p>
            <h4>2. Invest only what you can afford to lose:</h4>
            <p>Ensure that your long term financial security is taken care of in the form of Fixed Deposits, Equity Mutual Funds, Debt Funds, necessary insurances, emergency funds, etc. If you still have any surplus after this security, you can consider investing in cryptocurrencies as this is money that you can afford to lose and remain unaffected financially.</p>
            <h4>3. Do your research:</h4>
            <p>It is easy to blindly invest by taking tips from friends or acquaintances. Yet, know that this is your money and no one will come to your rescue in case the investment fails. Hence, it is better to understand the cryptocurrency market first before investing any money into the same. Read about the dominant cryptocurrencies such as Bitcoin, Ethereum, Tether, Polygon and more. Learn about their use cases and potential before making any investment decisions.</p>
            <h4>4. Use a trusted exchange:</h4>
            <p>It is not uncommon for cryptocurrency exchanges to get hacked or scam investors. Ensure that you make your account with a large exchange that is historically credible and have insurances in place in case of a hack.</p>
            <h4>5. Learn the technicalities:</h4>
            <p>If you are more serious about cryptocurrency investments, it makes sense to learn about how to create your own digital wallets or purchase a trusted hard wallet to safeguard your investments. Learn about liquidity mining, staking, decentralised finance, and more to broaden your scope of knowledge.</p>
            <h3>And now, you can click <Link to={'/list'}>here</Link> to begin</h3>
        </div>
    }
}

export default function Intro (){
    
    return <div className="container-xxl">
        <IntroStart></IntroStart>
        <CryptoTile></CryptoTile>
        <IntroText></IntroText>
    </div>
    
}