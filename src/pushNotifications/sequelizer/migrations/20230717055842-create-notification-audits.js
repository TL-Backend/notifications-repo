'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notification_audits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channel: {
        type: Sequelize.STRING
      },
      contact_details: {
        type: Sequelize.JSONB
      },
      status: {
        type: Sequelize.STRING
      },
      success_response: {
        type: Sequelize.JSONB
      },
      error_response: {
        type: Sequelize.JSONB
      },
      content: {
        type: Sequelize.JSONB
      },
      user_id: {
        type: Sequelize.STRING
      },
      group_id: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notification_audits');
  }
};