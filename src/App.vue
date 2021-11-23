<template>
  <div id="app">
    <google-map :markers="markers" />
    <side-bar :counters="counters" />
  </div>
</template>

<script>
import { SideBar, GoogleMap } from "@/components";

export default {
  name: "App",

  components: {
    SideBar,
    GoogleMap,
  },

  data() {
    return {
      counters: {
        today: {
          visits: 0,
          salvations: 0,
          discipleship: 0,
        },
        yesterday: {
          visits: 1,
          salvations: 1,
          discipleship: 1,
        },
        all: {
          visits: 2,
          salvations: 2,
          discipleship: 2,
        },
      },
      markers: [],
    };
  },

  mounted() {
    setTimeout(() => {
      // real time
      this.markers = [
        {
          visitorId: "",
          latitude: 40.712776,
          longitude: -74.005974,
          countryCode: "UA",
          country: "Ukraine",
          city: "Kiev",
          website: "www.example.com", // That recorded the stat
          timestamp: "2021-10-04 09:37:39",
          type: "visit", // visit, salvation or discipleship
          gospel: true, // gospel (newVisit, newSalvation and newDiscipleship marked as either true or false).
          updateCounters: {
            updateYTDCounters: 0,
            updateAllTimeCounters: 0,
            updateDiscipleshipCounters: 0,
          }, // (Visit, salvation or discipleship and number to be updated).
        },
      ];
    }, 1000);

    setTimeout(() => {
      // real time
      this.markers = [
        {
          visitorId: "",
          latitude: 50.4501,
          longitude: 50.4501,
          countryCode: "UA",
          country: "Ukraine",
          city: "Kiev",
          website: "www.example.com", // That recorded the stat
          timestamp: "2021-10-04 09:37:39",
          type: "salvation", // visit, salvation or discipleship
          gospel: true, // gospel (newVisit, newSalvation and newDiscipleship marked as either true or false).
          updateCounters: {
            updateYTDCounters: 0,
            updateAllTimeCounters: 0,
            updateDiscipleshipCounters: 0,
          }, // (Visit, salvation or discipleship and number to be updated).
        },
      ];
    }, 2000);

    setTimeout(() => {
      // real time
      this.markers = [
        {
          visitorId: "",
          latitude: 52.43022,
          longitude: 4.83958,
          countryCode: "UA",
          country: "Ukraine",
          city: "Kiev",
          website: "www.example.com", // That recorded the stat
          timestamp: "2021-10-04 09:37:39",
          type: "discipleship", // visit, salvation or discipleship
          gospel: true, // gospel (newVisit, newSalvation and newDiscipleship marked as either true or false).
          updateCounters: {
            updateYTDCounters: 0,
            updateAllTimeCounters: 0,
            updateDiscipleshipCounters: 0,
          }, // (Visit, salvation or discipleship and number to be updated).
        },
      ];
    }, 3000);
  },
};
</script>

<style>
@import "./main.scss";
</style>
