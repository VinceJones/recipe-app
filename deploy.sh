#!/bin/sh
#
# Production Deployment script
#
# @params $1 branch that is deploying

TAG_ENV=$1

# Setup Github config
git config --global user.name "Travis-CI"
git config --global user.email "noreply@travis-ci.org"

# Create release branch
git checkout -b release/${TAG_ENV}-${TRAVIS_BUILD_ID}

# Add files
git status -vv
git add .
git commit -m "Automated commit by Travis CI for Build ${TRAVIS_BUILD_ID}"

# Push to GitHub
git push origin release/${TAG_ENV}-${TRAVIS_BUILD_ID}