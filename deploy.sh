#!/usr/bin/env sh
set -e
yarn build
cd build
git init
git add .
git commit -m 'Deploy to Github Pages'
git push -f git@github.com:oleksanderkorn/joystream-live.git main:gh-pages
cd ..