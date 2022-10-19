const Program = require('./program');
const Session = require('./session');
const ProgramWorkouts = require('./programWorkouts');
const SessionWorkouts = require('./sessionWorkouts');
const User = require("./User");
//forum
const Post = require('./Post');
const Comment = require('./Comment');

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

Session.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Session, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Program.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Program, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//forum
User.hasMany(Post, {
  foreignKey: 'user_id'
})

User.hasMany(Comment, {
  foreignKey: 'user_id'
})

Post.belongsTo(User, {
  foreignKey: 'user_id'
})

Post.hasMany(Comment, {
  foreignKey: 'post_id'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
})

module.exports = {
  Session,
  SessionWorkouts,
  Program,
  ProgramWorkouts,
  User,
  Comment,
  Post
};