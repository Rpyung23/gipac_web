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
                v-model="mSelectTipoDepartamentoBusqueda"
                multiple
                filterable
                collapse-tags
                placeholder="DEPARTAMENTOS"
                style="margin-right: 0.5rem"
              >
                <el-option
                  v-for="item in mListArrendado"
                  :key="item.fk_code_departamento"
                  :label="item.fk_code_departamento"
                  :value="item.fk_code_departamento"
                >
                </el-option>
              </el-select>

              <!--<el-select
                v-model="mSelectTipoDepartamentoBusqueda"
                multiple
                filterable
                collapse-tags
                placeholder="USUARIOS"
              >
                <el-option
                  v-for="item in mListUsuario"
                  :key="item.dni_usuario"
                  :label= "(item.nombre_usuario+' ('+item.dni_usuario+')')"
                  :value="item.dni_usuario"
                >
                </el-option>
              </el-select>-->
            </div>
            <div class="div_derecha">
              <base-button
                size="sm"
                @click="readAllArrendamiento()"
                type="primary"
                ><span class="btn-inner--icon"
                  ><i class="el-icon-search"></i></span
              ></base-button>

              <base-button
                size="sm"
                @click="showOpenModalArrendamiento()"
                type="success"
                >Nuevo Arrendamiento</base-button
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
            :data="mListArrendado"
            height="calc(100vh - 12.5rem)"
            style="width: 100%"
          >
            <el-table-column label="" width="175">
              <template slot-scope="scope">
                <!--<base-button
                  size="sm"
                  @click=""
                  title="ANULAR ARRENDAMIENTO"
                  type="danger"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-fat-remove"></i></span
                ></base-button>-->

                <base-button
                  size="sm"
                  @click="showModalArriendoTerminar(scope.row)"
                  type="warning"
                  title="FINALIZAR ARRENDAMIENTO"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-fat-delete"></i> TERMINAR</span
                ></base-button>
              </template>
            </el-table-column>

            <el-table-column
              label="DEPARTAMENTO"
              prop="fk_code_departamento"
              min-width="170"
            >
            </el-table-column>

            <el-table-column
              label="TIPO DEPA.."
              prop="detalle_tipo_departamento"
              min-width="220"
            >
            </el-table-column>

            <el-table-column
              label="ARRENDADOR"
              prop="nombre_usuario"
              min-width="220"
            >
            </el-table-column>

            <el-table-column
              label="PRECIO ($)"
              prop="precio_arriendo"
              min-width="160"
            >
            </el-table-column>

            <el-table-column
              label="OBSERVACIONES"
              prop="detalle_arrendamiento"
              min-width="300"
            >
            </el-table-column>
          </el-table>
        </card>

        <modal
          :show.sync="oModalArriendoCrear"
          modal-classes="modal-dialog-centered"
        >
          <h5 slot="header" class="modal-title" id="modal-title-default">
            NUEVO ARRENDAMIENTO
          </h5>

          <form>
            <div class="row">
              <div class="col-md-6">
                <el-select
                  v-model="mSelectArrendatarioNuevo"
                  filterable
                  placeholder="ARRENDATARIOS"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in mListUsuario"
                    :key="item.email_usuario"
                    :label="item.nombre_usuario"
                    :value="item.email_usuario"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="col-md-6">
                <el-select
                  v-model="mSelectDepartametoLibres"
                  filterable
                  placeholder="DEPARTAMENTOS"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in mListAllDepartamentoLibres"
                    :key="item.code_departamento"
                    :label="item.code_departamento"
                    :value="item.code_departamento"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <el-date-picker
                  v-model="mFechaArrendameinto"
                  type="date"
                  style="width: 100%; margin-top: 0.5rem"
                  placeholder="FECHA ARRENDAMIENTO"
                >
                </el-date-picker>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <textarea
                  style="margin-top: 1rem"
                  class="form-control"
                  v-model="DetalleArrendamiento"
                  placeholder="DETALLE DEL ARRENDAMIENTO"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </form>

          <template slot="footer">
            <base-button @click="insertArrendamiento()" type="primary"
              >INSERTAR ARRENDAMIENTO</base-button
            >
          </template>
        </modal>

        <modal
          :show.sync="oModalArriendoTerminar"
          modal-classes="modal-dialog-centered"
        >
          <h5 slot="header" class="modal-title" id="modal-title-default">
            TERMINAR CONTRATO
          </h5>

          <form>
            <div class="row">
              <div class="col-md-6">
                <base-input type="text" disabled style="color: black;" v-model="ArrendatarioTerminar" label="ARRENDATARIO"></base-input>
              </div>
              <div class="col-md-6">
                <base-input type="text" disabled style="color: black;" v-model="DepartamentoTerminal" label="DEPARTAMENTO"></base-input>
              </div>
            </div>


            <div class="row">
              <div class="col-md-12">
                <textarea
                  style="margin-top: 1rem"
                  class="form-control"
                  v-model="DetalleArrendamientoTerminar"
                  placeholder="DETALLE FIN DE CONTRATO"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </form>

          <template slot="footer">
            <base-button @click="terminarArrendamiento()" type="warning"
              >TERMINAR ARRENDAMIENTO</base-button
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
import {getFecha_dd_mm_yyyy} from "../util/fechas"
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
      mListUsuario: [],
      mListTipoDepartamento: [],
      mListArrendado: [],
      mListAllDepartamentoLibres: [],
      token: this.$cookies.get("token_gipac"),
      mSelectTipoDepartamentoBusqueda: null,
      oModalArriendoCrear: false,
      mSelectArrendatarioNuevo: null,
      mSelectDepartametoLibres: null,
      mFechaArrendameinto: null,
      DetalleArrendamiento: null,
      oModalArriendoTerminar:false,
      
      objSelectTerminar:null,
      DetalleArrendamientoTerminar:null,
      DepartamentoTerminal:null,
      ArrendatarioTerminar:null
    };
  },
  methods: {
    showModalArriendoTerminar(item)
    {
      this.objSelectTerminar = item
      this.DetalleArrendamientoTerminar = null
      this.DepartamentoTerminal = item.fk_code_departamento
      this.ArrendatarioTerminar = item.nombre_usuario
      this.oModalArriendoTerminar = true
    },
    async readAllUsuarios() {
      this.mListUsuario = [];

      try {
        var data = JSON.stringify({
          token: this.token,
          rol: 2,
        });

        var config = {
          method: "post",
          maxBodyLength: Infinity,
          url: process.env.baseUrl + "/all_user",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        this.$axios
          .request(config)
          .then((response) => {
            this.mListUsuario.push(...response.data.datos);
          })
          .catch((error) => {
            this.$notify({
              message: error.toString(),
              timeout: 5000,
              icon: "ni ni-fat-remove",
              type: "danger",
            });
          });
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 5000,
          icon: "ni ni-fat-remove",
          type: "danger",
        });
      }
    },
    async readAllTipoDepartamento() {
      this.mListTipoDepartamento = [];

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/read_tipo_departamento",
        headers: {},
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListTipoDepartamento.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async readAllArrendamiento() {
      this.mListArrendado = [];
      let data = JSON.stringify({
        token: this.token,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/read_arrendamiento",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListArrendado.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearModalNuevoArrendamiento() 
    {
      this.readAllDepartamentoLibre()
      this.readAllUsuarios()
      this.readAllArrendamiento()
      this.mFechaArrendameinto = null;
      this.mSelectArrendatarioNuevo = null;
      this.mSelectDepartametoLibres = null;
      this.DetalleArrendamiento = null;
    },
    showOpenModalArrendamiento() {
      this.clearModalNuevoArrendamiento();
      this.readAllDepartamentoLibre();
      this.oModalArriendoCrear = true;
    },
    readAllDepartamentoLibre() {
      let data = JSON.stringify({
        token: this.token,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/read_departamento_libre",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListAllDepartamentoLibres.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async insertArrendamiento() {
      try {
        if (this.mSelectArrendatarioNuevo == null) {
          Notification({
            title: "NUEVO ARRENDAMIENTO",
            message: "PORFAVOR SELECCIOANR UN ARRENDATARIO",
            type: "warning",
          });
          return;
        }

        if (this.mSelectDepartametoLibres == null) {
          Notification({
            title: "NUEVO ARRENDAMIENTO",
            message: "PORFAVOR SELECCIOANR UN DEPARTAMENTO LIBRE",
            type: "warning",
          });
          return;
        }

        if (this.mFechaArrendameinto == null) {
          Notification({
            title: "NUEVO ARRENDAMIENTO",
            message: "PORFAVOR SELECCIOANR UNA FECHA DE ARRENDAMIENTO VALIDA",
            type: "warning",
          });

          return;
        }

        var data = await this.$axios.post(
          process.env.baseUrl + "/insert_arrendamiento",
          {
            token:this.token,
            usuario: this.mSelectArrendatarioNuevo,
            departamento: this.mSelectDepartametoLibres,
            fecha: getFecha_dd_mm_yyyy(this.mFechaArrendameinto),
            detalle: this.DetalleArrendamiento == null ? '' : this.DetalleArrendamiento,
          }
        );

        if (data.data.status_code == 200) {
          this.clearModalNuevoArrendamiento();
          Notification({
            title: "NUEVO ARRENDAMIENTO",
            message: "REGISTRO CREADO CON EXITO",
            type: "success",
          });
        } else {
          Notification({
            title: "NUEVO ARRENDAMIENTO",
            message: data.data.msm,
            type: "danger",
          });
        }
      } catch (e) {
        Notification({
          title: "NUEVO ARRENDAMIENTO",
          message: e.toString(),
          type: "danger",
        });
      }
    },
    async terminarArrendamiento() {
      try {
        if (this.objSelectTerminar == null) {
          Notification({
            title: "TERMINAR ARRENDAMIENTO",
            message: "PORFAVOR SELECCIOANR UN ARRENDAMIENTO",
            type: "warning",
          });
          return;
        }

        if(this.DetalleArrendamientoTerminar == null)
        {
          Notification({
            title: "TERMINAR ARRENDAMIENTO",
            message: "PORFAVOR INGRESAR EL DETALLE",
            type: "warning",
          });
          return;
        }



        var data = await this.$axios.put(
          process.env.baseUrl + "/terminar_arrendamiento",
          {
            token:this.token,
            arrendamiento:this.objSelectTerminar.id_arrendamiento,
            detalle_desalojo:this.DetalleArrendamientoTerminar
          }
        );

        if (data.data.status_code == 200) {
          this.oModalArriendoTerminar = false
          Notification({
            title: "ARRENDAMIENTO",
            message: "ARRENDAMIENTO TERMINADO EXITO",
            type: "success",
          });
        } else {
          Notification({
            title: "ARRENDAMIENTO",
            message: data.data.msm,
            type: "danger",
          });
        }
      } catch (e) {
        Notification({
          title: "ARRENDAMIENTO",
          message: e.toString(),
          type: "danger",
        });
      }
    },
  },
  mounted() {
    this.readAllTipoDepartamento();
    this.readAllUsuarios();
    this.readAllArrendamiento();
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
