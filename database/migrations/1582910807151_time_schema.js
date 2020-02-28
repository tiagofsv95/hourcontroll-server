'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TimeSchema extends Schema {
  up () {
    this.create('times', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.date('date').notNullable().unique()
      table.time('arrivaltime').notNullable()
      table.time('lunchtimestart').notNullable()
      table.time('lunchtimeend').notNullable()
      table.time('exittime').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('times')
  }
}

module.exports = TimeSchema
