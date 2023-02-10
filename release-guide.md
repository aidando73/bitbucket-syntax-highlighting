# Release Guide

1. Checkout main
```
git checkout main && git pull
```

2. Create a new branch
```
git checkout -b release/x.x.x
```

3. Bump version
```
./bump-version.sh x.x.x
```

4. Commit and push changes
```
git commit -am "Bump version for release"
git push -u origin head
```

5. Create a PR and merge

6. Package artifacts (macos and ubuntu)
```
./package.sh
```

7. Create a new release [here](https://github.com/REslim30/bitbucket-syntax-highlighting/releases/new)
    - Increment version number
    - Create a tag with version number (should be a dropdown)
    - Generate release notes
    - Attach `chrome.zip` and `firefox.zip` under the `dist/` folder

8. Login to the [chrome web store developer dashboard](https://chrome.google.com/u/1/webstore/devconsole) and publish `chrome.zip`
    - Email is aidan.do.extensions@gmail.com

9. Login to the [firefox web store developer dashboard]() and publish `firefox.zip`
    - Email is aidan.do.extensions@gmail.com