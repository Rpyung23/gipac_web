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
                v-model="mSelectTipoSoporte"
                multiple
                collapse-tags
                placeholder="TIPO SOPORTE"
                style="margin-right: 0.5rem"
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
                <el-option label="FINALIZADO" :value="3"> </el-option>
              </el-select>
            </div>
            <div class="div_derecha">
              <base-button size="sm" @click="readAllSoporte()" type="primary"
                ><span class="btn-inner--icon"
                  ><i class="el-icon-search"></i></span
              ></base-button>
              <base-button
                size="sm"
                @click="showModalNuevoTicket()"
                type="success"
                ><span class="btn-inner--icon"
                  ><i class="ni ni-fat-add"></i> Nuevo Ticket</span
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
                    ><i class="ni ni-single-copy-04"></i></span
                ></base-button>

                <base-button
                  size="sm"
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

                <badge type="success" v-if="scope.row.estado == 3" class="mr-2"
                  >FINALIZADO</badge
                >
              </template>
            </el-table-column>
          </el-table>
        </card>
      </div>
    </base-header>

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
              <el-select
                disabled
                v-model="mSelectEstadoSoporteUpdate"
                collapse-tags
              >
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
              <label for="exampleFormControlTextarea1">RESPUESTA TICKET</label>
              <textarea
                class="form-control"
                v-model="solucionTicket"
                rows="4"
                disabled
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </modal>

    <modal :show.sync="oModalNuevoTicket">
      <h5 slot="header" class="modal-title" id="modal-title-default">
        INGRESAR NUEVO TICKET
      </h5>

      <form>
        <div class="row">
          <div class="col-md-12">
            <base-input
              v-model="asuntoTicketNuevo"
              placeholder="ASUNTO"
            ></base-input>
          </div>
          <div class="col-md-12">
            <el-select
              v-model="mSelectTipoSoporteNuevo"
              collapse-tags
              placeholder="TIPO SOPORTE"
              style="width: 100%; margin-bottom: 1rem"
            >
              <el-option
                v-for="item in mListTipoSoporte"
                :key="item.id_tipo_soporte"
                :label="item.detalle_soporte"
                :value="item.id_tipo_soporte"
              >
              </el-option>
            </el-select>
          </div>

          <div class="col-md-12">
            <textarea
              class="form-control"
              placeholder="DETALLE DEL TICKET"
              v-model="detalleTicketNuevo"
              rows="3"
            ></textarea>
          </div>

          <input
            type="file"
            id="fileInputImg"
            class="hidden-file-input"
            accept="image/*"
            @change="changeFotoTicket()"
            style="
              margin-top: 1rem;
              margin-right: 1rem;
              margin-left: 1rem;
              margin-bottom: 1rem;
            "
          />

          <input
            type="file"
            id="fileInputArchivo"
            class="hidden-file-input"
            accept=".pdf"
            style="margin-right: 1rem; margin-left: 1rem"
            @change="changePDFTicket()"
          />
        </div>
      </form>

      <template slot="footer">
        <base-button type="primary" @click="crearNuevoTicket()">Guardar Ticket</base-button>
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
  Notification,
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
    [Notification.name]: Notification,
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
      solucionTicket: "",

      oModalNuevoTicket: false,

      firebaseConfig: {
        apiKey: "AIzaSyDdA_Nzz1usmdrxOwb-BWn-Dgvxs6Ek5Bc",
        authDomain: "gipac-d45bf.firebaseapp.com",
        projectId: "gipac-d45bf",
        storageBucket: "gipac-d45bf.appspot.com",
        messagingSenderId: "554589708519",
        appId: "1:554589708519:web:19aa64dba952b31b2d4242",
      },
      appFirebase: null,

      oFotoTicketFirebase: null,
      oArchivoTicketFirebase: null,
      asuntoTicketNuevo: null,
      mSelectTipoSoporteNuevo: null,
      detalleTicketNuevo: null,
    };
  },
  methods: {
    showModalNuevoTicket() {
      this.oFotoTicketFirebase = null;
      this.oArchivoTicketFirebase = null;
      this.asuntoTicketNuevo = null;
      this.mSelectTipoSoporteNuevo = null;
      this.detalleTicketNuevo = null;
      this.oModalNuevoTicket = true;
    },
    showDetalleSoporte(item) {
      this.objTicketSoporte = item;
      this.modalDetalleSoporte = true;

      if (item.estado == 1) {
        this.mSelectEstadoSoporteUpdate = null;
      } else {
        this.mSelectEstadoSoporteUpdate = item.estado;
      }

      this.asuntoTicket = item.asunto_soporte;
      this.fechaTicket = item.fecha_apertura_;
      this.detalleTicket = item.detalle_soporte;
      this.solucionTicket = item.solucion_ticket;
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
        url: process.env.baseUrl + "/all_usuario_soporte",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          console.log(response.data.datos);
          this.mListSoporte.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeFotoTicket() {
      console.log("CHANGUE FOTO");
      var fileInput = document.getElementById("fileInputImg");
      // Los archivos seleccionados, pueden ser muchos o uno
      const archivos = fileInput.files;
      // Si no hay archivos salimos de la función y quitamos la imagen
      if (!archivos || !archivos.length) {
        //$imagenPrevisualizacionUpdate.src = "";
        //console.log("SIN ARCHICOS SELECT")
        return;
      }
      // Ahora tomamos el primer archivo, el cual vamos a previsualizar
      var oFileFoto = archivos[0];
      // Lo convertimos a un objeto de tipo objectURL
      var objectURL = URL.createObjectURL(oFileFoto);
      console.log(objectURL);

      this.uploadImage(oFileFoto);
    },
    uploadImage(oFileFoto) {
      try {
        this.oFotoTicketFirebase = null;
        var self = this;

        if (oFileFoto != null) {
          // Crea una referencia al almacenamiento de Firebase con el nombre de archivo que deseas
          var storageRef = firebase
            .storage()
            .ref("ticket_image/" + oFileFoto.name);

          // Sube el archivo a Firebase Storage
          var uploadTask = storageRef.put(oFileFoto);

          // Monitorea el progreso de la carga (opcional)
          uploadTask.on(
            "state_changed",
            function (snapshot) {
              // Aquí puedes obtener información sobre el progreso de la carga si lo deseas
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Progreso de carga: " + progress + "%");
            },
            function (error) {
              // Manejo de errores si ocurre alguno durante la carga
              console.error("Error al cargar la foto:", error);
            },
            function () {
              // Si la carga se completa exitosamente, puedes obtener la URL de la imagen
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  self.oFotoTicketFirebase = downloadURL;
                  console.log("URL de la foto subida:", downloadURL);
                });
            }
          );
        } else {
          console.log("FILE ES NULL");
        }
      } catch (error) {
        console.log(error);
      }
    },
    changePDFTicket() {
      console.log("CHANGUE PDF");
      var fileInput = document.getElementById("fileInputArchivo");
      // Los archivos seleccionados, pueden ser muchos o uno
      const archivos = fileInput.files;
      // Si no hay archivos salimos de la función y quitamos la imagen
      if (!archivos || !archivos.length) {
        //$imagenPrevisualizacionUpdate.src = "";
        //console.log("SIN ARCHICOS SELECT")
        return;
      }
      // Ahora tomamos el primer archivo, el cual vamos a previsualizar
      var oFileFoto = archivos[0];
      // Lo convertimos a un objeto de tipo objectURL
      var objectURL = URL.createObjectURL(oFileFoto);
      console.log(objectURL);

      this.uploadArchivo(oFileFoto);
    },
    uploadArchivo(oFileFoto) {
      try {
        this.oArchivoTicketFirebase = null;
        var self = this;

        if (oFileFoto != null) {
          // Crea una referencia al almacenamiento de Firebase con el nombre de archivo que deseas
          var storageRef = firebase
            .storage()
            .ref("ticket_archivo/" + oFileFoto.name);

          // Sube el archivo a Firebase Storage
          var uploadTask = storageRef.put(oFileFoto);

          // Monitorea el progreso de la carga (opcional)
          uploadTask.on(
            "state_changed",
            function (snapshot) {
              // Aquí puedes obtener información sobre el progreso de la carga si lo deseas
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Progreso de carga: " + progress + "%");
            },
            function (error) {
              // Manejo de errores si ocurre alguno durante la carga
              console.error("Error al cargar la PDF:", error);
            },
            function () {
              // Si la carga se completa exitosamente, puedes obtener la URL de la imagen
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  self.oArchivoTicketFirebase = downloadURL;
                  console.log("PDF de la foto subida:", downloadURL);
                });
            }
          );
        } else {
          console.log("FILE ES NULL");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async crearNuevoTicket() {
      try {
        if (this.detalleTicketNuevo == null) {
          Notification.error({ message: "PORFAVOR INGRESE EL DETALLE" });
          return;
        }

        if (this.asuntoTicketNuevo == null) {
          Notification.error({ message: "PORFAVOR INGRESE EL ASUNTO" });
          return;
        }

        if (this.mSelectTipoSoporteNuevo == null) {
          Notification.error({
            message: "PORFAVOR SELECCIONE UN TIPO DE SOPORTE",
          });
          return;
        }

        var response = await this.$axios.post(
          process.env.baseUrl + "/create_soporte",
          {
            token:this.token,
            tipo_soporte: this.mSelectTipoSoporteNuevo,
            detalle_soporte: this.detalleTicketNuevo,
            url_img: this.oFotoTicketFirebase,
            url_archivo: this.oArchivoTicketFirebase,
            asunto_soporte: this.asuntoTicketNuevo,
          }
        );

        if (response.data.status_code == 200) 
        {
          this.oModalNuevoTicket = false;
          Notification.success({ message: "TICKET CREADO CON EXITO" });
          this.readAllSoporte()
        } else {
          Notification.error({ message: "NO SE HA PODIDO CREAR EL TICKET" });
        }
      } catch (error) {
        Notification.error({ message: error.toString() });
      }
    },
  },
  mounted() {
    this.appFirebase = firebase.initializeApp(this.firebaseConfig);
    this.readAllTipoSoporte();
    this.readAllSoporte();
  },
};
</script>
<style>
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

body {
  overflow-y: hidden;
}

.card-bodyRPagosVehiculoProduccion {
  padding: 0rem !important;
  height: calc(100vh - 11.5rem);
  overflow: none;
}
</style>
