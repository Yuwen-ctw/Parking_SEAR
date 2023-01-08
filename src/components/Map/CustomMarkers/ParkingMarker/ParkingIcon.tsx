import L from 'leaflet'

const parkingIcon = (color = '#237cc9') =>
  L.divIcon({
    html: `
    <svg viewBox="318.442 10.401 93.172 103.269" width="45px" height="45px"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g transform="matrix(2.181907, 0, 0, 2.108075, -395.284546, -9.632825)" style="">
        <image width="41" height="41" x="334.215" y="15.082" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC"/>
        <path d="M 348.363 12.193 C 342.287 12.193 337.363 17.117 337.363 23.193 C 337.363 24.717 337.679 26.552 338.234 27.874 C 340.792 33.977 348.363 52.136 348.363 52.136 C 348.363 52.136 355.934 33.997 358.492 27.894 C 359.047 26.571 359.363 24.717 359.363 23.193 C 359.363 17.117 354.439 12.193 348.363 12.193 Z M 348.363 28.272 C 345.601 28.272 343.362 26.033 343.362 23.271 C 343.362 20.509 345.601 18.271 348.363 18.271 C 351.125 18.271 353.364 20.509 353.364 23.271 C 353.364 26.033 351.125 28.272 348.363 28.272 Z" stroke="#222" fill="${color}" stroke-width="1.5" tabindex="0"/>
        <ellipse style="fill: rgb(255, 255, 255); paint-order: stroke; stroke: rgb(255, 255, 255);" cx="348.349" cy="23.263" rx="2.567" ry="2.566"/>
      </g>
    </svg>
    `,
    className: 'parkingIcon',
    // I think the iconAnchor attribute should fit the size of <path>
    iconAnchor: [24, 44],
  })

export default parkingIcon
