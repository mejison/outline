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
          <span class="value">{{ counters[currentState].visits }}</span>
        </div>
        <div class="salvations">
          Indicated Decisions
          <span class="value">{{ counters[currentState].salvations }}</span>
        </div>
        <div class="discipleship">
          Discipleship Activity
          <span class="value">{{ counters[currentState].discipleship }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Switcher from "./Switcher";

export default {
  name: "SideBar",

  props: ["counters"],

  components: {
    Switcher,
  },

  data() {
    return {
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
