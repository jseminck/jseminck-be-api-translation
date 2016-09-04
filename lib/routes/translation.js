import {verifyToken} from 'jseminck-be-communication-utils';
import * as Translation from './../models/Translation';

/**
 * Request translations data from the API.
 */
async function get(req, res) {
    if (!req.query.language) res.status(500).send({error: "Please provide ?language= parameter"});

    try {
        const {language, limit} = req.query;
        const translations = await getTranslations(language, limit);
        return res.send(translations);
    } catch (err) {
        return res.status(500).send({'error': err});
    }
}

async function getTranslations(language, limit) {
    if (limit) {
        return await Translation.findAllForLanguageLimitBy(language, limit);
    }
    return await Translation.findAllForLanguage(language);
}

/**
 * Create a new translation.
 */
async function post(req, res) {
    try {
        let translation = await Translation.create(req.body);
        return res.status(200).send(translation);
    } catch (err) {
        return res.status(500).send({'error': err});
    }
}

/**
 * Create a new translation.
 */
async function updateDifficulty(req, res) {
    if (!req.body.id || !req.body.difficulty)  {
        res.status(500).send({error: "Please provide 'id' and 'difficulty' in the POST body"});
    }

    try {
        let translation = await Translation.updateDifficulty(req.body);
        return res.status(200).send(translation);
    } catch (err) {
        return res.status(500).send({'error': err});
    }
}

/**
 * Remove an existing expense.
 */
async function del(req, res) {
    try {
        await Translation.remove(req.params.id);
        res.status(200).send({'success': true});
    } catch (err) {
        res.status(500).send({'error': err});
    }
}

export default function configureExpenseRoutes(app) {
    app.all('/api/translation*', async (req, res, next) => {
        var result = await verifyToken(req);

        if (process.env.NODE_ENV === 'TEST' || result.success) {
            next();
        }
        else {
            res.status(401).send({"error": result.message});
        }
    });

    app.route('/api/translation')
        .get(get)
        .post(post);

    app.route('/api/translation/updateDifficulty')
        .post(updateDifficulty);

    app.route('/api/translation/:id')
        .delete(del);
}
