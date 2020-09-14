# Tag semantic release
A GitHub Action to create a semantic releases for your default branch.

## Parameters
- *version-type* (required, options: major, minor or patch)
- *github-token* (required)
- *debug* (optional, default: false)
- *dry-run* (optional, default: false)
- *assets* (optional, file names are space delimited)

## Example
```yaml
name: first
on:
  push:
    branches:
      - master

jobs:
  create:
    runs-on: [self-hosted, zendesk-stable]
    steps:
      - uses: zendesk/checkout@v2
      - uses: zendesk/ga/tag-semantic-release@v2
        id: tag
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          version-type: patch
      - name: Print out the new version
        run: echo ${{ steps.tag.outputs.version }}
```
