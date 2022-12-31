const axios = require('axios');

const url = 'https://criptocurrency-files-static.herokuapp.com/images';

export const cryptocurrency = {
    'BTC_USDT' : {
        'name' : 'Bitcoin',
        'code' : 'BTC',
        'color' : '#f5b300',
        'icon' : `${url}/Bitcoin.png`
    },
    'ETH_USDT' : {
        'name' : 'Ethereum',
        'code' : 'ETH',
        'color' : '#37367b',
        'icon' : `${url}/Ethereum.png`
    },
    'LTC_USDT' : {
        'name' : 'Litecoin',
        'code' : 'LTC',
        'color' : '#bfbfbf',
        'icon' : `${url}/Litecoin.jpg`
    },
    'MATIC_USDT' : {
        'name' : 'Matic',
        'code' : 'MATIC',
        'color' : '#37367b',
        'icon' : `${url}/Litecoin.jpg`
    },
    'UNI_USDT' : {
        'name' : 'Uniswap',
        'code' : 'UNI',
        'color' : '#fd007a',
        'icon' : `${url}/Uniswap.png`
    },
    'DASH_USDT' : {
        'name' : 'Dash',
        'code' : 'DASH',
        'color' : '#138de4',
        'icon' : `${url}/Dash.png`
    },
    'TRX_USDT' : {
        'name' : 'Tron',
        'code' : 'TRX',
        'color' : '#cb4a42',
        'icon' : `${url}/Tron.png`
    },
    'BNB_USDT' : {
        'name' : 'Binance coin',
        'code' : 'BNB',
        'color' : '#f3bb32',
        'icon' : `${url}/Binance.png`
    },
    'DOGE_USDT' : {
        'name' : 'Doge coin',
        'code' : 'DOGE',
        'color' : '#ba9f33',
        'icon' : `${url}/Dogecoin.png`
    },
    'XMR_USDT' : {
        'name' : 'Monero',
        'code' : 'XMR',
        'color' : '#fd6b03',
        'icon' : `${url}/Monero.png`
    },
    'AAVE_USDT' : {
        'name' : 'Aave',
        'code' : 'AAVE',
        'color' : '#37367b',
        'icon' : `${url}/Litecoin.jpg`
    },
    'SUSHI_USDT' : {
        'name' : 'Sushi',
        'code' : 'SUSHI',
        'color' : '#b86eba',
        'icon' : `${url}/SushiSwap.png`
    },
    'XRP_USDT' : {
        'name' : 'Ripple',
        'code' : 'XRP',
        'color' : '#37367b',
        'icon' : `${url}/Litecoin.jpg`
    },
    'BCH_USDT' : {
        'name' : 'Bitcoin cash',
        'code' : 'BCH',
        'color' : '#4bce51',
        'icon' : `${url}/BitcoinCash.png`
    },
    'XLM_USDT' : {
        'name' : 'Stellar',
        'code' : 'XLM',
        'color' : '#303030',
        'icon' : `${url}/Stellar.png`
    },
    'LINK_USDT' : {
        'name' : 'Chainlink',
        'code' : 'LINK',
        'color' : '#375bd2',
        'icon' : `${url}/Chainlink.png`
    },
    'ZEC_USDT' : {
        'name' : 'Zcash',
        'code' : 'ZEC',
        'color' : '#dea038',
        'icon' : `${url}/ZCash.png`
    },
    'BAT_USDT' : {
        'name' : 'Basic attention token',
        'code' : 'BAT',
        'color' : '#df4729',
        'icon' : `${url}/BasicAttentionToken.png`
    },
    'MANA_USDT' : {
        'name' : 'Mana',
        'code' : 'MANA',
        'color' : '#fd5e56',
        'icon' : `${url}/mana.png`
    },
}

export const cryptoAvailable = [
    'BTC_USDT',
    'ETH_USDT',
    'LTC_USDT',
    'MATIC_USDT',
    'UNI_USDT',
    'DASH_USDT',
    'TRX_USDT',
    'BNB_USDT',
    'DOGE_USDT',
    'XMR_USDT',
    'AAVE_USDT',
    'SUSHI_USDT',
    'XRP_USDT',
    'BCH_USDT',
    'XLM_USDT',
    'LINK_USDT',
    'ZEC_USDT',
    'BAT_USDT',
    'MANA_USDT'
];

const cryptoAvailable = ['BTC_USD','ETH_USD'];

class B2trader {
    constructor(io){
        this.furl =  `https://b2t-api-cashship.flexprotect.org/marketdata/cmc/v1/summary`;
    }

    async getSummary(){
        try
        {
            const resp = await axios.get(this.furl);
            return resp;
        }
        catch(err){
            console.log('ERROR=>',err)
        }
    }

    addItem(resp){      
        let instruments  = cryptoAvailable;
        let result = [];
        instruments.forEach((item)=>{
            resp.data[item]['color'] = cryptocurrency[item].color;
            resp.data[item]['icon'] = cryptocurrency[item].icon;
            resp.data[item]['name'] = cryptocurrency[item].name;
            resp.data[item]['code'] = cryptocurrency[item].code;
            result.push(resp.data[item]);
        });
        return result;
    }

    summaryTop(result){
        result = result.filter(item=>item.percentChange>0);

        result.sort((criptoA, criptoB) => {
            return criptoA['percentChange'] > criptoB['percentChange'];
        });
         
        let criptoResult  = result.splice(0,10);
        return criptoResult;
    }

    async getSummaries(){
        let result = await axios.get(this.furl);
        result = this.addItem(result);
        const criptoResult = this.summaryTop(result);
        return {
            result,
            criptoResult
        }
       
    }

}

module.exports = B2trader;