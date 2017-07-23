const scrapeIt = require('scrape-it');
const Promise = require('bluebird');

const maxPrice = +process.argv[2];

const scrape = () => {
  scrapeIt('https://www.norwegian.no/booking/fly/lavpris/?D_City=LGW&A_City=TRD&TripType=1&D_Day=01&D_Month=201707&R_Day=01&R_Month=201707&AgreementCode=UNDER26&CurrencyCode=NOK', {
    flights: {
      listItem: '.fareCalendarTable td',
      data: {
        date: '.fareCalDate',
        price: '.fareCalPrice'
      }
    }
  }).then(data => {
    const flights = data.flights.map(f => ({
      date: +f.date,
      price: +f.price.replace(/\s/g,'')
    })).filter(f => f.date && f.price)
    flights.forEach(f => {
      if (f.price < maxPrice) {
        console.log(`${f.price} available!`)
      }
    })
  }).then(() => {
    console.log(`Last scrape: ${new Date()}`)
    setTimeout(scrape, 15 * 60 * 1000) // every 15 mins.
  }).catch(console.error)
}

scrape();
