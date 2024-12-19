4. Tool Integration
Task: Integrate a third-party tool into a basic web project.
Options:
● Add a Google Maps API to display a location.
● Integrate a payment gateway (e.g., Stripe or PayPal) into a sample e-commerce
page.

<div id="map" style="width: 100%; height: 400px;"></div>
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
<script>
  function initMap() {
    const location = { lat: 40.7128, lng: -74.0060 }; // Example: New York
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: location,
    });
    new google.maps.Marker({ position: location, map: map });
  }
</script>
