$(function () {
  const map = initMap()
  fetchStations(map)
})

$('.audio-control').on('click', function () {
  const audio = document.getElementById('audio')
  audio.paused ? audio.play() : audio.pause()
  $('.audio-control').toggle()
})

$('#map').on('click', '.leaflet-popup-content>h2', function () {
  const station = $(this).data('station')
  const audio = document.getElementById('audio')
  audio.src = station.url_resolved
  audio.play()
  $('#pause').show()
  $('#play').hide()
  $('#playing>h3').html(`${station.name} - <a href='${station.homepage}' target='_blank'>Visit Homepage</a>`)
  fetchWiki(station.url_resolved.name)
})

function initMap() {
  const map = L.map('map').setView([40.781338, -73.966552], 13)
  const CartoDBDarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  })
  CartoDBDarkMatter.addTo(map)
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
      console.error('Error fetching from /api/stations:', err)
    })
}

function fetchWiki(name) {
  const apiUrl = 'http://localhost:8080/api/wiki'
  const parameters = {
    station_name: name
  }
  const urlWithParams = new URL(apiUrl)
  urlWithParams.search = new URLSearchParams(parameters).toString()
  fetch(urlWithParams)
    .then(response => response.json())
    .then(data => {
      console.log('Fetched wiki data', data)
    })
    .catch(error => {
      console.error('Error fetching from /api/wiki:', error)
    })
}

function populateMap(stations, map) {
  for (let i = 0; i < stations.length; i++) {
    const name = stations[i].name
    const lat = stations[i].geo_lat
    const long = stations[i].geo_long
    const url = stations[i].url_resolved
    if (name && lat && long && url.includes('https') && !url.includes('.m3u')) {
      const element = `<h2 data-station='${JSON.stringify(stations[i])}'>${name}</h2>`
      const radioIcon = L.icon({
        iconUrl: 'img/radio.png',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
      })
      L.marker([lat, long], { icon: radioIcon }).addTo(map)
        .bindPopup(element)
    }
  }
}
