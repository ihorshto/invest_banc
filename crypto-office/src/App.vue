<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="container">
      <nav class="nav">
        <div class="nav_container">
          <div>
            <a class="navbar_img-link" href="#">
              <RouterLink to="/investments">
                <img class="nav_img" src="@/assets/logo.svg" alt="logo">
              </RouterLink>
            </a>

          </div>
          <div class="nav_items">
            <RouterLink to="/investments" class="nav_item-link">Investments</RouterLink>
            <RouterLink to="/earnings" class="nav_item-link">Earnings</RouterLink>
            <RouterLink to="/statistic" class="nav_item-link">Statistic</RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
  <footer class="footer mt-5">

    <p> © Slava Ukraine || France || Italy</p>
  </footer>
</template>