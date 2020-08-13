# Tag semantic release

## Parameters
- *version-type* (required, options: major, minor or patch)
- *github-token* (required)
- *debug* (optional, default: false)

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
      - uses: zendesk/ga/tag-semantic-release@shoukoo-tag
        with:
          github-token: ${{ secrets.ORG_GITHUB_TOKEN }}
          version-type: patch

```
