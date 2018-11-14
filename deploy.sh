#!/bin/sh
#
# Production Deployment script
#
# @params $1 branch that is deploying

printf "Deploying..."

TAG_ENV=$1

# Setup Github config
git config --global user.name "Travis CI"
git config --global user.email "travis@travis-ci.org"

# Setup new remote with Github token.
git remote add github https://${GITHUB_TOKEN}@github.com/VinceJones/recipe-app.git/ > /dev/null 2>&1

# Create release branch
git checkout -b release/${TAG_ENV}-${TRAVIS_BUILD_ID}

# Add files
git status
git add .
git commit -m "Automated commit by Travis CI for Build ${TRAVIS_BUILD_ID}"

# Push to GitHub
git push github release/${TAG_ENV}-${TRAVIS_BUILD_ID}