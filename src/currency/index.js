const getCurrencyExchange = async (input, output) => {

const res = await fetch(window.location.href.includes('https') ? 'https://tienda.preciojusto.pro/api/getExchange' : 'http://localhost:3000/api/getExchange', {
  method: 'POST',
  body: JSON.stringify({ input, output }),
  headers: new Headers({
    'Content-Type': 'application/json; charset=UTF-8'
  })
})
return res
}


export { getCurrencyExchange }









// import currencyapi from '@everapi/currencyapi-js'

// const client = new currencyapi('cur_live_HkjQI4CBgT92Ll9xbigiPzXW7GQpUrFT4YjXIizy')


// async function getCurrencyExchange(setContextData) {
//     const res = await fetch('http://data.fixer.io/api/latest?access_key=2e959ba5543c5c9eb92ee07a92ecde7b')
//     // const data = await res.json()
//     // const res = await fetch('https://api.getgeoapi.com/v2/ip/check?api_key=eac9f53f7a708740e7e362f70eed797fda3665a0')

//     // const res = await fetch('https://api.getgeoapi.com/v2/currency/convert?api_key=eac9f53f7a708740e7e362f70eed797fda3665a0&from=EUR&to=BOB&amount=1&format=json')

//     const data = await res.json()
// console.log(data)
//     // setContextData(data.rates)
//     // console.log(data.rates)
//     // await client.currencies()
//     // client.convert({
//     //     value: 12
//     // }).then(response => {
//     //     console.log(response)
//     // });


// }
