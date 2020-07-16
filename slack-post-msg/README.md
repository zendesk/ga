# Post Slack messages

This action wraps the Slack [chat.postMessage](https://api.slack.com/methods/chat.postMessage) API method for posting to channels, private groups, and DMs.

## Env variables
- *SLACK_BOT_TOKEN* (required)
- *GITHUB_CONTEXT* (required)
- *STATUS* (optional) valid values are failure and success, default is failure
- *CHANNEL_ID* (required)
If you open Slack in your web browser, you can find channel IDs at the end of the URL when viewing channels and private groups. Note that this doesn't work for direct messages.
https://myworkspace.slack.com/messages/CHANNEL_ID/

## Example 1
Only send out a message if a job failed.
```yaml
name: first
on:
  push:

jobs:
  test1:
    runs-on: [self-hosted,zendesk-stable]
    name: A job to say hello
    steps:
      - name: test
        run: |
          exit 1

  test2:
    runs-on: [self-hosted,zendesk-stable]
    name: A job to say hello
    steps:
      - name: test
        run: |
          exit 0

  slack:
    runs-on: [self-hosted, zendesk-stable]
    needs: [test1, test2]
    if: ${{ always() }}
    steps:
      - name: Notify slack
        if: ${{ contains(needs.*.result, 'failure') }}
        env:
          SLACK_BOT_TOKEN: ${{ secrets.STOKEN }}
          GITHUB_CONTEXT: ${{ toJson(github) }}
          STATUS: failure
          CHANNEL_ID: C014024BP38
        uses: zendesk/ga/slack-post-msg@v1
```

## Example 2
This example shows you how to get job status when using matrix in the configuration
```yaml
name: first
on:
  push:

jobs:
  test1:
    runs-on: [self-hosted,zendesk-stable]
    strategy:
      matrix:
        task:
          - test1
          - test2
          - test3
    steps:
      - name: ${{ matrix.tasks }}
        run: |
          exit 1

  slack:
    runs-on: [self-hosted, zendesk-stable]
    needs: [test1]
    if: ${{ always() }}
    steps:
      - name: Notify slack
        if: ${{ contains(needs.test1.result, 'failure') }}
        env:
          SLACK_BOT_TOKEN: ${{ secrets.STOKEN }}
          GITHUB_CONTEXT: ${{ toJson(github) }}
          STATUS: failure
          CHANNEL_ID: C014024BP38
        uses: zendesk/ga/slack-post-msg@v1
```
