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
              <base-button
                size="sm"
                @click="readAllPAgoUsuarios()"
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
            <el-table-column prop="estado" min-width="190">
              <template slot-scope="scope">
                <base-button
                  size="sm"
                  @click="showModalRecibo(scope.row)"
                  v-if="scope.row.estado == 3 ? true : false"
                  type="success"
                  title="VER RECIBO"
                >
                  <span class="btn-inner--icon"
                    ><i class="ni ni-single-copy-04"></i
                  ></span>
                </base-button>

                <base-button
                  size="sm"
                  type="default"
                  v-if="scope.row.estado == 1 ? true : false"
                  @click="showModalDetallePAgoAdmin(scope.row)"
                  ><span class="btn-inner--icon"
                    ><i class="ni ni-money-coins"></i></span
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
                  >VERIFICANDO RECIBO</badge
                >

                <badge
                  type="success"
                  v-if="scope.row.estado == 3 ? true : false"
                  class="mr-2"
                  >PAGO REALIZADO</badge
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
          modal-classes="modal-dialog-centered modal-sm"
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

          <div class="row" style="margin-bottom: 1rem">
            <div class="col-md-12">
              <el-select
                style="width: 100%"
                v-model="oValueSelectCuenta"
                placeholder="Cuenta Bancaria"
              >
                <el-option
                  v-for="item in mListBancos"
                  :key="item.id_banco"
                  :label="item.string_banco"
                  :value="item.num_cuenta_bancaria"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="row">
            <img
              id="imagenPrevisualizacionEvento"
              :src="oFotoRecibo"
              style="width: 100%; height: 17rem"
              alt=""
            />

            <!--<base-button
              for="fileInput"
              class="btn-icon"
              style="width: 100%"
              type="default"
              icon="ni ni-bag-17"
              >SUBIR FOTO</base-button
            >-->

            <input
              type="file"
              id="fileInput"
              class="hidden-file-input"
              accept="image/*"
              @change="changeFoto()"
            />
          </div>

          <template slot="footer">
            <base-button type="success" @click="sendReciboPago()"
              >AUTORIZAR PAGO</base-button
            >
          </template>
        </modal>

        <modal
          :show.sync="oModalRecibo"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm"
        >
          <card
            type="secondary"
            header-classes="bg-transparent pb-5"
            class="border-0 mb-0"
          >
            <iframe
              :src="baseURlPDFPanelReciboPago"
              style="width: 100%; height: 33rem"
            ></iframe>
          </card>
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
  Message,
} from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import LightTable from "~/components/tables/RegularTables/LightTable";
import { getFecha_dd_mm_yyyy } from "../util/fechas";

import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

      firebaseConfig: {
        apiKey: "AIzaSyDdA_Nzz1usmdrxOwb-BWn-Dgvxs6Ek5Bc",
        authDomain: "gipac-d45bf.firebaseapp.com",
        projectId: "gipac-d45bf",
        storageBucket: "gipac-d45bf.appspot.com",
        messagingSenderId: "554589708519",
        appId: "1:554589708519:web:19aa64dba952b31b2d4242",
      },
      appFirebase: null,
      oFileFoto: null,

      oFotoRecibo:
        "https://firebasestorage.googleapis.com/v0/b/gipac-d45bf.appspot.com/o/recibos%2Fsin_Foto.jpg?alt=media",
      oFotoReciboFirebase: null,
      mListDepartamento: [],
      oValueSelectCuenta: null,
      mListBancos: [],

      oModalRecibo: false,
      baseURlPDFPanelReciboPago: null,
    };
  },
  methods: {
    async showModalRecibo(item) {
      console.log(item);
      this.baseURlPDFPanelReciboPago = null;
      this.oModalRecibo = true;

      var empresa = [
        {
          text: "GIPAC",
          fontSize: 12,
          bold: true,
          alignment: "center",
        },
      ];

      var docDefinition = {
        // a string or { width: 190, height: number }
        pageSize: { width: 220, height: "auto" },
        pageMargins: [15, 15, 15, 15],
        compress: true,
        // header: [empresa],

        content: [
          {
            headerRows: 0,
            fontSize: 12,
            bold: true,
            layout: "noBorders", // optional
            table: {
              widths: ["*"],
              body: [empresa],
            },
          },

          {
            bold: true,
            fontSize: 9,
            alignment: "center",
            layout: "noBorders", // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 0,
              widths: ["*"],
              body: [["COMPROBANTE DE PAGO"]],
            },
          },
          {
            fontSize: 6,
            layout: "noBorders", // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers

              body: [["."]],
            },
          },
          {
            fontSize: 9,
            alignment: "left",
            layout: "noBorders", // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 0,
              widths: ["auto", "*"],
              body: [
                [
                  { text: "DEPARTAMENTO ", bold: true },
                  { text: item.fk_code_departamento },
                ],
                [{ text: "DETALLE ", bold: true }, { text: item.motivo }],
                [
                  { text: "F. PAGO ", bold: true },
                  { text: item.fecha_creacion },
                ],
                [
                  { text: "ARRENDATARIO ", bold: true },
                  { text: item.nombre_usuario },
                ],
              ],
            },
          },

          { text: ".", margin: [10, 0, 0, 0], color: "#FFFFFF" },

          {
            fontSize: 9,
            alignment: "center",
            layout: "noBorders", // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 0,
              widths: ["*"],
              body: [[{ qr: item.id_pago_departamento.toString(), fit: 75 }]],
            },
          },

          { text: ".", margin: [10, 0, 0, 0], color: "#FFFFFF" },
        ],
        
      };

      var pdfDocGenerator = pdfMake.createPdf(docDefinition);

      pdfDocGenerator.getDataUrl((dataUrl) => {
        this.baseURlPDFPanelReciboPago = dataUrl;
      });
    },
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
    readAllPAgoUsuarios() {
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
        url: process.env.baseUrl + "/all_pagos_usuario",
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
    uploadImage() {
      try {
        this.oFotoReciboFirebase = null;
        var self = this;

        if (this.oFileFoto != null) {
          // Crea una referencia al almacenamiento de Firebase con el nombre de archivo que deseas
          var storageRef = firebase
            .storage()
            .ref("recibos/" + this.oFileFoto.name);

          // Sube el archivo a Firebase Storage
          var uploadTask = storageRef.put(this.oFileFoto);

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
                  self.oFotoReciboFirebase = downloadURL;
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
    changeFoto() {
      console.log("CHANGUE FOTO");
      var fileInput = document.getElementById("fileInput");
      // Los archivos seleccionados, pueden ser muchos o uno
      const archivos = fileInput.files;
      // Si no hay archivos salimos de la función y quitamos la imagen
      if (!archivos || !archivos.length) {
        //$imagenPrevisualizacionUpdate.src = "";
        //console.log("SIN ARCHICOS SELECT")
        return;
      }
      // Ahora tomamos el primer archivo, el cual vamos a previsualizar
      this.oFileFoto = archivos[0];
      // Lo convertimos a un objeto de tipo objectURL
      const objectURL = URL.createObjectURL(this.oFileFoto);
      // Y a la fuente de la imagen le ponemos el objectURL
      document.getElementById("imagenPrevisualizacionEvento").src = objectURL;
      this.uploadImage();
    },
    readBancoUsuario() {
      let data = JSON.stringify({
        token: this.token,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/mis_cuentas",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListBancos.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async sendReciboPago() {
      if (this.oValueSelectCuenta == null) {
        Message.error({
          title: "PAGO USUARIO",
          message: "PORFAVOR SELECCIONE UNA BANCO.",
        });

        return;
      }

      if (this.oFotoReciboFirebase == null) {
        Message.info({
          title: "PAGO USUARIO",
          message: "LA FOTO SE ENCUENTRA EN PROCESO DE SUBIDA....",
        });
        return;
      }

      try {
        var response = await this.$axios.put(
          process.env.baseUrl + "/send_pago_usuario",
          {
            token: this.token,
            foto: this.oFotoReciboFirebase,
            cuenta: this.oValueSelectCuenta,
            id_pago: this.objSelectPago.id_pago_departamento,
          }
        );

        if (response.data.status_code == 200) {
          this.readAllPAgoUsuarios();
          this.ModalDetallePagoAdmin = false;
        } else {
          Notification.error({ message: response.data.msm });
        }
      } catch (error) {
        Notification.error({ message: error.toString() });
      }
    },
  },
  mounted() {
    this.readBancoUsuario();
    this.appFirebase = firebase.initializeApp(this.firebaseConfig);
    this.readAllDepartamentoOcupados();
    this.initFechaActual();
    this.readAllPAgoUsuarios();
  },
};
</script>
<style>
/*.hidden-file-input {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}*/

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
