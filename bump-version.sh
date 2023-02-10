#!/usr/bin/env sh
set -e
if [ -z "$1" ]; then
    echo "Please enter a version number x.x.x"
    exit 1;
fi

if [ "$OSTYPE" = 'darwin'* ]; then
    echo "Unimplemented for MacOs - please implement"
    exit 1
else
    sed -i -e 's/"version": "[[:digit:]\+\.[[:digit:]]\+\.[[:digit:]]\+"/"version": "${1}"/'  static/manifest.json
fi