#! /usr/bin/env bash
# vi: ft=bash

# Stolen from https://localghost.dev/blog/sending-webmentions-from-a-static-site/

if ! test -f ./last_webmentions_commit; then
  echo "Last webmention commit file not found, exiting"
  exit 1
fi

# Read the contents of the file
LAST_COMMIT_SENT=$(cat ./last_webmentions_commit)

# Get latest commit hash
LATEST_COMMIT=$(git rev-parse --short HEAD)

# If the last commit hash I sent webmentions for is
# the same as the latest commit hash, exit
if [[ $LAST_COMMIT_SENT == $LATEST_COMMIT ]]; then
  echo "No new commits since we last sent webmentions, nothing to do"
  exit 0
fi

# Get the last commit message
LAST_COMMIT_MESSAGE=$(git log -1 --pretty=%B)

# Does the commit message contain 'post'?
if ! [[ $LAST_COMMIT_MESSAGE == *"post"* ]]; then
  echo "Last commit message does not contain 'post', nothing to do"
  exit 0
fi

# Update the file with the latest commit hash
echo $LATEST_COMMIT > ./last_webmentions_commit

npm run send-webmentions
