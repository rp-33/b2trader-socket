const app = require('./app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let b2traderService = require('./services/b2trader');
let b2trader = new b2traderService();

server.listen(app.get('port'), () => {
	console.log('port ' + app.get('port'));

    io.on('connection', socket => {

        console.log('SOCKET ID=>',socket.id);
        
        setInterval(async function () {
            let data = await b2trader.getSummaries();
            io.emit('summary',data.result);
            io.emit('summary-top',data.criptoResult);
        }, 6000);


        
    });
    
});
