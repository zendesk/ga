# Create releases in Samson

This action uses the generic webhook to create releases in Samson

## Usage:
```yaml
- name: Notify Samson
  env:
    WEBHOOK_URL: "https://samsonxxxx.com/21asdaadsdsd213"
    COMMIT: ${{ github.sha }}
  uses: zendesk/ga/samson-create-release@v1
```
## Env variables
- `WEBHOOK_URL` (required) a generic webhook URL from Samson
- `COMMIT` (required) a commit sha. use github context to get this value ${{ github.sha }} 
- `MESSAGE` (optional default: Triggered by samson-action) a simple message to pass to Samson

## Common Usage
In your workflow yaml, you can have a release job that will be triggered on master branch, if and only if the dependent test job finishes.
``` yaml
release:
  needs: test
  if: github.ref == 'refs/heads/master'
  runs-on: zendesk-stable
  steps:
    - name: Notify Samson
      uses: zendesk/ga/samson-create-release@v1
      env:
        WEBHOOK_URL: "https://samtest.test.com/integrations/generic/xxxxxxx" # Please use a valid Samson URL
        COMMIT: ${{ github.sha }}
```
You can also have a separate config for Samson to avoid running your CI tests again after merging to master.
```yaml
name: samson

on:
  push:
    branches: master

jobs:
  samson:
    runs-on: zendesk-stable
    steps:
      - uses: zendesk/ga/samson-create-release@v1
        env:
          WEBHOOK_URL: "https://samtest.test.com/integrations/generic/xxxxxxx" # Please use a valid Samson URL
          COMMIT: ${{ github.sha }}

```
