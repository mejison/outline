<template>
  <div id="app">
    <google-map :markers="markers" />
    <side-bar :counters="counters" />
  </div>
</template>

<script>
import { SideBar, GoogleMap } from "@/components";
import axios from "axios";

export default {
  name: "App",

  components: {
    SideBar,
    GoogleMap,
  },

  data() {
    return {
      apiUrl: `${location.protocol}//${location.hostname}:${process.env.VUE_APP_BACKEND_PORT}`,
      counters: {
        today: {
          visit: 0,
          salvation: 0,
          discipleship: 0,
        },
        yesterday: {
          visit: 0,
          salvation: 0,
          discipleship: 0,
        },
        all: {
          visits: 0,
          salvation: 0,
          discipleship: 0,
        },
      },
      markers: [],
      socket: null,
    };
  },

  mounted() {
    this.initSocket();
    this.getData();
  },

  methods: {
    getData() {
      axios.get(`${this.apiUrl}/api/v1/get`).then(({ data: { data } }) => {
        this.counters = { ...data };
      });
    },
    initSocket() {
      this.socket = window.io(
        `${location.protocol}//${location.hostname}:${process.env.VUE_APP_BACKEND_PORT}`
      );

      this.socket.on("add", (data) => {
        if (data) {
          const { updateCounters } = data;
          this.counters = { ...updateCounters };
          console.log(data);
          this.markers = [{ ...data }];
        }
      });
    },
  },
};
</script>

<style>
@import "./main.scss";
</style>
