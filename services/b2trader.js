const axios = require('axios');

const cryptocurrency  = {
    'BTC_USD' : {
        'name' : 'Bitcoin',
        'code' : 'BTC',
        'color' : '#f7931a',
        'icon' : 'https://res.cloudinary.com/dcds5nieu/image/upload/v1656985058/bitcoin_cav5b2.png'
    },
    'ETH_USD' : {
        'name' : 'Ethereum',
        'code' : 'ETH',
        'color' : '#37367b',
        'icon' : 'https://res.cloudinary.com/dcds5nieu/image/upload/v1656985169/ethereum_udywml.png'
    }
}

const cryptoAvailable = ['BTC_USD','ETH_USD'];

class B2trader {
    constructor(io){
        this.furl =  `https://b2t-api-cmc-staging-5.flexprotect.org/marketdata/cmc/v1/summary`;
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