<template>
  <div class="reclaim-layout">
    <aside class="sidebar">
      <h2>RECLAIM</h2>
      <p>Digital Wellness</p>

      <button @click="$router.push('/home')">Home</button>
      <button @click="$router.push('/reclaim-activity')">Activity</button>
      <button @click="$router.push('/report')">AI Report</button>
      <button @click="$router.push('/ai-insights')">AI Insights</button>
      <button @click="$router.push('/parent-dashboard')">Parent Dashboard</button>
      <button @click="$router.push('/live-activity')">Live Activity</button>
    </aside>

    <main class="main-content">
      <section class="hero">
        <h1>Welcome to Reclaim</h1>
        <p>
          Reclaim is an AI-assisted digital dependency detection system that
          monitors screen activity, analyzes behavior, and generates wellness insights.
        </p>
      </section>

      <div class="cards">
        <div class="card-box">
          <h3>Screen Time</h3>
          <h1>{{ totalTime }}</h1>
          <p>Today’s usage</p>
        </div>

        <div class="card-box">
          <h3>Dependency Score</h3>
          <h1>{{ dependencyScore }}%</h1>
          <p>{{ riskLevel }}</p>
        </div>

        <div class="card-box">
          <h3>Peak Usage</h3>
          <h1>{{ peakHour }}</h1>
          <p>Highest activity period</p>
        </div>
      </div>

      <div class="panel">
        <h3>Top Applications</h3>
        <ul>
          <li v-for="app in topApps" :key="app.app">
            {{ app.app }} - {{ app.time }}
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "ReclaimHome",

  data() {
    return {
      totalTime: "0h 0m",
      dependencyScore: 0,
      riskLevel: "Analyzing...",
      peakHour: "Loading...",
      topApps: []
    };
  },

  methods: {
    formatTime(seconds) {
      const totalMins = Math.round(seconds / 60);
      const hrs = Math.floor(totalMins / 60);
      const mins = totalMins % 60;
      return `${hrs}h ${mins}m`;
    }
  },

  mounted() {
    fetch("http://localhost:5001/api/window-events")
      .then(res => res.json())
      .then(events => {
        const now = new Date();

const today =
  now.getFullYear() +
  "-" +
  String(now.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(now.getDate()).padStart(2, "0");

        const todaysEvents = events.filter(e => {
          const d = new Date(e.timestamp);

const eventDate =
  d.getFullYear() +
  "-" +
  String(d.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(d.getDate()).padStart(2, "0");
          return eventDate === today;
        });

        const apps = {};
        const usageHours = {};
        let totalSeconds = 0;

        todaysEvents.forEach(e => {
          const app = e.data && e.data.app ? e.data.app : "Unknown";
          const duration = e.duration || 0;

          totalSeconds += duration;
          apps[app] = (apps[app] || 0) + duration;

          const hour = new Date(e.timestamp).getHours();
          usageHours[hour] = (usageHours[hour] || 0) + duration;
        });

        this.totalTime = this.formatTime(totalSeconds);

        this.topApps = Object.entries(apps)
          .map(([app, seconds]) => {
            return {
              app,
              seconds,
              time: this.formatTime(seconds)
            };
          })
          .sort((a, b) => b.seconds - a.seconds)
          .slice(0, 5);

        const peak = Object.entries(usageHours)
          .sort((a, b) => b[1] - a[1])[0];

        this.peakHour = peak
          ? `${peak[0]}:00 - ${Number(peak[0]) + 1}:00`
          : "No Data";

        const totalMins = Math.round(totalSeconds / 60);
        this.dependencyScore = Math.min(100, Math.round(totalMins / 6));

        if (this.dependencyScore >= 70) {
          this.riskLevel = "High Risk";
        } else if (this.dependencyScore >= 40) {
          this.riskLevel = "Moderate Risk";
        } else {
          this.riskLevel = "Low Risk";
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style scoped>
.reclaim-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f7fb;
}

.sidebar {
  width: 260px;
  background: #0f172a;
  color: white;
  padding: 30px 22px;
}

.sidebar h2 {
  margin-bottom: 5px;
  font-weight: bold;
}

.sidebar p {
  color: #94a3b8;
  margin-bottom: 30px;
}

.sidebar button {
  display: block;
  width: 100%;
  background: transparent;
  color: white;
  border: none;
  text-align: left;
  padding: 14px 12px;
  margin-bottom: 8px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.sidebar button:hover {
  background: #1e293b;
}

.main-content {
  flex: 1;
  padding: 40px;
}

.hero {
  background: white;
  padding: 35px;
  border-radius: 18px;
  margin-bottom: 25px;
}

.hero h1 {
  font-size: 42px;
}

.hero p {
  font-size: 18px;
  color: #475569;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.card-box {
  background: white;
  padding: 25px;
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.card-box h1 {
  font-size: 38px;
}

.panel {
  background: white;
  padding: 30px;
  border-radius: 18px;
  margin-top: 25px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}
</style>