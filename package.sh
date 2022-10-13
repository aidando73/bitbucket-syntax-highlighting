#!/usr/bin/env sh
script_dir=$(dirname "$0")

rm -rf dist
mkdir dist
cd $script_dir/static
zip -r ../dist/package.zip ./*