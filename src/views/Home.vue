<template lang="pug">
div
  b-alert(v-if="$isAndroid" show)
    | #[b Note:] Reclaim Mobile is currently under development.

  div.container.mt-4
    h1.text-center Welcome to Reclaim
    h4.text-center AI-Assisted Digital Dependency Detection System

    p.text-center
      | Reclaim monitors digital activity, analyzes screen-time patterns,
      | detects digital dependency levels, and generates AI-powered monthly reports.

    hr

    div.row
      div.col-md-6
        h4 Activity Monitoring
        p
          | Track application usage, active hours, screen time,
          | and digital behavior patterns in real time.

      div.col-md-6
        h4 AI-Based Analysis
        p
          | Analyze activity data to identify excessive usage,
          | peak activity periods, and dependency indicators.

    hr

    div.row
      div.col-md-6
        h4 Monthly Behavioral Reports
        ul
          li Total screen time
          li Most used applications
          li Peak usage hours
          li Daily activity summaries
          li Monthly digital wellness score

      div.col-md-6
        h4 Personalized Recommendations
        ul
          li Reduce excessive screen time
          li Improve productivity habits
          li Optimize digital well-being
          li Healthy usage suggestions
          li Parent and guardian insights

    hr

    div.row
      div.col-md-12
        h4 Key Features
        ul
          li Activity and screen-time monitoring
          li Peak usage detection
          li Monthly report generation
          li Digital dependency scoring
          li AI-powered recommendations
          li Parent monitoring support

</template>

<script lang="ts">
export default {
  name: 'Home',
};
</script>