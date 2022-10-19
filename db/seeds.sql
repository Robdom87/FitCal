INSERT INTO user(name, email, password) VALUES
("robert", "robert@rob.com", 1234);


INSERT INTO program(program_name, user_id) VALUES
("Back",1),             
("Chest",1);

INSERT INTO programWorkouts(program_id, exercise_name, set_amount, rep_amount, weight, weight_type, user_id ) VALUES
(1, "Deadlift", 1, 12, 135, "Barbell", 1),
(1, "Rows", 2, 12, 135, "Barbell", 1),
(1, "Bicep Curls", 1, 12, 135, "Dumbbell", 1),
(2, "Bench Press", 3, 12, 135, "Barbell", 1);

INSERT INTO session(date, user_id) VALUES
("2022-07-02", 1),
("2022-07-06", 1),
("2022-07-07", 1),
("2022-07-10", 1),
("2022-07-13", 1),
("2022-07-14", 1),
("2022-07-19", 1),
("2022-07-20", 1),
("2022-07-22", 1),
("2022-07-27", 1),
("2022-07-31", 1),
("2022-08-01", 1),
("2022-08-03", 1),
("2022-08-05", 1),
("2022-08-10", 1),
("2022-08-11", 1),
("2022-08-12", 1),
("2022-08-14", 1),
("2022-08-19", 1),
("2022-08-20", 1),
("2022-08-21", 1),
("2022-08-24", 1),
("2022-08-25", 1),
("2022-08-26", 1),
("2022-08-28", 1),
("2022-09-01", 1),
("2022-09-02", 1),
("2022-09-07", 1),
("2022-09-14", 1),
("2022-09-17", 1),
("2022-09-18", 1),
("2022-09-27", 1);

INSERT INTO sessionWorkouts(session_id, exercise_name, set_number, rep_amount, weight, weight_type, comments, user_id) VALUES
(1, 'Squat', 1, 7, 196, 'Barbell', '', 1),
(1, 'Squat', 2, 8, 205, 'Barbell', '', 1),
(1, 'Squat', 3, 6, 189, 'Barbell', '', 1),
(1, 'Lunges', 1, 15, 0, 'Body Weight', '', 1),
(1, 'Lunges', 2, 15, 0, 'Body Weight', '', 1),
(1, 'Lunges', 3, 16, 0, 'Body Weight', '', 1),
(1, 'Dumbbell Shrugs', 1, 22, 143, 'Dumbbell', '', 1),
(1, 'Dumbbell Shrugs', 2, 22, 140, 'Dumbbell', '', 1),
(1, 'Dumbbell Shrugs', 3, 21, 142, 'Dumbbell', '', 1),
(2, 'Bench Press', 1, 9, 153, 'Barbell', '', 1),
(2, 'Bench Press', 2, 8, 145, 'Barbell', '', 1),
(2, 'Bench Press', 3, 8, 149, 'Barbell', '', 1),
(2, 'Dips', 1, 18, 0, 'Body Weight', '', 1),
(2, 'Dips', 2, 18, 0, 'Body Weight', '', 1),
(2, 'Dips', 3, 18, 0, 'Body Weight', '', 1),
(2, 'OH Press', 1, 12, 111, 'Barbell', '', 1),
(2, 'OH Press', 2, 12, 108, 'Barbell', '', 1),
(2, 'OH Press', 3, 13, 113, 'Barbell', '', 1),
(3, 'Deadlifts', 1, 6, 219, 'Barbell', '', 1),
(3, 'Deadlifts', 2, 5, 220, 'Barbell', '', 1),
(3, 'Deadlifts', 3, 8, 225, 'Barbell', '', 1),
(3, 'Barbell Rows', 1, 12, 138, 'Barbell', '', 1),
(3, 'Barbell Rows', 2, 12, 149, 'Barbell', '', 1),
(3, 'Barbell Rows', 3, 12, 147, 'Barbell', '', 1),
(3, 'Bicep Curls', 1, 12, 32, 'Dumbbell', '', 1),
(3, 'Bicep Curls', 2, 13, 34, 'Dumbbell', '', 1),
(3, 'Bicep Curls', 3, 11, 33, 'Dumbbell', '', 1),
(4, 'Squat', 1, 7, 187, 'Barbell', '', 1),
(4, 'Squat', 2, 7, 199, 'Barbell', '', 1),
(4, 'Squat', 3, 8, 200, 'Barbell', '', 1),
(4, 'Lunges', 1, 15, 0, 'Body Weight', '', 1),
(4, 'Lunges', 2, 18, 0, 'Body Weight', '', 1),
(4, 'Lunges', 3, 16, 0, 'Body Weight', '', 1),
(4, 'Dumbbell Shrugs', 1, 20, 146, 'Dumbbell', '', 1),
(4, 'Dumbbell Shrugs', 2, 22, 137, 'Dumbbell', '', 1),
(4, 'Dumbbell Shrugs', 3, 22, 150, 'Dumbbell', '', 1),
(5, 'Bench Press', 1, 7, 152, 'Barbell', '', 1),
(5, 'Bench Press', 2, 8, 142, 'Barbell', '', 1),
(5, 'Bench Press', 3, 8, 140, 'Barbell', '', 1),
(5, 'Dips', 1, 18, 0, 'Body Weight', '', 1),
(5, 'Dips', 2, 16, 0, 'Body Weight', '', 1),
(5, 'Dips', 3, 15, 0, 'Body Weight', '', 1),
(5, 'OH Press', 1, 11, 96, 'Barbell', '', 1),
(5, 'OH Press', 2, 11, 102, 'Barbell', '', 1),
(5, 'OH Press', 3, 11, 106, 'Barbell', '', 1),
(6, 'Deadlifts', 1, 6, 210, 'Barbell', '', 1),
(6, 'Deadlifts', 2, 8, 214, 'Barbell', '', 1),
(6, 'Deadlifts', 3, 7, 205, 'Barbell', '', 1),
(6, 'Barbell Rows', 1, 11, 144, 'Barbell', '', 1),
(6, 'Barbell Rows', 2, 11, 141, 'Barbell', '', 1),
(6, 'Barbell Rows', 3, 10, 152, 'Barbell', '', 1),
(6, 'Bicep Curls', 1, 10, 33, 'Dumbbell', '', 1),
(6, 'Bicep Curls', 2, 11, 32, 'Dumbbell', '', 1),
(6, 'Bicep Curls', 3, 12, 35, 'Dumbbell', '', 1),
(7, 'Squat', 1, 7, 186, 'Barbell', '', 1),
(7, 'Squat', 2, 6, 191, 'Barbell', '', 1),
(7, 'Squat', 3, 7, 204, 'Barbell', '', 1),
(7, 'Lunges', 1, 18, 0, 'Body Weight', '', 1),
(7, 'Lunges', 2, 15, 0, 'Body Weight', '', 1),
(7, 'Lunges', 3, 17, 0, 'Body Weight', '', 1),
(7, 'Dumbbell Shrugs', 1, 23, 152, 'Dumbbell', '', 1),
(7, 'Dumbbell Shrugs', 2, 22, 152, 'Dumbbell', '', 1),
(7, 'Dumbbell Shrugs', 3, 22, 151, 'Dumbbell', '', 1),
(8, 'Bench Press', 1, 6, 143, 'Barbell', '', 1),
(8, 'Bench Press', 2, 8, 136, 'Barbell', '', 1),
(8, 'Bench Press', 3, 8, 140, 'Barbell', '', 1),
(8, 'Dips', 1, 18, 0, 'Body Weight', '', 1),
(8, 'Dips', 2, 17, 0, 'Body Weight', '', 1),
(8, 'Dips', 3, 17, 0, 'Body Weight', '', 1),
(8, 'OH Press', 1, 12, 110, 'Barbell', '', 1),
(8, 'OH Press', 2, 10, 113, 'Barbell', '', 1),
(8, 'OH Press', 3, 12, 99, 'Barbell', '', 1),
(9, 'Deadlifts', 1, 6, 223, 'Barbell', '', 1),
(9, 'Deadlifts', 2, 5, 217, 'Barbell', '', 1),
(9, 'Deadlifts', 3, 7, 213, 'Barbell', '', 1),
(9, 'Barbell Rows', 1, 11, 147, 'Barbell', '', 1),
(9, 'Barbell Rows', 2, 10, 147, 'Barbell', '', 1),
(9, 'Barbell Rows', 3, 10, 151, 'Barbell', '', 1),
(9, 'Bicep Curls', 1, 10, 33, 'Dumbbell', '', 1),
(9, 'Bicep Curls', 2, 12, 33, 'Dumbbell', '', 1),
(9, 'Bicep Curls', 3, 11, 33, 'Dumbbell', '', 1),
(10, 'Squat', 1, 8, 193, 'Barbell', '', 1),
(10, 'Squat', 2, 9, 188, 'Barbell', '', 1),
(10, 'Squat', 3, 8, 193, 'Barbell', '', 1),
(10, 'Lunges', 1, 18, 0, 'Body Weight', '', 1),
(10, 'Lunges', 2, 17, 0, 'Body Weight', '', 1),
(10, 'Lunges', 3, 17, 0, 'Body Weight', '', 1),
(10, 'Dumbbell Shrugs', 1, 23, 143, 'Dumbbell', '', 1),
(10, 'Dumbbell Shrugs', 2, 22, 144, 'Dumbbell', '', 1),
(10, 'Dumbbell Shrugs', 3, 23, 136, 'Dumbbell', '', 1),
(11, 'Bench Press', 1, 8, 142, 'Barbell', '', 1),
(11, 'Bench Press', 2, 7, 139, 'Barbell', '', 1),
(11, 'Bench Press', 3, 7, 147, 'Barbell', '', 1),
(11, 'Dips', 1, 16, 0, 'Body Weight', '', 1),
(11, 'Dips', 2, 15, 0, 'Body Weight', '', 1),
(11, 'Dips', 3, 17, 0, 'Body Weight', '', 1),
(11, 'OH Press', 1, 12, 111, 'Barbell', '', 1),
(11, 'OH Press', 2, 12, 97, 'Barbell', '', 1),
(11, 'OH Press', 3, 10, 102, 'Barbell', '', 1),
(12, 'Deadlifts', 1, 7, 205, 'Barbell', '', 1),
(12, 'Deadlifts', 2, 7, 225, 'Barbell', '', 1),
(12, 'Deadlifts', 3, 8, 219, 'Barbell', '', 1),
(12, 'Barbell Rows', 1, 11, 149, 'Barbell', '', 1),
(12, 'Barbell Rows', 2, 11, 140, 'Barbell', '', 1),
(12, 'Barbell Rows', 3, 12, 154, 'Barbell', '', 1),
(12, 'Bicep Curls', 1, 10, 33, 'Dumbbell', '', 1),
(12, 'Bicep Curls', 2, 12, 33, 'Dumbbell', '', 1),
(12, 'Bicep Curls', 3, 13, 32, 'Dumbbell', '', 1),
(13, 'Squat', 1, 6, 202, 'Barbell', '', 1),
(13, 'Squat', 2, 7, 193, 'Barbell', '', 1),
(13, 'Squat', 3, 8, 186, 'Barbell', '', 1),
(13, 'Lunges', 1, 15, 0, 'Body Weight', '', 1),
(13, 'Lunges', 2, 15, 0, 'Body Weight', '', 1),
(13, 'Lunges', 3, 16, 0, 'Body Weight', '', 1),
(13, 'Dumbbell Shrugs', 1, 21, 144, 'Dumbbell', '', 1),
(13, 'Dumbbell Shrugs', 2, 21, 151, 'Dumbbell', '', 1),
(13, 'Dumbbell Shrugs', 3, 22, 138, 'Dumbbell', '', 1),
(14, 'Bench Press', 1, 6, 150, 'Barbell', '', 1),
(14, 'Bench Press', 2, 8, 146, 'Barbell', '', 1),
(14, 'Bench Press', 3, 8, 137, 'Barbell', '', 1),
(14, 'Dips', 1, 17, 0, 'Body Weight', '', 1),
(14, 'Dips', 2, 18, 0, 'Body Weight', '', 1),
(14, 'Dips', 3, 16, 0, 'Body Weight', '', 1),
(14, 'OH Press', 1, 11, 109, 'Barbell', '', 1),
(14, 'OH Press', 2, 12, 115, 'Barbell', '', 1),
(14, 'OH Press', 3, 12, 101, 'Barbell', '', 1),
(15, 'Deadlifts', 1, 6, 213, 'Barbell', '', 1),
(15, 'Deadlifts', 2, 5, 223, 'Barbell', '', 1),
(15, 'Deadlifts', 3, 7, 222, 'Barbell', '', 1),
(15, 'Barbell Rows', 1, 12, 149, 'Barbell', '', 1),
(15, 'Barbell Rows', 2, 10, 151, 'Barbell', '', 1),
(15, 'Barbell Rows', 3, 13, 142, 'Barbell', '', 1),
(15, 'Bicep Curls', 1, 13, 32, 'Dumbbell', '', 1),
(15, 'Bicep Curls', 2, 13, 32, 'Dumbbell', '', 1),
(15, 'Bicep Curls', 3, 13, 34, 'Dumbbell', '', 1),
(16, 'Squat', 1, 7, 192, 'Barbell', '', 1),
(16, 'Squat', 2, 8, 204, 'Barbell', '', 1),
(16, 'Squat', 3, 9, 202, 'Barbell', '', 1),
(16, 'Lunges', 1, 18, 0, 'Body Weight', '', 1),
(16, 'Lunges', 2, 16, 0, 'Body Weight', '', 1),
(16, 'Lunges', 3, 17, 0, 'Body Weight', '', 1),
(16, 'Dumbbell Shrugs', 1, 22, 148, 'Dumbbell', '', 1),
(16, 'Dumbbell Shrugs', 2, 21, 150, 'Dumbbell', '', 1),
(16, 'Dumbbell Shrugs', 3, 21, 151, 'Dumbbell', '', 1),
(17, 'Bench Press', 1, 7, 151, 'Barbell', '', 1),
(17, 'Bench Press', 2, 8, 142, 'Barbell', '', 1),
(17, 'Bench Press', 3, 8, 150, 'Barbell', '', 1),
(17, 'Dips', 1, 16, 0, 'Body Weight', '', 1),
(17, 'Dips', 2, 17, 0, 'Body Weight', '', 1),
(17, 'Dips', 3, 15, 0, 'Body Weight', '', 1),
(17, 'OH Press', 1, 10, 109, 'Barbell', '', 1),
(17, 'OH Press', 2, 11, 96, 'Barbell', '', 1),
(17, 'OH Press', 3, 11, 101, 'Barbell', '', 1),
(18, 'Deadlifts', 1, 5, 225, 'Barbell', '', 1),
(18, 'Deadlifts', 2, 6, 212, 'Barbell', '', 1),
(18, 'Deadlifts', 3, 5, 216, 'Barbell', '', 1),
(18, 'Barbell Rows', 1, 10, 137, 'Barbell', '', 1),
(18, 'Barbell Rows', 2, 11, 144, 'Barbell', '', 1),
(18, 'Barbell Rows', 3, 12, 137, 'Barbell', '', 1),
(18, 'Bicep Curls', 1, 13, 34, 'Dumbbell', '', 1),
(18, 'Bicep Curls', 2, 10, 33, 'Dumbbell', '', 1),
(18, 'Bicep Curls', 3, 13, 32, 'Dumbbell', '', 1),
(19, 'Squat', 1, 7, 197, 'Barbell', '', 1),
(19, 'Squat', 2, 7, 203, 'Barbell', '', 1),
(19, 'Squat', 3, 9, 188, 'Barbell', '', 1),
(19, 'Lunges', 1, 16, 0, 'Body Weight', '', 1),
(19, 'Lunges', 2, 16, 0, 'Body Weight', '', 1),
(19, 'Lunges', 3, 15, 0, 'Body Weight', '', 1),
(19, 'Dumbbell Shrugs', 1, 22, 150, 'Dumbbell', '', 1),
(19, 'Dumbbell Shrugs', 2, 21, 155, 'Dumbbell', '', 1),
(19, 'Dumbbell Shrugs', 3, 23, 142, 'Dumbbell', '', 1),
(20, 'Bench Press', 1, 7, 142, 'Barbell', '', 1),
(20, 'Bench Press', 2, 7, 151, 'Barbell', '', 1),
(20, 'Bench Press', 3, 9, 148, 'Barbell', '', 1),
(20, 'Dips', 1, 15, 0, 'Body Weight', '', 1),
(20, 'Dips', 2, 16, 0, 'Body Weight', '', 1),
(20, 'Dips', 3, 17, 0, 'Body Weight', '', 1),
(20, 'OH Press', 1, 13, 109, 'Barbell', '', 1),
(20, 'OH Press', 2, 11, 98, 'Barbell', '', 1),
(20, 'OH Press', 3, 10, 95, 'Barbell', '', 1),
(21, 'Deadlifts', 1, 6, 215, 'Barbell', '', 1),
(21, 'Deadlifts', 2, 8, 205, 'Barbell', '', 1),
(21, 'Deadlifts', 3, 8, 213, 'Barbell', '', 1),
(21, 'Barbell Rows', 1, 12, 152, 'Barbell', '', 1),
(21, 'Barbell Rows', 2, 12, 152, 'Barbell', '', 1),
(21, 'Barbell Rows', 3, 12, 146, 'Barbell', '', 1),
(21, 'Bicep Curls', 1, 12, 34, 'Dumbbell', '', 1),
(21, 'Bicep Curls', 2, 11, 31, 'Dumbbell', '', 1),
(21, 'Bicep Curls', 3, 11, 31, 'Dumbbell', '', 1),
(22, 'Squat', 1, 9, 197, 'Barbell', '', 1),
(22, 'Squat', 2, 8, 195, 'Barbell', '', 1),
(22, 'Squat', 3, 9, 201, 'Barbell', '', 1),
(22, 'Lunges', 1, 16, 0, 'Body Weight', '', 1),
(22, 'Lunges', 2, 15, 0, 'Body Weight', '', 1),
(22, 'Lunges', 3, 16, 0, 'Body Weight', '', 1),
(22, 'Dumbbell Shrugs', 1, 21, 153, 'Dumbbell', '', 1),
(22, 'Dumbbell Shrugs', 2, 22, 142, 'Dumbbell', '', 1),
(22, 'Dumbbell Shrugs', 3, 21, 146, 'Dumbbell', '', 1),
(23, 'Bench Press', 1, 8, 136, 'Barbell', '', 1),
(23, 'Bench Press', 2, 6, 139, 'Barbell', '', 1),
(23, 'Bench Press', 3, 7, 145, 'Barbell', '', 1),
(23, 'Dips', 1, 15, 0, 'Body Weight', '', 1),
(23, 'Dips', 2, 17, 0, 'Body Weight', '', 1),
(23, 'Dips', 3, 15, 0, 'Body Weight', '', 1),
(23, 'OH Press', 1, 11, 113, 'Barbell', '', 1),
(23, 'OH Press', 2, 11, 96, 'Barbell', '', 1),
(23, 'OH Press', 3, 12, 104, 'Barbell', '', 1),
(24, 'Deadlifts', 1, 7, 225, 'Barbell', '', 1),
(24, 'Deadlifts', 2, 6, 216, 'Barbell', '', 1),
(24, 'Deadlifts', 3, 6, 225, 'Barbell', '', 1),
(24, 'Barbell Rows', 1, 11, 139, 'Barbell', '', 1),
(24, 'Barbell Rows', 2, 10, 138, 'Barbell', '', 1),
(24, 'Barbell Rows', 3, 11, 151, 'Barbell', '', 1),
(24, 'Bicep Curls', 1, 13, 33, 'Dumbbell', '', 1),
(24, 'Bicep Curls', 2, 10, 31, 'Dumbbell', '', 1),
(24, 'Bicep Curls', 3, 12, 32, 'Dumbbell', '', 1),
(25, 'Squat', 1, 7, 188, 'Barbell', '', 1),
(25, 'Squat', 2, 6, 196, 'Barbell', '', 1),
(25, 'Squat', 3, 7, 187, 'Barbell', '', 1),
(25, 'Lunges', 1, 17, 0, 'Body Weight', '', 1),
(25, 'Lunges', 2, 16, 0, 'Body Weight', '', 1),
(25, 'Lunges', 3, 16, 0, 'Body Weight', '', 1),
(25, 'Dumbbell Shrugs', 1, 23, 144, 'Dumbbell', '', 1),
(25, 'Dumbbell Shrugs', 2, 21, 152, 'Dumbbell', '', 1),
(25, 'Dumbbell Shrugs', 3, 22, 137, 'Dumbbell', '', 1),
(26, 'Bench Press', 1, 7, 145, 'Barbell', '', 1),
(26, 'Bench Press', 2, 6, 147, 'Barbell', '', 1),
(26, 'Bench Press', 3, 8, 142, 'Barbell', '', 1),
(26, 'Dips', 1, 16, 0, 'Body Weight', '', 1),
(26, 'Dips', 2, 15, 0, 'Body Weight', '', 1),
(26, 'Dips', 3, 16, 0, 'Body Weight', '', 1),
(26, 'OH Press', 1, 12, 95, 'Barbell', '', 1),
(26, 'OH Press', 2, 12, 102, 'Barbell', '', 1),
(26, 'OH Press', 3, 12, 95, 'Barbell', '', 1),
(27, 'Deadlifts', 1, 7, 208, 'Barbell', '', 1),
(27, 'Deadlifts', 2, 8, 209, 'Barbell', '', 1),
(27, 'Deadlifts', 3, 7, 223, 'Barbell', '', 1),
(27, 'Barbell Rows', 1, 11, 138, 'Barbell', '', 1),
(27, 'Barbell Rows', 2, 12, 153, 'Barbell', '', 1),
(27, 'Barbell Rows', 3, 12, 140, 'Barbell', '', 1),
(27, 'Bicep Curls', 1, 13, 30, 'Dumbbell', '', 1),
(27, 'Bicep Curls', 2, 11, 35, 'Dumbbell', '', 1),
(27, 'Bicep Curls', 3, 11, 30, 'Dumbbell', '', 1),
(28, 'Squat', 1, 8, 195, 'Barbell', '', 1),
(28, 'Squat', 2, 7, 190, 'Barbell', '', 1),
(28, 'Squat', 3, 7, 196, 'Barbell', '', 1),
(28, 'Lunges', 1, 16, 0, 'Body Weight', '', 1),
(28, 'Lunges', 2, 17, 0, 'Body Weight', '', 1),
(28, 'Lunges', 3, 16, 0, 'Body Weight', '', 1),
(28, 'Dumbbell Shrugs', 1, 22, 137, 'Dumbbell', '', 1),
(28, 'Dumbbell Shrugs', 2, 21, 151, 'Dumbbell', '', 1),
(28, 'Dumbbell Shrugs', 3, 23, 153, 'Dumbbell', '', 1),
(29, 'Bench Press', 1, 9, 135, 'Barbell', '', 1),
(29, 'Bench Press', 2, 7, 143, 'Barbell', '', 1),
(29, 'Bench Press', 3, 8, 148, 'Barbell', '', 1),
(29, 'Dips', 1, 17, 0, 'Body Weight', '', 1),
(29, 'Dips', 2, 16, 0, 'Body Weight', '', 1),
(29, 'Dips', 3, 15, 0, 'Body Weight', '', 1),
(29, 'OH Press', 1, 10, 114, 'Barbell', '', 1),
(29, 'OH Press', 2, 10, 95, 'Barbell', '', 1),
(29, 'OH Press', 3, 12, 97, 'Barbell', '', 1),
(30, 'Deadlifts', 1, 6, 205, 'Barbell', '', 1),
(30, 'Deadlifts', 2, 7, 223, 'Barbell', '', 1),
(30, 'Deadlifts', 3, 5, 215, 'Barbell', '', 1),
(30, 'Barbell Rows', 1, 10, 136, 'Barbell', '', 1),
(30, 'Barbell Rows', 2, 12, 155, 'Barbell', '', 1),
(30, 'Barbell Rows', 3, 12, 139, 'Barbell', '', 1),
(30, 'Bicep Curls', 1, 11, 32, 'Dumbbell', '', 1),
(30, 'Bicep Curls', 2, 11, 34, 'Dumbbell', '', 1),
(30, 'Bicep Curls', 3, 12, 33, 'Dumbbell', '', 1),
(31, 'Squat', 1, 7, 201, 'Barbell', '', 1),
(31, 'Squat', 2, 8, 194, 'Barbell', '', 1),
(31, 'Squat', 3, 8, 197, 'Barbell', '', 1),
(31, 'Lunges', 1, 16, 0, 'Body Weight', '', 1),
(31, 'Lunges', 2, 16, 0, 'Body Weight', '', 1),
(31, 'Lunges', 3, 18, 0, 'Body Weight', '', 1),
(31, 'Dumbbell Shrugs', 1, 20, 150, 'Dumbbell', '', 1),
(31, 'Dumbbell Shrugs', 2, 22, 147, 'Dumbbell', '', 1),
(31, 'Dumbbell Shrugs', 3, 20, 136, 'Dumbbell', '', 1),
(32, 'Bench Press', 1, 9, 140, 'Barbell', '', 1),
(32, 'Bench Press', 2, 7, 137, 'Barbell', '', 1),
(32, 'Bench Press', 3, 8, 145, 'Barbell', '', 1),
(32, 'Dips', 1, 15, 0, 'Body Weight', '', 1),
(32, 'Dips', 2, 17, 0, 'Body Weight', '', 1),
(32, 'Dips', 3, 18, 0, 'Body Weight', '', 1),
(32, 'OH Press', 1, 12, 114, 'Barbell', '', 1),
(32, 'OH Press', 2, 10, 95, 'Barbell', '', 1),
(32, 'OH Press', 3, 11, 115, 'Barbell', '', 1);

       