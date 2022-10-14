const app = require('./app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
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

server.listen(app.get('port'), () => {
	console.log('port ' + app.get('port'));

    io.on('connection', socket => {
        console.log('SOCKET ID=>',socket.id);
        setInterval(async function () {
            const furl =  `https://b2t-api-cmc-staging-5.flexprotect.org/marketdata/cmc/v1/summary`;
            const resp = await axios.get(furl);

            let instruments  = cryptoAvailable;

            let result = [];
            instruments.forEach((item)=>{
                resp.data[item]['color'] = cryptocurrency[item].color;
                resp.data[item]['icon'] = cryptocurrency[item].icon;
                resp.data[item]['name'] = cryptocurrency[item].name;
                resp.data[item]['code'] = cryptocurrency[item].code;
                result.push(resp.data[item]);
            });

            io.emit('summary',result);
            result = result.filter(item=>item.percentChange>0);

            result.sort((criptoA, criptoB) => {
                return criptoA['percentChange'] > criptoB['percentChange'];
            });
             
            let criptoResult  = result.splice(0,10);

            io.emit('summary-top',criptoResult);

        }, 5000);
    });
    
});
