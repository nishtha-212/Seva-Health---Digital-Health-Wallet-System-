-- Sample data for demos/tests. Run after schema.sql.
INSERT INTO patients (uhid, name, email, aadhar, phone, dob, gender, region) VALUES
 ('1001','Asha Verma','asha@example.com','111122223333','9000000001','1992-04-12','female','Gujarat'),
 ('1002','Ravi Patel','ravi@example.com','444455556666','9000000002','1985-09-30','male','Maharashtra')
ON CONFLICT DO NOTHING;

INSERT INTO medical_records (uhid, symptoms, diagnosis, prescriptions, added_by) VALUES
 ('1001','Fever, body ache','Viral fever','Paracetamol 500mg twice daily for 3 days','Dr. Khush'),
 ('1002','Persistent cough','Bronchitis','Azithromycin 500mg once daily for 3 days','Dr. Naiya');
