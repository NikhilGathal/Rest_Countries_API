const countriescontainer = document.querySelector('.countries-container')
// console.log(countriescontainer)

const filter = document.querySelector('.filter-by-region')

let allcountriesdata

const searchinput = document.querySelector('.search-container input')

// when select menu changes change event hits

filter.addEventListener('change', (e) => {
  
  
  // console.log(e.target.value);
  // fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then( (res)=>res.json() ).then
  if(filter.value === 'Filter by Region')
  {
    console.log(filter.value)
    countriescontainer.innerHTML = ''

    fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    rendercountries(data)
   
  })
  }

  else
  {

    fetch(`https://restcountries.com/v3.1/region/${filter.value}`)
    .then((res) => res.json())
    .then(rendercountries)

  }
  
 
    
})

























fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);A
    rendercountries(data)
    allcountriesdata = data
  })

function rendercountries(data) {
  
  countriescontainer.innerHTML = ''

  data.forEach((country) => {
    // console.log(country.capital)
    const countrycard = document.createElement('a')
    countrycard.classList.add('country-card')
    // ?name added to send on that country page on which it was clicked
    countrycard.href = `/country.html?name=${country.name.common}`

    const cardHTML = `
    
    
                   <div class="img">

                   <img src="${country.flags.svg}"alt="" />

    </div>
                  
                  <div class="card-text">
                  <h3 class="card-title">${country.name.common}</h3>
                  <p><b>Population: </b>${country.population.toLocaleString(
                    'en-IN'
                  )}</p>
                  <p><b>Region: </b>${country.region}</p>
                  <p><b>Capital: </b>${country.capital?.join(', ')}</p>
                  </div>
          `
    // <p><b>Capital: </b>${country.capital}</p> // array automatic convert into string if want only one capital then use
    //country.capital[0]
    countrycard.innerHTML = cardHTML

    // console.log(x);
    // console.log(countrycard)
    countriescontainer.append(countrycard)
  })
}

searchinput.addEventListener('input', (e) => {
  // console.log(e.target.value);

  let coun = document.querySelector('.countries-container')
  // coun.style.justifyContent = 'space-evenly'

  // let car = document.querySelector('.country-card')
  // car.style.display = 'block'
  // car.style.margin = '50px'

  const filteredcountry = allcountriesdata.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())


  // both we are changing to lowercase and then comparing

  )
  console.log(filteredcountry)







  
  if (filteredcountry.length == 0) {
    // console.log("Invalid Input");
    document.querySelector('.invalid').innerText = 'Invalid Input'
  }

  // console.log(filteredcountry);

  rendercountries(filteredcountry)
})

const theme = document.querySelector('.theme-change')
const icon = document.querySelector('.theme-change i')

let thch = localStorage.getItem('theme') || ''
console.log(thch)

if (thch == 'dark') {
  document.body.classList.toggle('dark')

  // console.log(document.body.className);
  theme.innerHTML = `<i class="fa-regular fa-sun"></i> &nbsp;&nbsp;Light Mode`
} else {
  theme.innerHTML = '<i  class="fa-regular fa-moon"></i> &nbsp;&nbsp;Dark Mode'
  // theme.innerHTML = "<i class=fa-regular fa-moon></i> &nbsp;&nbsp;Dark Mode"
}

// console.log(icon);

theme.addEventListener('click', () => {
  // console.log("hello");

  document.body.classList.toggle('dark')

  if (document.body.className) {
    localStorage.setItem('theme', 'dark')

    // console.log(document.body.className);
    theme.innerHTML = `<i class="fa-regular fa-sun"></i> &nbsp;&nbsp;Light Mode`
  } else {
    localStorage.setItem('theme', 'light')
    theme.innerHTML =
      '<i  class="fa-regular fa-moon"></i> &nbsp;&nbsp;Dark Mode'
    // theme.innerHTML = "<i class=fa-regular fa-moon></i> &nbsp;&nbsp;Dark Mode"
  }
})

// document.addEventListener('DOMContentLoaded', () => {
//   const invalidMessage = document.querySelector('.invalid');
//   console.log(invalidMessage); // Should log the <p> element
// });
