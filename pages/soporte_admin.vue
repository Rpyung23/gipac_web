<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <el-select
            v-model="mSelectTipoSoporte"
            multiple
            collapse-tags
            placeholder="TIPO SOPORTE"
          >
            <el-option
              v-for="item in mListTipoSoporte"
              :key="item.id_tipo_soporte"
              :label="item.detalle_soporte"
              :value="item.id_tipo_soporte"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="mSelectEstadoSoporte"
            multiple
            collapse-tags
            placeholder="ESTADO SOPORTE"
          >
            <el-option label="APERTURA" :value="1"> </el-option>
            <el-option label="EN PROCESO" :value="2"> </el-option>
          </el-select>

          <base-button size="sm" @click="readAllSoporte()" type="primary"
            ><span class="btn-inner--icon"><i class="el-icon-search"></i></span
          ></base-button>
        </div>
        <div class="col-lg-6 col-5 text-right">

        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <card
          style="margin-bottom: 0rem; padding: 0.25rem"
          body-classes="card-bodyRPagosVehiculoProduccion px-0 pb-1"
          footer-classes="pb-2"
        >
          <el-table
            class="table-responsive table-flush"
            header-row-class-name="thead-light"
            :data="mListSoporte"
            height="calc(100vh - 12.5rem)"
            style="width: 100%"
          >
            <el-table-column label="" width="150">
              <template slot-scope="scope">
                <base-button
                  size="sm"
                  @click="showDetalleSoporte(scope.row)"
                  type="default"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-ruler-pencil"></i></span
                ></base-button>

                <base-button
                  size="sm"
                  v-if="
                    scope.row.url_img == null && scope.row.url_archivo == null
                      ? false
                      : true
                  "
                  @click="verMultimediaSoporte(scope.row)"
                  type="warning"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-image"></i></span
                ></base-button>
              </template>
            </el-table-column>

            <el-table-column
              label="F. APERTURA"
              prop="fecha_apertura"
              min-width="140"
            >
            </el-table-column>

            <el-table-column
              label="ASUNTO"
              prop="asunto_soporte"
              min-width="170"
            >
            </el-table-column>

            <el-table-column
              label="DETALLE SOPORTE.."
              prop="detalle_soporte"
              min-width="240"
            >
            </el-table-column>

            <el-table-column
              label="USUARIO"
              prop="nombre_usuario"
              min-width="170"
            >
            </el-table-column>

            <el-table-column
              label="USUARIO TEL."
              prop="telefono_usuario"
              min-width="150"
            >
            </el-table-column>

            <el-table-column
              label="T. SOPORTE"
              prop="detalle_tipo_soporte"
              min-width="200"
            >
              <template slot-scope="scope">
                <badge
                  type="default"
                  v-if="scope.row.fk_tipo_soporte != 1"
                  class="mr-2"
                  >{{ scope.row.detalle_tipo_soporte }}</badge
                >

                <badge
                  type="danger"
                  v-if="scope.row.fk_tipo_soporte == 1"
                  class="mr-2"
                  >{{ scope.row.detalle_tipo_soporte }}</badge
                >
              </template>
            </el-table-column>

            <el-table-column label="ESTADO" prop="estado" min-width="170">
              <template slot-scope="scope">
                <badge type="success" v-if="scope.row.estado == 1" class="mr-2"
                  >APERTURA</badge
                >

                <badge type="default" v-if="scope.row.estado == 2" class="mr-2"
                  >EN PROCESO</badge
                >
              </template>
            </el-table-column>
          </el-table>
        </card>
      </div>
    </div>

    <modal
      :show.sync="ModalMultimedia"
      modal-classes="modal-dialog-centered modal-xl"
    >
      <h5 slot="header" class="modal-title" id="modal-title-default">
        IMAGEN / DOCUMENTO
      </h5>

      <form>
        <div class="row">
          <div
            :class="srcImg != null && srcPdf == null ? 'col-md-12' : 'col-md-6'"
            v-if="srcImg != null"
          >
            <img
              :src="srcImg"
              style="
                max-height: calc(100vh - 15rem);
                object-fit: cover;
                width: 100%;
              "
            />
          </div>
          <div
            :class="srcPdf != null && srcImg == null ? 'col-md-12' : 'col-md-6'"
            v-if="srcPdf != null"
          >
            <embed
              :src="srcPdf"
              type="application/pdf"
              width="100%"
              style="height: calc(100vh - 15rem); width: 100%"
            />
          </div>
        </div>
      </form>
    </modal>

    <modal
      :show.sync="modalDetalleSoporte"
      modal-classes="modal-dialog-centered modal-xl"
    >
      <h5 slot="header" class="modal-title">
        DETALLE TICKET N°
        {{
          objTicketSoporte == null ? "S/N" : objTicketSoporte.fk_tipo_soporte
        }}
        <badge
          type="default"
          v-if="
            objTicketSoporte == null
              ? false
              : objTicketSoporte.fk_tipo_soporte != 1
              ? true
              : false
          "
          class="mr-2"
          >{{
            objTicketSoporte == null
              ? ""
              : objTicketSoporte.detalle_tipo_soporte
          }}</badge
        >
        <badge
          type="danger"
          v-if="
            objTicketSoporte == null
              ? false
              : objTicketSoporte.fk_tipo_soporte == 1
              ? true
              : false
          "
          class="mr-2"
          >{{
            objTicketSoporte == null
              ? ""
              : objTicketSoporte.detalle_tipo_soporte
          }}</badge
        >
      </h5>

      <form>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <base-input
                  type="text"
                  disabled
                  v-model="asuntoTicket"
                  label="ASUNTO"
                ></base-input>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <base-input
                  type="text"
                  disabled
                  v-model="fechaTicket"
                  label="F. TICKET"
                ></base-input>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">ESTADO TICKET</label>
                <el-select v-model="mSelectEstadoSoporteUpdate" collapse-tags>
                  <el-option label="EN PROCESO" :value="2"> </el-option>
                  <el-option label="FINALIZADO" :value="3"> </el-option>
                </el-select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">DETALLE TICKET</label>
                <textarea
                  class="form-control"
                  v-model="detalleTicket"
                  disabled
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleFormControlTextarea1"
                  >RESPUESTA TICKET</label
                >
                <textarea
                  class="form-control"
                  v-model="solucionTicket"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="div_footer">
            <base-button type="default" @click="updateSoporte()"
              >ACTUALIZAR TICKET</base-button
            >
          </div>
        </form>

    </modal>
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
} from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import LightTable from "~/components/tables/RegularTables/LightTable";

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
  },
  data() {
    return {
      mListUsuario: [],
      mListSoporte: [],
      mListTipoSoporte: [],
      mSelectEstadoSoporte: [],
      token: this.$cookies.get("token_gipac"),
      mSelectTipoSoporte: null,
      ModalMultimedia: false,
      srcImg: null,
      srcPdf: null,
      modalDetalleSoporte: false,
      objTicketSoporte: null,

      mSelectEstadoSoporteUpdate: null,
      asuntoTicket: null,
      fechaTicket: null,
      detalleTicket: null,
      solucionTicket: '',
    };
  },
  methods: {
    showDetalleSoporte(item) {
      this.objTicketSoporte = item;
      this.modalDetalleSoporte = true;

      if(item.estado == 1){
        this.mSelectEstadoSoporteUpdate = null;
      }else{
        this.mSelectEstadoSoporteUpdate = item.estado;
      }

      this.asuntoTicket = item.asunto_soporte;
      this.fechaTicket = item.fecha_apertura_;
      this.detalleTicket = item.detalle_soporte;
      this.solucionTicket = null;
    },
    verMultimediaSoporte(item) {
      this.ModalMultimedia = true;
      this.srcImg = item.url_img;
      this.srcPdf = item.url_archivo;
      console.log(item);
    },
    async readAllTipoSoporte() {
      this.mListTipoSoporte = [];

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/all_tipo_soporte",
        headers: {},
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListTipoSoporte.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async readAllSoporte() {
      this.mListSoporte = [];

      let data = JSON.stringify({
        token: this.token,
        tipo_soporte:
          this.mSelectTipoSoporte.length <= 0 || this.mSelectTipoSoporte == null
            ? "*"
            : this.mSelectTipoSoporte,
        estado_soporte:
          this.mSelectEstadoSoporte.length <= 0 ||
          this.mSelectEstadoSoporte == null
            ? "*"
            : this.mSelectEstadoSoporte,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/all_soporte",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListSoporte.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateSoporte() 
    {

      if(this.mSelectEstadoSoporteUpdate == null)
      {
        this.$notify({
            message: "PORFAVOR DEBE SELECCIONAR UN ESTADO DEL TICKET",
            timeout: 3000,
            icon: "ni ni-bell-55",
            type: "warning",
          })
        return
      }
      let data = JSON.stringify({
        token: this.token,
        id_soporte: this.objTicketSoporte.id_soporte,
        solucion_ticket: this.solucionTicket,
        estado: this.mSelectEstadoSoporteUpdate,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/update_soporte",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          if (response.data.status_code == 200) {
            this.modalDetalleSoporte = false;
            this.readAllSoporte();
            this.$notify({
              message:
                "TICKET N° " +
                this.objTicketSoporte.id_soporte +
                " ACTUALIZADO CON ÉXITO",
              timeout: 5000,
              icon: "ni ni-bell-55",
              type: "default",
            });
          } else {
            this.$notify({
              message: response.data.msm,
              timeout: 5000,
              icon: "ni ni-bell-55",
              type: "warning",
            });
          }
        })
        .catch((error) => {
          this.$notify({
            message: error.toString(),
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
        });
    },
  },
  mounted() {
    this.readAllTipoSoporte();
    this.readAllSoporte();
  },
};
</script>
<style>
body {
  overflow-y: hidden;
}

.card-bodyRPagosVehiculoProduccion {
  padding: 0rem !important;
  height: calc(100vh - 11.5rem);
  overflow: none;
}
</style>
