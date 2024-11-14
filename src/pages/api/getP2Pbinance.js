


// GET & APPLY FUNCTION

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

        // console.log(jsonData)

        res.json(jsonData);

    })()
}
