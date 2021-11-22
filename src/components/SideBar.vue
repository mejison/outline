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
      counters: {
        today: {
          visits: 0,
          salvations: 0,
          discipleship: 0,
        },
        yesterday: {
          visits: 0,
          salvations: 0,
          discipleship: 0,
        },
        all: {
          visits: 0,
          salvations: 0,
          discipleship: 0,
        },
      },
      data: [
        {
          visitorId: "",
          latitude: 50.4501,
          longitude: 50.4501,
          countryCode: "UA",
          country: "Ukraine",
          city: "Kiev",
          website: "www.example.com", // That recorded the stat
          timestamp: "2021-10-04 09:37:39",
          type: "visit",
          gospel: true, // gospel (newVisit, newSalvation and newDiscipleship marked as either true or false).
          updateCounters: {
            updateYTDCounters: 0,
            updateAllTimeCounters: 0,
            updateDiscipleshipCounters: 0,
          }, // (Visit, salvation or discipleship and number to be updated).
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.sidebar {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  margin-top: auto;
  padding: 50px 0;

  .stat {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 25px;

    .period {
    }

    .visits,
    .salvations,
    .discipleship {
      display: flex;
      flex-direction: column;
    }

    .visits {
    }

    .salvations {
    }

    .discipleship {
    }
  }
}
</style>
