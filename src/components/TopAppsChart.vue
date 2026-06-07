<template>
  <div style="max-width: 320px; margin: auto;">
    <Pie :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "TopAppsChart",

  components: {
    Pie
  },

  props: {
    apps: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    chartData() {
      return {
        labels: this.apps.map(app => app.app),
       datasets: [
  {
    label: "Usage",
    data: this.apps.map(app => app.minutes),

    backgroundColor: [
      "#2563EB",
      "#3B82F6",
      "#60A5FA",
      "#93C5FD",
      "#DBEAFE"
    ],

    borderColor: "#ffffff",
    borderWidth: 2,
    hoverOffset: 12
  }
]
      };
    },

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false
      };
    }
  }
};
</script>