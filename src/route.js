import Vue from 'vue';
import VueRouter from 'vue-router';
const ReclaimReport = () => import('./views/ReclaimReport.vue');
const Home = () => import('./views/ReclaimHome.vue');
const ParentDashboard = () => import('./views/ParentDashboard.vue');
const AIInsights = () => import('./views/AIInsights.vue');
const LiveActivity = () => import('./views/LiveActivity.vue');
const MonthlyAnalysis = () => import('./views/MonthlyAnalysis.vue');
const ReclaimActivity = () => import('./views/ReclaimActivity.vue');
const ReclaimLanding = () => import('./views/ReclaimLanding.vue');

// Activity views for desktop
const Activity = () => import('./views/activity/Activity.vue');
const ActivityView = () => import('./views/activity/ActivityView.vue');

const Buckets = () => import('./views/Buckets.vue');
const Bucket = () => import('./views/Bucket.vue');
const QueryExplorer = () => import('./views/QueryExplorer.vue');
const Timeline = () => import('./views/Timeline.vue');
const Trends = () => import('./views/Trends.vue');
const Settings = () => import('./views/settings/Settings.vue');
const CategoryBuilder = () => import('./views/settings/CategoryBuilder.vue');
const Stopwatch = () => import('./views/Stopwatch.vue');
const WorkReport = () => import('./views/WorkReport.vue');
const Alerts = () => import('./views/Alerts.vue');
const Search = () => import('./views/Search.vue');
const Report = () => import('./views/Report.vue');

const TimespiralView = () => import('./views/TimespiralView.vue');
const Dev = () => import('./views/Dev.vue');
const Graph = () => import('./views/Graph.vue');
const NotFound = () => import('./views/NotFound.vue');

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: ReclaimLanding,
    },
    { path: '/home', component: Home },
    {
      path: '/activity/:host/:periodLength?/:date?',
      component: Activity,
      props: true,
      children: [
        {
          path: 'view/:view_id?',
          meta: { subview: 'view' },
          name: 'activity-view',
          component: ActivityView,
          props: true,
        },
        // Unspecified should redirect to summary view is the summary view
        // (needs to be last since otherwise it'll always match first)
        {
          path: '',
          redirect: 'view/',
        },
      ],
    },
    { path: '/buckets', component: Buckets },
    { path: '/buckets/:id', component: Bucket, props: true },
    { path: '/timeline', component: Timeline, meta: { fullContainer: true } },
    { path: '/trends', component: Trends, meta: { fullContainer: true } },
    { path: '/trends/:host', component: Trends, meta: { fullContainer: true } },
    { path: '/report', component: ReclaimReport },
    { path: '/parent-dashboard', component: ParentDashboard },
    { path: '/query', component: QueryExplorer },
    { path: '/ai-insights', component: AIInsights },  
    { path: '/monthly-analysis', component: MonthlyAnalysis },
    { path: '/live-activity', component: LiveActivity },
    { path: '/alerts', component: Alerts },
    { path: '/reclaim-activity', component: ReclaimActivity },
    { path: '/timespiral', component: TimespiralView },
    { path: '/settings', component: Settings },
    { path: '/settings/category-builder', component: CategoryBuilder },
    { path: '/stopwatch', component: Stopwatch },
    { path: '/work-report', component: WorkReport },
    { path: '/search', component: Search },
    { path: '/graph', component: Graph },
    { path: '/dev', component: Dev },
    // NOTE: Will break with Vue 3: https://stackoverflow.com/questions/40193634/vue-router-redirect-on-page-not-found-404/64186073#64186073
    {
      path: '*',
      component: NotFound,
    },
  ],
});

export default router;
