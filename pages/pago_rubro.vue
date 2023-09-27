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
              <!--<el-select
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
              </el-select>-->
            </div>
            <div class="div_derecha">
              <base-button
                size="sm"
                @click="readAllPagosRubroAdmin()"
                type="primary"
                ><span class="btn-inner--icon"
                  ><i class="el-icon-search"></i></span
              ></base-button>
              <base-button size="sm" @click="showAddNuevoRubro()" type="default"
                ><span class="btn-inner--icon"
                  ><i class="ni ni-fat-add"></i>AGREGAR RUBRO</span
                ></base-button
              >
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
            :data="mListPagoRubroAdmin"
            height="calc(100vh - 11.5rem)"
            style="width: 100%"
          >

            <el-table-column prop="estado" min-width="170">
              <template slot-scope="scope">
                <base-button
                  size="sm"
                  type="default"
                  v-if="scope.row.estado == 2 ? true : false"
                  @click="showModalDetallePAgoAdmin(scope.row)"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-single-copy-04"></i></span
                ></base-button>

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
                  type="warning"
                  v-if="scope.row.estado == 4 ? true : false"
                  class="mr-2"
                  >ERROR DE RECIBO</badge
                >
              </template>
            </el-table-column>

            <el-table-column
              label="DEPARTAMENTO"
              prop="fk_code_departamento"
              min-width="150"
            >
            </el-table-column>

            <el-table-column
              label="F. Asignación"
              prop="fechaAsignacion"
              min-width="180"
            >
            </el-table-column>

            <el-table-column
              label="ARRENDATARIO"
              prop="nombre_usuario"
              min-width="180"
            >
            </el-table-column>

            <el-table-column label="RUBRO" prop="detalle_rubro" min-width="150">
            </el-table-column>

            <el-table-column label="ALICUOTA ($)" min-width="150">
              <template slot-scope="scope">
                <strong>{{ scope.row.precio_rubro }}</strong>
              </template>
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
                  objSelectPago.precio_rubro +
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
                      v-model="FUsuario"
                      placeholder="F. ASIGNACION "
                    ></base-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      disabled
                      v-model="detalleRubro"
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
              @click="updatePagoRubro(4)"
              >COMPROBANTE NO VALIDO
            </base-button>
            <base-button type="default" @click="updatePagoRubro(3)"
              >AUTORIZAR PAGO</base-button
            >
          </template>
        </modal>

        <modal
          :show.sync="oMdalAddRubro"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm"
        >
          <h6 slot="header" class="modal-title">NUEVO RUBRO</h6>

          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mb-0"
          >
            <el-select
              style="width: 100%"
              collapse-tags
              v-model="mSelectRubroNuevo"
              placeholder="TIPO  DE RUBRO"
            >
              <el-option
                v-for="item in mListTipoRubro"
                :key="item.id_rubro"
                :label="'(' + item.precio_rubro + ') ' + item.detalle_rubro"
                :value="item.id_rubro"
              >
              </el-option>
            </el-select>

            <el-select
              style="width: 100%; margin-top: 1rem"
              collapse-tags
              placeholder="DEPARTAMENTOS"
              v-model="mSelectDepartamentoNuevo"
            >
              <el-option
                v-for="item in mListDepartamento"
                :key="item.code_departamento"
                :label="item.code_departamento"
                :value="item.code_departamento"
              >
              </el-option>
            </el-select>

            <textarea
              style="margin-top: 1rem"
              v-model="txtMotivo"
              class="form-control"
              placeholder="MOTIVO"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </card>

          <template slot="footer">
            <base-button type="default" @click="insertNuevoRubroDepartamento()"
              >AUTORIZAR RUBRO</base-button
            >
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
  Notification,
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
    [Notification.name]: Notification,
  },
  data() {
    return {
      mListTipoDepartamento: [],
      mListPagoRubroAdmin: [],
      token: this.$cookies.get("token_gipac"),
      ModalDetallePagoAdmin: false,
      detalleRubro: null,
      nameUsuario: null,
      FUsuario: null,
      oFotoRecibo:
        "https://firebasestorage.googleapis.com/v0/b/gipac-d45bf.appspot.com/o/recibos%2Fsin_Foto.jpg?alt=media",
      mListDepartamento: [],
      objSelectPago: null,
      oMdalAddRubro: false,
      mListTipoRubro: [],

      mSelectRubroNuevo: null,
      mSelectDepartamentoNuevo: null,
      txtMotivo: null,
    };
  },
  methods: {
    showAddNuevoRubro() {
      this.oMdalAddRubro = true;
    },
    readAllPagosRubroAdmin() {
      this.mListPagoRubroAdmin = [];

      let data = JSON.stringify({
        token: this.token,
        departamento: "*",
        estado: "*",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/PagoRubroAdmin",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListPagoRubroAdmin.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showModalDetallePAgoAdmin(item) {
      this.objSelectPago = item;
      this.nameUsuario = item.nombre_usuario;
      this.FUsuario = item.fechaAsignacion;
      this.detalleRubro = item.detalle_rubro;
      this.detalleDeposito = item.detalle_comprobante;
      this.ModalDetallePagoAdmin = true;
      if (item.foto_recibo != null) {
        this.oFotoRecibo = item.foto_recibo;
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
    async updatePagoRubro(estado_) {
      try {
        var response = await this.$axios.put(
          process.env.baseUrl + "/updatePagoRubro",
          {
            token: this.token,
            estado: estado_,
            id_pago: this.objSelectPago.id_pago_rubro,
            detalle: this.detalleDeposito,
          }
        );

        if (response.data.status_code == 200) {
          this.ModalDetallePagoAdmin = false;
          this.readAllPagosRubroAdmin();
        } else {
          this.$notify({
            message: "ERROR AL ACTUALIZAR COMPROBANTE",
            timeout: 2000,
            icon: "ni ni-bell-55",
            type: "warning",
          });
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 2000,
          icon: "ni ni-bell-55",
          type: "warning",
        });
      }
    },
    readAllTipoRubro() {
      let data = JSON.stringify({
        token: this.token,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/AllRipoRubro",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.mListTipoRubro.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async insertNuevoRubroDepartamento() {
      try {
        if (this.mSelectRubroNuevo == null) {
          this.$notify({
            message: "PORFAVOR, SELECCIONE UN RUBRO",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
          return;
        }

        if (this.mSelectDepartamentoNuevo == null) {
          this.$notify({
            message: "PORFAVOR, SELECCIONE UN DEPARTAMENTO",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
          return;
        }

        var response = await this.$axios.post(
          process.env.baseUrl + "/NuevoRubroDepartamento",
          {
            token: this.token,
            departamento: this.mSelectDepartamentoNuevo,
            rubro: this.mSelectRubroNuevo,
            motivo: this.txtMotivo,
          }
        );

        if (response.data.status_code == 200) 
        {
          this.$notify({
            message: "RUBRO AGREGADO CON EXITO.",
            timeout: 2000,
            icon: "ni ni-bell-55",
            type: "success",
          })

          this.readAllPagosRubroAdmin();
          this.mSelectRubroNuevo = null;
          this.mSelectDepartamentoNuevo = null;
          this.txtMotivo = null;
        } else {
          this.$notify({
            message: "RUBRO NO GUARDADO.",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 5000,
          icon: "ni ni-bell-55",
          type: "danger",
        });
      }
    },
  },
  mounted() {
    this.readAllTipoRubro();
    this.readAllDepartamentoOcupados();
    this.readAllPagosRubroAdmin();
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
