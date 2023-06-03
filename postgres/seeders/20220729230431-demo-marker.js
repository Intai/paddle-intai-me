'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    await queryInterface.bulkInsert('Markers', [{
      title: 'Wenderholm Regional Park',
      lat: -36.531333,
      lng: 174.710858,
      infoContent: '',
      createdAt: now,
      updatedAt: now,
    }, {
      title: 'Whangateau Reserve',
      lat: -36.31421534684016,
      lng: 174.76953936831012,
      infoContent: '',
      createdAt: now,
      updatedAt: now,
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Markers', null, {
      truncate: true,
      restartIdentity: true,
    })
  },
}
