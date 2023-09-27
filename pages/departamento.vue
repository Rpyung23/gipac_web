<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <el-select
            v-model="mSelectTipoDepartamentoBusqueda"
            multiple
            collapse-tags
            placeholder="TIPO DEPARTAMENTO"
          >
            <el-option
              v-for="item in mListTipoDepartamento"
              :key="item.id_tipo_departamento"
              :label="item.detalle_tipo_departamento"
              :value="item.id_tipo_departamento"
            >
            </el-option>
          </el-select>

          <base-button size="sm" @click="readAllDepartamentos()" type="primary"
            ><span class="btn-inner--icon"><i class="el-icon-search"></i></span
          ></base-button>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button
            size="sm"
            @click="showModalNuevoDepartameto()"
            type="neutral"
            >Nuevo</base-button
          >
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
            :data="mListDepartamento"
            height="calc(100vh - 12.5rem)"
            style="width: 100%"
          >
            <el-table-column label="" width="140">
              <template slot-scope="scope">
                <base-button
                  v-if="scope.row.estado == 1"
                  size="sm"
                  @click="showModalUpdateDepartamento(scope.row)"
                  type="default"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-ruler-pencil"></i></span
                ></base-button>
                <base-button
                  size="sm"
                  v-if="scope.row.estado == 1"
                  @click="eliminarDepartamento(scope.row)"
                  type="danger"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-fat-remove"></i></span
                ></base-button>
              </template>
            </el-table-column>

            <el-table-column
              label="DEPARTAMENTO"
              prop="code_departamento"
              min-width="170"
            >
            </el-table-column>

            <el-table-column
              label="ZONA / SECTOR"
              prop="detalle_sector"
              min-width="170"
            >
            </el-table-column>


            <el-table-column
              label="DETALLE DEPA.."
              prop="detalle_departamento"
              min-width="230"
            >
            </el-table-column>

            <el-table-column
              label="TIPO DEPA.."
              prop="detalle_tipo_departamento"
              min-width="220"
            >
            </el-table-column>

            <el-table-column
              label="ESTADO DEPA.."
              prop="estado"
              min-width="180"
            >
              <template slot-scope="scope">
                <badge type="default" v-if="scope.row.estado == 2" class="mr-2"
                  >OCUPADO</badge
                >
                <badge type="success" v-if="scope.row.estado == 1" class="mr-2"
                  >DISPONIBLE</badge
                >
              </template>
            </el-table-column>

            <el-table-column
              label="PRECIO ($)"
              prop="precio_arriendo"
              min-width="150"
            >
            </el-table-column>

            <el-table-column
              label="ARRENDADOR"
              prop="nombre_usuario"
              min-width="220"
            >
            </el-table-column>

            <el-table-column
              label="F. ARRENDAMIENTO"
              prop="fecha_arrendado"
              min-width="180"
            >
            </el-table-column>
          </el-table>
        </card>
      </div>
    </div>

    <modal :show.sync="ModalDepartamentoAdd">
      <h6 slot="header" class="modal-title">CREAR NUEVO DEPARTAMENTO</h6>
      <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
        <form
          class="needs-validation"
          @submit.prevent="handleSubmit(insertNuevoDepartamento())"
        >
          <div class="row">
            <div class="col-md-6">
              <base-input
                type="text"
                rules="required"
                v-model="codeDepartamento"
                placeholder="Codigo Departamento"
                name="Codigo Departamento"
              ></base-input>
            </div>
            <div class="col-md-6">
              <el-select
                style="width: 100%"
                rules="required"
                v-model="mSelecTipoDepartamento"
                @change="changeTipoDepartamento"
                placeholder="Tipo de Departamento"
              >
                <el-option
                  v-for="item in mListTipoDepartamento"
                  :key="item.id_tipo_departamento"
                  :label="item.detalle_tipo_departamento"
                  :value="item.id_tipo_departamento"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <base-input
                type="number"
                rules="required"
                disabled
                v-model="precioDepartamento"
                style="color: black !important"
                placeholder="Precio ($)"
                name="Precio ($)"
              ></base-input>
            </div>
            <div class="col-md-6">
              <base-input
                type="number"
                rules="required"
                v-model="numPisoDepartamento"
                placeholder="Número Piso"
                name="Número Piso"
              ></base-input>
            </div>
          </div>

          <div class="row" style="margin-bottom: 1rem;">
            <div class="col-md-12">

              <el-select
                style="width: 100%"
                rules="required"
                v-model="mSelectSector"
                placeholder="Sector / Zona"
              >
                <el-option
                  v-for="item in mListSector"
                  :key="item.code_sector"
                  :label="item.detalle"
                  :value="item.code_sector"
                >
                </el-option>
              </el-select>

            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <textarea
                type="text"
                v-model="detalleDepartamento"
                class="form-control"
                rules="required"
                placeholder="Detalle Departamento"
                name="Detalle Departamento"
                rows="4"
              ></textarea>
            </div>
          </div>

          <div class="div_footer">
            <base-button type="default" native-type="submit"
              >GUARDAR</base-button
            >
          </div>
        </form>
      </validation-observer>
    </modal>

    <modal :show.sync="ModalDepartamentoUpdate">
      <h6 slot="header" class="modal-title">ACTUALIZAR DEPARTAMENTO</h6>
      <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
        <form
          class="needs-validation"
          @submit.prevent="handleSubmit(updateDepartamento())"
        >
          <div class="row">
            <div class="col-md-6">
              <base-input
                type="text"
                rules="required"
                v-model="codeDepartamento"
                disabled
                style="color: black"
                placeholder="Codigo Departamento"
                name="Codigo Departamento"
              ></base-input>
            </div>
            <div class="col-md-6">
              <el-select
                style="width: 100%"
                rules="required"
                v-model="mSelecTipoDepartamento"
                @change="changeTipoDepartamento"
                placeholder="Tipo de Departamento"
              >
                <el-option
                  v-for="item in mListTipoDepartamento"
                  :key="item.id_tipo_departamento"
                  :label="item.detalle_tipo_departamento"
                  :value="item.id_tipo_departamento"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <base-input
                type="number"
                rules="required"
                disabled
                v-model="precioDepartamento"
                style="color: black !important"
                placeholder="Precio ($)"
                name="Precio ($)"
              ></base-input>
            </div>
            <div class="col-md-6">
              <base-input
                type="number"
                rules="required"
                v-model="numPisoDepartamento"
                placeholder="Número Piso"
                name="Número Piso"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <textarea
                type="text"
                v-model="detalleDepartamento"
                class="form-control"
                rules="required"
                placeholder="Detalle Departamento"
                name="Detalle Departamento"
                rows="4"
              ></textarea>
            </div>
          </div>

          <div class="div_footer">
            <base-button type="default" native-type="submit"
              >ACTUALIZAR</base-button
            >
          </div>
        </form>
      </validation-observer>
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
      mListTipoDepartamento: [],
      mListDepartamento: [],
      mListSector: [],
      token: this.$cookies.get("token_gipac"),
      mSelectTipoDepartamentoBusqueda: null,
      ModalDepartamentoAdd: false,
      ModalDepartamentoUpdate: false,

      codeDepartamento: null,
      mSelecTipoDepartamento: null,
      numPisoDepartamento: null,
      detalleDepartamento: null,
      precioDepartamento: null,

      mSelectSector:null
    };
  },
  methods: {
    showModalUpdateDepartamento(item) {
      this.ModalDepartamentoUpdate = true;
      this.codeDepartamento = item.code_departamento;
      this.mSelecTipoDepartamento = item.id_tipo_departamento;
      this.numPisoDepartamento = item.num_piso;
      this.detalleDepartamento = item.detalle_departamento;
      this.precioDepartamento = item.precio_arriendo;
    },
    clearModalNuevoDepartamento() {
      this.codeDepartamento = null;
      this.mSelecTipoDepartamento = null;
      this.numPisoDepartamento = null;
      this.detalleDepartamento = null;
      this.precioDepartamento = null;
    },
    showModalNuevoDepartameto() {
      this.clearModalNuevoDepartamento();
      this.ModalDepartamentoAdd = true;
    },
    async readAllUsuarios() {
      this.mListUsuario = [];

      try {
        var data = JSON.stringify({
          token: this.token,
          rol: "*",
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
    async readAllDepartamentos() {
      this.mListDepartamento = [];

      let data = JSON.stringify({
        token: this.token,
        tipo_departamento:
          this.mSelectTipoDepartamentoBusqueda == null ||
          this.mSelectTipoDepartamentoBusqueda.length <= 0
            ? "*"
            : this.mSelectTipoDepartamentoBusqueda,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/read_departamento",
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
    changeTipoDepartamento(item) {
      if (item != null) {
        for (var i = 0; i < this.mListTipoDepartamento.length; i++) {
          if (this.mListTipoDepartamento[i].id_tipo_departamento == item) {
            this.precioDepartamento =
              this.mListTipoDepartamento[i].precio_arriendo;
          }
        }
      }
    },
    insertNuevoDepartamento() 
    {
      if(this.mSelectSector ==null)
      {
        this.$notify({
          message: "SELECCIONE UN SECTOR",
          timeout: 5000,
          icon: "ni ni-bell-55",
          type: "warning",
        })
        return
      }

      if (this.mSelecTipoDepartamento == null) {
        this.$notify({
          message: "SELECCIONE UN TIPO DE DEPARTAMENTO",
          timeout: 5000,
          icon: "ni ni-bell-55",
          type: "warning",
        })
      }

      let data = JSON.stringify({
        token: this.token,
        code_departamento: this.codeDepartamento,
        num_piso: this.numPisoDepartamento,
        detalle_departamento: this.detalleDepartamento,
        id_tipo_departamento: this.mSelecTipoDepartamento,
        sector: this.mSelectSector
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/create_departamento",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          if (response.data.status_code == 200) {
            this.clearModalNuevoDepartamento();
            this.ModalDepartamentoAdd = false;
            this.readAllDepartamentos();
          } else {
            this.$notify({
              message: response.data.msm,
              timeout: 5000,
              icon: "ni ni-bell-55",
              type: "danger",
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
    eliminarDepartamento(item) {
      let data = JSON.stringify({
        token: this.token,
        code_departamento: item.code_departamento,
      });

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/delete_departamento",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.status_code == 200) {
            this.readAllDepartamentos();
          } else {
            this.$notify({
              message: response.data.msm,
              timeout: 5000,
              icon: "ni ni-bell-55",
              type: "danger",
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
    updateDepartamento() {
      if (this.mSelecTipoDepartamento == null) {
        this.$notify({
          message: "SELECCIONE UN TIPO DE DEPARTAMENTO",
          timeout: 5000,
          icon: "ni ni-bell-55",
          type: "warning",
        });
      }

      let data = JSON.stringify({
        token: this.token,
        code_departamento: this.codeDepartamento,
        num_piso: this.numPisoDepartamento,
        detalle_departamento: this.detalleDepartamento,
        id_tipo_departamento: this.mSelecTipoDepartamento,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/update_departamento",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          if (response.data.status_code == 200) {
            this.clearModalNuevoDepartamento();
            this.ModalDepartamentoUpdate = false;
            this.readAllDepartamentos();
          } else {
            this.$notify({
              message: response.data.msm,
              timeout: 5000,
              icon: "ni ni-bell-55",
              type: "danger",
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
    readSector() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: process.env.baseUrl+"/readSector",
        headers: {},
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListSector.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.readSector()
    this.readAllTipoDepartamento()
    this.readAllUsuarios()
    this.readAllDepartamentos()
  },
};
</script>
<style>
.card-bodyRPagosVehiculoProduccion {
  padding: 0rem !important;
  height: calc(100vh - 11.5rem);
  overflow: none;
}
</style>
