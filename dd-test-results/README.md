# Datadog Test Results

GitHub Action to report test results to Datadog.

## Usage

```yaml
- name: Report test results to Datadog
  uses: zendesk/ga/dd-test-results@v1
  with:
    dd-api-key: ${{ secrets.DATADOG_API_KEY }}
    dd-metric-name: zendesk.tests
    dd-tags: |
     - "key:value"
    dd-host: ${{ github.repository_owner }}
    test-framework: junit|nunit|mstest
    test-report-file: build/test/report.xml
    test-tags-file: test-tags.json
```

## Inputs

- `dd-api-key`: Datadog API key (required)
- `dd-metric-name`: Datadog metric name
- `dd-tags`: Datadog metric tags. Accepts multiline input where each line consists of key-value entry separated by colon (`:`).
- `dd-host`: Datadog host name
- `test-framework`: Type of test framework (junit | nunit | mstest)
- `test-report-file`: Path to the test report file. Supports [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming))
- `test-tags-file`: Path to the JSON file with tags to decorate test results

## Examples

To report Android JUnit test results:

```yaml
steps:
  - name: Report test results to Datadog
    uses: zendesk/ga/dd-test-results@v1
    with:
      dd-api-key: ${{ secrets.DATADOG_API_KEY }}
      dd-metric-name: zendesk.tests
      dd-tags: |
        - "job_name:${{ github.name }}"
      dd-host: ${{ github.repository_owner }}
      test-framework: junit
      test-report-file: ./**/build/outputs/androidTest-results/connected/app.xml
      test-tags: test-tags.json
```

## Test Results Tagging

By default, each test result will include the following Datadog metric tags:
- `success`: Either `true` or `false`. Extracted from the provided test report
- `test_case`: Name of the test case extracted from the provided test report.

The action enables you to specify additional tags:
- directly in the YML or 
- in a supplementary JSON file.

Tags provided in the YML are applied to all test cases in all test suites.

Tags provided in the JSON file are applied to a specific test suites and cases.

### JSON File

To decorate test results with additional tags via JSON file, ensure the content adheres to the following structure:

```json
{
  "suites": [
    {
      "name": "test_suite_name",
      "tags": {
        "team": "Team B",
        "another_tag_for_all_test_cases_within_this_suite": "42"
      },
      "cases": {
        "name": "test_case_name",
        "tags": {
            "team": "Team C",
            "another_tag_for_this_test_case_only": "12",
            "test_case": "test_case_name_override"
        }
      }
    }
  ]
}
```

You can specify tags at two levels:
- within a test suite
- within a test case

Tags specified for a particular test suite are applied only to test cases within that suite.

Tags specified for a particular test cases are applied only to that test case.

**NOTE**: All the tags specified in the JSON will be overriden by tags in YML given the same tag key.