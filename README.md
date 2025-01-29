# Project Title

A full stack project for Groupomania that allows users to share and read media internally 
## Deployment

cd in backend folder and 
rename .env-sample to .env and provide username password 

To run this file cd into backend folder and run npm start

cd into frontend folder and run npm start


# Project Title

A full-stack project for Groupomania that allows users to share and read media internally.

## Prerequisites

- **Node.js** v20.13.1
- **PostgreSQL**  14.7 
- **NPM** 10.5.2

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/mariadiazdev/project7.git
   cd project7
   ```

2. **Setup the Backend**:
   ```sh
   cd backend
   cp .env-sample .env
   # Edit .env file with your database credentials
   npm install
   ```

3. **Setup Database**:
   - Install and run Postgresql
   - Create  database:
     ```sh
     createdb groupmania
     ```
   - Import schema:
     ```sh
     psql -U <username> -d groupmania -f schema.sql
     ```

4. **Run Backend**:
   ```sh
   npm start
   ```

5. **Setup Frontend**:
   ```sh
   cd ../frontend
   npm install
   npm start
   ```

## Troubleshooting

