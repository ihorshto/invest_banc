<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

let investments = ref([]);


const route = useRoute();

let myDate = ref({});





let loadInvestmentItem = function () {
    console.log('Load invest func');
    fetch(`http://localhost:8000/office/investments/${route.params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {


            myDate.value = data;

            console.log('myDate', myDate)

            investments.value = data;
        })
}



loadInvestmentItem();

</script>

<template>
    <h2>
        Investment Item
    </h2>
    <p>id: {{ myDate.id }}</p>
</template>
