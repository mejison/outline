<template>
  <div id="app">
    <div id="map" class="map"></div>
    <side-bar />
  </div>
</template>

<script>
import { SideBar } from "@/components";

export default {
  name: "App",
  components: {
    SideBar,
  },
};
</script>

<style>
@import "./main.scss";
</style>
