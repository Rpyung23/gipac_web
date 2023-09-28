<template>
  <div class="content">
    <base-header>
      <div class="align-items-center py-3">
        <card
          class="no-border-card col"
          style="margin-bottom: 0.5rem"
          body-classes="px-0 pb-1 card-bodyTopOpcionesRPagosVehiculoPRoduccionPanelDespachoBusqueda"
          footer-classes="pb-2"
        >
          <div class="container_date_picker">
            <el-date-picker
            type="date"
            placeholder="Select date and time"
            style="margin-right: 0.5rem"
            v-model="fechaInicial"
          >
          </el-date-picker>

          <el-date-picker
            type="date"
            placeholder="Select date and time"
            style="margin-right: 0.5rem"
            v-model="fechaFinal"
          >
          </el-date-picker>

          <el-select
                v-model="mSelectUsuario"
                multiple
                filterable
                collapse-tags
                placeholder="USUARIOS"
              >
                <el-option
                  v-for="item in mListUsuario"
                  :key="item.email_usuario"
                  :label= "item.nombre_usuario"
                  :value="item.email_usuario"
                >
                </el-option>
              </el-select>

          </div>

          <div class="container_bsuqueda">
            <base-button icon type="primary" size="sm" @click="readReporte1()">
            <span class="btn-inner--icon"><i class="el-icon-search"></i></span>
          </base-button>
          </div>
        </card>

        <card
          class="no-border-card"
          style="margin-bottom: 0rem"
          body-classes="card-bodyRSalidasControles px-0 pb-1"
          footer-classes="pb-2"
        >
          <embed
            :src="base64PDFSALIDACONTROLES"
            type="application/pdf"
            width="98.7%"
            height="98.7%"
          />

          <div>
            <!--<el-table
              v-loading="loadingTableRSalidasFrecuenciasControles"
              element-loading-text="Cargando Datos..."
              :data="mListSalidasFrecuenciasControles"
              row-key="id"
              class="tablePanelControlProduccion"
              header-row-class-name="thead-dark"
              height="calc(100vh - 13rem)"
            >
              <el-table-column
                v-for="column in tableColumnsUnidadesFlotaVehicular"
                :key="column.label"
                v-bind="column"
              >
              </el-table-column>

              <el-table-column
                label="PEN ($)"
                min-width="170"
                prop="PenaCtrlSali_d"
              >
                <template slot-scope="scope">
                  <strong style="color: black">{{
                    scope.row.PenaCtrlSali_d
                  }}</strong>
                </template>
              </el-table-column>

              <div slot="empty"></div>
            </el-table>-->
          </div>
        </card>
      </div>
    </base-header>
  </div>
</template>
<script>
import {getFechaImpresion} from "../util/fechas"
import {getFecha_dd_mm_yyyy} from "../util/fechas"
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {
  Table,
  TableColumn,
  Select,
  Option,
  Autocomplete,
  DatePicker,
  RadioButton,
  Radio,
  Notification,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Popover,
  Button,
  Loading,
} from "element-ui";
import jwt_decode from "jwt-decode";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import { BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import swal from "sweetalert2";
import Tabs from "@/components/argon-core/Tabs/Tabs";
import TabPane from "@/components/argon-core/Tabs/Tab";
import { getBase64LogoReportes } from "../util/logoReport";
export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  components: {
    Tabs,
    TabPane,
    BasePagination,
    flatPicker,
    RouteBreadCrumb,
    [DatePicker.name]: DatePicker,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [Notification.name]: Notification,
    [Autocomplete.name]: Autocomplete,
    [TableColumn.name]: TableColumn,
    [RadioButton.name]: RadioButton,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    [CheckboxButton.name]: CheckboxButton,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popover.name]: Popover,
    [Button.name]: Button,
  },
  data() {
    return {
      base64PDFSALIDACONTROLES: "",
      mListaReporte1: [],
      nameUsuario: "",
      fechaInicial:null,
      fechaFinal:null,
      mListUsuario:[],
      mSelectUsuario:null
    };
  },
  methods: {
    async readReporte1() 
    {
      this.mListaReporte1 = []
      swal.fire({
        title: "Generando Reporte ...",
        width: 600,
        padding: "3em",
        background: "#fff",
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        allowOutsideClick: false,
        backdrop: `
                    rgba(0, 0, 0, 0.5)
                    left top
                    no-repeat
                  `,
      });

      try {
        var datos = await this.$axios.post(process.env.baseUrl + "/reporte_rubro", {
          token: this.token,
          fechaI:getFecha_dd_mm_yyyy(this.fechaInicial),
          fechaF:getFecha_dd_mm_yyyy(this.fechaFinal),
          usuario: this.mSelectUsuario == null || this.mSelectUsuario.length <=0 ? "*" : this.mSelectUsuario
        });

        if (datos.data.status_code == 200) {
          this.mListaReporte1.push(...datos.data.datos);

          console.log("-----------------------------------------------------");
          console.log(this.mListaReporte1);
          console.log("-----------------------------------------------------");
        } else {
          this.$notify({
            title: "Reporte 2",
            message: datos.data.msm,
            type: "warning",
          });
        }
      } catch (error) {
        this.$notify({
          title: "Reporte 1",
          message: error.toString(),
          type: "danger",
        });
      }

      await this.createPDFSalidasControles();
      swal.close();
    },
    async createPDFSalidasControles() 
    {
      var totalRecaudado = 0
      var totalPendiente = 0


      var resultadoString = [
        [
          {
            text: "DEPARTAMENTO",
            fontSize: 8.5,
            bold: true,
            fillColor: "#039BC4",
            color: "white",
            alignment: "center",
          },
          {
            text: "ZONA",
            fontSize: 8.5,
            bold: true,
            fillColor: "#039BC4",
            color: "white",
            alignment: "center",
          },          {
            text: "USUARIO",
            fontSize: 8.5,
            bold: true,
            fillColor: "#039BC4",
            color: "white",
            alignment: "center",
          },
          {
            text: "D. RUBRO",
            fontSize: 8.5,
            bold: true,
            fillColor: "#039BC4",
            color: "white",
            alignment: "center",
          },
          {
            text: "P. RUBRO",
            fontSize: 8.5,
            bold: true,
            fillColor: "#039BC4",
            color: "white",
            alignment: "center",
          },
          {
            text: "F. ASIGNACION",
            fontSize: 8.5,
            bold: true,
            fillColor: "#039BC4",
            color: "white",
            alignment: "center",
          },
          {
            text: "ESTADO",
            fontSize: 8.5,
            bold: true,
            fillColor: "#039BC4",
            color: "white",
            alignment: "center",
          },
        ],
      ];

      for (var i = 0; i < this.mListaReporte1.length; i++) 
      {
        if(this.mListaReporte1[i].estado == 1 || this.mListaReporte1[i].estado == 2)
        {
          totalPendiente = totalPendiente+parseFloat(this.mListaReporte1[i].precio_rubro)

        }else if(this.mListaReporte1[i].estado == 3)
        {
          totalRecaudado = totalRecaudado+parseFloat(this.mListaReporte1[i].precio_rubro)
        }


        resultadoString.push([
          {
            text: this.mListaReporte1[i].fk_code_departamento,
            fontSize: 8.5,
            alignment: "center",
          },
          {
            text: this.mListaReporte1[i].fk_sector,
            fontSize: 8.5,
            alignment: "center",
          },
          {
            text: this.mListaReporte1[i].nombre_usuario,
            fontSize: 8.5,
            alignment: "center",
          },
          {
            text: this.mListaReporte1[i].detalle_rubro,
            fontSize: 8.5,
            alignment: "center",
          },
          {
            text: this.mListaReporte1[i].precio_rubro,
            fontSize: 8.5,
            alignment: "center",
          },
          {
            text: this.mListaReporte1[i].fechaAsignacion,
            fontSize: 8.5,
            alignment: "center",
          },
          {
            text: (this.mListaReporte1[i].estado == 1 ? "EN ESPERA" : this.mListaReporte1[i].estado == 2 ? "RESERVADO" : "PAGADO"),
            fontSize: 8.5,
            alignment: "center",
          },
        ]);
      }

      var docDefinition = {
        pageSize: "A4",
        pageMargins: [30, 80, 40, 30],
        header: {
          margin: 15,
          columns: [
            {
              image: getBase64LogoReportes(),
              width: 100,
              height: 50,
              margin: [30, 0, 0, 0],
            },
            {
              layout: "noBorders",
              table: {
                widths: ["*"],
                body: [
                  [
                    {
                      text: "PAGOS DE RUBROS",
                      alignment: "center",
                      fontSize: 16,
                      bold: true,
                    },
                  ],
                  [
                    {
                      text: "Dir : Ciudad Quitumbe",
                      alignment: "center",
                      fontSize: 8,
                    },
                  ],
                ],
              },
            },
          ],
        },
        content: [
          {
            text: ("DESDE EL "+getFecha_dd_mm_yyyy(this.fechaInicial)+" HASTA "+getFecha_dd_mm_yyyy(this.fechaFinal))
          },
          
          {
            text: "*",
            fontSize: 10,
            color: "#ffffff",
          },
          {
            table: {
              headerRows: 1,
              widths: [75,50,75,75,50,75,75],
              body: resultadoString,
            },
          },
          {
            text: "*",
            fontSize: 10,
            color: "#ffffff",
          },
          {
            text: ("TOTAL RECAUDADO : "+totalRecaudado.toFixed(2)),
            fontSize: 18,
            bold:true,
          },
          {
            text: ("TOTAL PENDIENTE : "+totalPendiente.toFixed(2)),
            fontSize: 18,
            bold:true,
          },
          {
            text:"*",
            fontSize:75,
            color:"#ffffff"
          },
          {
            layout: 'noBorders', // optional
            table: {
              headerRows: 0,
              widths: [170],
              body: [
                [
                  {
                    text: "_________________________________________",
                    fontSize: 8.5,
                    bold: true,
                    alignment: "center",
                  },
                ],
                [
                  {
                    text: this.nameUsuario,
                    fontSize: 8.5,
                    alignment: "center",
                  },
                ],
                [
                  {
                    text: ("F. Impresión : "+getFechaImpresion()),
                    fontSize: 7,
                    alignment: "center",
                  },
                ]
              ],
            },
          },
        ],
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);

      pdfDocGenerator.getBlob((blob) => {
        this.base64PDFSALIDACONTROLES = URL.createObjectURL(blob);
        console.log(this.base64PDFSALIDACONTROLES);
      });
    },
    initFechaActualSalidaBusquedaPanel() {
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
      this.fechaInicial =
        format + " " + hora + ":" + minutes + ":00";
      this.fechaFinal =
        format + " " + hora + ":" + minutes + ":00";
    },

    async readAllUsuarios() {
      this.mListUsuario = [];

      try {
        var data = JSON.stringify({
          token: this.$cookies.get("token_gipac"),
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

  },
  mounted() {
    this.readAllUsuarios()
    this.initFechaActualSalidaBusquedaPanel()
    var token = this.$cookies.get("token_gipac")
      this.nameUsuario = jwt_decode(token).NameUsua
  },
};
</script>
<style>

.form-controlPersonal {
  display: block;
  width: 100%;
  /* height: calc(1.5em + 1.25rem + 2px); */
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #8898aa;
  background-color: #fff;
  background-clip: padding-box;
  outline: none;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  margin-bottom: 0rem;
  box-shadow: 0 3px 2px rgba(233, 236, 239, 0.05);
  transition: all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.cardTextoRPagosVehiculoProduccionPanelDespachoBusqueda {
  display: flex;
  align-items: center;
}

.cardSelectRubrosEstadosPagosVehiculoProduccionContainerPanelDespachoBusqueda {
  display: flex;
  justify-content: space-between;
}
.no-border-card .card-footer {
  border-top: 0;
}

.card-bodyRSalidasControles {
  padding: 0rem !important;
  height: calc(100vh - 10rem);
  overflow: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-bodyReserva {
  padding-top: 0.25rem !important;
  display: flex;
  justify-content: flex-start;
}

.card-bodyTopOpcionesRPagosVehiculoPRoduccionPanelDespachoBusqueda {
  padding-top: 0.25rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
