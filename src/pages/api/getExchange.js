// import puppeteer from "puppeteer";
export default async function webScraping(req, res) {

    if (req.method === "POST") {

        // const browser = await puppeteer.launch({headless: 'new'});

        // const page = await browser.newPage()
        // await page.setDefaultNavigationTimeout(0);
        // await page.goto('https://google.com/')
        // const search = await page.waitForSelector('#APjFqb')
        // await search.type(`exchange divisas`)
        // await page.keyboard.press('Enter')
        // await page.waitForNavigation()
        // await page.click('[class="M2vV3 vOY7J"]')

        // const obj = await req.body.divisas.reduce(async (previousPromise, i) => {
        //     try {
        //         let acc = await previousPromise;
        //         const search2 = await page.waitForSelector('#APjFqb')
        //         await search2.type(`USD to ${i}`)
        //         await page.keyboard.press('Enter')
        //         await page.waitForNavigation()
        //         const value = await page.evaluate(() => document.querySelector('.SwHCTb').innerText)
        //         console.log(value)
        //         await page.click('[class="M2vV3 vOY7J"]')

        //         return { ...acc, [i]: value }
        //     } catch (error) {
        //         console.log(error)
        //         return {}
        //     }
        // }, Promise.resolve({}));
        // await browser.close()
        // return res.json({...obj, USD: '1 USD'})
    }
}
