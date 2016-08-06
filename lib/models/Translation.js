import {PGModel} from 'jseminck-be-pg';

const TranslationModel = new PGModel({
    tableName: "translation",
    columns: [
        {name: "id", type: "serial"},
        {name: "english", type: "varchar(256)"},
        {name: "translation", type: "varchar(250)"},
        {name: "language", type: "varchar(128)"},
        {name: "category", type: "varchar(128)"},
        {name: "totalGuesses", type: "numeric"},
        {name: "correctGuesses", type: "numeric"},
        {name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP"}
    ],
    debug: false
});

/**
 * Find all translations for a given language
 *
 * @param {String} language
 * @returns {Object[]} all found translations (can be none)
 */
export async function findAllForLanguage(language) {
    return await TranslationModel.findAll({column: "language", value: language});
}

/**
 * Create a new translation.
 *
 * @param {Object} translation
 *   @param {String} expense.enngluish
 *   @param {String} expense.translation
 *   @param {String} expense.language
 *   @param {String} expense.category
 */
export async function create(translation) {
    return await TranslationModel.create({
        ...translation,
        totalGuesses: 0,
        correctGuesses: 0
    });
}

/**
 * Remove an translation from the database by id.
 *
 * @param {Number} expense.id
 */
export async function remove(id) {
    return await TranslationModel.remove({column: "id", value: id});
}

/**
 * Drop and recreate the expenses table. This will remove all data!
 */
export async function __recreate() {
    return await TranslationModel.__recreate();
}