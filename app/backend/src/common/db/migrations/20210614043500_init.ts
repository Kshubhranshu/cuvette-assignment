import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('phrases', table => {
        table.integer('id');
        table.text('phrase');
    });
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('phrases');
}


