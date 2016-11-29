#!/bin/bash

# If there are any errors, fail Travis
set -e

# Define variables depending on the branch
APIENVIRONMENT=1

if [[ $TRAVIS_BRANCH == 'release' ]]
  then
    APIENVIRONMENT=3
fi
if [[ $TRAVIS_BRANCH == 'uat' ]]
  then
    APIENVIRONMENT=2
fi
if [[ $TRAVIS_BRANCH == 'master' ]]
  then
    APIENVIRONMENT=1
fi

sed -i "/^  const apiUri:/c \  const apiUri = api[$APIENVIRONMENT]" config.js

# Run tests
gulp

