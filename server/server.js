import express from 'express'
import cheerio from 'cheerio'
import axios from 'axios';
import fs from 'fs'

const url = 'https://poshmark.com/closet/mmp727';

const scraper = async () => {
    console.log('Starting scrapper...')

    // Fetch website & grab HTML
    const { data } = await axios.get(url)

    // Load HTML into Cheerio for Scraping
    const $ = cheerio.load(data)

    // Scraped products we will save
    const products = []

    // Loop through elements under 'tile' class on website
    $('.tile').each((index, el) => {

        // Object to save our elements we find
        const product = { photo: '', title: '', price: '', size: '' }

        product.photo = $(el).find('.ovf--h').attr('src')
        product.title = $(el).find('.tile__title').text().trim()
        product.price = $(el).find('.p--t--1.fw--bold').text().trim()
        product.size = $(el).find('.tile__details__pipe__size.ellipses').text().trim()

        // Put our object of scraped element in our 'products' array
        products.push(product)

    })

    // console.dir(products)

    return JSON.stringify(products, null, 2)
}

const PORT = 3001;
const app = express()

app.get('/api', async (req, res) => {

    const products = await scraper()
    console.log('->' + products)
    res.header("Content-Type",'application/json');
    res.send(products);

})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))