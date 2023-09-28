<template>
  <div>
    <base-header class="pb-6" style="height: 100vh;">
      <!-- Card stats -->
      <div class="row" style="padding-top: 1rem">
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Total Residentes"
            type="gradient-red"
            :sub-title="cont_clientes"
            icon="ni ni-circle-08"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Total Servicios"
            type="gradient-orange"
            :sub-title="cont_service"
            icon="ni ni-chart-pie-35"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Dep. Ocupados"
            type="gradient-green"
            :sub-title="cont_arrendados"
            icon="ni ni-paper-diploma"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Dep. Libres"
            type="gradient-info"
            :sub-title="cont_libres"
            icon="ni ni-shop"
          >
          </stats-card>
        </div>

        <div class="container_img">
          <img  srcset="../static/img/brand/dashboard-removebg-preview.png">
        </div>
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
    readPanelCard() {

      let data = JSON.stringify({
        token: this.token,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/panel_Admin",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          if (response.data.status_code == 200) 
          {
            //console.log(response.data)
            this.cont_clientes = response.data.datos[0].cont_clientes.toString()
            this.cont_service = response.data.datos[2].cont_service.toString()
            this.cont_arrendados = response.data.datos[1].cont_arrendados.toString()
            this.cont_libres = response.data.datos[1].cont_libres.toString()
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.readPanelCard()
  },
};
</script>

<style>
.container_img{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
