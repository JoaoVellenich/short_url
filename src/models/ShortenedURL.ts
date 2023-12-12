import * as Sequelize from "sequelize";
import db from "./index";

const ShortenedURLs = db.define("ShortenedURLs", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  originalUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shortenedUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  clickCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  excludeAt: {
    allowNull: true,
    type: Sequelize.DATE,
  },
  userId: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
});

export default ShortenedURLs;
