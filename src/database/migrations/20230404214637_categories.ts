import { Knex } from 'knex';
const TABLE = 'categories';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE, (table) => {
    table.uuid('category_id').primary().notNullable();
    table.string('name').notNullable();
    table.uuid('project_id').references('project_id').inTable('projects');
    table.string('status').notNullable().defaultTo('active');
    table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE);
}
