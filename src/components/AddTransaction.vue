<template>
    <h3>Agregar transacción</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Descripción</label>
            <input type="text" id="text" v-model="text" placeholder="Ingresar descripción..." ref="descriptionRef" />
        </div>
        <div class="form-control">
            <label for="amount">Monto</label>
            <input type="text" v-model="amount" id="amount" placeholder="500 para ingresos, -500 para gastos..." />
        </div>
        <button class="btn">Agregar transacción</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import {useToast} from 'vue-toastification';

const text = ref('');
const amount = ref('');
const descriptionRef = ref(null);

const emit = defineEmits(['transactionSubmitted']);

const toast = useToast();

const onSubmit = () => {
    if (!text.value || !amount.value) {
        toast.error('Both fields are required!');
        return;
    }

    const transactionData = {
        text: text.value,
        amount: parseFloat(amount.value)
    };

    emit('transactionSubmitted', transactionData);

    text.value = '';
    amount.value = '';

    // Devolver el foco al input de la descripción
    descriptionRef.value.focus();
};

</script>