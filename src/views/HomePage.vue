<template>
    <div id="app" class="has-background-warning">  
      <div class="columns">
        <div class="column">
          <img class="img-boasvindas" src="../assets/boasvindas.png" alt="boas vindas">
        </div>
        <div class="column">
          <figure class="image">
            <img src="../assets/oliveiratradelogo.png" alt="" />
          </figure>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
    async created() {
    await this.verificarLogin()
    },
    data() {
      return {
        showNav: true,
        usuarioLogado: {
          nome: '',
          id: ''
        },
      };
    },
    methods: {
      async verificarLogin() {
        if (!localStorage.getItem("token")) {
          this.usuarioLogado.nome = undefined;
          this.usuarioLogado.id = undefined;
          this.$router.push({ name: "FazerLogin" });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .img-boasvindas{
    min-height: 100%;
  }
  </style>
  