# Spinnaker Json Schema Validator
This GitHub Action (written in NodeJS) wraps the validation of Spinnaker Pipeline and Application Json Schema.

<a href="https://github.com/zendesk/spinnaker-jschema-validator"><img alt="GitHub Actions status" src="https://github.com/zendesk/spinnaker-jschema-validator/workflows/Validate%20spinnaker%20schema/badge.svg"></a>

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#example-workflow---validate-json-schema) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
For more information on these inputs, see the [action.yml](https://github.com/zendesk/spinnaker-jschema-validator/blob/master/action.yml)

| Parameter             |Description 							| Default      |
| -------------------   | ------------------------------------- | ------------ |
| `pipeline-files`      | Pipeline file paths, Comma separate multiple paths, Paths can be absolute or with pattern!!               |spinnaker/pipelines/*.json |
| `application-files`   | Application file paths, Comma separate multiple paths, Paths can be absolute or with pattern!!               | spinnaker/applications/*.json |

                    

## Example workflow - Validate Json Schema

On every `push` to a `master` branch will create tag incrementally.

```yaml
name: Validate spinnaker schema

on:
  push:
    branches:
      - master

jobs:
  schema-validator:
    runs-on: zendesk-stable
    steps:
    - uses: zendesk/checkout@v2
    - name: Validate JSON Schema
      uses: zendesk/spinnaker-jschema-validator@v1
      with:
        pipeline-files: 'spinnaker/pipelines/*.json'
        application-files: 'spinnaker/applications/*.json'
```

This will validate the spinnaker pipeline and application JSON schema and either pass the Github Action job or fails the Github action with necessary validation failure messages.

## Contributing
We would love you to contribute to `@zendesk/spinnaker-jschema-validator`, pull requests are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
