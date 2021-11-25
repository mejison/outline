<template>
  <div class="sidebar">
    <div class="container">
      <div class="stat">
        <div class="period">
          <h2>In real time so far</h2>
          <switcher :options="states" v-model="currentState" />
        </div>
        <div class="visits">
          Gospel Visits
          <span class="value">{{
            numeral(counters[currentState].visit).format("0,000")
          }}</span>
        </div>
        <div class="salvations">
          Indicated Decisions
          <span class="value">{{
            numeral(counters[currentState].salvation).format("0,000")
          }}</span>
        </div>
        <div class="discipleship">
          Discipleship Activity
          <span class="value">{{
            numeral(counters[currentState].discipleship).format("0,000")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Switcher from "./Switcher";
import numeral from "numeral";

export default {
  name: "SideBar",

  props: ["counters"],

  components: {
    Switcher,
  },

  data() {
    return {
      numeral: numeral,
      states: [
        {
          label: "TODAY",
          value: "today",
        },
        {
          label: "YTD",
          value: "yesterday",
        },
        {
          label: "ALLTIME",
          value: "all",
        },
      ],
      currentState: "today",
    };
  },
};
</script>

<style lang="scss">
.sidebar {
  background-color: #181818;
  color: #fff;
  margin-top: auto;
  padding: 20px 0;

  .stat {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 25px;

    .period {
    }

    .visits,
    .salvations,
    .discipleship {
      display: flex;
      flex-direction: column;

      span {
        font-size: 2rem;
        font-weight: bold;
      }
    }

    .visits {
      color: #51a7f9;
    }

    .salvations {
      color: #ed882f;
    }

    .discipleship {
      color: #65ab44;
    }
  }
}
</style>
