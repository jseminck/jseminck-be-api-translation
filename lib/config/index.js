import configureDb from './db';
import configureData from './configureData';

export default function configure() {
    configureDb();
    configureData();
}