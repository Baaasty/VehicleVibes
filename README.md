# VehicleVibes App

The dating app based on your daily vehicle.

## Setup

1. **Install nodemon + sass + sequelize-cli**

   ```bash
   npm install --global nodemon sass sequelize-cli
   ```

   This will install necessary dependencies.

2. **Configure environment variables**

   ```bash
   cd backend/
   cp .env.sample .env
   ```

   This will navigate you to the `backend` directory and copy the `.env.sample` file to the `.env` file. Afterwards you can edit the `.env` file.

3. **Backend Setup:**

   ```bash
   cd backend/
   npm install
   sequelize db:migrate
   ```

   This will navigate you to the `backend` directory and install all necessary Node.js dependencies.
   Note: Maybe you are already in the `backend` directory from the 2. step!

4. **Frontend Setup:**

   ```bash
   cd frontend/
   npm install
   ```

   Move to the `frontend` directory and install frontend dependencies.
   Note: Maybe you are still in the `backend` directory from the 3. step! Then just go back into the root directory.

5. **Configure githooks**

   ```bash
   git config core.hooksPath .githooks
   ```

   This will set the githooks directory to setup the pre-commit hook.

After following these steps, your environment should be set up with the required dependencies for both the backend and frontend of the VehicleVibes app.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
