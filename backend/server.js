const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
oracledb.initOracleClient({ libDir: 'C:\\instantclient_19_19' });
app.use(cors());
app.use(express.json());

const dbConfig = {
    user: 'XXCRM',
    password: 'jun2023',
    connectionString: '10.27.1.250:1521/ebs_SSGPROD',
};

app.get('/', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = 'SELECT * FROM XXCRM.XXSSG_TEST_TABLE';
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            res.json(result.rows);

            connection.close();
        });
    });
});

// app.get('/organizationNames', (req, res) => {

//     const sql = 'SELECT DISTINCT ORGANIZATION_NAME FROM XXCRM.ORGANIZATIONS'
//     dbConfig.query(sql, (err, data) => {
//         if (err) return res.json('Error')
//         return res.json(data)
//     })

// })
//------------
app.get('/organizationNames', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql = 'SELECT DISTINCT ORGANIZATION_NAME FROM XXCRM.ORGANIZATIONS';

        connection.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Database query error' });
            }

            const organizationNames = result.rows.map(row => row.ORGANIZATION_NAME);
            res.json(organizationNames);

            connection.close();
        });
    });
});


// app.post('/create', (req, res) => {
//     const sql = "INSERT INTO XXCRM.XXSSG_TEST_TABLE (HEADER_ID, REMARKS) VALUES (:header_id, :remarks)";
//     const values = [
//         req.body.header,
//         req.body.remarks
//     ];
//     dbConfig.query(sql, [values], (err, data) => {
//         if (err) return res.json('Error')
//         return res.json(data)
//     })


// })
//----
app.post('/create', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql =
            "INSERT INTO XXCRM.XXSSG_TEST_TABLE(HEADER_ID, REMARKS, ORGANIZATION_NAME, CUSTOMER_NAME, ORDER_NUMBER, CUSTOMER_GENDER, ORDER_DATE, FILE_LINK, ITEM_NAME, BAG_CEMENT_BM_PCC, BAG_CEMENT_AM_PCC, BAG_CEMENT_GOLD_OPC) VALUES (:header_id, :remarks, :organization_name, :customerName, :orderNumber, :customerGender, TO_DATE(:orderDate, 'YYYY-MM-DD'), :fileLink, :itemName, :bag_cement_bm_pcc, :bag_cement_am_pcc, :bag_cement_gold_opc)";

        const bindVars = {
            header_id: req.body.header,
            remarks: req.body.remarks,
            organization_name: req.body.organizationNames,
            customerName: req.body.customerName,
            orderNumber: req.body.orderNumber,
            customerGender: req.body.customerGender,
            orderDate: req.body.orderDate,
            fileLink: req.body.fileLink,
            itemName: req.body.itemName,
            bag_cement_bm_pcc: req.body.bagCementBMPCC ? 1 : 0, // Assuming these are boolean checkboxes
            bag_cement_am_pcc: req.body.bagCementAMPCC ? 1 : 0,
            bag_cement_gold_opc: req.body.bagCementGoldOPC ? 1 : 0,
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

app.put('/update/:id', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql = `
            UPDATE XXCRM.XXSSG_TEST_TABLE
            SET HEADER_ID = :header_id,
                REMARKS = :remarks,
                ORGANIZATION_NAME = :organization_name,
                CUSTOMER_NAME = :customerName,
                ORDER_NUMBER = :orderNumber,
                CUSTOMER_GENDER = :customerGender,
                ORDER_DATE = TO_DATE(:orderDate, 'YYYY-MM-DD'),
                FILE_LINK = :fileLink,
                BAG_CEMENT_BM_PCC = :bag_cement_bm_pcc,
                BAG_CEMENT_AM_PCC = :bag_cement_am_pcc,
                BAG_CEMENT_GOLD_OPC = :bag_cement_gold_opc
            WHERE HEADER_ID = :headerId
        `;

        const bindVars = {
            header_id: req.body.header,
            remarks: req.body.remarks,
            organization_name: req.body.organization_name, // Corrected column name
            customerName: req.body.customerName,
            orderNumber: req.body.orderNumber,
            fileLink: req.body.fileLink,
            customerGender: req.body.customerGender,
            orderDate: req.body.orderDate,
            headerId: req.params.id,
            bag_cement_bm_pcc: req.body.bagCementBMPCC ? 1 : 0,
            bag_cement_am_pcc: req.body.bagCementAMPCC ? 1 : 0,
            bag_cement_gold_opc: req.body.bagCementGoldOPC ? 1 : 0,
        };

        connection.execute(sql, bindVars, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Database query error' });
            }

            if (result.rowsAffected === 0) {
                return res.status(404).json({ error: 'Record not found' });
            }

            res.json({ message: 'Record updated successfully' });

            connection.close();
        });
    });
});


// app.delete('/customer/:id', (req, res) => {
//     const sql = 'DELETE FROM XXCRM.XXSSG_TEST_TABLE WHERE HEADER_ID = :headerId';
//     const id = req.params.id;
//     dbConfig.query(sql, [id], (err, data) => {
//         if (err) return res.json('Error')
//         return res.json(data)
//     })



// })
//----
app.delete('/customer/:id', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql = 'DELETE FROM XXCRM.XXSSG_TEST_TABLE WHERE HEADER_ID = :headerId';
        const id = req.params.id;

        connection.execute(sql, { headerId: id }, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Database query error' });
            }

            res.json({ message: 'Record deleted successfully' });

            connection.close();
        });
    });
});


app.listen(8081, () => {
    console.log('listening');
});