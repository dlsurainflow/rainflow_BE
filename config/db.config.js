module.exports = {
  HOST: "rainflow.live",
  USER: "tammy",
  PASSWORD: "Inmediasres8!",
  DB: "rainflow",
  PORT: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
