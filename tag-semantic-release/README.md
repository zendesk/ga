# Tag semantic release
A GitHub Action to create a semantic releases for your default branch.

## Parameters
- *version-type* (required, options: major, minor or patch)
- *github-token* (required)
- *debug* (optional, default: false)
- *dry-run* (optional, default: false)

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
        with:
          github-token: ${{ secrets.ORG_GITHUB_TOKEN }}
          version-type: patch

```
