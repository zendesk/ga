# Slack post message

GitHub Actions which wraps the Slack [`chat.postMessage`](https://api.slack.com/methods/chat.postMessage) API method for posting to public channel or private group.

## Usage

```yaml
- name: Send Slack message
  uses: zendesk/ga/slack-post-msg@v2
  with:
    channel: CHANNEL_ID
    slack-auth-token: AUTH_TOKEN
    status: success
```

## Inputs

- `channel`: Target channel ID for messages, either a channel or a private group (required)
- `emoji`: Emoji to be used as the icon for the posted message - _without_ leading/trailing colons (optional, default: `github-buddy`)
- `slack-auth-token`: Slack [authentication token](https://api.slack.com/methods/chat.postMessage#arg_token) with required message posting scope(s) (required)
- `status`: Message result - allowed values are one of [`success`,`failure`,`cancelled`] (optional, default: `failure`)

## Examples

### Single job

```yaml
name: Workflow
on:
  push:

jobs:
  main:
    name: Simple job run
    runs-on: [self-hosted,zendesk-stable]
    steps:
      - name: First step
        run: |
          exit 0
      - name: Second step
        run: |
          exit 0
      - name: Post Slack result message
        if: always()
        uses: zendesk/ga/slack-post-msg@v2
        with:
          channel: CHANNEL_ID
          slack-auth-token: ${{ secrets.STOKEN }}
          status: ${{ job.status }}
```

### Multiple jobs

```yaml
name: Workflow
on:
  push:

jobs:
  test1:
    name: A job to say hello
    runs-on: [self-hosted,zendesk-stable]
    steps:
      - name: Test bad
        run: |
          exit 1
  test2:
    name: A job to say hello
    runs-on: [self-hosted,zendesk-stable]
    steps:
      - name: Test good
        run: |
          exit 0
  slack:
    name: Slack
    runs-on: [self-hosted,zendesk-stable]
    needs: [test1,test2]
    if: always()
    steps:
      - name: Post Slack result message
        if: contains(needs.*.result,'failure')
        uses: zendesk/ga/slack-post-msg@v2
        with:
          channel: CHANNEL_ID
          slack-auth-token: ${{ secrets.STOKEN }}
          status: failure
```

### Multiple jobs with matrix

```yaml
name: Workflow
on:
  push:

jobs:
  test:
    name: Job group
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
    name: Slack
    runs-on: [self-hosted,zendesk-stable]
    needs: [test]
    if: always()
    steps:
      - name: Post Slack result message
        if: contains(needs.test.result,'failure')
        uses: zendesk/ga/slack-post-msg@v2
        with:
          channel: CHANNEL_ID
          slack-auth-token: ${{ secrets.STOKEN }}
          status: failure
```
