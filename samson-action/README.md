# Create releases in Samson

This action uses the generic webhook to create releases in Samson

## Usage:
```yaml
- name: Notify Samson
  env:
    WEBHOOK_URL: "https://samsonxxxx.com/21asdaadsdsd213"
    COMMIT: ${{ github.sha }}
  uses: zendesk/ga/samson-action@v1
```
## Env variables
- *WEBHOOK_URL* (required) a generic webhook URL from Samson
- *COMMIT* (required) a commit sha. use github context to get this value ${{ github.sha }} 
- *MESSAGE* (optional default: Triggered by samson-action) a simple message to pass to Samson
