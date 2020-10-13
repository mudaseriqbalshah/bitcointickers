    
    $(document).ready(function()
    {
        startwsBitMex();
        startwsBinance();
        startwsFtx();
        startwsBitFinex();
        startwsCoinBasePro();
        startwsHitbtc();
        startwsBequant();
        startCoindeal();
        startwsBitblinx();
        startwsBibo();
        startwsGemini();
        startwsCrypto();
        // startwsBitTrex();
    });

    startwsBitMex = () => {
        const ws = new WebSocket('wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD');

        ws.onmessage = (function (evt) {
            var data = evt.data;

            var jdata = JSON.parse(data);
            if(jdata.table !== undefined) {
                $('#lblBitmex').text(jdata.data[0].price);
            }
        });
    }

    startwsBinance = () => {
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

        ws.onmessage = (function (evt) {
            var data = evt.data;

            var jdata = JSON.parse(data);
            $('#lblBinance').text(jdata.c);

        });
    }

    startwsFtx = () => {
        const ws = new WebSocket("wss://ftx.com/ws/");

        ws.onopen = () => {
            ws.send(JSON.stringify({'op': 'subscribe', 'channel': 'ticker', 'market': 'BTC/USDT'}));
        }
        ws.onmessage = (function (evt) {
            var data = evt.data;
            var jdata = JSON.parse(data);
            
            if(jdata.data != undefined)
                $('#lblFtx').text(jdata.data.last);
        });
    }

    startwsBitFinex = () => {
        const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

        ws.onopen = () => {
            let msg = JSON.stringify({ 
                event: 'subscribe', 
                channel: 'ticker', 
                symbol: 'tBTCUST' 
              })
            ws.send(msg);
        }

        ws.onmessage = (function (evt) {
            var data = evt.data;

            var jdata = JSON.parse(data);
            // console.log(jdata);
            if(jdata[1]!= 'undefined')
                $('#lblBitFinex').text(jdata[1][6]);
        });
    }

    startwsCoinBasePro = () => {
        const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');

        ws.onopen = () => {
            let msg = JSON.stringify(
                {
                    "type": "subscribe",
                    "product_ids": [
                        "BTC-USD"
                    ],
                    "channels": [
                        "level2",
                        "heartbeat",
                        {
                            "name": "ticker",
                            "product_ids": [
                                "BTC-USD"
                            ]
                        }
                    ]
                }
            )
            ws.send(msg);
        }

        ws.onmessage = (function (evt) {
            var data = evt.data;

            var jdata = JSON.parse(data);
            // console.log(jdata.changes[0]);
            var changes = jdata.changes;
            if(changes != undefined)
            $('#lblCoinBasePro').text(changes[0][1]);
        });
    }
        
    startwsHitbtc = () => {
        const ws = new WebSocket('wss://api.hitbtc.com/api/2/ws');

        ws.onopen = () => {
            let msg = JSON.stringify(
                {
                    "method": "subscribeTicker",
                    "params": {
                      "symbol": "BTCUSD"
                    },
                    "id": 123
                }
            )
            ws.send(msg);
        }

        ws.onmessage = (function (evt) {
            var data = evt.data;

            var jdata = JSON.parse(data);
            // console.log(jdata);
            $('#lblHitbtc').text(jdata.params.last);
        });
    }

    startwsBequant = () => {
        const ws = new WebSocket('wss://api.bequant.io/api/2/ws');

        ws.onopen = () => {
            let msg = JSON.stringify(
                {
                    "method": "subscribeTicker",
                    "params": {
                      "symbol": "BTCUSD"
                    },
                    "id": 123
                }
            )
            ws.send(msg);
        }

        ws.onmessage = (function (evt) {
            var data = evt.data;

            var jdata = JSON.parse(data);
            $('#lblBequant').text(jdata.params.last);
        });
    }

    startCoindeal = () => {
        // setInterval(() => {
        //     $.get("/getcoindeal", function(data, status){
        //         // console.log(data);
        //         $('#lblCoindeal').text(data.BTC_USD.last);
        //     });
        // },2000);
    }

    startwsBitblinx = () => {
        const ws = new WebSocket('wss://trade.bitblinx.com/ws');

        ws.onopen = () => {
            let msg = JSON.stringify(
                {
                    "method": "subscribeTrades",
                    "params": {
                        "symbol": "BTC/USDT",
                        "limit": 1
                    },
                    "id": 1
                }
            )
            ws.send(msg);
        }

        ws.onmessage = (function (evt) {
            var data = evt.data;

            var jdata = JSON.parse(data);
            if(jdata.method == "newTrade"){
                $('#lblBitBlinx').text(jdata.result.price);
            }else{
                $('#lblBitBlinx').text(jdata.result[0].price);
            }
        });
    }

    'use strict';

    var pako = window.pako;
    function _base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
    
    startwsBibo = () => {
        const ws = new WebSocket('wss://push.bibox.com/');

        ws.onopen = () => {
            let msg = JSON.stringify(
                {
                    "event": "addChannel",
                    "channel": "bibox_sub_spot_BTC_USDT_ticker",
                    "apikey":"92cc248adb4bcccd5bbbedf5bc8c8c1c50bc3535"
                }
                  
            )
            //ce56295a77184b2a408e56e6bcbde9014dc329aa
            ws.send(msg);
        }
        ws.onmessage = (function (evt) {
            var data = evt.data;

            var jdata = JSON.parse(data);

            text = pako.inflate(atob(jdata[0].data), {
                to: 'string'
            });
            var pdata = JSON.parse(text);
            $('#lblBibo').text(pdata.last);
        });
    }

    startwsGemini = () => {
        const ws = new WebSocket('wss://api.gemini.com/v1/marketdata/BTCUSD');

        ws.onmessage = (function (evt) {
            var data = evt.data;
            var jdata = JSON.parse(data);
            $('#lblGemini').text(jdata.events[0].price);
        });
    }
    startwsCrypto = () => {
        const ws = new WebSocket('wss://stream.crypto.com/v2/market');

        ws.onopen = () => {
            let msg = JSON.stringify(
                {
                    "id": 11,
                    "method": "subscribe",
                    "params": {
                      "channels": ["ticker.BTC_USDT"]
                    },
                    "nonce": 1587523073344
                }
            )
            ws.send(msg);
        }
        ws.onmessage = (function (evt) {
            var data = evt.data;
            var jdata = JSON.parse(data);
            // console.log(jdata);
            $('#lblCrypto').text(jdata.result.data[0].a);
        });
    }

    startwsBitTrex = () => {
        const url = 'wss://socket-v3.bittrex.com/signalr';
        const hub = ['c3'];

        const client = new windows.signalR.client(url, hub);
        client.serviceHandlers.messageReceived = messageReceived;
        client.serviceHandlers.connected = () => {
            console.log('Connected');
        }

    }

    function messageReceived(message) {
        const data = JSON.parse(message.utf8Data);
        console.log(data);
    }