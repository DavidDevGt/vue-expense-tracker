<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList
      :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    <Logout />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Balance from "@/components/Balance.vue";
import IncomeExpenses from "@/components/IncomeExpenses.vue";
import TransactionList from "@/components/TransactionList.vue";
import AddTransaction from "@/components/AddTransaction.vue";
import Logout from "@/components/Logout.vue";
import TransactionService from "@/services/TransactionService";

import { useToast } from "vue-toastification";

import { ref, computed, onMounted } from "vue";

const toast = useToast();

const transactions = ref([]);

onMounted(async () => {
  try {
    const response = await TransactionService.getTransactions();
    transactions.value = response;
  } catch (error) {
    toast.error("Error al cargar transacciones: " + error.message);
  }
});

const total = computed(() =>
  transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0)
);

const income = computed(() =>
  transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2)
);

const expenses = computed(() =>
  transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2)
);

// Add transaction
const handleTransactionSubmitted = async (transaction) => {
  try {
    const newTransaction = await TransactionService.addTransaction(
      transactionData.text,
      transactionData.amount
    );
    transactions.value.push(newTransaction);
    toast.success("Transacción agregada con éxito.");
  } catch (error) {
    toast.error("Error al agregar la transacción: " + error.message);
  }
};

// Delete transaction
const handleTransactionDeleted = async (id) => {
  try {
    await TransactionService.deleteTransaction(id);
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== id
    );
    toast.success("Transacción eliminada con éxito.");
  } catch (error) {
    toast.error("Error al eliminar la transacción: " + error.message);
  }
};
</script>
