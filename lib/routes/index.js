import configureTranslationRoutes from './translation';
import configureGameRoutes from './game';

export default function configureRoutes (app) {
    configureTranslationRoutes(app);
    configureGameRoutes(app);
}
