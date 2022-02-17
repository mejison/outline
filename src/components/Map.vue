<template>
  <div class="map">
    <div class="google-map" ref="googleMap"></div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "Map",

  props: ["markers"],

  data() {
    return {
      google: null,
      map: null,
      apiKey: "AIzaSyB0MA1eideexmAUX4ZivDjonU-ba4_iAbk",
      mapConfig: {
        zoom: Math.ceil(Math.log2(window.outerWidth)) - 9,
        disableDefaultUI: true,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [
              {
                saturation: 36,
              },
              {
                color: "#000000",
              },
              {
                lightness: 40,
              },
            ],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#000000",
              },
              {
                lightness: 16,
              },
            ],
          },
          {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 17,
              },
              {
                weight: 1.2,
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.country",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "administrative.country",
            elementType: "geometry",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "administrative.country",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.locality",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
              {
                saturation: "-100",
              },
              {
                lightness: "30",
              },
            ],
          },
          {
            featureType: "administrative.neighborhood",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
              {
                gamma: "0.00",
              },
              {
                lightness: "74",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "all",
            stylers: [
              {
                lightness: "3",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 21,
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 17,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 29,
              },
              {
                weight: 0.2,
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 18,
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 16,
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 19,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000",
              },
              {
                lightness: 17,
              },
            ],
          },
        ],
      },
    };
  },

  async mounted() {
    this.initializeMap();
    setTimeout(() => {}, 2000);
  },

  watch: {
    markers() {
      this.markers.forEach((marker) => {
        this.drawMarker(marker);
      });
    },
  },

  methods: {
    initializeMap() {
      const loader = new Loader({
        apiKey: this.apiKey,
        version: "weekly",
        libraries: ["places"],
        language: "en",
      });

      loader
        .load()
        .then((google) => {
          this.google = google;
          this.map = new google.maps.Map(this.$refs.googleMap, {
            ...this.mapConfig,
            center: new google.maps.LatLng(0, 0),
          });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    drawMarker(marker) {
      const image = new this.google.maps.MarkerImage(
        "",
        null,
        null,
        new this.google.maps.Point(8, 8),
        new this.google.maps.Size(17, 17)
      );

      const newMarker = new this.google.maps.Marker({
        flat: true,
        icon: image,
        map: this.map,
        optimized: false,
        position: { lat: marker.latitude * 1, lng: marker.longitude * 1 },
        title: marker.type,
        visible: true,
      });

      setTimeout(() => {
        newMarker.setMap(null);
      }, 1500);
    },
  },
};
</script>

<style lang="scss">
.map,
.google-map {
  height: 100%;
  width: 100%;
  // width: 500px;
  // height: 500px;
}

@-moz-keyframes pulsate {
  from {
    -moz-transform: scale(0.25);
    opacity: 1;
  }
  95% {
    -moz-transform: scale(1.3);
    opacity: 0;
  }
  to {
    -moz-transform: scale(0.3);
    opacity: 0;
  }
}

@-webkit-keyframes pulsate {
  from {
    -webkit-transform: scale(0.25);
    opacity: 1;
  }
  95% {
    -webkit-transform: scale(1.3);
    opacity: 0;
  }
  to {
    -webkit-transform: scale(0.3);
    opacity: 0;
  }
}

.google-map div[title="visit"],
.google-map div[title="salvation"],
.google-map div[title="discipleship"] {
  -moz-animation: pulsate 1.5s ease-in-out infinite;
  -webkit-animation: pulsate 1.5s ease-in-out infinite;
  border: 1pt solid #fff;
  -moz-border-radius: 51px;
  -webkit-border-radius: 51px;
  border-radius: 51px;
  height: 51px !important;
  margin: -18px 0 0 -18px;
  width: 51px !important;
}

.google-map div[title="visit"] {
  -moz-box-shadow: inset 0 0 5px #51a7f9, inset 0 0 5px #51a7f9,
    inset 0 0 5px #51a7f9, 0 0 5px #51a7f9, 0 0 5px #51a7f9, 0 0 5px #51a7f9;
  -webkit-box-shadow: inset 0 0 5px #51a7f9, inset 0 0 5px #51a7f9,
    inset 0 0 5px #51a7f9, 0 0 5px #51a7f9, 0 0 5px #51a7f9, 0 0 5px #51a7f9;
  box-shadow: inset 0 0 5px #51a7f9, inset 0 0 5px #51a7f9,
    inset 0 0 5px #51a7f9, 0 0 5px #51a7f9, 0 0 5px #51a7f9, 0 0 5px #51a7f9;
}

.google-map div[title="salvation"] {
  -moz-box-shadow: inset 0 0 5px #ed882f, inset 0 0 5px #ed882f,
    inset 0 0 5px #ed882f, 0 0 5px #ed882f, 0 0 5px #ed882f, 0 0 5px #ed882f;
  -webkit-box-shadow: inset 0 0 5px #ed882f, inset 0 0 5px #ed882f,
    inset 0 0 5px #ed882f, 0 0 5px #ed882f, 0 0 5px #ed882f, 0 0 5px #ed882f;
  box-shadow: inset 0 0 5px #ed882f, inset 0 0 5px #ed882f,
    inset 0 0 5px #ed882f, 0 0 5px #ed882f, 0 0 5px #ed882f, 0 0 5px #ed882f;
}

.google-map div[title="discipleship"] {
  -moz-box-shadow: inset 0 0 5px #65ab44, inset 0 0 5px #65ab44,
    inset 0 0 5px #65ab44, 0 0 5px #65ab44, 0 0 5px #65ab44, 0 0 5px #65ab44;
  -webkit-box-shadow: inset 0 0 5px #65ab44, inset 0 0 5px #65ab44,
    inset 0 0 5px #65ab44, 0 0 5px #65ab44, 0 0 5px #65ab44, 0 0 5px #65ab44;
  box-shadow: inset 0 0 5px #65ab44, inset 0 0 5px #65ab44,
    inset 0 0 5px #65ab44, 0 0 5px #65ab44, 0 0 5px #65ab44, 0 0 5px #65ab44;
}

.google-map div[title="visit"] img,
.google-map div[title="salvation"] img,
.google-map div[title="discipleship"] img {
  display: none;
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (device-width: 768px) {
  .google-map div.gmnoprint[title="visit"],
  .google-map div.gmnoprint[title="salvation"],
  .google-map div.gmnoprint[title="discipleship"] {
    margin: -10px 0 0 -10px;
  }
}
</style>
