<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'


// let investments = ref([]);
const route = useRoute();
const router = useRouter();



let investment = ref({});

let loadInvestmentItem = function () {
  console.log('Load invest func');
  fetch(`http://localhost:8000/investments/${route.params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {


      investment.value = data;
      /*  console.log('myDate', myDate.value) */
      console.log("data", data);

    })
}

let handleSubmit = function () {
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let sum = document.getElementById("sum").value;

  fetch(`http://localhost:8000/investments/${route.params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: description,
      date: date,
      sum: sum
    })
  })
    .then(response => response.json())
    .then(data => {


      console.log(router.push('/investments'));
      router.push('/investments');


      console.log("data update", data);
    })


}


loadInvestmentItem();

</script>

<template>
  <main>
    <div class="container">
      <img class="content-img" src="@/assets/trre.png" alt="">
      <div class="content_box">
        <h2 class="content-title"> Investment </h2>
        <p class="content-text" id="investSum">Sum of investments: {{ investment.sum }}$</p>
      </div>
      <br>
      <div>
        <form @submit.prevent="handleSubmit">
          <div>
            <label for="description">Description:</label>
            <input type="text" id="description" v-model="investment.description" required>
          </div>
          <div>
            <label for="date">Date:</label>
            <input type="date" id="date" v-model="investment.date" required>
          </div>
          <div>
            <label for="sum">Sum:</label>
            <input id="sum" v-model="investment.sum" required>
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>
