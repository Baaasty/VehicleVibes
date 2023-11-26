<template>
  <Form :validation-schema="schema" class="login-form" @submit="handleLogin">
    <label for="username">Username</label>
    <div class="input-container">
      <Field id="username" name="username" type="text" autocomplete="off" />
      <ErrorMessage name="username" class="error-message tiny" />
    </div>

    <label for="password">Password</label>
    <div class="input-container">
      <Field id="password" name="password" type="password" autocomplete="off" />
      <ErrorMessage name="password" class="error-message tiny" />
    </div>

    <button type="submit" :disabled="loading">Login</button>

    <p v-if="message" class="error-message">{{ message }}</p>
  </Form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const store = useStore();
const router = useRouter();

const schema = yup.object().shape({
  username: yup.string().required('Username is required!'),
  password: yup.string().required('Password is required!'),
});

const loading = ref(false);
const message = ref('');

const loggedIn = computed(() => {
  return store.state.auth.status.loggedIn;
});

onMounted(() => {
  if (loggedIn.value) {
    router.push('/');
  }
});

const handleLogin = (user) => {
  loading.value = true;

  store.dispatch('auth/login', user).then(
    () => {
      router.push('/');
    },
    (err) => {
      loading.value = false;
      message.value = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    }
  );
};
</script>

<style lang="scss" scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd; /* Softer border color */
  border-radius: 8px;
  background-color: #f8f8f8; /* Light background color */

  label {
    display: block;
    color: #555; /* Softer label color */
  }

  .input-container {
    position: relative;
    margin-bottom: 30px;

    input {
      width: 100%;
      padding: 8px;
      margin: 10px 0 0;
      box-sizing: border-box;
      border: 1px solid #ccc; /* Softer border color */
      border-radius: 4px;
    }

    .error-message {
      color: #e44d4d; /* Softer error message color */
      font-size: 80%;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateY(100%);
    }
  }

  button {
    display: block;
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc; /* Softer disabled button color */
    cursor: not-allowed;
  }

  .error-message {
    color: #e44d4d;
    margin: 15px 0 0;
  }
}

/* Adjustments for small screens */
@media screen and (max-width: 600px) {
  .login-form {
    max-width: none;
    width: 80%;
  }
}
</style>
