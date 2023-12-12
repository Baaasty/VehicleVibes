<template>
  <div>
    <Form :validation-schema="schema" class="register-form" @submit="handleRegister">
      <div v-if="!successful">
        <label for="username">Username</label>
        <div class="input-container">
          <Field id="username" name="username" type="text" autocomplete="off" />
          <ErrorMessage name="username" class="error-message" />
        </div>

        <label for="email">Email</label>
        <div class="input-container">
          <Field id="email" name="email" type="text" autocomplete="off" />
          <ErrorMessage name="email" class="error-message" />
        </div>

        <label for="password">Password</label>
        <div class="input-container">
          <Field id="password" name="password" type="password" autocomplete="off" />
          <ErrorMessage name="password" class="error-message" />
        </div>

        <button type="submit" :disabled="loading">Register</button>
      </div>
      <p v-if="message" :class="successful ? 'success-message' : 'error-message'">{{ message }}</p>
    </Form>
    <p v-if="seconds != -1" class="redirect-message">You will be redirected in {{ seconds }} seconds.</p>
  </div>
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
  username: yup
    .string()
    .required('Username is required!')
    .min(3, 'Must be at least 3 characters!')
    .max(20, 'Must be maximum 20 characters!'),
  email: yup
    .string()
    .required('Email is required!')
    .email('Email is invalid!')
    .max(50, 'Must be maximum 50 characters!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(8, 'Must be at least 8 characters!')
    .max(40, 'Must be maximum 40 characters!'),
});

const successful = ref(false);
const loading = ref(false);
const message = ref('');
let seconds = ref(-1);

const loggedIn = computed(() => {
  return store.state.auth.status.loggedIn;
});

onMounted(() => {
  if (loggedIn.value) {
    router.push('/');
  }
});

const handleRegister = (user) => {
  message.value = '';
  successful.value = false;
  loading.value = true;

  store.dispatch('auth/register', user).then(
    (res) => {
      message.value = res.data.message;
      successful.value = true;
      loading.value = false;

      startCountdown(user.email);
    },
    (err) => {
      message.value = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      successful.value = false;
      loading.value = false;
    }
  );
};

const startCountdown = (email) => {
  seconds.value = 3;

  const countdown = setInterval(() => {
    seconds.value--;
    if (seconds.value === 0) {
      clearInterval(countdown);
      router.push({
        path: '/verify',
        query: { email },
      });
    }
  }, 1000);
};
</script>

<style lang="scss" scoped>
.redirect-message {
  text-align: center;
}

.register-form {
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

  .success-message {
    color: #4caf50;
    margin: 0 auto;
    font-size: 120%;
    text-align: center;
  }
}

@media screen and (max-width: 600px) {
  .register-form {
    max-width: none;
    width: 80%;
  }
}
</style>
