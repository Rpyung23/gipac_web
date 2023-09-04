<template>
  <div class="content">
    <base-header>
      <div class="align-items-center py-3">
        <card
          class="no-border-card col"
          style="margin-bottom: 0.5rem"
          body-classes="px-0 pb-1 card_top_input card_top_input_pago_admin"
          footer-classes="pb-2"
        >
          <div class="containerDiv">
            <div class="div_izquierda">
              <el-date-picker
                type="date"
                placeholder="FECHA INICIO"
                v-model="fechaInicioPagoAdmin"
                style="margin-right: 0.5rem"
              >
              </el-date-picker>

              <el-date-picker
                type="date"
                placeholder="FECHA FIN"
                v-model="fechaFinPagoAdmin"
                style="margin-right: 0.5rem"
              >
              </el-date-picker>

              <base-input
                placeholder="NUMERO RECIBO"
                class="input_recibo_pago_admin"
                style="margin-right: 0.5rem; width: 14rem"
              ></base-input>

              <el-select multiple collapse-tags placeholder="TIPO DEPARTAMENTO">
                <el-option
                  v-for="item in mListTipoDepartamento"
                  :key="item.id_tipo_departamento"
                  :label="item.detalle_tipo_departamento"
                  :value="item.id_tipo_departamento"
                >
                </el-option>
              </el-select>
            </div>
            <div class="div_derecha">
              <base-button
                size="sm"
                @click="readAllDepartamentos()"
                type="primary"
                ><span class="btn-inner--icon"
                  ><i class="el-icon-search"></i></span
              ></base-button>
            </div>
          </div>
        </card>

        <card
          class="no-border-card col"
          style="margin-bottom: 0.5rem"
          body-classes="px-0 pb-1"
          footer-classes="pb-2"
        >
          <el-table
            class="table-responsive table-flush"
            header-row-class-name="thead-light"
            :data="mListPagoAdmin"
            height="calc(100vh - 12.5rem)"
            style="width: 100%"
          >
            <el-table-column label="">
              <template slot-scope="scope">
                <base-button size="sm" type="default"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-single-copy-04"></i></span
                ></base-button>
              </template>
            </el-table-column>

            <el-table-column prop="estado" min-width="150">
              <template slot-scope="scope">
                <badge type="primary" v-if="scope.row.estado == 1 ? true : false" class="mr-2">EN ESPERA DE PAGO</badge>
                <badge type="warning" v-if="scope.row.estado == 2 ? true : false" class="mr-2">VERIFICAR RECIBO</badge>
              </template>
            </el-table-column>

            <el-table-column
              label="DEPARTAMENTO"
              prop="fk_code_departamento"
              min-width="170"
            >
            </el-table-column>

            <el-table-column label="MOTIVO" prop="motivo" min-width="250">
            </el-table-column>

            <el-table-column
              label="ARRENDATARIO"
              prop="nombre_usuario"
              min-width="180"
            >
            </el-table-column>

            <el-table-column
              label="TELEFONO"
              prop="telefono_usuario"
              min-width="150"
            >
            </el-table-column>

            <el-table-column
              label="PRECIO ($)"
              prop="precio_arriendo"
              min-width="150"
            >
            </el-table-column>

            <el-table-column
              label="NUM RECIBO"
              prop="code_referencia"
              min-width="150"
            >
            </el-table-column>
          </el-table>
        </card>
      </div>
    </base-header>
  </div>
</template>
<script>
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
  Select,
  Option,
  DatePicker,
} from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import LightTable from "~/components/tables/RegularTables/LightTable";
import { getFecha_dd_mm_yyyy } from "../util/fechas";

export default {
  layout: "DashboardLayout",
  components: {
    LightTable,
    RouteBreadCrumb,
    [Dropdown.name]: Dropdown,
    [Select.name]: Select,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [Option.name]: Option,
    [TableColumn.name]: TableColumn,
    [DatePicker.name]: DatePicker,
  },
  data() {
    return {
      mListTipoDepartamento: [],
      mListPagoAdmin: [],
      token: this.$cookies.get("token_gipac"),
      fechaInicioPagoAdmin: null,
      fechaFinPagoAdmin: null,
    };
  },
  methods: {
    initFechaActual() {
      var fecha = new Date();
      var mes = fecha.getMonth() + 1;
      var day = fecha.getDate();
      var hora =
        fecha.getHours() < 10 ? "0" + fecha.getHours() : fecha.getHours();
      var minutes =
        fecha.getMinutes() < 10 ? "0" + fecha.getMinutes() : fecha.getMinutes();
      var format =
        fecha.getFullYear() +
        "-" +
        (mes < 10 ? "0" + mes : mes) +
        "-" +
        (day < 10 ? "0" + day : day);
      console.log(format);
      this.fechaInicioPagoAdmin = format + " " + hora + ":" + minutes + ":00";
      this.fechaFinPagoAdmin = format + " " + hora + ":" + minutes + ":00";
    },
    readAllPagosAdmin() {
      const axios = require("axios");
      let data = JSON.stringify({
        token: this.token,
        fechaI: getFecha_dd_mm_yyyy(this.fechaInicioPagoAdmin),
        fechaF: getFecha_dd_mm_yyyy(this.fechaFinPagoAdmin),
        code_depa: "*",
        recibo: "*",
        tipo: "*",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/all_pagos_admin",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          this.mListPagoAdmin.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.initFechaActual();
    this.readAllPagosAdmin();
  },
};
</script>
<style>
.card-bodyRPagosVehiculoProduccion {
  padding: 0rem !important;
  height: calc(100vh - 11.5rem);
  overflow: none;
}

.containerDiv {
  display: flex;
}

.div_izquierda {
  flex: 1;
  display: flex;
  align-items: center;
}

.div_derecha {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.input_recibo_pago_admin .form-group {
  margin-bottom: 0rem;
}
</style>
