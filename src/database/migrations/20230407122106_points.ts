import { Knex } from 'knex';
const TABLE = 'points';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE, (table) => {
    table.uuid('point_id').primary().notNullable();
    table.uuid('user_id').notNullable;
    table.time('time').notNullable;
    table.date('date').notNullable;
    table.integer('day').notNullable;
    table.integer('month').notNullable;
    table.integer('year').notNullable;
    table.uuid('category_id').references('category_id').inTable('categories');
    table.uuid('sub_category_id').references('sub_category_id').inTable('sub_categories');
    table.string('status').notNullable().defaultTo('active');
    table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE);
}
