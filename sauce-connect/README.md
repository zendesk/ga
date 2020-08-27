# Sauce connect
A GitHub Action to opens a secure tunnel connection for testing between a Sauce Labs virtual machine and the runner.

## Parameters
- *sauce-username*: (required)
- *sauce-access-key*: (required)
- *tunnel-identifier*: (optional, default: github-action-tunnel)
- *version*: (optional, default: 4.6.2)
- *debug*: (option, default: false)

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
      - uses: zendesk/ga/sauce-connect@v2
        with:
          sauce-username: ${{ secrets.SAUCE_USERNAME }}
          sauce-access-key: ${{ secrets.SAUCE_ACCESS_KEY }}
```
