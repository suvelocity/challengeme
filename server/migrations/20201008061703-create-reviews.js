"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("reviews", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			challenge_id: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING
			},
			content: {
				type: Sequelize.STRING
			},
			rating: {
				allowNull: false,
				type: Sequelize.INTEGER
			},

			deleted_at: {
				type: Sequelize.DATE
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("reviews");
	}
};
