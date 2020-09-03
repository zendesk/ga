const core = require('@actions/core')
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const Ajv = require('ajv')
// Schema requires
const pipelineSchema = require(path.resolve(__dirname, './pipeline_schema/root.json'))
// Stage Schemas
const pipelineStages = require(path.resolve(__dirname, './pipeline_schema/stages/'))
const pipelineTrigger = require(path.resolve(__dirname, './pipeline_schema/triggers/'))

function readFile (filePath) {
  if (path.extname(filePath) !== '.json') {
    throw new Error(`Invalid file extension, it should be '.json', file: ${filePath}`)
  }
  var jsonData = fs.readFileSync(filePath, 'utf-8')
  var parsedData = JSON.parse(jsonData)
  return parsedData
}

function validateSchema (filePath) {
  var ajv = new Ajv()
  ajv.addSchema(pipelineStages)
  ajv.addSchema(pipelineTrigger)
  var data = readFile(filePath)
  var valid = ajv.validate(pipelineSchema, data)
  if (valid) {
    return ''
  } else {
    return ajv.errorsText()
  }
}

try {
  const run = () => {
    // Split multiple pipeline file paths and get its absoulte paths
    const pipelineFiles = (core.getInput('pipeline-files') || '').split(',')
    const globOption = { onlyFiles: true, dot: true }
    const errors = []
    // Loop over splitted file path
    pipelineFiles.forEach(filePath => {
      // Extract files from pattern if any
      var files = glob.sync(filePath, globOption)
      // Loop over absoulte file paths
      files.forEach(file => {
        console.log(`Started validating Pipeline JSON, file: ${file}`)
        var validationErr = validateSchema(file)
        if (validationErr !== '') {
          var error = `file: ${file}, error: ${validationErr}`
          errors.push(error)
          console.error(`Pipeline JSON is Invalid, ${error}`)
        } else {
          console.log(`Pipeline JSON is valid, file: ${file}`)
        }
      })
    })

    // Any validation errors
    if (errors.length > 0) {
      throw new Error(`Pipeline JSON Schema validation failed\n ${errors.join('\n')}`)
    }

    console.log('Succesfully validated Pipeline JSON without any errors')
  }

  run()
} catch (error) {
  core.setFailed(`Action failed: ${error}`)
}
