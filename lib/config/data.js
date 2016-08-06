import * as Translation from './../models/Translation';

export default async function configureData() {
    return new Promise(async (resolve) => {
        if (process.env.NODE_ENV === "DEVELOPMENT" || process.env.NODE_ENV === "TEST") {
            try {
                await Translation.__recreate();
            } catch(err) {
                resolve();
            }
            resolve();
        }
        else {
            resolve();
        }
    });
}