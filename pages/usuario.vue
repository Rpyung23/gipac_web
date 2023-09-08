<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <base-button size="sm" @click="readAllUsuarios()" type="primary"
            >Buscar</base-button
          >
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" @click="showModalNuevoUsuario()" type="neutral"
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
            header-row-class-name="thead-light"
            :data="mListUsuario"
            class="table-responsive table-flush"
            height="calc(100vh - 12.5rem)"
            style="width: 100%"
          >
            <el-table-column label="" width="140">
              <template slot-scope="scope">
                <base-button
                  size="sm"
                  @click="showModalUpdateUsuario(scope.row)"
                  type="default"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-ruler-pencil"></i></span
                ></base-button>
                <base-button
                  size="sm"
                  @click="showModalEliminarUsuario(scope.row)"
                  type="danger"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-fat-remove"></i></span
                ></base-button>
              </template>
            </el-table-column>
            <el-table-column
              label="NOMBRES COMPLETOS"
              prop="nombre_usuario"
              min-width="270"
            >
            </el-table-column>

            <el-table-column label="EMAIL" prop="email_usuario" min-width="230">
            </el-table-column>

            <el-table-column
              label="DNI/CEDULA"
              prop="dni_usuario"
              min-width="200"
            >
            </el-table-column>

            <el-table-column
              label="TELEFONO"
              prop="telefono_usuario"
              min-width="200"
            >
            </el-table-column>


            <el-table-column label="ROL" prop="detalle" min-width="220">
            </el-table-column>
          </el-table>
        </card>
      </div>
    </div>


    <!--Notice modal-->
    <modal :show.sync="ModalUsuarioAdd">
      <h6 slot="header" class="modal-title">CREAR NUEVO USUARIO</h6>

      <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
        <form
          class="needs-validation"
          @submit.prevent="handleSubmit(crearNuevoUsuario())"
        >
          <div class="row">
            <div class="col-md-6">
              <base-input
                type="text"
                rules="required"
                placeholder="Nombres Completos"
                name="Nombres Completos"
                v-model="nameUsuario"
              ></base-input>
            </div>
            <div class="col-md-6">
              <base-input
                type="email"
                rules="required"
                placeholder="Correo Electronico"
                name="Correo Electronico"
                v-model="emailUsuario"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <base-input
                type="password"
                rules="required"
                v-model="passUsuario"
                placeholder="Contraseña"
                name="Contraseña"
              ></base-input>
            </div>
            <div class="col-md-6">
              <base-input
                type="tel"
                rules="required"
                v-model="teleUsuario"
                placeholder="Telefono/Celular"
                name="Telefono/Celular"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <base-input
                type="text"
                rules="required"
                v-model="dniUsuario"
                placeholder="DNI / PASAPORTE"
                name="DNI / PASAPORTE"
              ></base-input>
            </div>
            <div class="col-md-6">
              <el-select
                v-model="mSelectSexo"
                style="width: 100%"
                rules="required"
                placeholder="Seleccione un Sexo"
              >
                <el-option label="MASCULINO" value="1"> </el-option>

                <el-option label="FEMENINO" value="0"> </el-option>
              </el-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <el-select
                v-model="mSelectRol"
                style="width: 100%"
                rules="required"
                placeholder="Seleccione un Rol"
              >
                <el-option
                  v-for="item in mListRol"
                  :key="item.id_rol"
                  :label="item.detalle"
                  :value="item.id_rol"
                >
                </el-option>
              </el-select>
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

    <modal :show.sync="ModalUsuarioUpdate">
      <h6 slot="header" class="modal-title">ACTUALIZAR NUEVO USUARIO</h6>

      <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
        <form
          class="needs-validation"
          @submit.prevent="handleSubmit(updateUsuario())"
        >
          <div class="row">
            <div class="col-md-6">
              <base-input
                type="text"
                rules="required"
                placeholder="Nombres Completos"
                name="Nombres Completos"
                v-model="nameUsuario"
              ></base-input>
            </div>
            <div class="col-md-6">
              <base-input
                type="email"
                rules="required"
                disabled
                placeholder="Correo Electronico"
                name="Correo Electronico"
                v-model="emailUsuario"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <base-input
                type="tel"
                rules="required"
                v-model="teleUsuario"
                placeholder="Telefono/Celular"
                name="Telefono/Celular"
              ></base-input>
            </div>
            <div class="col-md-6">
              <base-input
                type="text"
                rules="required"
                v-model="dniUsuario"
                placeholder="DNI / PASAPORTE"
                name="DNI / PASAPORTE"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <el-select
                v-model="mSelectSexo"
                style="width: 100%"
                rules="required"
                placeholder="Seleccione un Sexo"
              >
                <el-option label="MASCULINO" :value="1"> </el-option>

                <el-option label="FEMENINO" :value="0"> </el-option>
              </el-select>
            </div>

            <div class="col-md-6">
              <el-select
                v-model="mSelectRol"
                style="width: 100%"
                rules="required"
                placeholder="Seleccione un Rol"
              >
                <el-option
                  v-for="item in mListRol"
                  :key="item.id_rol"
                  :label="item.detalle"
                  :value="item.id_rol"
                >
                </el-option>
              </el-select>
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

    <modal :show.sync="modalDeleteUsuario" body-classes="p-0">
      <div style="margin-left: 1rem; margin-right: 1rem; margin-top: 1rem">
        ¿Esta seguro eliminar al usuario
        <strong>{{
          objSelectUsuarioDelete == null
            ? "S/N"
            : objSelectUsuarioDelete.nombre_usuario
        }}</strong>
        ?
      </div>
      <template slot="footer">
        <base-button type="danger" @click="eliminarUsuario()"
          >ELIMINAR</base-button
        >
      </template>
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

import { validarCorreoElectronico,validarCedula,validarNumeroCelular } from "../util/validaciones";

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
      mListRol: [],
      ModalUsuarioAdd: false,
      modalDeleteUsuario: false,
      ModalUsuarioUpdate: false,
      token: this.$cookies.get("token_gipac"),
      mSelectRol: null,
      mSelectSexo: null,
      nameUsuario: null,
      emailUsuario: null,
      passUsuario: null,
      teleUsuario: null,
      dniUsuario: null,
      objSelectUsuarioDelete: null,
    };
  },
  methods: {
    showModalUpdateUsuario(item) {
      this.clearModalNuevoUsuario();
      this.ModalUsuarioUpdate = true;
      this.mSelectRol = item.fk_id_rol;
      this.mSelectSexo = item.sexo_usuario;
      this.nameUsuario = item.nombre_usuario;
      this.emailUsuario = item.email_usuario;
      this.teleUsuario = item.telefono_usuario;
      this.dniUsuario = item.dni_usuario;
    },
    showModalEliminarUsuario(item) {
      this.objSelectUsuarioDelete = item;
      this.modalDeleteUsuario = true;
    },
    clearModalNuevoUsuario() {
      this.mSelectRol = null;
      this.mSelectSexo = null;
      this.nameUsuario = null;
      this.emailUsuario = null;
      this.passUsuario = null;
      this.teleUsuario = null;
      this.dniUsuario = null;
    },
    showModalNuevoUsuario() {
      this.clearModalNuevoUsuario();
      this.ModalUsuarioAdd = true;
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
    async readRol() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/roles",
        headers: {},
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListRol.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async crearNuevoUsuario() {
      try {
        if (this.mSelectRol == null) {
          this.$notify({
            message: "Porfavor seleccione un ROL",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
          return;
        }

        if (this.mSelectSexo == null) {
          this.$notify({
            message: "Porfavor seleccione un TIPO DE SEXO",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "danger",
          });
          return;
        }

        if (!validarCorreoElectronico(this.emailUsuario)) {
          this.$notify({
            message: "INGRESE UN CORREO ELECTRONICO VALIDO !",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "default",
          });

          return;
        }


        if(!validarCedula(this.dniUsuario)){
        this.$notify({
            message: "INGRESE UN NUMERO DE DNI / CEDULA VALIDO",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "warning",
          })

          return
      }

      if(!validarNumeroCelular(this.teleUsuario)){
        this.$notify({
            message: "INGRESE UN NUMERO DE CELULAR VALIDO",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "warning",
          })

          return
      }


        let data = JSON.stringify({
          token: this.token,
          email_usuario: this.emailUsuario,
          contrasenia: this.passUsuario,
          nombre_usuario: this.nameUsuario,
          telefono_usuario: this.teleUsuario,
          dni_usuario: this.dniUsuario,
          sexo_usuario: this.mSelectSexo,
          id_rol: this.mSelectRol,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: process.env.baseUrl + "/create_user",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        this.$axios
          .request(config)
          .then((response) => {
            if (response.data.status_code == 200) {
              this.readAllUsuarios();
              this.ModalUsuarioAdd = false;
            } else {
              this.$notify({
                message: response.data.msm,
                timeout: 5000,
                icon: "ni ni-fat-remove",
                type: "warning",
              });
            }
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
    eliminarUsuario() {
      try {
        let data = JSON.stringify({
          token: this.token,
          email_usuario: this.objSelectUsuarioDelete.email_usuario,
        });

        let config = {
          method: "delete",
          maxBodyLength: Infinity,
          url: process.env.baseUrl + "/delete_user",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        this.$axios
          .request(config)
          .then((response) => {
            if (response.data.status_code == 200) {
              this.modalDeleteUsuario = false;
              this.readAllUsuarios();
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
      } catch (error) {
        this.$notify({
          message: error.toString(),
          timeout: 5000,
          icon: "ni ni-bell-55",
          type: "danger",
        });
      }
    },
    async updateUsuario() {
      if (this.mSelectRol == null) {
        this.$notify({
          message: "Porfavor seleccione un ROL",
          timeout: 5000,
          icon: "ni ni-bell-55",
          type: "danger",
        });
        return;
      }

      if (this.mSelectSexo == null) {
        this.$notify({
          message: "Porfavor seleccione un TIPO DE SEXO",
          timeout: 5000,
          icon: "ni ni-bell-55",
          type: "danger",
        });
        return;
      }

      if(!validarCedula(this.dniUsuario)){
        this.$notify({
            message: "INGRESE UN NUMERO DE DNI / CEDULA VALIDO",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "warning",
          })

          return
      }

      if(!validarNumeroCelular(this.teleUsuario)){
        this.$notify({
            message: "INGRESE UN NUMERO DE CELULAR VALIDO",
            timeout: 5000,
            icon: "ni ni-bell-55",
            type: "warning",
          })

          return
      }

      try {
        var response = await this.$axios.put(
          process.env.baseUrl + "/update_user",
          {
            token: this.token,
            email_usuario: this.emailUsuario,
            contrasenia: this.passUsuario,
            nombre_usuario: this.nameUsuario,
            telefono_usuario: this.teleUsuario,
            dni_usuario: this.dniUsuario,
            sexo_usuario: this.mSelectSexo,
            fk_id_rol: this.mSelectRol,
          }
        );

        if (response.data.status_code == 200) {
          this.ModalUsuarioUpdate = false;
          this.readAllUsuarios();
        } else {
          this.$notify({
            message: response.data.msm,
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
    this.readRol();
    this.readAllUsuarios();
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