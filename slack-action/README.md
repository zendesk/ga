# Post Slack messages

## Usage:

```yaml
- name: Notify slack
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
  uses: zendesk/ga/slack-action@v1
  with:
    args: '{\"channel\":\"C1234567890\",\"text\":\"Hello world\"}'
```
