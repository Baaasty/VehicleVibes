<template>
  <div class="profile-edit">
    <h1>Edit Profile</h1>
    <Form :validation-schema="schema" class="profile-edit-form" @submit="saveProfile">
      <div class="form-row">
        <div>
          <label for="firstname">Your name</label>
          <div class="input-container">
            <Field id="firstname" name="firstname" type="text" autocomplete="off" />
            <ErrorMessage name="firstname" class="error-message tiny" />
          </div>
        </div>

        <div>
          <label for="birthday">Birthday</label>
          <div class="input-container">
            <Field id="birthday" name="birthday" type="date" autocomplete="off" />
            <ErrorMessage name="birthday" class="error-message tiny" />
          </div>
        </div>
      </div>

      <div>
        <label for="bio">Biography</label>
        <div class="input-container">
          <Field id="bio" as="textarea" name="bio" type="textarea" autocomplete="off" />
          <ErrorMessage name="bio" class="error-message tiny" />
        </div>
      </div>

      <button type="submit" :disabled="loading">Save</button>

      <p v-if="message" class="error-message">{{ message }}</p>
    </Form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import ProfileService from '../services/profile.service';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required('Name is required!')
    .min(2, 'At least 2 characters!')
    .max(28, 'Cannot be more than 28 characters!')
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed!'),
  birthday: yup
    .date()
    .required('Birthday is required!')
    .min(new Date(1900, 0, 1), 'Must be after 1900!')
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), 'At least 18 years old!'),
  bio: yup.string().max(500, 'Cannot be more than 500 characters!'),
});

const loading = ref(false);
const message = ref('');

const loadProfile = async () => {
  ProfileService.getProfile().then(
    (res) => {
      console.log(res.data);
    },
    (err) => {
      console.error('Error loading profile:', err);
    }
  );
};

const saveProfile = async (profile) => {
  console.log(profile);

  ProfileService.saveProfile(profile).then(
    (res) => {
      console.log(res.data);
    },
    (err) => {
      console.error('Error updating profile:', err);
    }
  );
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
      color: #555; /* Softer label color */
    }

    .input-container {
      position: relative;
      margin-bottom: 30px;

      input,
      textarea {
        width: 100%;
        padding: 8px;
        margin: 10px 0 0;
        box-sizing: border-box;
        border: 1px solid #ccc; /* Softer border color */
        border-radius: 4px;
      }

      textarea {
        min-height: 100px;
        max-height: 300px;
        resize: vertical;
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
  }

  // Media query for smaller screens
  @media screen and (max-width: 500px) {
    form {
      label {
        textarea {
          height: 100px; /* Adjust the height for smaller screens */
        }
      }
    }
  }
}
</style>
