import { SQLDataSource } from 'datasource-sql'

class PaddleDB extends SQLDataSource {
  getMarkers() {
    return this.knex
      .select('*')
      .from('Markers')
  }
}

export default PaddleDB
