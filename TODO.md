# TODO

## Mapbox

- [ ] [Mapbox in React v16](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/)
- [ ] [Check for Mapbox browser support](https://docs.mapbox.com/mapbox-gl-js/example/check-for-support/)
- [X] [Add marker of user's geolocation to map](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)
  - [X] [Add popup to marker](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)
- [ ] Added markers of venues near the user
  - [ ] [Add popup to markers](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)
- [X] [Scale map](https://docs.mapbox.com/mapbox-gl-js/api/markers/#scalecontrol)
- [ ] [Enable Dark Mode](https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-compare/)
- [ ] [Build a store locator using Mapbox GL JS](https://docs.mapbox.com/help/tutorials/building-a-store-locator/)
- [ ] [map.on('places')](https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/)
- [ ] ['MongoDB Restuarants'](https://docs.mongodb.com/manual/tutorial/geospatial-tutorial/)
```javascript
      const scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial'
      });

      map.addControl(scale);

      scale.setUnit('metric');
```

- [ ] [Display map navigation controls](https://docs.mapbox.com/mapbox-gl-js/example/navigation/)

```javascript
      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl());
```
