<template>
  <div class="has-background-warning">
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <!-- Login -->
        <div class="box has-background-black box-cadastro">
          <h4 class="title is-4 has-text-weight-bold has-text-white">
            Cadastro:
          </h4>

          <!-- Daqui -->
          <div class="field">
            <label class="label has-text-white">Nome:</label>
            <input
              class="input"
              type="text"
              placeholder="Nome"
              v-model="cadastro.nome"
            />
            <div v-if="erro.nome != undefined">
              <label class="help is-danger">{{ erro.nome }}</label>
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">Sobrenome:</label>
            <input
              class="input"
              type="text"
              placeholder="Sobrenome"
              v-model="cadastro.sobrenome"
            />
            <div v-if="erro.sobrenome != undefined">
              <label class="help is-danger">{{ erro.sobrenome }}</label>
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">CPF:</label>
            <input
              class="input"
              type="text"
              placeholder="CPF"
              v-model="cadastro.cpf"
              v-mask="'###.###.###-##'"
            />
            <div v-if="erro.cpf != undefined">
              <label class="help is-danger">{{ erro.cpf }}</label>
            </div>
          </div>

          <div class="field">
            <label class="label has-text-white">Email:</label>
            <input
              class="input"
              type="email"
              placeholder="email@email.com"
              v-model="cadastro.email"
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
              v-model="cadastro.senha"
            />
            <div v-if="erro.senha != undefined">
              <label class="help is-danger">{{ erro.senha }}</label>
            </div>
          </div>

          <!-- Até aqui -->

          <div class="control">
            <div class="columns">
              <div class="column">
                <br />
                <button
                  class="button is-warning has-text-black has-text-weight-bold"
                  v-on:click="cadastrar"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column"></div>
    </div>

    <!-- Modal -->
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <div class="card-content">
            <p class="title">Olá, {{ cadastro.nome }}</p>
            <p class="title">
              Seja muito bem vindo, seu cadastro foi realizado com sucesso.
            </p>
            <br />
            <p class="subtitle">
              Oliveira Trade
            </p>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item has-text-weight-bold">
              <span>
                Clique
                <router-link :to="{name: 'FazerLogin'}">aqui</router-link>
                para fazer login
              </span>
            </p>
          </footer>
        </div>
      </div>
      <router-link class="modal-close is-large" :to="{name: 'FazerLogin'}">aqui</router-link>
    </div>
    <!-- Modal Fim -->
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import ip from "../config/ipconfig";
import axios from "axios";

export default {
  directives: { mask },
  data() {
    return {
      showModal: false,
      cadastro: {
        nome: "",
        sobrenome: "",
        cpf: "",
        email: "",
        senha: "",
      },
      erro: {
        nome: undefined,
        sobrenome: undefined,
        cpf: undefined,
        email: undefined,
        senha: undefined,
      },
    };
  },
  methods: {
    async cadastrar() {
      this.cadastro.cpf = this.cadastro.cpf
        .replace(".", "")
        .replace("-", "")
        .replace(".", "");
      var formV = await this.formValidator();

      if (formV) {
        await axios
          .post(`${ip}/otusuario`, {
            nome: this.cadastro.nome,
            sobrenome: this.cadastro.sobrenome,
            cpf: this.cadastro.cpf,
            email: this.cadastro.email,
            senha: this.cadastro.senha,
          })
          .then((res) => {
            this.cadastro.nome = res.data.nome;
            this.showModal = true;
          })
          .catch((err) => {
            this.erro = err.response.data;
          });
      }
    },
    async formValidator() {
      var controle = true;

      if (!this.cadastro.nome) {
        this.erro.nome = "O campo Nome não pode estar vazio";
        controle = false;
      } else {
        this.erro.nome = "";
      }

      if (!this.cadastro.sobrenome) {
        this.erro.sobrenome = "O campo Sobrenome não pode estar vazio";
        controle = false;
      } else {
        this.erro.sobrenome = "";
      }

      if (!this.cadastro.cpf) {
        this.erro.cpf = "O campo Cpf não pode estar vazio";
        controle = false;
      } else {
        this.erro.cpf = "";
      }

      if (!this.cadastro.email) {
        this.erro.email = "O campo Email não pode estar vazio";
        controle = false;
      } else {
        this.erro.email = "";
      }

      if (!this.cadastro.senha) {
        this.erro.senha = "O campo Senha não pode estar vazio";
        controle = false;
      } else {
        this.erro.senha = "";
      }

      if (controle) {
        return true;
      } else {
        return false;
      }
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
.box-cadastro {
  margin-top: 18%;
}
</style>
