<template>
  <div id="app">
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{name: 'HomePage'}">
          <img
            src="./assets/logo.png"
            alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </router-link>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-start">
          <router-link
            class="navbar-item has-text-weight-bold has-text-warning"
            :to="{name: 'HomePage'}"
            >Home</router-link
          >
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-text-weight-bold has-text-warning">
            {{ usuarioLogado.nome }}
          </div>
          <a class="navbar-item has-text-warning" v-on:click="logout"  v-if="usuarioLogado.nome != undefined"
            >sing up</a
          >
        </div>
      </div>
    </nav>
    <router-view />
    <footer class="rodape has-background-black has-text-white">
      <div class="content has-text-centered">
        <div class="columns">
          
          <div class="column"><br><br><p><router-link :to="{name: 'HomePage'}" class="has-text-weight-bold has-text-white title is-3">oliveiratrade.com</router-link></p><a href="https://www.everymind.com.br/" class="has-text-weight-bold has-text-white title is-5">everymind.com.br</a></div>
          <div class="column"><br><p>Developed by: <span>Kassio Santos Silva</span></p> <p>Contato: <span>75 98299-1616</span></p> <p>email: <span>kassio.santos.silva@hotmail.com</span></p></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import ip from "./config/ipconfig";
export default {
  name: "App",
  async created() {
    await this.verificarLogin();
  },
  data() {
    return {
      showNav: true,
      usuarioLogado: {
        nome: undefined,
        id: undefined,
      },
    };
  },
  methods: {
    async verificarLogin() {
      if (!localStorage.getItem("token")) {
        this.usuarioLogado.nome = undefined;
        this.usuarioLogado.id = undefined;
        this.$router.push({ name: "FazerLogin" });
      } else {
        var req = {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        await axios
          .post(`${ip}/otvalidate`, {}, req)
          .then((res) => {
            this.usuarioLogado.nome = res.data.nome + ",";
            this.usuarioLogado.id = res.data.id;
            this.$router.push({ name: "HomePage" });
          })
          .catch(() => {
            localStorage.removeItem("token");
            this.$router.push({ name: "FazerLogin" });
          });
      }
    },
    async logout() {
      localStorage.removeItem("token");
      window.location.reload();
    },
  },
};
</script>

<style>
.rodape {
  height: 200px;
}
</style>
