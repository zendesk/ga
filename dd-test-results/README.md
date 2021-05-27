# Datadog Test Results

GitHub Action to report test results to Datadog.

## Usage

```yaml
- name: Report test results to Datadog
  uses: zendesk/ga/dd-test-results@v1
  with:
    junit-test-report: TEST_RESULTS_FILE_PATH
    test-results-tags: TEST_RESULTS_TAGS_FILE_PATH
    dd-api-key: ${{ secrets.DATADOG_API_KEY }}
```

## Inputs

- `junit-test-report`: Path to the JUnit test report (required)
- `test-results-tags`: Path to the JSON file with tags (required)
- `dd-api-key`: A valid Datadog API key (required)

## Examples

To report test results from JUnit4 report:

```yaml
steps:
  - name: Report test results to Datadog
    uses: zendesk/ga/dd-test-results@v1
    with:
      junit-test-report: app/build/outputs/androidTest-results/connected/app.xml
      test-results-tags: test-results-tags.json
      dd-api-key: ${{ secrets.DATADOG_API_KEY }}
```

## Test Results Tagging

To decorate test results with additional tags, provide a JSON file with the following structure as the input to the action:

```json
{
  "tags": { 
    "team": "Team A"
  },
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
            "another_tag_for_this_test_case_only": "12"
        }
      }
    }
  ]
}
```

The action will then traverse the file, extracting and aggregating tags for each test case.

You can specify tags at three levels:
- globally at the root
- within a test suite
- within a test case

Tags specified at the root are applied to all test cases in all test suites.

Tags specified for a particular test suite are applied only to test cases within that suite.

Tags specified for a particular test cases are applied only to that test case.