<template>
  <div class="has-background-warning">
    <div class="columns">
      <div class="column">
        <figure class="image">
          <img src="../assets/oliveiratradelogo.png" alt="" />
        </figure>
      </div>
      <div class="column">
        <!-- Login -->
        <div class="box has-background-black box-login">
          <h4 class="title is-4 has-text-weight-bold has-text-white">Login</h4>
          <div class="field">
            <label class="label has-text-white">Email:</label>
            <input
              class="input"
              type="email"
              placeholder="email@email.com"
              v-model="email"
            />
            <div v-if="erro.email != undefined">
              <label class="help is-danger">{{ erro.email }}</label>
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">Senha:</label>
            <input
              class="input"
              type="password"
              placeholder="********"
              v-model="senha"
            />
            <div v-if="erro.senha != undefined">
              <label class="help is-danger">{{ erro.senha }}</label>
            </div>
          </div>

          <div class="control">
            <div class="columns">
              <div class="column">
                <button
                  class="button is-warning has-text-black has-text-weight-bold"
                  v-on:click="logar"
                >
                  Sing in
                </button>
              </div>
              <div class="column has-text-right">
                <router-link :to="{name: 'FazerCadastro'}">
                  <div class="label help has-text-white mt-4">
                    Fazer cadastro
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ip from "../config/ipconfig";
import axios from "axios";
export default {
  created() {},
  data() {
    return {
      email: "",
      senha: "",
      erro: {
        email: undefined,
        senha: undefined,
      },
      nome: undefined,
    };
  },
  methods: {
    async logar() {
      await axios
        .post(`${ip}/otlogin`, {
          email: this.email,
          senha: this.senha,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.nome = res.data.nome;
          window.location.reload();
        })
        .catch((err) => {
          this.erro = err.response.data;
        });
    },
  },
};
</script>
  
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}
.box-login {
  margin-top: 22%;
  margin-right: 15%;
}
.rodape {
  height: 200px;
}
</style>
  