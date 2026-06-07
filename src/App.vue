<template>
  <div>
    <nav style="padding: 18px; background: #0f172a; color: white;">
      <h2 style="margin: 0;">Reclaim</h2>
      <p style="margin: 0;">AI-Assisted Digital Dependency Detection System</p>
    </nav>

    <main style="padding: 25px;">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>