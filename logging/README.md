# Sauce connect
A GitHub Action to send logs to a file.

## Parameters
- *file*: (required)
- *msg*: (required)
- *identity*: (required e.g. team name)
- *dry-run*: (optional, default: false)
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
    runs-on: [self-hosted, zendesk-general]
    steps:
      - uses: zendesk/checkout@v2
      - uses: zendesk/ga/logging@v2
        with:
          file: "test.log" # use the correct log gile
          msg: "job has triggered today"
		  identity: "team wombat"
```
