<template>
  <div class="container mt-4">
    <h1>AI Insights</h1>

    <div class="card p-4 mt-4">
      <h3>Behavior Analysis</h3>
      <p>{{ insight }}</p>
    </div>

    <div class="card p-4 mt-4">
      <h3>Recommendations</h3>
      <ul>
        <li v-for="item in recommendations" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      insight: "",
      recommendations: []
    };
  },

  mounted() {
    fetch("http://localhost:5001/api/window-events")
      .then(res => res.json())
      .then(events => {
        const totalHours =
          events.reduce((sum, e) => sum + (e.duration || 0), 0) / 3600;

        if (totalHours > 8) {
          this.insight =
            "High digital dependency patterns detected. Extended screen exposure observed.";
        } else if (totalHours > 4) {
          this.insight =
            "Moderate usage. Productivity and leisure usage appear balanced.";
        } else {
          this.insight =
            "Healthy digital habits detected.";
        }

        this.recommendations = [
          "Schedule 10-minute breaks every hour",
          "Reduce late-night screen exposure",
          "Enable focus sessions during study periods",
          "Track weekly usage trends"
        ];
      });
  }
};
</script>
