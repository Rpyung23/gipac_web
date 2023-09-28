<template>
  <div >
    <base-header class="pb-6" style="height: 100vh;background-color: white;">
      <!-- Card stats -->
      <div class="container_img_user">
          <img style="margin-top: -5rem;" srcset="../static/img/brand/dashboard-removebg-preview.png">
        </div>

    </base-header>

  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/argon-core/Charts/config";
import LineChart from "@/components/argon-core/Charts/LineChart";
import BarChart from "@/components/argon-core/Charts/BarChart";

// Components
import BaseProgress from "@/components/argon-core/BaseProgress";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/argon-core/Cards/StatsCard";

// Lists
import ActivityFeed from "@/components/pages/dashboard/ActivityFeed.vue";
import TaskList from "@/components/pages/dashboard/TaskList.vue";
import UserList from "@/components/pages/dashboard/UserList.vue";
import ProgressTrackList from "@/components/pages/dashboard/ProgressTrackList.vue";

// Tables
import LightTable from "@/components/pages/dashboard/LightTable.vue";
import SocialTrafficTable from "@/components/pages/dashboard/SocialTrafficTable.vue";
import PageVisitsTable from "@/components/pages/dashboard/PageVisitsTable.vue";

export default {
  layout: "DashboardLayout",
  components: {
    ActivityFeed,
    LineChart,
    BarChart,
    BaseProgress,
    RouteBreadCrumb,
    StatsCard,
    TaskList,
    PageVisitsTable,
    SocialTrafficTable,
    LightTable,
    UserList,
    ProgressTrackList,
  },
  data() {
    return {
      token: this.$cookies.get("token_gipac"),
      cont_clientes: "0",
      cont_service: "0",
      cont_arrendados: "0",
      cont_libres: "0",
    };
  },
  methods: {

  },
  mounted() {

  },
};
</script>

<style>
.container_img_user{
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 0rem;
  margin: 0rem;
  margin-left: -2rem;
  background-color: white;
  justify-content: center;
  align-items: center;
}
</style>
