# Sauce connect
A GitHub Action to send logs to a local file.

## Parameters
- *file*: (required)
- *msg*: (required)
- *identity*: (required e.g. team name)
- *dry-run*: (optional, default: false)
- *debug*: (optional, default: false)

## Example
```yaml
name: first
on:
  push:
    branches:
      - master

jobs:
  create:
    runs-on: [self-hosted, zendesk-general]
    steps:
      - uses: zendesk/checkout@v2
      - uses: zendesk/ga/logging@v2
        with:
          file: "test.log" # use the correct log file
          msg: "job has triggered today"
          identity: "team_wombat"
```
