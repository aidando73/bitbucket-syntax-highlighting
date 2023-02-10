#!/usr/bin/env sh
set -e
Green='\033[0;32m'
Color_Off='\033[0m'

script_dir=$(cd "$(dirname "$0")"; pwd)

# Clear directory
rm -rf dist
mkdir dist

# Package for Firefox
cp -r "$script_dir"/static "$script_dir"/dist/firefox
cd "$script_dir"/dist/firefox || exit
zip -r "$script_dir"/dist/firefox.zip ./*
echo "${Green}Packaged for firefox under dist/firefox.zip${Color_Off}"
echo

# Package for Chrome
cd "$script_dir"/dist || exit
cp -r "$script_dir"/static "$script_dir"/dist/chrome
cd "$script_dir"/dist/chrome || exit
# Set manifest version to 3 using macos sed
if [ "$OSTYPE" = 'darwin'* ]; then
    sed -i '' 's/"manifest_version": 2/"manifest_version": 3/' manifest.json
else
    sed -i -e 's/"manifest_version": 2/"manifest_version": 3/'  manifest.json
fi
zip -r "$script_dir"/dist/chrome.zip ./*
echo "${Green}Packaged for chrome under dist/chrome.zip${Color_Off}"