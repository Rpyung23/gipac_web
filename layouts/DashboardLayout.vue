<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot-scope="props" slot="links">

        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-chart-bar-32 text-primary',
            path: oRol == 1 || oRol == null ? '/dashboard' : '/dashboard_usuario' 
          }">
        </sidebar-item>

        <sidebar-item
        v-if="oRol != 2 ? true : false"
          :link="{
            name: 'Usuarios',
            icon: 'ni ni-circle-08 text-green',
            path: '/usuario'
          }">
        </sidebar-item> 

        <sidebar-item
        v-if="oRol != 2 ? true : false"
          :link="{
            name: 'Departamento',
            icon: 'ni ni-shop text-danger',
            path: '/departamento'
          }">
        </sidebar-item> 


        <sidebar-item
        v-if="oRol != 2 ? true : false"
          :link="{
            name: 'Arrendamiento',
            icon: 'ni ni-paper-diploma text-default',
            path: '/arrendamiento'
          }">
        </sidebar-item> 

        <sidebar-item
        v-if="oRol != 2 ? true : false"
          :link="{
            name: 'Servicios',
            icon: 'ni ni-user-run text-warning',
            path: '/servicio_admin'
          }">
        </sidebar-item>

        <sidebar-item
        v-if="oRol != 2 ? true : false"
          :link="{
            name: 'Soporte',
            icon: 'ni ni-support-16 text-primary',
            path: '/soporte_admin'
          }">
        </sidebar-item> 


        <sidebar-item
        v-if="oRol != 2 ? true : false"
          :link="{
            name: 'Pagos',
            icon: 'ni ni-money-coins text-default',
            path: '/pago_admin'
          }">
        </sidebar-item> 

        <sidebar-item
        v-if="oRol != 2 ? true : false"
          :link="{
            name: 'Rubros',
            icon: 'ni ni-tag text-warning',
            path: '/pago_rubro'
          }">
        </sidebar-item> 


        <sidebar-item v-if="oRol != 2 ? true : false" translate="no" :link="{
          name: 'Reportes',
          icon: 'ni ni-ungroup text-orange',
        }">

          <sidebar-item :link="{ name: 'R. Residentes y departamentos asignados', path: '/reporte1' }" translate="no"/>
          <sidebar-item :link="{ name: 'R. Estado Deposito', path: '/reporte2' }" translate="no"/>
          <sidebar-item :link="{ name: 'R. Servicios', path: '/reporte_servicio' }" translate="no"/>
          <sidebar-item :link="{ name: 'R. Rubros', path: '/reporte_rubro' }" translate="no"/>
          
          
          
          
        </sidebar-item>








        <!--- USUARIO  NORMAL --->

        <sidebar-item
          v-if="oRol == 2 ? true : false"
          :link="{
            name: 'Servicios',
            icon: 'ni ni-user-run text-warning',
            path: '/servicio_usuario'
          }">
        </sidebar-item>

        <sidebar-item
        v-if="oRol == 2 ? true : false"
          :link="{
            name: 'Bancos',
            icon: 'ni ni-credit-card text-danger',
            path: '/bancos'
          }">
        </sidebar-item> 

        <sidebar-item
        v-if="oRol == 2 ? true : false"
          :link="{
            name: 'Soporte',
            icon: 'ni ni-support-16 text-primary',
            path: '/soporte_usuario'
          }">
        </sidebar-item> 

        
        <sidebar-item
        v-if="oRol == 2 ? true : false"
          :link="{
            name: 'Pagos',
            icon: 'ni ni-money-coins text-default',
            path: '/pago_usuario'
          }">
        </sidebar-item> 

        <sidebar-item
        v-if="oRol == 2 ? true : false"
          :link="{
            name: 'Rubros',
            icon: 'ni ni-tag text-warning',
            path: '/pago_rubro_usuario'
          }">
        </sidebar-item> 


      </template>


    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.name === 'alternative' ? 'light': 'default'"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <nuxt></nuxt>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
 import jwt_decode from "jwt-decode";

  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from '~/components/layouts/argon/DashboardNavbar.vue';
  import ContentFooter from '~/components/layouts/argon/ContentFooter.vue';
  import DashboardContent from '~/components/layouts/argon/Content.vue';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent
    },
    data() {
      return {
        oRol:null
      }
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('navbar-inner');
          initScrollbar('main-content');
          initScrollbar('sidenav');
        }
      }
    },
    mounted() {
      this.initScrollbar()
      var token = this.$cookies.get("token_gipac")
      this.oRol = jwt_decode(token).RolUsua
    }
  };
</script>
<style lang="scss">
</style>
