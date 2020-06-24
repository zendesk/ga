# Post Slack messages

This action wraps the Slack [chat.postMessage](https://api.slack.com/methods/chat.postMessage) API method for posting to channels, private groups, and DMs.

## Usage:
```yaml
- name: Notify slack
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
  uses: zendesk/ga/slack-action@v1
  with:
    args: '{\"channel\":\"C1234567890\",\"text\":\"Hello world\"}'
```
*SLACK_BOT_TOKEN* (required) This action sends messages using Slack bot tokens

## Payload
Slack's chat.postMessage method accepts a JSON payload containing options — this JSON payload should be supplied as the argument in your GitHub Action. At a bare minimum, your payload must include a channel ID and the message. Here's what a basic message might look like:

*Channel ID* 
If you open Slack in your web browser, you can find channel IDs at the end of the URL when viewing channels and private groups. Note that this doesn't work for direct messages.
https://myworkspace.slack.com/messages/CHANNEL_ID/

