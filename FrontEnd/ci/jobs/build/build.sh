#!/bin/sh
set -o errexit
BASEDIR=$(dirname "$0")"/.."
cd "$BASEDIR"

echo "npm version=$(npm --version)"
echo "node version=$(node --version)"

npm install
# npm rebuild
npm run test:ci
npm run build

