console.log('map.js')

const map = L.map('map').setView([40.730610, -73.935242], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

fetch('/api/stations')
  .then(response => response.json())
  .then(stations => {
    console.log('Fetched radio stations:', stations)
    for (let i = 0; i < stations.length; i++) {
      const name = stations[i].name
      const lat = stations[i].geo_lat
      const long = stations[i].geo_long
      const url = stations[i].url_resolved
      if (name && lat && long && url) {
        L.marker([lat, long]).addTo(map)
          .bindPopup(`<a href='${url}'>${name}</a>`)
      }
    }
  })
  .catch(err => {
    console.error('Error fetching radio stations:', err)
  })
