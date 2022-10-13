const Session = require('./session');
const SessionWorkouts = require('./sessionWorkouts');
const User = require("./User");

SessionWorkouts.belongsTo(Session, {
    foreignKey: 'session_id',
  });
  
Session.hasMany(SessionWorkouts, {
    foreignKey: 'session_id',
    onDelete: 'CASCADE',
  });

module.exports = {
     Session,
     SessionWorkouts,
     User
  };