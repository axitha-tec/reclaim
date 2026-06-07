<template>
  <div class="container mt-4">
    <h1>Live Activity Log</h1>

    <table class="table table-bordered mt-4">
      <thead>
        <tr>
          <th>App</th>
          <th>Window Title</th>
          <th>Duration</th>
          <th>Time</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.data.app }}</td>
          <td>{{ event.data.title }}</td>
          <td>{{ Math.round(event.duration) }} sec</td>
          <td>{{ new Date(event.timestamp).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "LiveActivity",

  data() {
    return {
      events: []
    };
  },

  mounted() {
    fetch("http://localhost:5001/api/window-events")
      .then(res => res.json())
      .then(data => {
        this.events = data.slice(0, 20);
      });
  }
};
</script>