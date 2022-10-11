// const Program = require('./program');
const Session = require('./session');
// const ProgramWorkouts = require('./programWorkouts');
const SessionWorkouts = require('./sessionWorkouts');

// // Products belongsTo Category
// ProgramWorkouts.belongsTo(Program, {
//     foreignKey: 'program_id',
//   });
  
//   // Categories have many Products
//   Program.hasMany(ProgramWorkouts, {
//     foreignKey: 'program_id',
//     onDelete: 'CASCADE',
//   });

  // Products belongsTo Category
SessionWorkouts.belongsTo(Session, {
    foreignKey: 'session_id',
  });
  
  // Categories have many Products
  Session.hasMany(SessionWorkouts, {
    foreignKey: 'session_id',
    onDelete: 'CASCADE',
  });

module.exports = {
    // Program,
    Session,
    // ProgramWorkouts,
    SessionWorkouts
  };