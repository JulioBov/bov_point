import { Knex } from 'knex';
const TABLE = 'projects';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE, (table: Knex.TableBuilder) => {
    table.uuid('project_id').primary().notNullable();
    table.string('name').notNullable();
    table.string('status').notNullable().defaultTo('active');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE);
}
