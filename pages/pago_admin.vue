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
              <!--<el-date-picker
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
              </el-date-picker>-->

              <!--<base-input
                placeholder="NUMERO RECIBO"
                class="input_recibo_pago_admin"
                style="margin-right: 0.5rem; width: 14rem"
              ></base-input>-->

              <el-select
                style="margin-right: 0.5rem"
                multiple
                collapse-tags
                placeholder="DEPARTAMENTOS"
              >
                <el-option
                  v-for="item in mListDepartamento"
                  :key="item.code_departamento"
                  :label="item.code_departamento"
                  :value="item.code_departamento"
                >
                </el-option>
              </el-select>

              <el-select multiple collapse-tags placeholder="ESTADO PAGO">
                <el-option label="EN ESPERA DE PAGO" :value="1"> </el-option>
                <el-option
                  label="EN PROCESO DE VERIFICACION"
                  :value="2"
                ></el-option>
                <el-option
                  label="ERROR AL VERIFICAR COMPROBANTE"
                  :value="4"
                ></el-option>
              </el-select>
            </div>
            <div class="div_derecha">
              <base-button size="sm" @click="readAllPagosAdmin()" type="primary"
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
            <el-table-column label="" min-width="150">
              <template slot-scope="scope">
                <base-button
                  size="sm"
                  type="default"
                  @click="showModalDetallePAgoAdmin(scope.row)"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-single-copy-04"></i></span
                ></base-button>
              </template>
            </el-table-column>

            <el-table-column prop="estado" min-width="150">
              <template slot-scope="scope">
                <badge
                  type="primary"
                  v-if="scope.row.estado == 1 ? true : false"
                  class="mr-2"
                  >EN ESPERA DE PAGO</badge
                >
                <badge
                  type="warning"
                  v-if="scope.row.estado == 2 ? true : false"
                  class="mr-2"
                  >VERIFICAR RECIBO</badge
                >
                <badge
                  type="danger"
                  v-if="scope.row.estado == 4 ? true : false"
                  class="mr-2"
                  >ERROR RECIBO</badge
                >
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
              label="ALICUOTA ($)"
              prop="precio_arriendo"
              min-width="150"
            >
            </el-table-column>

          </el-table>
        </card>

        <modal
          :show.sync="ModalDetallePagoAdmin"
          modal-classes="modal-dialog-centered modal-lg"
        >
          <h5 slot="header" class="modal-title" id="modal-title-default">
            {{
              objSelectPago == null
                ? "S/N"
                : "DEPARTAMENTO " +
                  objSelectPago.fk_code_departamento +
                  " (" +
                  objSelectPago.precio_arriendo +
                  " $)"
            }}
          </h5>

          <form>
            <div class="row">
              <div class="col-md-3">
                <a target="_blank" :href="oFotoRecibo">
                  <img
                    class="img_recibo"
                    :src="oFotoRecibo"
                    style="
                      width: 100%;
                      height: calc(100vh - 25rem);
                      object-fit: cover;
                    "
                  />
                </a>
              </div>

              <div class="col-md-9">
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      disabled
                      v-model="nameUsuario"
                      placeholder="ARRENDATARIO"
                    ></base-input>
                  </div>
                  <div class="col-md-6">
                    <base-input
                      disabled
                      v-model="telUsuario"
                      placeholder="TELEFONO ARRENDATARIO"
                    ></base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      disabled
                      v-model="bancoUsuario"
                      placeholder="DETALLE BANCO EMISOR"
                    ></base-input>
                  </div>

                  <div class="col-md-12">
                    <textarea
                      v-model="detalleDeposito"
                      class="form-control"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <template slot="footer">
            <base-button
              type="danger"
              class="ml-auto"
              @click="updateEstadoRecibo(4)"
              >COMPROBANTE NO VALIDO
            </base-button>
            <base-button type="default" @click="updateEstadoRecibo(3)" >AUTORIZAR PAGO</base-button>
          </template>
        </modal>
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
  Notification
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
    [Notification.name]: Notification
  },
  data() {
    return {
      mListTipoDepartamento: [],
      mListPagoAdmin: [],
      token: this.$cookies.get("token_gipac"),
      fechaInicioPagoAdmin: null,
      fechaFinPagoAdmin: null,
      ModalDetallePagoAdmin: false,

      NumeroRecibo: null,
      Departamento: [],
      EstadoPago: null,
      objSelectPago: null,

      nameUsuario: null,
      telUsuario: null,
      bancoUsuario: null,
      detalleDeposito: null,
      oFotoRecibo:
        "https://firebasestorage.googleapis.com/v0/b/gipac-d45bf.appspot.com/o/recibos%2Fsin_Foto.jpg?alt=media",
        mListDepartamento:[]
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
      this.mListPagoAdmin = [];

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

      this.$axios
        .request(config)
        .then((response) => {
          this.mListPagoAdmin.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showModalDetallePAgoAdmin(item) {
      this.objSelectPago = item;
      this.nameUsuario = item.nombre_usuario;
      this.telUsuario = item.telefono_usuario;
      this.bancoUsuario = item.BancoEmisor;
      this.detalleDeposito = item.detalle_comprobante;
      this.ModalDetallePagoAdmin = true;
      if(item.foto_url_deposito != null){
        this.oFotoRecibo = item.foto_url_deposito
      }
    },
    async updateEstadoRecibo(estado_) 
    {
      if(this.detalleDeposito == null)
      {
        Notification({
            title: "PAGO ARRIENDO",
            message: "PORFAVOR INGRESE ALGUNA OBSERVACION DEL DEPOSITO",
            type: "danger",
          })

          return
      }
      try {
        var response = await this.$axios.put(
          process.env.baseUrl + "/update_pagos_admin",
          {
            token: this.token,
            pago_arrendamiento: this.objSelectPago.id_pago_departamento,
            estado : estado_,
            detalle: this.detalleDeposito
          }
        );

        if (response.data.status_code == 200) 
        {
          this.readAllPagosAdmin()
          this.ModalDetallePagoAdmin = false

          Notification({
            title: "PAGO ARRIENDO",
            message: "RECIBO/ PAGO ACTUALIZADO CON EXITO",
            type: "success",
          });
        } else {
          Notification({
            title: "PAGO ARRIENDO",
            message: response.data.msm,
            type: "danger",
          })
        }
      } catch (error) {
        Notification({
            title: "PAGO ARRIENDO",
            message: error.toString(),
            type: "danger",
          })
      }
    },
    async readAllDepartamentoOcupados() {
      this.mListDepartamento = [];

      let data = JSON.stringify({
        token: this.token,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/read_departamento_ocupados",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListDepartamento.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.readAllDepartamentoOcupados()
    this.initFechaActual()
    this.readAllPagosAdmin()
  },
};
</script>
<style>
/*.img_recibo:hover {
  position: absolute; 
  top: 50%; 
  left: 50%;
  transform-origin: center center; 
  transform: translate(-50%, -50%) scale(1.2); 
  z-index: 99999999999; 

  transform: scale(3.2);
}

.img_recibo:not(:hover) {
  transform: scale(1); 
}*/

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
