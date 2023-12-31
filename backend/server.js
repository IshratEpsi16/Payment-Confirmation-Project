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

app.get('/', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = "SELECT a1.LOOKUP_CODE PAYEE_ID,a1.meaning PAYEE_NAME,a1.description CASH_AMOUNT,a1.tag MAIL_ADDRESS,TO_CHAR (A1.START_DATE_ACTIVE, 'DD-MON-YYYY') START_DATE,TO_CHAR (A1.END_DATE_ACTIVE, 'DD-MON-YYYY') END_DATE,(SELECT TO_CHAR (SYSDATE, 'Mon-YYYY') FROM DUAL) CURRENT_PERIOD FROM apps.fnd_lookup_values a1, apps.fnd_lookup_types_VL a2 WHERE a1.lookup_type = 'SSGIL_CASH_PAYMENT_INFO'AND a1.lookup_type = a2.lookup_type ORDER BY 3 ASC"
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});
// app.get('/notifications', (req, res) => {
//     oracledb.getConnection(dbConfig, (err, connection) => {
//         if (err) {
//             console.error('Error connecting to the database:', err.message);
//             return;
//         }

//         const sql = "select * from  XXCRM.NOTIFICATIONS"
//         connection.execute(sql, (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err.message);
//                 connection.close();
//                 return;
//             }

//             // Get column names dynamically
//             const columnNames = result.metaData.map(meta => meta.name);

//             // Convert the result rows to JSON format dynamically
//             const jsonData = result.rows.map(row => {
//                 const rowObject = {};
//                 columnNames.forEach((columnName, index) => {
//                     rowObject[columnName] = row[index];
//                 });
//                 return rowObject;
//             });

//             // Send the JSON response
//             res.json(jsonData);

//             connection.close();
//         });
//     });
// });

app.get('/notifications', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = " select XCPD.PAYEE_ID,XCPD.PAYEE_NAME,XAST.EMPLOYEE_ID,XN.NOTIFICATIONS from XXSSGIL_CASH_PAY_DET XCPD, XXCRM.ADMIN_SIGNUP_TABLE XAST, XXCRM.NOTIFICATIONS XN where 1=1 and XCPD.PAYEE_ID=XAST.EMPLOYEE_ID and  XCPD.PAYEE_ID = XN.PAYEE_ID and XAST.EMPLOYEE_ID = XN.PAYEE_ID and XCPD.STATUS = 'Sent'"
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});




app.post('/login', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql =
            "SELECT EMPLOYEE_ID, EMPLOYEE_PASSWORD, ROLE,EMPLOYEE_NAME,PHONE_NUMBER,EMAIL FROM XXCRM.ADMIN_SIGNUP_TABLE WHERE EMPLOYEE_ID = :employee_id AND EMPLOYEE_PASSWORD = :employee_password";

        const bindParams = {
            employee_id: req.body.employeeId,
            employee_password: req.body.employeePassword,

        };


        connection.execute(sql, bindParams, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Error executing query', details: err.message });
            }

            // Log the entire result object to inspect its structure
            //  console.log('result:', result);

            if (result.rows.length > 0) {
                const user1 = result.rows[0];

                // Check if the ROLE information exists in the user1 array
                const role = user1[2]; // Assuming ROLE is in the third position (index 2)
                console.log('password', user1[1])
                console.log('role', user1[2])
                console.log('name', user1[3])
                console.log('phone number', user1[4])
                console.log('ID', user1[0])
                console.log('mail', user1[5])
                console.log('role:', role); // Log the role to check its value

                if (role === 'admin') {
                    connection.close();
                    return res.json({ status: 'success', role: 'admin' });
                } else if (role == null) {
                    connection.close();
                    return res.json({ status: 'success', role: null });
                } else {
                    connection.close();
                    return res.status(401).json({ error: 'Invalid role' });
                }
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
app.post('/create', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }
        //co
        const payee_id = req.body.payeeId;
        const payee_name = req.body.payeeName;
        const cash_amount = req.body.cashAmount;
        const mail_address = req.body.mailAddress;
        const current_period = req.body.currentPeriod;
        const sql =
            "INSERT INTO XXCRM.XXSSGIL_CASH_PAY_DET(" +
            "TRANSACTION_ID, PAYEE_ID, PAYEE_NAME, CASH_AMOUNT,STATUS, MAIL_ADDRESS, CURRENT_PERIOD, CREATION_DATE) " +
            "VALUES (xxcrm.XXSSGIL_CASH_PAY_S.nextval, :payee_id, :payee_name, :cash_amount, 'Sent', :mail_address, " +
            "TO_CHAR(TO_DATE(:current_period, 'MM/DD/YYYY HH:MI:SS AM'), 'Mon-YY'), FROM_TZ(CAST(SYSDATE AS TIMESTAMP), 'UTC') AT TIME ZONE 'Asia/Dhaka')";

        const bindVars = {
            payee_id: payee_id,
            payee_name: payee_name,
            cash_amount: cash_amount,
            mail_address: mail_address,
            current_period: current_period
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