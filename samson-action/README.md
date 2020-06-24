# Post Slack messages

Use generic webhook to create releases in Samson

## Usage:
WEBHOOL_URL (required)
COMMIT (required)
```yaml
- name: Notify Samson
  env:
    WEBHOOK_URL: "https://samsonxxxx.com/21asdaadsdsd213"
    COMMIT: ${{ github.sha }}
  uses: zendesk/samson-actions@v1
```


