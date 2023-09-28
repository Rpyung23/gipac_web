<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7"></div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--16 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-header bg-transparent">
              <div class="text-muted text-center">
                <small
                  ><img src="/img/brand/logo_login.png" class="logo-login"
                /></small>
              </div>
            </div>
            <div class="card-body">
              <div style="margin-bottom: 0.5rem;">
                <div class="text-center">
                  <strong>GIPAC</strong>
                </div>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form role="form" @submit.prevent="handleSubmit(loginApi)">
                  <base-input
                    alternative
                    class="mb-3"
                    type="text"
                    :rules="{ required: true, email: false }"
                    prepend-icon="ni ni-single-02"
                    v-model="user"
                    placeholder="Correo Electrónico / Usuario"
                    name="Correo Electrónico / Usuario"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    :rules="{ required: true, min: 4 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    v-model="pass"
                    placeholder="Contraseña"
                    name="Contraseña"
                  >
                  </base-input>

                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4"
                      >Ingresar al sistema</base-button
                    >
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

.mt--16 {
  margin-top: -16rem !important;
}

.logo-login {
  height: 4rem !important;
  width: 12rem !important;
}
</style>
<script>
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode";

export default {
  layout: "AuthLayout",
  data() {
    return {
      user: null,
      pass: null,
    };
  },
  methods: {
    async loginApi()
    {
      try {
        var data = await this.$axios.post(process.env.baseUrl+"/login_user",{
        user: this.user,
        pass : this.pass
      })

      console.log(data.data)


      if (data.data.status_code != 300) 
        {
          Swal.fire({
            title: "GIPAC",
            text: "Bienvenido ",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) 
            {
              this.$cookies.set("token_gipac",data.data.token)

              var token = this.$cookies.get("token_gipac")
              var oRol = jwt_decode(token).RolUsua

              if(oRol == 1 ){
                this.$router.push("/dashboard");
              }else{
                this.$router.push("/dashboard_usuario");
              }
            }
          });
        } else {
          Swal.fire({
            title: "GIPAC",
            text: "Credenciales no válidas",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }

      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    this.$cookies.remove("token_gipac")
  },
};
</script>
