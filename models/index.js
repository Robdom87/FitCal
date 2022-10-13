const Program = require('./program');
const Session = require('./session');
const ProgramWorkouts = require('./programWorkouts');
const SessionWorkouts = require('./sessionWorkouts');
const User = require("./User");

SessionWorkouts.belongsTo(Session, {
    foreignKey: 'session_id',
  });
  
Session.hasMany(SessionWorkouts, {
    foreignKey: 'session_id',
    onDelete: 'CASCADE',
  });

ProgramWorkouts.belongsTo(Program, {
    foreignKey: 'program_id',
  });
  
  Program.hasMany(ProgramWorkouts, {
    foreignKey: 'program_id',
    onDelete: 'CASCADE',
  });

module.exports = {
     Session,
     SessionWorkouts,
     Program,
     ProgramWorkouts,
     User
  };