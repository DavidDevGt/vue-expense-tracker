<template>
    <h3>Historial</h3>
    <ul id="list" class="list">
        <li v-for="transaction in paginatedTransactions" :key="transaction.id"
            :class="transaction.amount < 0 ? 'minus' : 'plus'">
            {{ transaction.text }} <span>Q{{ transaction.amount }}</span>
            <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
        </li>
    </ul>
    <div class="pagination" v-if="totalPages > 1 && paginatedTransactions.length">
        <button @click="prevPage" :disabled="currentPage <= 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">Siguiente</button>
    </div>
</template>

<script setup>
import { defineProps, computed, ref, nextTick } from 'vue';

const emit = defineEmits(['transactionDeleted']);
const props = defineProps({
    transactions: {
        type: Array,
        required: true
    }
});

const pageSize = 10;
const currentPage = ref(1);

const totalPages = computed(() => {
    return Math.ceil(props.transactions.length / pageSize);
});

const paginatedTransactions = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return props.transactions.slice(start, end);
});

const deleteTransaction = (id) => {
    emit('transactionDeleted', id);

    nextTick(() => {
        if (currentPage.value > totalPages.value) {
            currentPage.value = totalPages.value; // Retrocede a la última página disponible
        }
    });
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};
</script>

<style scoped>
/* Estilos mejorados para la paginación */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    transform: scale(0.875);
}

.pagination button {
    background-color: #4c51bf;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    margin: 0 5px;
    padding: 10px 15px;
    transition: background-color 0.3s;
}

.pagination button:hover {
    background-color: #667eea;
}

.pagination span {
    margin: 0 10px;
}

/* Contenedor de la descripción */
.list li .transaction-text {
    flex-grow: 1;
    /* Permite que la descripción ocupe el espacio disponible */
    margin-right: 10px;
    /* Espacio entre la descripción y el monto */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.pagination button:disabled {
    background-color: #8FA2FA; /* Color más claro para indicar que está deshabilitado */
    cursor: not-allowed; /* Cambia el cursor para indicar que no se puede hacer clic */
}

</style>