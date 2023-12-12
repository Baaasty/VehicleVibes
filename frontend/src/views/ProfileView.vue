<template>
  <div class="profile-edit">
    <h1>Edit Profile</h1>
    <form class="profile-edit-form" @submit="saveProfile">
      <div class="form-row">
        <div>
          <label for="firstname">Your name</label>
          <div class="input-container">
            <input
              id="firstname"
              v-model="firstname"
              v-bind="firstnameValue"
              name="firstname"
              type="text"
              autocomplete="off"
            />
            <p v-if="errors.firstname" name="firstname" class="error-message">{{ errors.firstname }}</p>
          </div>
        </div>

        <div>
          <label for="birthdate">Birthdate</label>
          <div class="input-container">
            <input
              id="birthdate"
              v-model="birthdate"
              v-bind="birthdateValue"
              name="birthdate"
              type="date"
              autocomplete="off"
            />
            <p v-if="errors.birthdate" name="birthdate" class="error-message">{{ errors.birthdate }}</p>
          </div>
        </div>
      </div>

      <div>
        <label for="bio">Biography</label>
        <div class="input-container">
          <textarea
            id="bio"
            v-model="bio"
            v-bind="bioValue"
            name="bio"
            as="textarea"
            type="textarea"
            autocomplete="off"
          >
          </textarea>
          <p v-if="errors.bio" name="bio" class="error-message">{{ errors.bio }}</p>
        </div>
      </div>

      <button type="submit" :disabled="loading">Save</button>

      <p v-if="message" :class="successful ? 'success-message' : 'error-message'">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ProfileService from '../services/profile.service';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter();
const store = useStore();

const loading = ref(false);
const successful = ref(false);
const message = ref('');

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    firstname: yup
      .string()
      .required('Name is required!')
      .min(2, 'At least 2 characters!')
      .max(28, 'Cannot be more than 28 characters!')
      .matches(/^[a-zA-Z]+$/, 'Only letters are allowed!'),
    birthdate: yup
      .date()
      .required('Birthdate is required!')
      .min(new Date(1900, 0, 1), 'Must be after 1900!')
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'At least 18 years old!'),
    bio: yup.string().max(500, 'Cannot be more than 500 characters!'),
  }),
});

const [firstname, firstnameValue] = defineField('firstname', {
  validateOnModelUpdate: false,
});
const [birthdate, birthdateValue] = defineField('birthdate', {
  validateOnModelUpdate: false,
});
const [bio, bioValue] = defineField('bio');

const loadProfile = async () => {
  loading.value = true;

  ProfileService.getProfile().then(
    (res) => {
      firstname.value = res.data.firstname;
      birthdate.value = res.data.birthdate;
      bio.value = !res.data.bio ? '' : res.data.bio;
      loading.value = false;
      successful.value = false;
    },
    (err) => {
      if (err.response && err.response.status === 401) logout();

      message.value = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      loading.value = false;
      successful.value = false;
    }
  );
};

const saveProfile = handleSubmit((values) => {
  loading.value = true;

  ProfileService.saveProfile(values).then(
    (res) => {
      firstname.value = res.data.firstname;
      birthdate.value = res.data.birthdate;
      bio.value = !res.data.bio ? '' : res.data.bio;
      message.value = 'Profile edited successfully!';
      loading.value = false;
      successful.value = true;
    },
    (err) => {
      if (err.response && err.response.status === 401) logout();

      message.value = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      loading.value = false;
      successful.value = false;
    }
  );
});

const logout = () => {
  store.dispatch('auth/logout');
  router.push('/login');
};

onBeforeMount(() => {
  loadProfile();
});
</script>

<style lang="scss" scoped>
.profile-edit {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .profile-edit-form {
    display: grid;

    .form-row {
      display: flex;
      gap: 16px;
    }

    label {
      display: block;
      color: #555;
      margin-bottom: 10px;
    }

    .input-container {
      position: relative;
      margin-bottom: 30px;

      input,
      textarea {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      textarea {
        min-height: 100px;
        max-height: 300px;
        resize: vertical;
      }

      .error-message {
        color: #e44d4d;
        position: absolute;
        font-size: 80%;
        margin: 0;
        bottom: 0;
        transform: translateY(100%);
      }
    }

    button {
      padding: 10px 20px;
      background-color: #b3a24c;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #8c7b35;
      }
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .error-message {
      color: #e44d4d;
      margin: 15px 0 0;
    }

    .success-message {
      color: #4caf50;
      margin: 15px 0 0;
    }
  }

  @media screen and (max-width: 500px) {
    form {
      label {
        textarea {
          height: 100px;
        }
      }
    }
  }
}
</style>
