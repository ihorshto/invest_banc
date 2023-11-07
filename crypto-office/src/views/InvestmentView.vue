<script setup>
import { ref } from 'vue'

let investments = ref([]);
let investmentSum;

const today = new Date().toISOString().slice(0, 10);
// Load LIst of Investments
let loadInvestment = function () {
  investmentSum = 0;
  fetch("http://localhost:8000/investments", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {

      data.forEach(element => {
        investmentSum += element.sum;
      });

      let myDate = data;
      console.log('myDate', myDate[0])
      investments.value = data;
    })
}

let addItem = function () {
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let sum = document.getElementById("sum").value;

  console.log(description);


  console.log("click addItem");
  fetch("http://localhost:8000/investments/0", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: description,
      date: date,
      sum: sum
    }),
  })
    .then(response => response.json())
    .then(data => {

      if (data.message) {
        alert("All fields are required!");
      } else {
        document.getElementById("description").value = "";
        document.getElementById("date").value = "";
        document.getElementById("sum").value = "";

        loadInvestment();
      }
    })
    .catch(error => alert(error));
}

let deleteitem = function (id) {
  console.log("id", id);
  fetch("http://localhost:8000/investments/" + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {

      console.log("data", data);

      loadInvestment();
    })
}

loadInvestment();

</script>

<template>
  <main>
    <div class="container">
      <img class="content-img" src="@/assets/trre.png" alt="">
      <div class="content_box">
        <h2 class="content-title"> Investments </h2>
        <p class="content-text" id="investSum">Sum of investments: {{ investmentSum }}$</p>
      </div>
      <form class="content_form">
        <div class="content_form-row">
          <div class="col-7 content_form-el">
            <input id="description" type="text" class="form-control" placeholder="Description">
          </div>
          <div class="col-2 content_form-el">
            <input id="date" type="date" class="form-control" v-model="today" placeholder="Date">
          </div>
          <div class="col-2 content_form-el">
            <input id="sum" type="number" class="form-control" placeholder="Sum">
          </div>
          <button class="content_form-btn content_form-el" v-on:click.prevent="addItem">+</button>
        </div>
      </form>
      <div class="table_wrapper">
        <table>
          <thead>
            <tr class="table100-head">
              <th class="column1">Id</th>
              <th class="column2">Description</th>
              <th class="column3">Date</th>
              <th class="column4">Sum</th>
              <th class="column4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="investment in investments" :key="investment.id" :to="`/investments/${investment.id}`">
              <td class="column1">
                {{ investment.id }}
              </td>
              <td class="column2">{{ investment.description }}</td>
              <td class="column3">{{ investment.date }}</td>
              <td class="column4">{{ investment.sum }}$</td>
              <td class="column5">
                <button class="column_delete-btn" v-on:click.prevent="deleteitem(investment.id)">-</button>
                <button class="column_modify-btn">
                  <RouterLink :to="`/investments/${investment.id}`">:</RouterLink>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
