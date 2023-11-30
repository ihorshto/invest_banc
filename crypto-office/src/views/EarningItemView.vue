<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
let earning = ref({});

// Load selected Earning
let loadEarningItem = function () {
  console.log('Load earning func');
  fetch(`http://localhost:8000/earnings/${route.params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      earning.value = data;
      console.log("data", data);
    })
}

// Submit action
let handleSubmit = function () {
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let sum = document.getElementById("sum").value;
  // fetch request
  fetch(`http://localhost:8000/earnings/${route.params.id}`, {
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
      console.log(router.push('/earnings'));
      router.push({path: 'earnings'}); // push to /earnings
      console.log("data update", data);
    })
}

loadEarningItem();

</script>

<template>
  <main>
    <div class="container">
      <img class="content-img" src="@/assets/trre.png" alt="">
      <div class="content_box">
        <h2 class="content-title"> Investment </h2>
        <p class="content-text" id="investSum">Sum of earnings: {{ earning.sum }}$</p>
      </div>
      <br>
      <div class="form_container">
        <form @submit.prevent="handleSubmit">
          <div>
            <label for="description">Description:</label>
            <input type="text" id="description" class="form-control" v-model="earning.description" required>
          </div>
          <div>
            <label for="date">Date:</label>
            <input type="date" id="date" class="form-control" v-model="earning.date" required>
          </div>
          <div>
            <label for="sum">Sum:</label>
            <input id="sum" class="form-control" v-model="earning.sum" required>
          </div>
          <button class="btn btn-primary mt-3" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>

<style>
.form_container {
  margin: 0 auto;
  width: 400px;
}

form label {
  text-align: center;
  width: 100%;
  margin: 5px;
}

form button {
  width: 100%;
}
</style>