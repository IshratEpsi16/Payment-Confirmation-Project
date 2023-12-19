CREATE TABLE XXCRM.ADMIN_TABLE (
    Employee_ID int,
    Email varchar(255),
    Employee_Password varchar(255)

)
INSERT INTO XXCRM.ADMIN_TABLE
VALUES (6930,'ishrat.j@sevenringscement.com','12345')
commit
select * from XXCRM.ADMIN_TABLE
where EMAIL= ? and Employee_Password = ?

SELECT * from XXCRM.ADMIN_TABLE Where EMAIL = ? and Employee_Password = ?

SELECT * FROM XXCRM.ADMIN_TABLE WHERE EMAIL = :email AND Employee_Password = :password
select * from XXCRM.ADMIN_TABLE

ALTER TABLE  XXCRM.ADMIN_TABLE
ADD COLUMN phone_number VARCHAR(15)
-------------
CREATE TABLE XXCRM.ADMIN_SIGNUP_TABLE (
    Employee_ID int,
    Employee_Name varchar(255),
    Phone_Number varchar(2555),
    Email varchar(255),
    Employee_Password varchar(255),
   Confirm_Password varchar(255)

)
SELECT * FROM XXCRM.ADMIN_SIGNUP_TABLE WHERE Employee_ID = :employee_id AND Employee_Password = :employee_password
INSERT INTO XXCRM.ADMIN_SIGNUP_TABLE
VALUES (6930,'Ishrat Jahan Epsi','01531741539','ishrat.j@sevenringscement.com','Epsi69#@','Epsi69#@')
commit
 Employee_ID,Employee_Name,Phone_Number,Email,Employee_Password, Confirm_Password
select * from  XXCRM.ADMIN_SIGNUP_TABLE

 DELETE FROM XXCRM.ADMIN_SIGNUP_TABLE
WHERE EMPLOYEE_ID in ('2','5','4','6930')
--lookup query
SELECT 
a1.LOOKUP_CODE PAYEE_ID,
       a1.meaning PAYEE_NAME,
       a1.description CASH_AMOUNT,
       a1.tag MAIL_ADDRESS,
TO_CHAR(A1.START_DATE_ACTIVE,'DD-MON-YYYY') START_DATE,
TO_CHAR(A1.END_DATE_ACTIVE,'DD-MON-YYYY') END_DATE
  FROM apps.fnd_lookup_values a1, apps.fnd_lookup_types_VL a2
 WHERE a1.lookup_type = 'SSGIL_CASH_PAYMENT_INFO'
 AND a1.lookup_type = a2.lookup_type
 order by  3  asc
 
 -----details custom table
 select * from XXSSGIL_CASH_PAY_DET
 
 -- Assume you have a table named "your_table" with a column named "old_column_name"
ALTER TABLE XXSSGIL_CASH_PAY_DET
RENAME COLUMN  CURRENT_PERIOD1  TO   CURRENT_PERIOD

-- Assume you have a table named "your_table" and you want to add a new column named "new_column" with the data type INT
ALTER TABLE XXSSGIL_CASH_PAY_DET
ADD Acknowledgement varchar(200)
------main table------------
select * from  XXSSGIL_CASH_PAY_DET
INSERT INTO XXCRM.XXSSGIL_CASH_PAY_DET(
 
            TRANSACTION_ID, PAYEE_ID, PAYEE_NAME, CASH_AMOUNT, MAIL_ADDRESS, CURRENT_PERIOD, CREATION_DATE)
 
            VALUES (xxcrm.XXSSGIL_CASH_PAY_S.nextval, :payee_id, :payee_name, :cash_amount, :mail_address,
 
            to_char(:current_period,'MON-YY'), FROM_TZ(CAST(SYSDATE AS TIMESTAMP), 'UTC') AT TIME ZONE 'Asia/Dhaka')
--adding role column in XXCRM.ADMIN_SIGNUP_TABLE --------------
ALTER TABLE XXCRM.ADMIN_SIGNUP_TABLE
ADD Role VARCHAR(255)
select * from XXCRM.ADMIN_SIGNUP_TABLE
UPDATE XXCRM.ADMIN_SIGNUP_TABLE
SET role = 'user'
WHERE employee_name = 'User'
--------------
DELETE FROM  XXCRM.ADMIN_SIGNUP_TABLE
WHERE EMPLOYEE_NAME is null

