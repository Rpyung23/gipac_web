<template>
  <div>
    <base-header class="pb-6">
  
      <!-- Card stats -->
      <div class="row" style="padding-top: 1rem;">
        <div class="col-xl-3 col-md-6">
          <stats-card title="Total traffic"
                      type="gradient-red"
                      sub-title="350,897"
                      icon="ni ni-active-40">

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card title="Total traffic"
                      type="gradient-orange"
                      sub-title="2,356"
                      icon="ni ni-chart-pie-35">

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card title="Sales"
                      type="gradient-green"
                      sub-title="924"
                      icon="ni ni-money-coins">

            <template slot="footer">
              <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card title="Performance"
                      type="gradient-info"
                      sub-title="49,65%"
                      icon="ni ni-chart-bar-32">

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">


      <!--Lists-->
      <div class="row">
        <div class="col-xl-4">
          <card>
            <h5 class="h3 mb-0" slot="header">Team members</h5>

            <user-list></user-list>
          </card>
        </div>

        <div class="col-xl-4">
          <card>
            <h5 class="h3 mb-0" slot="header">To do list</h5>

            <task-list></task-list>
          </card>
        </div>

        <div class="col-xl-4">
          <card>
            <h5 class="h3 mb-0" slot="header">Progress track</h5>

            <progress-track-list></progress-track-list>
          </card>
        </div>
      </div>
      <!--End lists-->

      <!--Widgets-->
      <div class="row">
        <div class="col-xl-5">
          <activity-feed></activity-feed>
        </div>
        <div class="col-xl-7">
          <light-table></light-table>
          <div class="card-deck">
            <card gradient="default" no-body="">
              <div class="card-body">
                <div class="mb-2">
                  <sup class="text-white">$</sup> <span class="h2 text-white">3,300</span>
                  <div class="text-light mt-2 text-sm">Your current balance</div>
                  <div>
                    <span class="text-success font-weight-600">+ 15%</span> <span class="text-light">($250)</span>
                  </div>
                </div>
                <button class="btn btn-sm btn-block btn-neutral">Add credit</button>
              </div>

              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <small class="text-light">Orders: 60%</small>
                    <base-progress :value="60"
                                   size="xs"
                                   progress-classes="my-2"
                                   type="success"/>
                  </div>
                  <div class="col">
                    <small class="text-light">Sales: 40%</small>
                    <base-progress :value="40"
                                   size="xs"
                                   progress-classes="my-2"
                                   type="warning"/>
                  </div>
                </div>
              </div>

            </card>

            <card gradient="danger">

              <div class="row justify-content-between align-items-center">
                <div class="col">
                  <img src="~/static/img/icons/cards/bitcoin.png" alt="Image placeholder">
                </div>
                <div class="col-auto">
                  <span class="badge badge-lg badge-success">Active</span>
                </div>
              </div>
              <div class="my-4">
                  <span class="h6 surtitle text-light">
                    Username
                  </span>
                <div class="h1 text-white">@johnsnow</div>
              </div>
              <div class="row">
                <div class="col">
                  <span class="h6 surtitle text-light">Name</span>
                  <span class="d-block h3 text-white">John Snow</span>
                </div>
              </div>

            </card>
          </div>
        </div>
      </div>
      <!--End Widgets-->

      <!--Tables-->
      <div class="row">
        <div class="col-xl-8">
          <page-visits-table></page-visits-table>
        </div>
        <div class="col-xl-4">
          <social-traffic-table></social-traffic-table>
        </div>
      </div>
      <!--End tables-->
    </div>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/argon-core/Charts/config';
  import LineChart from '@/components/argon-core/Charts/LineChart';
  import BarChart from '@/components/argon-core/Charts/BarChart';

  // Components
  import BaseProgress from '@/components/argon-core/BaseProgress';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import StatsCard from '@/components/argon-core/Cards/StatsCard';

  // Lists
  import ActivityFeed from '@/components/pages/dashboard/ActivityFeed.vue';
  import TaskList from '@/components/pages/dashboard/TaskList.vue';
  import UserList from '@/components/pages/dashboard/UserList.vue';
  import ProgressTrackList from '@/components/pages/dashboard/ProgressTrackList.vue';

  // Tables
  import LightTable from '@/components/pages/dashboard/LightTable.vue';
  import SocialTrafficTable from '@/components/pages/dashboard/SocialTrafficTable.vue';
  import PageVisitsTable from '@/components/pages/dashboard/PageVisitsTable.vue';

  export default {
    layout: 'DashboardLayout',
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
      ProgressTrackList
    },
    data() {
      return {
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Performance',
                data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
              }
            ],
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          }
        }
      };
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    mounted() {
      this.initBigChart(0);
    }
  };
</script>
<style>
body {
  overflow-y: scroll; /* Habilita la barra de desplazamiento vertical */
}
</style>
