import fetch from 'node-fetch';

export default async function account(req, res) {
    console.log(req.body)
    console.log('-------------')

    const headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Length": "123",
        "content-type": "application/json",
        "Host": "p2p.binance.com",
        "Origin": "https://p2p.binance.com",
        "Pragma": "no-cache",
        "TE": "Trailers",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0"
    };


    (async () => {
        const responseData = await fetch(
            'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {
                headers,
                method: 'POST',
                body: JSON.stringify(req.body),
            }
        );

        if (!responseData.ok)
            throw 'bad response';

        const jsonData = await responseData.json();


        res.json(jsonData);

    })()
}






























// async function getExchage(i) {


//     const data = {
//       asset: 'USDT',
//       // tradeType: 'BUY',
//       fiat: i.code,
//       transAmount: state[i.code] && state[i.code].transAmount ? state[i.code].transAmount : (i.transAmount ? i.transAmount:  0),
//       order: '',
//       page: 2,
//       rows: 15,
//       filterType: 'all'
//     };

//     const responseData = await fetch(
//       'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
//       {
//         headers,
//         method: 'POST',
//         body: JSON.stringify({ ...data, tradeType: 'BUY', }),

//       }
//     );
//     const responseData2 = await fetch(
//       'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
//       {
//         headers,
//         method: 'POST',
//         body: JSON.stringify({ ...data, tradeType: 'SELL', }),

//       }
//     );
 

//     const jsonData = await responseData.json();
//     const jsonData2 = await responseData2.json();

//     if (jsonData.data.length !== 0 && jsonData2.data.length !== 0) {
//       let tempMaxima = Math.max(...jsonData.data.map((i) => i.adv.price));
//       let tempMinima = Math.min(...jsonData.data.map((i) => i.adv.price));
//       let promedio = (tempMaxima + tempMinima) / 2;


//       let tempMaxima2 = Math.max(...jsonData2.data.map((i) => i.adv.price));
//       let tempMinima2 = Math.min(...jsonData2.data.map((i) => i.adv.price));
//       let promedio2 = (tempMaxima2 + tempMinima2) / 2;
//       setState({ ...state, [i.code]: { ...state[i.code],  compra: (promedio2 + 0.01).toFixed(2), venta: (promedio + 0.01).toFixed(2) } })
//     } else {
//       setModal('NonExchange')
//       setItem({ ...i, transAmount: state[i.code] && state[i.code].transAmount ? state[i.code].transAmount : 0, })
//     }

//   }