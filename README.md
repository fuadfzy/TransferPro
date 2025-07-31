
# TransferPro

**TransferPro** is a football transfer management system that helps club owners and managers manage player transfers, budgets, and team rosters. It provides features such as managing club information, adding players, transferring players between clubs, and tracking transfer budgets.

## Features

1. **Role-based Access**: Two roles - Owner and Manager - each with different permissions.
   - **Owner**: Can buy players and manage the club's finances.
   - **Manager**: Can add players but cannot buy them.
2. **Player Transfer System**: Allows clubs to buy players, which updates the player's club and reduces the transfer budget of the buying club.
3. **Player and Club Management**: Club owners and managers can add, edit, and view players and clubs.
4. **User Authentication**: Login and registration with session management, password hashing using bcryptjs, and role-based authorization.

## Technologies Used

- **Node.js** and **Express.js**: Web server and routing.
- **Sequelize**: ORM for managing PostgreSQL database.
- **PostgreSQL**: Database for storing user, club, and player information.
- **bcryptjs**: Password hashing for secure authentication.
- **Express-Session**: For session management.
- **Chart.js**: For player statistics visualization.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (preferably the latest LTS version).
- PostgreSQL installed and running.
- Git installed to clone the repository.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/TransferPro.git
cd TransferPro
```

### 2. Install dependencies

Run the following command to install all the necessary dependencies:

```bash
npm install
```

### 3. Configure the Database

Ensure your **PostgreSQL** server is running and create a new database for the application.

- Update your database configuration in **`config/config.json`** with the correct credentials.

Example config:

```json
{
  "development": {
    "username": "your_db_username",
    "password": "your_db_password",
    "database": "transferpro_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

### 4. Run Migrations

Use **Sequelize** to create the necessary tables in the database.

```bash
npx sequelize-cli db:migrate
```

### 5. Start the Server

Now you can start the server using:

```bash
npm start
```

The application will be running at `http://localhost:3000`.

### 6. Access the Application

- Go to **`http://localhost:3000`** to view the landing page.
- You can **register**, **login**, and start managing players and clubs.
- As a **Manager**, you can add players, and as an **Owner**, you can buy players.

## API Endpoints

### **Authentication**
- `POST /register` - Register a new user (Manager or Owner).
- `POST /login` - Log in with credentials.
- `GET /logout` - Log out the current user.

### **Clubs**
- `GET /clubs` - Get all clubs.
- `GET /clubs/:id` - Get details of a specific club.
- `POST /clubs/add` - Add a new club (Owner only).
- `GET /clubs/:id/players` - Get all players of a specific club.
- `GET /clubs/:id/players/:playerId/buy` - Buy a player (Owner only).

### **Players**
- `GET /players` - Get all players.
- `POST /players/add` - Add a new player.
- `GET /players/:id` - Get details of a specific player.

### **Positions**
- `GET /positions` - Get all available positions for players.

## User Roles

### **Manager**
- Can **view players**.
- Can **add players** to clubs.
- Cannot **buy players**.

### **Owner**
- Can **buy players**.
- Can manage their **club's transfer budget**.

## Sessions & Cookies

- Sessions are managed using **express-session**.
- Upon login, the user’s **role**, **ClubId**, and **transferBudget** are saved to the session.
- When the user logs out, the session is destroyed.

## Future Improvements

- Implement a more robust role-based access control.
- Add team management functionality (e.g., manage the team roster).
- Support more advanced search and filter functionality for players and clubs.

## Contributing

We welcome contributions to this project! If you'd like to help improve **TransferPro**, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Create a pull request with a description of what you've done.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Chart.js](https://www.chartjs.org/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
