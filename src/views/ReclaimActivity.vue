
import TopAppsChart from "../components/TopAppsChart.vue";
<template>
  <div class="container mt-4">
    <h1>Activity Dashboard</h1>

    <div class="card p-3 mt-3">
      <label><b>Select Date</b></label>
      <input
        type="date"
        class="form-control"
        v-model="selectedDate"
        @change="loadActivity"
      />
    </div>

    <h5 class="mt-4">
      Host: DESKTOP-FM6JR2N &nbsp; Time active: {{ totalTime }}
    </h5>

    <div class="alert alert-info mt-4">
      <b>Digital behavior summary</b><br />
      You have {{ totalTime }} of recorded activity on {{ selectedDate }}.
      Reclaim detected {{ topApps.length }} active applications.
    </div>

    <div class="row mt-4">
      <div class="col-md-4">
        <h3>Top Applications</h3>
        <div class="card p-3 mb-3">
  <TopAppsChart :apps="topApps" />
</div>

        <div
          v-for="app in topApps"
          :key="app.app"
          class="app-box"
        >
          <b>{{ app.app }}</b><br />
          {{ app.time }}
        </div>
      </div>

      <div class="col-md-4">
        <h3>Top Window Titles</h3>

        <div
          v-for="title in topTitles"
          :key="title.title"
          class="title-box"
        >
          <b>{{ title.title }}</b><br />
          {{ title.time }}
        </div>
      </div>

      <div class="col-md-4">
        <h3>Timeline Preview</h3>

        <div
          v-for="hour in hourlyUsage"
          :key="hour.hour"
          class="timeline-row"
        >
          <span>{{ hour.hour }}:00</span>

          <div class="bar">
            <div
              class="bar-fill"
              :style="{ width: hour.percent + '%' }"
            ></div>
          </div>

          <span>{{ hour.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopAppsChart from "../components/TopAppsChart.vue";
export default {
  name: "ReclaimActivity",
  components: {
  TopAppsChart
},

  data() {
    return {
      selectedDate: new Date().toISOString().slice(0, 10),
      topApps: [],
      topTitles: [],
      hourlyUsage: [],
      totalTime: "0h 0m"
    };
  },

  mounted() {
    this.loadActivity();
  },

  methods: {
    formatTime(seconds) {
      const totalMins = Math.round(seconds / 60);
      const hrs = Math.floor(totalMins / 60);
      const mins = totalMins % 60;
      return `${hrs}h ${mins}m`;
    },

    loadActivity() {
      fetch(`http://localhost:5001/api/window-events?date=${this.selectedDate}`)
        .then(res => res.json())
        .then(events => {
          const apps = {};
          const titles = {};
          const hours = {};
          let totalSeconds = 0;

          events.forEach(e => {
            const app = e.data?.app || "Unknown";
            const title = e.data?.title || "Untitled";
            const duration = e.duration || 0;
            const hour = new Date(e.timestamp).getHours();

            totalSeconds += duration;
            apps[app] = (apps[app] || 0) + duration;
            titles[title] = (titles[title] || 0) + duration;
            hours[hour] = (hours[hour] || 0) + duration;
          });

          this.totalTime = this.formatTime(totalSeconds);

          this.topApps = Object.entries(apps)
  .map(([app, seconds]) => ({
    app,
    seconds,
    minutes: Math.round(seconds / 60),
    time: this.formatTime(seconds)
  }))
            .sort((a, b) => b.seconds - a.seconds)
            .slice(0, 5);

          this.topTitles = Object.entries(titles)
            .map(([title, seconds]) => ({
              title,
              seconds,
              time: this.formatTime(seconds)
            }))
            .sort((a, b) => b.seconds - a.seconds)
            .slice(0, 5);

          const maxSeconds = Math.max(...Object.values(hours), 1);

          this.hourlyUsage = Object.entries(hours)
            .map(([hour, seconds]) => ({
              hour,
              seconds,
              time: this.formatTime(seconds),
              percent: Math.round((seconds / maxSeconds) * 100)
            }))
            .sort((a, b) => Number(a.hour) - Number(b.hour));
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
.app-box,
.title-box {
  background: #d1d5db;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
}

.title-box {
  background: #86efac;
}

.timeline-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.bar {
  flex: 1;
  background: #e5e7eb;
  height: 18px;
  border-radius: 8px;
}

.bar-fill {
  height: 18px;
  background: #22c55e;
  border-radius: 8px;
}
</style>