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
              <el-select
                style="margin-right: 0.5rem"
                multiple
                collapse-tags
                v-model="mSelectTipoBanco"
                placeholder="TIPO DE BANCOS"
              >
                <el-option
                  v-for="item in mListTipoBanco"
                  :key="item.id_banco"
                  :label="item.detalle_banco"
                  :value="item.id_banco"
                >
                </el-option>
              </el-select>
            </div>
            <div class="div_derecha">
              <base-button size="sm" @click="readBancoUsuario()" type="primary"
                ><span class="btn-inner--icon"
                  ><i class="el-icon-search"></i></span
              ></base-button>
              <base-button size="sm" @click="showNuevaCuentaB()" type="default"
                ><span class="btn-inner--icon"
                  ><i class="ni ni-fat-add"></i></span
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
            :data="mListBancos"
            height="calc(100vh - 12.5rem)"
            style="width: 100%"
          >
            <el-table-column
              label="NUM CUENTA"
              prop="num_cuenta_bancaria"
              min-width="300"
            >
            </el-table-column>

            <el-table-column
              label="DETALLE BANCO"
              prop="detalle_banco"
              min-width="500"
            >
            </el-table-column>
          </el-table>
        </card>

        <modal
          :show.sync="oModalCuentaB"
          body-classes="p-0"
          modal-classes="modal-dialog-centered modal-sm"
        >
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mb-0"
          >
            <div class="text-muted text-center mb-3">
              <strong>NUEVA CUENTA BANCARIA</strong>
            </div>

            <div class="row">
              <el-select
                style="width: 100%"
                collapse-tags
                v-model="mSelectTipoBancoNuevo"
                placeholder="TIPO DE BANCO"
              >
                <el-option
                  v-for="item in mListTipoBanco"
                  :key="item.id_banco"
                  :label="item.detalle_banco"
                  :value="item.id_banco"
                >
                </el-option>
              </el-select>
            </div>
            <div class="row">
              <base-input
                style="width: 100%; margin-top: 1rem"
                v-model="numCuenta"
                placeholder="Numero de cuenta"
              ></base-input>
            </div>
          </card>

          <template slot="footer">
            <base-button type="default" @click="insertNuevaCuenta()">GUARDAR CAMBIOS</base-button>
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
  Message,
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
    [Message.name]: Message,
  },
  data() {
    return {
      mListTipoBanco: [],
      mListBancos: [],
      mSelectTipoBanco: null,
      oModalCuentaB: false,
      numCuenta: null,
      mSelectTipoBancoNuevo: null,
      token: this.$cookies.get("token_gipac"),
    };
  },
  methods: {
    showNuevaCuentaB() {
      this.oModalCuentaB = true;
      this.numCuenta = null;
      this.mSelectTipoBancoNuevo = null;
    },
    AllTipoBanco() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: process.env.baseUrl + "/tipo_banco",
        headers: {},
      };

      this.$axios
        .request(config)
        .then((response) => {
          this.mListTipoBanco.push(...response.data.datos);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    readBancoUsuario() {
      this.mListBancos = [];

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
    async insertNuevaCuenta() {
      try {
        if (this.mSelectTipoBancoNuevo == null) {
          Message.error({
            title: "CUENTA BANCARIA",
            message: "PORFAVOR SELECCIONE UN BANCO.",
          });
          return;
        }

        if (this.numCuenta == null) {
          Message.error({
            title: "CUENTA BANCARIA",
            message: "PORFAVOR INGRESE EL NUMERO DE CUENTA",
          });
          return;
        }

        var response = await this.$axios.post(
          process.env.baseUrl + "/create_cuenta",
          {
            token: this.token,
            cuenta: this.numCuenta,
            banco: this.mSelectTipoBancoNuevo,
          }
        );

        if (response.data.status_code == 200) {
          this.oModalCuentaB = false;
          this.readBancoUsuario();
        } else {
          Message.error({
            title: "CUENTA BANCARIA",
            message: response.data.msm,
          });
        }
      } catch (error) {
        Message.error({
          title: "CUENTA BANCARIA",
          message: error.toString(),
        });
      }
    },
  },
  mounted() {
    this.readBancoUsuario();
    this.AllTipoBanco();
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
