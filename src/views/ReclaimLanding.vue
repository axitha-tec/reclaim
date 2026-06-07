<template>
  <div class="landing-page">
    <div class="landing-card">

      <h1>RECLAIM</h1>

      <h3>
        AI-Assisted Digital Dependency Detection & Wellness Platform
      </h3>

      <p>
        Monitor digital activity, analyze screen-time behavior,
        detect dependency patterns, and improve digital well-being.
      </p>

      <div class="features">
  <span>Activity Tracking</span>
  <span>AI Insights</span>
  <span>Parental Controls</span>
</div>

      <button @click="$router.push('/home')">
        Enter Reclaim
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReclaimLanding"
};
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.landing-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  width: 720px;
  max-width: 90%;
  padding: 55px;
  border-radius: 28px;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
}

.logo-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  font-size: 42px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 22px;
}

h1 {
  font-size: 52px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: 3px;
  margin-bottom: 10px;
}

h3 {
  color: #1e293b;
  margin-bottom: 18px;
}

p {
  color: #475569;
  font-size: 18px;
  line-height: 1.6;
}

.features {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin: 28px 0;
}

.features span {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 600;
}

button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 14px 34px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
   transition: 0.3s;
}

button:hover {
 background: #1e293b;
}
</style>