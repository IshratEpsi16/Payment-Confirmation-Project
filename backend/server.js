const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
oracledb.initOracleClient({ libDir: 'C:\\instantclient_19_19' });
app.use(cors());
app.use(express.json());

const dbConfig = {
    user: 'XXCRM',
    password: 'xxcrm#mrc',
    connectionString: '10.27.1.174:1531/ebs_SSGPROD',
};

// app.get('/', (req, res) => {
//     oracledb.getConnection(dbConfig, (err, connection) => {
//         if (err) {
//             console.error('Error connecting to the database:', err.message);
//             return;
//         }

//         const sql = 'select * from XXCRM.ADMIN_SIGNUP_TABLE';
//         connection.execute(sql, (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err.message);
//                 connection.close();
//                 return;
//             }

//             // Transform the result rows to JSON
//             const jsonData = result.rows.map(row => {
//                 const jsonRow = {};
//                 result.metaData.forEach((meta, i) => {
//                     jsonRow[meta.name] = row[i];
//                 });
//                 return jsonRow;
//             });

//             res.json(jsonData);
//             connection.close();
//         });
//     });
// });
// // ... (existing code)

app.post('/login', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql =
            "SELECT * FROM XXCRM.ADMIN_SIGNUP_TABLE WHERE Employee_ID = :employee_id AND Employee_Password = :employee_password";

        const bindParams = {
            employee_id: req.body.employeeId,
            employee_password: req.body.employeePassword
        };

        connection.execute(sql, bindParams, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Error executing query' });
            }

            // Change the backend response to send JSON
            if (result.length > 0) {
                // User authentication successful
                connection.close();
                return res.json({ status: 'success' });
            } else {
                // Invalid ID or password
                connection.close();
                return res.status(401).json({ error: 'Invalid ID or password' });
            }

        });
    });
});
app.post('/signup', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql =
            "INSERT INTO XXCRM.ADMIN_SIGNUP_TABLE(Employee_ID, Employee_Name, Phone_Number, Email, Employee_Password, Confirm_Password) VALUES (:employee_id, :employee_name, :phone_number, :email, :employee_password, :confirm_password)";

        const bindVars = {
            employee_id: req.body.employeeId,
            employee_name: req.body.employeeName,
            phone_number: req.body.phoneNumber,
            email: req.body.email,
            employee_password: req.body.employeePassword,
            confirm_password: req.body.confirmPassword
        };

        connection.execute(sql, bindVars, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Database query error' });
            }

            res.json({ message: 'Record created successfully' });

            connection.close();
        });
    });
});





app.listen(8081, () => {
    console.log('listening');
});