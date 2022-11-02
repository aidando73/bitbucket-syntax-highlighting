## Manual Tests
This is a temporary testing strategy for the tests until a more automated solution is implemented.

### Smoke tests
- Go onto a PR and check if most things are highlighted
- Open up bitbucket.org and travel to the PRs and check if they're highlighted
- Maintain a PR with all file types and scroll through it to see if everything is highlighted.
- Go to a large PR and check if the highlighting is still working.
  - Check that highlighting still works when changing files
  - Check that highlighting still works when changing from an image diff to a code diff.

### Slower tests
- Push a change to a PR and reload the page and check if they're still highlighted
- Go to a PR with comments and sort by recent comments. Check if the highlighting is still working.
- Find a PR with a renamed file and check if the highlighting is still working.
