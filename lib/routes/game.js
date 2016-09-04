import * as Translation from './../models/Translation';

/**
 * Start a new game. Gets 20 random words from the database for a given language.
 */
async function startGame(req, res) {
    if (!req.query.language) res.status(500).send({error: "Please provide ?language= parameter"});

    try {
        const {language} = req.query;
        const translations = await Translation.findRandomForLanguageLimitBy(language, 20);
        return res.send(translations);
    } catch (err) {
        return res.status(500).send({'error': err});
    }
}

export default function configureExpenseRoutes(app) {
    app.route('/api/game/start')
        .get(startGame);
}
