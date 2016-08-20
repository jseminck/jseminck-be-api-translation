#!/bin/sh

rm -rf jseminck-be-api-translation
mkdir jseminck-be-api-translation
mv ./jseminck-be-api-translation.tgz jseminck-be-api-translation/jseminck-be-api-translation.tgz
cd jseminck-be-api-translation
tar -zxvf jseminck-be-api-translation.tgz
node-gyp rebuild
npm install
npm run stop
npm run start
rm jseminck-be-api-translation.tgz
cd ..
rm deploy.sh
