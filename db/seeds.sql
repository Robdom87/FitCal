INSERT INTO program(program_name) VALUES
("Back"),             
("Chest");

INSERT INTO programWorkouts(program_id, exercise_name, exercise_equipment, exercise_instructions, 
set_amount, rep_amount, weight, weight_type ) VALUES
(1, "Deadlift", "Barbell", "just do it", 
1, 12, 135, "Barbell" ),             
(1, "Rows", "Barbell", "just do it", 
2, 12, 135, "Barbell"),         
(1, "Bicep Curls", "Dumbbell", "just do it", 
1, 12, 135, "Dumbbell"),         
(2, "Bench Press", "Barbell", "just do it", 
3, 12, 135, "Barbell");   

INSERT INTO session(date) VALUES
("2022-10-13"),             
("2022-10-12");           

INSERT INTO sessionWorkouts(session_id, exercise_name, set_number, rep_amount, 
weight, weight_type, comments) VALUES
(1, "Deadlift", 1, 12, 135, "Barbell",""),             
(1, "Rows", 1, 12, 135, "Barbell",""),         
(1, "Rows", 2, 12, 135, "Barbell",""),         
(2, "Bench Press", 1, 12, 135, "Barbell","");   


       