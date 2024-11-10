USE CINEMAEXPRESS;

-- Inserting values into the `admin` table
INSERT INTO `admin` (user_id, name, email, passwd, createdAt, updatedAt) VALUES
('U001', 'Sohan', 'shrujanvenky@gmail.com.com', 'Shruj', NOW(), NOW()),
('U002', 'Shrujan', 'sohanshanbhag15@gmail.com', 'Sohan', NOW(), NOW());

-- Inserting values into the `movie` table
INSERT INTO `movie` (movie_id, title, description, duration, ageRating, pubYear, rating, createdAt, updatedAt, ratingCount) VALUES
('M001', 'Bagheera', 'The countdown to justice begins.', '2h 38m', 'UA+', 2024, 4.6, NOW(), NOW(), 6700),
('M002', 'Singham Again', 'In the third installment of Singham series, the valiant cop Bajirao Singham and his team of brave hearts embark on a cross-border mission to rescue his beloved wife, Avni Singham, who has been abducted by a formidable antagonist. Upholding its legacy of never letting you down-never has, never will-this installment promises a fierce battle between good and evil. This timeless struggle will once again be fought through the indomitable spirit of Bajirao Singham. The legendary roar that began 13 years ago continues to resonate in the hearts of the audience.', '2h 24m', 'UA+', 2024, 3.5, NOW(), NOW(), 6000),
('M003', 'Bhool Bhulaiyaa 3', 'Gear up to tickle your funny bones with some thrill. The gates of `haveli` will now open again for Bhool Bhulaiyaa 3!', '2h 38m', 'UA+', 2024, 3.1, NOW(), NOW(), 500),
('M004', 'Brother', 'Get ready for a family entertainer packed with emotions, action, and heartwarming moments.', '2h 21m', 'UA+', 2024, 3.6, NOW(), NOW(), 5900),
('M005', 'The Wild Robot', 'Shipwrecked on a deserted island, a robot named Roz must learn to adapt to its new surroundings. Building relationships with the native animals, Roz soon develops a parental bond with an orphaned gosling.', '1h 41m', 'U', 2024, 4.7, NOW(), NOW(), 10400);

-- Inserting values into the `user` table
INSERT INTO `user` (user_id, name, email, phNum, dob, passwd, gender, createdAt, updatedAt) VALUES
('U003', 'Shobith', 'shobith@gmail.com', 1234567892, '2004-03-23', '123', 'Male', NOW(), NOW()),
('U004', 'Udyavar', 'udyavar@gmail.com', 1234567893, '2004-03-23', '234', 'Male', NOW(), NOW()),
('U005', 'Amaresh', 'amaresh@gmail.com', 1234567894, '2004-03-23', '573', 'Male', NOW(), NOW()),
('U006', 'Shobith', 'shobith@gmail.com', 1234567896, '2004-03-23', '123', 'Male', NOW(), NOW()),
('U007', 'Soyel', 'soyel@gmail.com', 1234567891, '2004-02-12', '456', 'Male', NOW(), NOW());

-- Inserting values into the `theater` table
INSERT INTO `theater` (the_id, name, address, createdAt, updatedAt) VALUES
('T001', 'Gopalan Cineams', 'RR Nagar, Bangalore', NOW(), NOW()),
('T002', 'PVR', 'Vega City Mall, Bangalore', NOW(), NOW()),
('T003', 'INOX', 'Garuda Mall, Bangalore', NOW(), NOW()),
('T004', 'Cinepolis', 'Gandhi Nagar, Mumbai', NOW(), NOW());

-- Inserting values into the `screen` table
INSERT INTO `screen` (screen_id, the_id, resolution, createdAt, updatedAt) VALUES
('S001', 'T001', '4D', NOW(), NOW()),
('S002', 'T001', '3D', NOW(), NOW()),
('S002', 'T002', '3D', NOW(), NOW()),
('S001', 'T002', '2D', NOW(), NOW()),
('S002', 'T003', '3D', NOW(), NOW()),
('S001', 'T003', '4D', NOW(), NOW()),
('S002', 'T004', '3D', NOW(), NOW()),
('S001', 'T004', '2D', NOW(), NOW());

-- Inserting values into the `booking` table
INSERT INTO `booking` (book_id, movie_id, screen_id, the_id, user_id, showtime, bookdate, seats, createdAt, updatedAt) VALUES
('B001', 'M001', 'S002', 'T001', 'U003', '18:00', '2024-11-03', 'A10,A11,A12', NOW(), NOW()),
('B002', 'M002', 'S001', 'T002', 'U004', '16:00', '2024-11-03', 'A10,A11,A12', NOW(), NOW()),
('B003', 'M003', 'S002', 'T003', 'U005', '21:00', '2024-11-03', 'C10,C11,C12', NOW(), NOW()),
('B004', 'M004', 'S001', 'T004', 'U006', '18:00', '2024-11-03', 'A10,A11,A12', NOW(), NOW()),
('B005', 'M005', 'S002', 'T002', 'U007', '20:00', '2024-11-04', 'B10,B11,B12', NOW(), NOW());

-- Inserting values into the `hostmovie` table
INSERT INTO `hostmovie` (the_id, screen_id, movie_id, showtime, createdAt, updatedAt) VALUES
('T001', 'S001', 'M001', '18:00', NOW(), NOW()),
('T003', 'S001', 'M003', '21:00', NOW(), NOW()),
('T004', 'S001', 'M004', '18:00', NOW(), NOW()),
('T002', 'S002', 'M002', '16:00', NOW(), NOW()),
('T002', 'S001', 'M005', '20:00', NOW(), NOW());

-- Inserting values into the `bookedseat` table
INSERT INTO `bookedseat` (seatRow, seatCol, the_id, bookedTime, createdAt, updatedAt, movie_id, screenScreenId) VALUES
('A', '10', 'T001', '2024-11-03 18:00:00', NOW(), NOW(), 'M001', 'S002'),
('A', '12', 'T001', '2024-11-03 18:00:00', NOW(), NOW(), 'M001', 'S002'),
('A', '11', 'T001', '2024-11-03 18:00:00', NOW(), NOW(), 'M001', 'S002'),
('A', '10', 'T002', '2024-11-03 16:00:00', NOW(), NOW(), 'M002', 'S001'),
('A', '12', 'T002', '2024-11-03 16:00:00', NOW(), NOW(), 'M002', 'S001'),
('A', '11', 'T002', '2024-11-03 16:00:00', NOW(), NOW(), 'M002', 'S001'),
('B', '10', 'T002', '2024-11-03 20:00:00', NOW(), NOW(), 'M005', 'S002'),
('B', '12', 'T002', '2024-11-03 20:00:00', NOW(), NOW(), 'M005', 'S002'),
('B', '11', 'T002', '2024-11-03 20:00:00', NOW(), NOW(), 'M005', 'S002'),
('C', '10', 'T003', '2024-11-03 21:00:00', NOW(), NOW(), 'M003', 'S002'),
('C', '12', 'T003', '2024-11-03 21:00:00', NOW(), NOW(), 'M003', 'S002'),
('C', '11', 'T003', '2024-11-03 21:00:00', NOW(), NOW(), 'M003', 'S002'),
('A', '10', 'T004', '2024-11-03 18:00:00', NOW(), NOW(), 'M004', 'S001'),
('A', '12', 'T004', '2024-11-03 18:00:00', NOW(), NOW(), 'M004', 'S001'),
('A', '11', 'T004', '2024-11-03 18:00:00', NOW(), NOW(), 'M004', 'S001');

-- Inserting values into the `cast` table
INSERT INTO `cast` (cast_id, name, role, createdAt, updatedAt) VALUES
('C001', 'Srii Murali', 'Actor', NOW(), NOW()),
('C002', 'Dr.Suri (Suresh Yallappa)', 'Director', NOW(), NOW()),
('C003', 'Ajay Devgn', 'Actor', NOW(), NOW()),
('C004', 'Kareena Kapoor Khan', 'Actor', NOW(), NOW()),
('C005', 'Ranveer Singh', 'Actor', NOW(), NOW()),
('C006', 'Rohit Shetty', 'Director', NOW(), NOW()),
('C007', 'Vidya Balan' , 'Actor', NOW(), NOW()),
('C008', 'Anees Bazmee' , 'Director', NOW(), NOW()),
('C009', 'Kartik Aaryan' , 'Actor', NOW(), NOW()),
('C0010', 'Jayam Ravi' , 'Actor', NOW(), NOW()),
('C0011', 'Rajesh Muthukumarasa' , 'Director', NOW(), NOW()),
('C0012', 'Pedro Pascal' , 'Actor', NOW(), NOW()),
('C0013', 'Chris Sanders' , 'Director', NOW(), NOW());

-- Inserting values into the `moviecast` table
INSERT INTO `moviecast` (movie_id, cast_id, createdAt, updatedAt) VALUES
('M001', 'C001', NOW(), NOW()),
('M001', 'C002', NOW(), NOW()),
('M002', 'C003', NOW(), NOW()),
('M002', 'C004', NOW(), NOW()),
('M002', 'C005', NOW(), NOW()),
('M002', 'C006', NOW(), NOW()),
('M003', 'C007', NOW(), NOW()),
('M003', 'C008', NOW(), NOW()),
('M003', 'C009', NOW(), NOW()),
('M004', 'C0010', NOW(), NOW()),
('M004', 'C0011', NOW(), NOW()),
('M005', 'C0012', NOW(), NOW()),
('M005', 'C0012', NOW(), NOW());

-- Inserting values into `_prisma_migrations` table
INSERT INTO `_prisma_migrations` (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES
('001', 'checksum1', NOW(), 'migration_001', NULL, NULL, NOW(), 1),
('002', 'checksum2', NOW(), 'migration_002', NULL, NULL, NOW(), 1);

-- Adding a foreign key relationship in `hostmovie` and `bookedseat` table for `theater` and `movie`
-- Foreign key references already created in the initial schema above.

-- Inserting values into the `payment` table
INSERT INTO `cast` (p_id, amount, method, tranid, book_id, createdAt, updatedAt) VALUES
('P001', 230, 'CARD', 1, 'B001', NOW(), NOW()),
('P002', 450, 'UPI', 2, 'B002', NOW(), NOW()),
('P003', 1000, 'CARD', 3, 'B003', NOW(), NOW()),
('P004', 500, 'UPI', 4, 'B004', NOW(), NOW()),
('P005', 570, 'CARD', 5, 'B005', NOW(), NOW()),
('P006', 600, 'UPI', 6, 'B001', NOW(), NOW());

-- Inserting values into the `moviescreen` table
INSERT INTO `moviescreen` (movie_id, screen_id, resolution, createdAt, updatedAt, the_id) VALUES
('M001', 'S001', '4D', NOW(), NOW(),'T001'),
('M002', 'S002', '3D', NOW(), NOW(),'T002'),
('M003', 'S001', '4D', NOW(), NOW(),'T003'),
('M004', 'S001', '2D', NOW(), NOW(),'T004'),
('M005', 'S001', '2D', NOW(), NOW(),'T002');

-- Inserting values into the `movielang` table
INSERT INTO `movielang` (movie_id, lang, createdAt, updatedAt) VALUES
('M001', 'Kannada' ,NOW(), NOW()),
('M002', 'Hindi' ,NOW(), NOW()),
('M003', 'Hindi' ,NOW(), NOW()),
('M004', 'Tamil' ,NOW(), NOW()),
('M005', 'English' ,NOW(), NOW());

-- Inserting values into the `moviegenre` table
INSERT INTO `moviegenre` (movie_id, genreName, createdAt, updatedAt) VALUES
('M001', 'Thriller' ,NOW(), NOW()),
('M002', 'Action' ,NOW(), NOW()),
('M003', 'Horror' ,NOW(), NOW()),
('M004', 'Family Drama' ,NOW(), NOW()),
('M005', 'Animation' ,NOW(), NOW());