<template>
  <Navbar />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
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
const transactionError = ref('');
const amountError = ref('');

onMounted(async () => {
  try {
    const response = await TransactionService.getTransactions();
    transactions.value = response;
  } catch (error) {
    toast.error("Error al cargar transacciones: " + error.message);
  }
});

const total = computed(() =>
  transactions.value.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)
);

const income = computed(() =>
  transactions.value
    .filter((transaction) => parseFloat(transaction.amount) > 0)
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)
    .toFixed(2)
);

const expenses = computed(() =>
  transactions.value
    .filter((transaction) => parseFloat(transaction.amount) < 0)
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0)
    .toFixed(2)
);

const validateTransaction = (transactionData) => {
  transactionError.value = '';
  amountError.value = '';

  if (!transactionData.text.trim()) {
    transactionError.value = 'Por favor ingresa un nombre para la transacción.';
    return false;
  }

  const amountRegex = /^-?\d+(\.\d{1,2})?$/; // Permite números con hasta dos decimales, negativos o positivos
  if (!amountRegex.test(transactionData.amount.toString())) {
    amountError.value = 'Por favor ingresa un monto válido (ej. 50, -20.50).';
    return false;
  }

  return true;
};

// Load transaction
const loadTransactions = async () => {
  try {
    const response = await TransactionService.getTransactions();
    transactions.value = response;
  } catch (error) {
    toast.error("Error al cargar transacciones: " + error.message);
  }
};


// Add transaction
const handleTransactionSubmitted = async (transactionData) => {
  if (!validateTransaction(transactionData)) {
    if (transactionError.value) {
      toast.error(transactionError.value);
    }
    if (amountError.value) {
      toast.error(amountError.value);
    }
    return;
  }
  try {
    const newTransaction = await TransactionService.createTransaction(
      transactionData.text,
      parseFloat(transactionData.amount) // Asegúrate de que el monto sea un número
    );
    transactions.value.push({ ...newTransaction, amount: parseFloat(newTransaction.amount) });
    loadTransactions();
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
    loadTransactions();
    toast.success("Transacción eliminada con éxito.");
  } catch (error) {
    toast.error("Error al eliminar la transacción: " + error.message);
  }
};
</script>
