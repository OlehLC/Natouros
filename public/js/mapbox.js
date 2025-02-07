/* eslint-disable */
export const displayMap = locations => {
  // Оновлений токен API Mapbox
  mapboxgl.accessToken =
    'pk.eyJ1Ijoib2xsZWhoIiwiYSI6ImNtNmFpNnh1MjBpcW4ycXNkYTV4ZThlenoifQ.MFZtRg5SnY7lukVwH5jgEA';

  // Оновлений стиль картки
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ollehh/cm6f006gg006u01qr3jbk7ed7',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Створення маркера
    const el = document.createElement('div');
    el.className = 'marker';

    // Додавання маркера
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Додавання вспливаючого вікна (popup)
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Розширення меж карти для включення поточного місця
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};

// Ініціалізація карти після завантаження сторінки
document.addEventListener('DOMContentLoaded', function() {
  if (!window.mapboxgl) {
    console.error('Mapbox GL JS не завантажено');
    return;
  }

  try {
    // Отримання даних локалізацій з атрибута data-locations
    const locations = JSON.parse(
      document.getElementById('map').dataset.locations
    );

    // Виклик функції для відображення карти з даними локалізацій
    displayMap(locations);
  } catch (error) {
    console.error('Помилка при ініціалізації карти:', error);
  }
});
