<template>
  <div class="container mt-4">
    <h1>AI Monthly Report</h1>
    <p>Generated from live Reclaim data.</p>

    <div class="row mt-4">
      <div class="col-md-4">
        <div class="card p-3">
          <h3>Total Screen Time</h3>
          <h1>{{ totalMinutes }} min</h1>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-3">
          <h3>Dependency Score</h3>
          <h1>{{ dependencyScore }}%</h1>
          <p>{{ riskLevel }}</p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-3">
          <h3>Peak Usage Hour</h3>
          <h1>{{ peakHour }}</h1>
        </div>
      </div>
    </div>

    <div class="card p-4 mt-4">
      <h3>Top Applications</h3>
      <ul>
        <li v-for="item in topApps" :key="item.app">
          {{ item.app }} - {{ item.minutes }} min
        </li>
      </ul>
    </div>

    <div class="card p-4 mt-4">
      <h3>AI Recommendations</h3>
      <ul>
        <li v-for="rec in recommendations" :key="rec">{{ rec }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReclaimReport",

  data() {
    return {
      topApps: [],
      totalMinutes: 0,
      dependencyScore: 0,
      riskLevel: "Analyzing...",
      peakHour: "Analyzing...",
      recommendations: []
    };
  },

  mounted() {
    fetch("http://localhost:5001/api/window-events")
      .then(res => res.json())
      .then(events => {
        const apps = {};
        const hours = {};
        let totalSeconds = 0;

        events.forEach(e => {
          const app = e.data?.app || "Unknown";
          const duration = e.duration || 0;

          apps[app] = (apps[app] || 0) + duration;
          totalSeconds += duration;

          const hour = new Date(e.timestamp).getHours();
          hours[hour] = (hours[hour] || 0) + duration;
        });

        this.totalMinutes = Math.round(totalSeconds / 60);

        this.topApps = Object.entries(apps)
          .map(([app, seconds]) => ({
            app,
            minutes: Math.round(seconds / 60)
          }))
          .sort((a, b) => b.minutes - a.minutes)
          .slice(0, 5);

        const peak = Object.entries(hours).sort((a, b) => b[1] - a[1])[0];
        this.peakHour = peak ? `${peak[0]}:00 - ${Number(peak[0]) + 1}:00` : "No data";

        this.dependencyScore = Math.min(100, Math.round(this.totalMinutes / 6));

        if (this.dependencyScore >= 70) {
          this.riskLevel = "High Risk";
        } else if (this.dependencyScore >= 40) {
          this.riskLevel = "Moderate Risk";
        } else {
          this.riskLevel = "Low Risk";
        }

        this.recommendations = [
          "Reduce usage during peak activity hours.",
          "Take short breaks after long screen sessions.",
          "Limit high-usage applications during study time.",
          "Use focus mode when working on academic tasks."
        ];
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>