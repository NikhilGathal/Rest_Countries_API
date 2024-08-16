const countryname = new URLSearchParams(location.search).get('name')
console.log(countryname);


const flagimg = document.querySelector('.country-details img')

const countrynameh1 = document.querySelector('.country-details h1')

const nativename = document.querySelector('.native-name')

const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')


fetch(`https://restcountries.com/v3.1/name/${countryname}?fulltext=true`)
  .then((res) => res.json())
  .then(([country]) => {
    if (nativename) {
      //   console.log(Object.values(country.name.nativeName)[0].common)

      nativename.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      nativename.innerText = country.name.common
    }
    if (country.capital) {
      capital.innerText = country.capital?.[0]
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion
    }
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(', ')
    }

    flagimg.src = country.flags.svg
    countrynameh1.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld.join(', ')

    if (country.borders) {
      country.borders.forEach((border) => {
        // console.log(border)

        fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => {
          res.json().then(([bordercountry]) => 
            
            {

            const bordertag = document.createElement('a')
                // console.log( country.name.common);
            bordertag.innerText = bordercountry.name.common
            bordertag.href = `/country.html?name=${bordercountry.name.common}`
            // link copied from url when we open country.html
                borderCountries.append(bordertag)


            })
        })
      })
    }
  })

  const theme = document.querySelector('.theme-change')
const icon = document.querySelector('.theme-change i')
console.log(icon);

let th = localStorage.getItem('theme')
if(th == 'dark')
{
  document.body.classList.add('dark')
  theme.innerHTML = `<i class="fa-regular fa-sun"></i> &nbsp;&nbsp;Light Mode`

}

theme.addEventListener('click', ()=> 
{
    document.body.classList.toggle('dark')

    if(document.body.className)
    {
        // console.log(document.body.className);
        theme.innerHTML = `<i class="fa-regular fa-sun"></i> &nbsp;&nbsp;Light Mode`
    }
    else
    {
        theme.innerHTML = '<i  class="fa-regular fa-moon"></i> &nbsp;&nbsp;Dark Mode'
        // theme.innerHTML = "<i class=fa-regular fa-moon></i> &nbsp;&nbsp;Dark Mode"
    }

} )


document.addEventListener('keydown', function(event) {
  if (event.key === 'Backspace') {
      event.preventDefault();  // Prevent the default backspace action
      window.history.back();   // Navigate to the previous page
  }
});


