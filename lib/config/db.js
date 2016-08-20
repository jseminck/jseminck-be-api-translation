import {db} from 'jseminck-be-pg';

export default async function configureDb() {
    // DB will take DATABASE_URL first if this is set on env.
    db({
       host: 'localhost',
       port: 10000,
       database: 'jseminck',
       username: 'jseminck',
       password: 'jseminck'
   });
}