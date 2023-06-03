'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkUpdate('Markers', {
        infoContent: 'Leafy coastal area featuring facilities such as trails, a campground, a boat ramp & beaches.',
      }, {
        title: 'Wenderholm Regional Park',
      })
      await queryInterface.bulkUpdate('Markers', {
        infoContent: 'Whangateau is a small town on the east coast of the North Island of New Zealand. It is situated in Rodney District, part of the Auckland Region, and is on a peninsula stretching out into the Hauraki Gulf, north of Auckland.',
      }, {
        title: 'Whangateau Reserve',
      })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkUpdate('Markers', {
        infoContent: '',
      }, {
        title: [
          'Wenderholm Regional Park',
          'Whangateau Reserve',
        ],
      })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
