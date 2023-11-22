<template>
  <header>
    <div class="nav-bar">
      <RouterLink to="/" class="nav-branding" @click="closeMenu">
        <img src="@/assets/Logo.png" alt="Vehicle Vibes logo" />
        <h1>VehicleVibes</h1>
      </RouterLink>
      <FontAwesomeIcon icon="bars" @click="toggleMenu" />
      <nav :class="showMobileMenu ? 'opened-menu' : 'closed-menu'">
        <ul class="nav-routes">
          <RouterLink to="/what-is-vehiclevibes" @click="closeMenu"> What is VehicleVibes? </RouterLink>
          <RouterLink to="/faq" @click="closeMenu"> FAQ </RouterLink>
          <RouterLink to="/about" @click="closeMenu"> About </RouterLink>
        </ul>
        <ul v-if="!currentUser" class="nav-account">
          <RouterLink to="/login" @click="closeMenu"> Login </RouterLink>
          <RouterLink to="/register" @click="closeMenu"> Register </RouterLink>
        </ul>
        <ul v-else class="nav-account">
          <a @click="logout"> Logout </a>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const currentUser = computed(() => {
  return store.state.auth.user;
});

const logout = () => {
  store.dispatch('auth/logout');
  router.push('/login');
  closeMenu();
};

const showMobileMenu = ref(false);

const toggleMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMenu = () => {
  showMobileMenu.value = false;
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff8d3;
  height: 100%;

  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0 10vw;

    .nav-branding {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 16px;

      img {
        width: 64px;
      }

      h1 {
        font-family: 'Rubik', sans-serif;
        font-size: 32px;
      }
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .nav-routes {
        display: flex;
        flex: 2;
        justify-content: start;
        align-items: center;
        gap: 16px;
        list-style: none;
      }

      .nav-account {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;
        list-style: none;

        a {
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #e6d061;
          background-color: #ffe76c;
        }

        a:hover {
          background-color: #e6d061;
        }
      }
    }

    a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .nav-routes a:hover {
      color: #b3a24c;
    }
  }

  .fa-bars {
    display: none;
    height: 2.25rem;
    position: absolute;
    top: 1.1rem;
    left: 1.4rem;
    z-index: 101;
  }

  @media screen and (max-width: 1000px) {
    .nav-bar {
      flex-direction: column;

      .nav-branding {
        gap: 12px;

        img {
          width: 48px;
        }

        h1 {
          font-family: 'Rubik', sans-serif;
          font-size: 28px;
        }
      }

      nav {
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 100%;
        overflow: hidden;

        .nav-routes {
          flex-direction: column;
          align-items: center;
          z-index: 100;
          gap: 8px;
          padding: 0px;

          a {
            font-size: 1.2rem;
          }
        }

        .nav-account {
          padding: 0px;
          margin: 10px;
        }
      }

      .opened-menu {
        opacity: 1;
        padding: 0px 0px 15px;
      }

      .closed-menu {
        opacity: 0;
        height: 0;
      }

      .fa-bars {
        display: block;
      }
    }
  }
}
</style>
