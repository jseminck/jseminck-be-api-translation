import supertest from 'supertest';
import async from 'async';
import * as Translation from './../../lib/models/Translation';

const app = require('./../../lib/index');

describe('Integration tests for /api/expenses', () => {
    function createTranslation(english, translation, language, category) {
        return {
            english,
            translation,
            language,
            category
        };
    }

    describe("GET", () => {
        beforeEach(async function(done) {
            await Translation.__recreate();

            async.series([
                (cb) => supertest(app).post(`/api/translation`).send(createTranslation("english1", "spanish1", "Spanish", "household")).expect(200).end(cb),
                (cb) => supertest(app).post(`/api/translation`).send(createTranslation("english2", "spanish2", "Spanish", "household")).expect(200).end(cb),
                (cb) => supertest(app).post(`/api/translation`).send(createTranslation("english3", "spanish3", "Spanish", "household")).expect(200).end(cb),
                (cb) => supertest(app).post(`/api/translation`).send(createTranslation("english1", "russian1", "Russian", "household")).expect(200).end(cb),
                (cb) => supertest(app).post(`/api/translation`).send(createTranslation("english2", "russian2", "Russian", "household")).expect(200).end(cb),
                (cb) => supertest(app).post(`/api/translation`).send(createTranslation("english3", "russian3", "Russian", "household")).expect(200).end(cb)
            ], done);
        });

        it("returns error without language paramter", function(done) {
            supertest(app)
                .get('/api/translation')
                .expect(500, {
                    error: "Please provide ?language= parameter"
                }, done);
        });


        it("returns 3 items for Spanish", function(done) {
            supertest(app)
                .get(`/api/translation?language=Spanish`)
                .expect((res) => {
                    expect(res.body.length).to.equal(3);
                })
                .end(done);
        });

        it("returns 3 items for Russian", function(done) {
            supertest(app)
                .get(`/api/translation?language=Spanish`)
                .expect((res) => {
                    expect(res.body.length).to.equal(3);
                })
                .end(done);
        });

        it("contains all the required fields", function(done) {
            supertest(app)
                .get(`/api/translation?language=Spanish`)
                .expect((res) => {
                    expect(res.body[0]).to.have.all.keys(
                        'id', 'english', 'translation', 'language', 'category', 'correctguesses', 'totalguesses', 'created_at'
                    );

                })
                .end(done);
        });


        it("allows POST and has 4 items for Spanish", function(done) {
            const translation = {
                english: "new",
                translation: "new",
                language: "Spanish",
                category: "new"
            };

            async.series([
                (cb) => supertest(app)
                    .post('/api/translation')
                    .send(translation)
                    .expect(200)
                    .end(cb),
                (cb) => supertest(app)
                        .get(`/api/translation?language=Spanish`).expect((res) => {
                            expect(res.body.length).to.equal(4);
                        }).end(cb)
            ], done);
        });

        it("allows DELETE and has 2 items for Spanish", function(done) {
            let translationId;

            async.series([
                (cb) => supertest(app)
                    .get(`/api/translation?language=Spanish`).expect((res) => {
                        expect(res.body.length).to.equal(3);
                        translationId = res.body[0].id;
                    }).end(cb),
                (cb) => supertest(app)
                    .del('/api/translation/' + translationId)
                    .expect(200)
                    .end(cb),
                (cb) => supertest(app)
                    .get(`/api/translation?language=Spanish`).expect((res) => {
                        expect(res.body.length).to.equal(2);
                    }).end(cb)
            ], done);
        });
    });
});
