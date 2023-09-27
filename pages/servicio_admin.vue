<template>
  <div>
    <base-header class="pb-6">
      <div class="align-items-center py-3">
        <card
          class="no-border-card col"
          style="margin-bottom: 0.5rem"
          body-classes="px-0 pb-1 card_top_input card_top_input_pago_admin"
          footer-classes="pb-2"
        >
          <div class="containerDiv">
            <div class="div_izquierda">
              <el-select
                v-model="mSelectTipoServicio"
                multiple
                filterable
                collapse-tags
                placeholder="SERVICIOS"
                style="margin-right: 0.5rem"
              >
                <el-option
                  v-for="item in mListTipoServicio"
                  :key="item.id_tipo_servicio"
                  :label="item.detalle_servicio"
                  :value="item.id_tipo_servicio"
                >
                </el-option>
              </el-select>
              <el-date-picker
                v-model="oFechaInicio"
                type="date"
                placeholder="Seleccione una Fecha"
              >
              </el-date-picker>
            </div>
            <div class="div_derecha">
              <base-button size="sm" @click="readServicios()" type="primary"
                ><span class="btn-inner--icon"
                  ><i class="el-icon-search"></i></span
              ></base-button>

              <base-button
                size="sm"
                @click="showModalNuevoServicio()"
                type="default"
                >Nuevo Servicio</base-button
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
            :data="mListReserva"
            height="calc(100vh - 12.5rem)"
            style="width: 100%"
          >
            <el-table-column label="" width="140">
              <template slot-scope="scope">
                <base-button
                  size="sm"
                  @click="updateServicio(2,scope.row.id_reserva_servicio)"
                  type="success"
                  v-if="scope.row.estado_reserva == 1 ? true : false"
                  title="AGENDAR"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-check-bold"></i></span
                ></base-button>
                <base-button
                  size="sm"
                  @click="updateServicio(3,scope.row.id_reserva_servicio)"
                  type="danger"
                  v-if="scope.row.estado_reserva == 1 ? true : false"
                  title="RECHAZAR"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-fat-delete"></i></span
                ></base-button>
              </template>
            </el-table-column>

            <el-table-column label="Estado" width="150">
              <template slot-scope="scope">
                <badge
                  type="primary"
                  v-if="scope.row.estado_reserva == 1"
                  class="mr-2"
                  >EN ESPERA</badge
                >
                <badge
                  type="success"
                  v-if="scope.row.estado_reserva == 2"
                  class="mr-2"
                  >RESERVADO</badge
                >
                <badge
                  type="danger"
                  v-if="scope.row.estado_reserva == 3"
                  class="mr-2"
                  >RECHAZADO</badge
                >
              </template>
            </el-table-column>

            <el-table-column
              label="SERVICIO"
              prop="detalle_servicio"
              min-width="170"
            >
            </el-table-column>

            <el-table-column
              label="ARRENDATARIO"
              prop="nombre_usuario"
              min-width="170"
            >
            </el-table-column>

            <el-table-column
              label="TELEFONO"
              prop="telefono_usuario"
              min-width="150"
            >
            </el-table-column>

            <el-table-column label="FECHA" prop="fechaReserva" min-width="130">
            </el-table-column>

            <el-table-column label="HORA" prop="hora" min-width="160">
            </el-table-column>
          </el-table>
        </card>

        <modal
          :show.sync="oModalNuevoServicio"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm"
        >
          <h5 slot="header" class="modal-title" id="modal-title-default">
            NUEVO SERVICIO
          </h5>

          <form style="margin-right: 1rem; margin-left: 1rem">
            <div class="form-group">
              <base-input
                type="text"
                v-model="nameServicio"
                placeholder="Nombre del Servicio"
              ></base-input>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <base-input
                    type="time"
                    v-model="HApertura"
                    label="H. Apertura"
                  ></base-input>
                </div>

                <div class="col">
                  <base-input
                    type="time"
                    v-model="HCierre"
                    label="H. Cierre"
                  ></base-input>
                </div>
              </div>
            </div>
          </form>

          <template slot="footer">
            <base-button type="default" @click="createNuevoServicio()"
              >GUARDAR CAMBIOS</base-button
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
  Message,
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
    [Notification.name]: Notification,
    [Dropdown.name]: Dropdown,
    [Select.name]: Select,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [Option.name]: Option,
    [TableColumn.name]: TableColumn,
    [DatePicker.name]: DatePicker,
    [Message.name]: Message,
  },
  data() {
    return {
      mListTipoServicio: [],
      mListReserva: [],
      token: this.$cookies.get("token_gipac"),
      mSelectTipoServicio: null,
      oFechaInicio: null,

      oModalNuevoServicio: false,
      nameServicio: null,
      HApertura: "08:00",
      HCierre: "20:00",
    };
  },
  methods: {
    showModalNuevoServicio() {
      this.oModalNuevoServicio = true;
    },
    clearModalNuevoServicio() {
      this.nameServicio = null;
      this.HApertura = "08:00";
      this.HCierre = "20:00";
    },
    async readAllTipoServicio() {
      this.mListTipoServicio = [];

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/readTipoServicio",
        headers: {},
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListTipoServicio.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async readServicios() {
      this.mListReserva = [];
      try {
        var response = await this.$axios.post(
          process.env.baseUrl + "/readAllServicios",
          {
            token: this.token,
            fecha: this.oFechaInicio,
            servicios:this.mSelectTipoServicio.length <= 0 ? null : this.mSelectTipoServicio
          }
        );

        this.mListReserva.push(...response.data.datos);
      } catch (error) {
        console.log(error);
      }
    },
    async createNuevoServicio() {
      try {
        if (this.nameServicio == null) {
          this.$notify({
            message: "PORFAVOR, INGRESE EL NOMBRE DEL SERVICIO",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "warning",
          });
          return;
        }

        var response = await this.$axios.post(
          process.env.baseUrl + "/nuevoServicio",
          {
            token: this.token,
            name: this.nameServicio,
            hora_inicio: this.HApertura,
            hora_fin: this.HCierre,
          }
        );

        if (response.data.status_code == 200) {
          this.$notify({
            message: "SERVICIO GUARDADO CON EXITO",
            timeout: 2000,
            icon: "ni ni-bell-55",
            type: "success",
          })
          this.clearModalNuevoServicio()
          this.readAllTipoServicio()
        } else {
          this.$notify({
            message: "ERROR AL GUARDAR EL NUEVO SERVICIO",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "warning",
          });
        }
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 5000,
          icon: "ni ni-bell-55",
          type: "warning",
        });
      }
    },
    async updateServicio(estado_,servicio_)
    {
      try {
        
        var response = await this.$axios.put(process.env.baseUrl+"/updateServicio",{
        token:this.token,
        servicio:servicio_,
        estado:estado_
      })

      if(response.data.status_code == 200)
      {
        this.readServicios()
        if(estado_ == 2)
        {
          this.$notify({
            message: "RESERVADO CON EXITO",
            timeout: 2000,
            icon: "ni ni-bell-55",
            type: "success"
          })
        }else{
          this.$notify({
            message: "RESERVA RECHAZADA CON EXITO",
            timeout: 2000,
            icon: "ni ni-bell-55",
            type: "warning"
          })
        }
      }

      } catch (error) {
        this.$notify({
            message: error.toString(),
            timeout: 2000,
            icon: "ni ni-bell-55",
            type: "danger"
          })
      }

    }
  },
  mounted() {
    this.readAllTipoServicio();
    this.readServicios();
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
</style>
