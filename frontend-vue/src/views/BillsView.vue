<template>
  <div>
    <!-- titre et bouton ajouter -->
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des factures</h1>
      </div>
      <div class="col text-end">
        <router-link to="/edit-bill/-1" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2" />
          Ajouter une facture
        </router-link>
      </div>
    </div>

    <TableList>
    
      <BillTableRow
        v-for="bill in bills"
        :key="bill.id"
        :bill="bill"
        @edit="onEditBill($event)"
        @delete="onDeleteBill($event)"
      />
    </TableList>
    <pre>
      {{ bills }}
    </pre>

  </div>
</template>

<script>
import BillTableRow from '@/components/TableList/BillTableRow.vue'
import TableList from '@/components/TableList/TableList.vue'
import { useBillStore } from '@/stores/bill.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TableList,
    BillTableRow
  },
  computed: {
    ...mapState(useBillStore, ['bills'])
  },


  async mounted() {

    await this.getAllBills()
  },

  methods: {
    ...mapActions(useBillStore, ['onDeleteBill', 'getAllBills']),
    onEditBill(bill) {
      console.log('edit bill with id: ', bill.id)

      this.$router.push({
        name: 'edit-bill',
        params: {
          id: bill.id
        }
      })
 
    }
  }
}
</script>

<style scoped></style>
