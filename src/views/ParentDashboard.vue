<template>
  <div class="container mt-4">
    <h1>Guardian Monitoring Portal</h1>

    <div class="row mt-4">
      <div class="col-md-4">
        <div class="card p-4">
          <h3>Today's Usage</h3>
          <h1>{{ totalTime }}</h1>
          <p>{{ limitStatus }}</p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-4">
          <h3>Daily Limit</h3>
          <input type="number" class="form-control" v-model="dailyLimit" />
          <button class="btn btn-primary mt-3" @click="saveLimit">
            Save Limit
          </button>
          <p class="mt-2">{{ dailyLimit }} hours/day</p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-4">
          <h3>Risk Score</h3>
          <h1>{{ dependencyScore }}%</h1>
          <p>{{ riskLevel }}</p>
        </div>
      </div>
    </div>

    <div class="card p-4 mt-4">
      <h3>Restricted Apps</h3>

      <div class="input-group">
        <input
          class="form-control"
          v-model="newBlockedApp"
          placeholder="Example: chrome.exe"
        />
        <button class="btn btn-danger" @click="addBlockedApp">
          Add
        </button>
      </div>

      <ul class="mt-3">
        <li v-for="app in blockedApps" :key="app">
          {{ app }}
          <button class="btn btn-sm btn-outline-danger ml-2" @click="removeBlockedApp(app)">
            Remove
          </button>
        </li>
      </ul>
    </div>

    <div class="card p-4 mt-4">
      <h3>Alerts</h3>

      <div v-if="alerts.length === 0" class="alert alert-success">
        No parental alerts detected.
      </div>

      <div
        v-for="alert in alerts"
        :key="alert"
        class="alert alert-warning"
      >
        {{ alert }}
      </div>
    </div>

    <div class="card p-4 mt-4">
      <h3>Parent Recommendations</h3>
      <ul>
        <li>Set daily screen-time goals.</li>
        <li>Monitor high-usage applications.</li>
        <li>Encourage breaks during long sessions.</li>
        <li>Review usage patterns during night hours.</li>
      </ul>
    </div>

    <button class="btn btn-primary mt-4" @click="$router.push('/home')">
      Back to Dashboard
    </button>
  </div>
</template>

<script>
export default {
  name: "ParentDashboard",

  data() {
    return {
      totalMinutes: 0,
      totalTime: "0h 0m",
      dependencyScore: 0,
      riskLevel: "Analyzing...",
      dailyLimit: 4,
      limitStatus: "Checking...",
      newBlockedApp: "",
      blockedApps: [],
      alerts: []
    };
  },

  mounted() {
    const savedLimit = localStorage.getItem("reclaim_daily_limit");
    const savedApps = localStorage.getItem("reclaim_blocked_apps");

    if (savedLimit) {
      this.dailyLimit = Number(savedLimit);
    }

    if (savedApps) {
      this.blockedApps = JSON.parse(savedApps);
    }

    this.loadActivity();
  },

  methods: {
    formatTime(minutes) {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hrs}h ${mins}m`;
    },

    saveLimit() {
      localStorage.setItem("reclaim_daily_limit", this.dailyLimit);
      this.evaluateAlerts();
    },

    addBlockedApp() {
      if (!this.newBlockedApp.trim()) return;

      this.blockedApps.push(this.newBlockedApp.trim());
      localStorage.setItem("reclaim_blocked_apps", JSON.stringify(this.blockedApps));

      this.newBlockedApp = "";
      this.evaluateAlerts();
    },

    removeBlockedApp(app) {
      this.blockedApps = this.blockedApps.filter(item => item !== app);
      localStorage.setItem("reclaim_blocked_apps", JSON.stringify(this.blockedApps));
      this.evaluateAlerts();
    },

    loadActivity() {
      fetch("http://localhost:5001/api/window-events")
        .then(res => res.json())
        .then(events => {
          let totalSeconds = 0;
          const usedApps = {};

          events.forEach(e => {
            const app = e.data?.app || "Unknown";
            const duration = e.duration || 0;

            totalSeconds += duration;
            usedApps[app] = (usedApps[app] || 0) + duration;
          });

          this.totalMinutes = Math.round(totalSeconds / 60);
          this.totalTime = this.formatTime(this.totalMinutes);

          this.dependencyScore = Math.min(100, Math.round(this.totalMinutes / 6));

          if (this.dependencyScore >= 70) this.riskLevel = "High Risk";
          else if (this.dependencyScore >= 40) this.riskLevel = "Moderate Risk";
          else this.riskLevel = "Low Risk";

          this.usedApps = usedApps;
          this.evaluateAlerts();
        });
    },

    evaluateAlerts() {
      this.alerts = [];

      if (this.totalMinutes > this.dailyLimit * 60) {
        this.limitStatus = "Daily limit exceeded";
        this.alerts.push("Daily screen-time limit exceeded.");
      } else {
        this.limitStatus = "Usage within daily limit";
      }

      this.blockedApps.forEach(blocked => {
        Object.keys(this.usedApps || {}).forEach(app => {
          if (app.toLowerCase().includes(blocked.toLowerCase())) {
            this.alerts.push(`Restricted app detected: ${app}`);
          }
        });
      });
    }
  }
};
</script>