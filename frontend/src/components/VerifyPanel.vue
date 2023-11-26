<template>
  <div>
    <div class="token-panel">
      <label v-if="seconds == -1" for="verification-token">Verification Token</label>
      <div v-if="seconds == -1" class="token-input">
        <input
          v-for="(digit, index) in 6"
          :key="index"
          :ref="(input) => (inputRefs[`tokenInput${index}`] = input)"
          v-model="token[index]"
          class="token-digit"
          :class="['token-digit', { filled: token[index] !== '' }]"
          type="text"
          maxlength="1"
          autocomplete="off"
          @keyup="handleKeyUp(index, $event)"
          @keydown="handleKeyDown(index, $event)"
          @keydown.prevent
        />
      </div>
      <p v-if="message" :class="successful ? 'success-message' : 'error-message'">{{ message }}</p>
    </div>
    <p v-if="seconds != -1" class="redirect-message">You will be redirected in {{ seconds }} seconds.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/auth.service';

const router = useRouter();

const successful = ref(false);
const loading = ref(false);
const message = ref('');
const token = ref(['', '', '', '', '', '']);
const inputRefs = {};
const seconds = ref(-1);

const handleKeyDown = (index, event) => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    token.value[index] = key;

    if (index < token.value.length - 1) {
      inputRefs[`tokenInput${index + 1}`].focus();
    } else if (token.value.every((digit) => digit.length === 1)) {
      handleVerify(router.currentRoute.value.query.email, token.value.join(''));
      document.activeElement.blur();
    }
  }

  if (!/^[0-9]$/.test(key)) event.preventDefault();
};

const handleKeyUp = (index, event) => {
  const key = event.key;

  if (key === 'Backspace' && index > 0) {
    console.log('Backspace');
    if (token.value[index] === '') {
      const prevIndex = index - 1;
      token.value[prevIndex] = '';
      inputRefs[`tokenInput${prevIndex}`].focus();
    } else token.value[index] = '';
  }

  if (key !== 'Backspace') event.preventDefault();
};

const handleVerify = (email, token) => {
  AuthService.verify(email, token).then(
    (res) => {
      message.value = res.data.message;
      successful.value = true;
      loading.value = false;

      startCountdown();
    },
    (err) => {
      message.value = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      successful.value = false;
      loading.value = false;

      if (message.value === 'Account already verified.') startCountdown();
    }
  );
};

const startCountdown = () => {
  seconds.value = 3;

  const countdown = setInterval(() => {
    seconds.value--;
    if (seconds.value === 0) {
      clearInterval(countdown);
      router.push({
        path: '/login',
      });
    }
  }, 1000);
};

onMounted(() => {
  inputRefs.tokenInput0.focus();

  if (router.currentRoute.value.query.email !== undefined && router.currentRoute.value.query.token !== undefined) {
    handleVerify(router.currentRoute.value.query.email, router.currentRoute.value.query.token);
    return;
  }
});
</script>

<style scoped lang="scss">
.redirect-message {
  text-align: center;
}

.token-panel {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f8f8;
  color: #555;
}

.token-input {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.token-digit {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
  caret-color: transparent;
}

.filled {
  border-color: #ffe76c;
}

.token-digit::-webkit-outer-spin-button,
.token-digit::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
}

.token-digit[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}

.token-digit:focus {
  border-color: #e6d061;
  background-color: #efefef;
}

.error-message {
  color: #e44d4d;
  margin: 0 auto;
  font-size: 120%;
  text-align: center;
}

.success-message {
  color: #4caf50;
  margin: 0 auto;
  font-size: 120%;
  text-align: center;
}
</style>
