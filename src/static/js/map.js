$(function () {
  console.log('map.js')

  const map = initMap()

  fetchStations(map)
})

function initMap() {
  const map = L.map('map').setView([40.781338, -73.966552], 13)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)
  return map
}

function fetchStations(map) {
  fetch('/api/stations')
    .then(response => response.json())
    .then(stations => {
      console.log('Fetched radio stations:', stations)
      populateMap(stations, map)
    })
    .catch(err => {
      console.error('Error fetching radio stations:', err)
    })
}

function populateMap(stations, map) {
  for (let i = 0; i < stations.length; i++) {
    const name = stations[i].name
    const lat = stations[i].geo_lat
    const long = stations[i].geo_long
    const url = stations[i].url_resolved
    if (name && lat && long && url.includes('https') && !url.includes('.m3u')) {
      const element = `<h2 data-url=${url} onclick=playStream('${url}')>${name}</h2>`
      L.marker([lat, long]).addTo(map)
        .bindPopup(element)
      // .bindPopup(`<a href='${url}'>${name}</a>`)
    }
  }
}

function playStream(url) {
  console.log(url)
  const audio = document.getElementById('audio')
  audio.src = url
  audio.play()
  $('#pause').show()
}

$('.audio-control').on('click', function () {
  const audio = document.getElementById('audio')
  audio.paused ? audio.play() : audio.pause()
  $('.audio-control').toggle()
})
