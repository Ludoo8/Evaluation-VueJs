<template>
    <div v-if="client">
      <!-- Titre et bouton supprimer -->
      <div class="row border-bottom pb-3 mb-3">
        <div class="col">
          <h1 v-if="isNewClient" class="h3">
            <i class="fa-solid fa-angle-down me-2" />Ajouter un client
          </h1>
          <h1 v-else class="h3">
            <i class="fa-solid fa-angle-down me-2" />Editer un client
          </h1>
        </div>
        <div v-if="!isNewClient" class="col text-end">
          <button @click="deleteClient(client)" class="btn btn-outline-danger">
            <i class="fa-solid fa-trash me-2" />
            Supprimer un client
          </button>
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-6">
          <h2 class="h5">Contact</h2>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="firstName"
              id="firstName"
              v-model="client.firstName"
              class="form-control"
              placeholder="Prénom"
              :class="{ 'is-invalid': !client.firstName }"
            />
            <label for="firstName" class="form-label">Prénom</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="lastName"
              id="lastName"
              v-model="client.lastName"
              class="form-control"
              placeholder="Nom"
              :class="{ 'is-invalid': !client.lastName }"
            />
            <label for="lastName" class="form-label">Nom</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="role"
              id="role"
              v-model="client.role"
              class="form-control"
              placeholder="Fonction"
              :class="{ 'is-invalid': !client.role }"
            />
            <label for="role" class="form-label">Fonction</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="tel"
              name="phone"
              id="phone"
              v-model="client.phone"
              class="form-control"
              placeholder="Téléphone"
              :class="{ 'is-invalid': !client.phone }"
            />
            <label for="phone" class="form-label">Téléphone</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              name="email"
              id="email"
              v-model="client.email"
              class="form-control"
              placeholder="Email"
              :class="{ 'is-invalid': !client.email }"
            />
            <label for="email" class="form-label">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="companyName"
              id="companyName"
              v-model="client.companyName"
              class="form-control"
              placeholder="Entreprise"
              :class="{ 'is-invalid': !client.companyName }"
            />
            <label for="companyName" class="form-label">Entreprise</label>
          </div>
        </div>
  
        <div class="col-md-6">
          <h2 class="h5">Coordonnées</h2>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="address1"
              id="address1"
              v-model="client.address1"
              class="form-control"
              placeholder="Adresse 1"
              :class="{ 'is-invalid': !client.address1 }"
            />
            <label for="address1" class="form-label">Adresse 1</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="address2"
              id="address2"
              v-model="client.address2"
              class="form-control"
              placeholder="Adresse 2"
            />
            <label for="address2" class="form-label">Adresse 2</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              v-model="client.postalCode"
              class="form-control"
              placeholder="Code Postal"
              :class="{ 'is-invalid': !client.postalCode }"
            />
            <label for="postalCode" class="form-label">Code Postal</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="city"
              id="city"
              v-model="client.city"
              class="form-control"
              placeholder="Ville"
              :class="{ 'is-invalid': !client.city }"
            />
            <label for="city" class="form-label">Ville</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="country"
              id="country"
              v-model="client.country"
              class="form-control"
              placeholder="Pays"
              :class="{ 'is-invalid': !client.country }"
            />
            <label for="country" class="form-label">Pays</label>
          </div>
        </div>
      </div>
  
      <p class="text-end">
        <button
          @click="submitForm()"
          :disabled="formInvalid"
          class="btn btn-outline-primary btn-lg px-5"
        >
          <i class="fa-solid fa-save me-2" />Enregistrer
        </button>
      </p>
      <pre>{{ client }}</pre>
    </div>
  </template>
  
  <script>
  import { useClientStore } from '@/stores/clients.js'
  import { mapActions, mapWritableState } from 'pinia'
  
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    computed: {
      ...mapWritableState(useClientStore, ['client']),
  
      isNewClient() {
        return this.id == '-1'
      },
  
      formInvalid() {
        return (
          !this.client ||
          !this.client.firstName ||
          !this.client.lastName ||
          !this.client.role ||
          !this.client.phone ||
          !this.client.email ||
          !this.client.companyName ||
          !this.client.address1 ||
          !this.client.postalCode ||
          !this.client.city ||
          !this.client.country
        )
      }
    },
    mounted() {
      this.setClient(this.id)
    },
    methods: {
      ...mapActions(useClientStore, ['onDeleteClient', 'onUpdateClient', 'onCreateClient', 'setClient']),
  
      submitForm() {
        if (this.isNewClient) {
          this.onCreateClient(this.client)
        } else {
          this.onUpdateClient(this.client)
        }
  
        this.$router.push({ path: '/clients' })
      },
  
      deleteClient(client) {
        this.onDeleteClient(client)
        this.$router.push({ path: '/clients' })
      }
    }
  }
  </script>
  
  <style scoped>
  .form-floating {
    margin-bottom: 1rem;
  }
  </style>
  