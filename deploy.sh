#!/usr/bin/env sh

set -e

yarn run build

cd dist
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/spenguinlui/VueCli3-vuex.git master:gh-pages

cd -