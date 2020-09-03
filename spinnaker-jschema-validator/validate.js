const glob = require('glob')
const fs = require('fs')
const path = require('path')
const Ajv = require('ajv')

const pipelineSchema = require(path.resolve(__dirname, './pipeline_schema/root.json'))
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
    console.log('valid!')
  } else {
    console.log(ajv.errorsText())
  }
}

validateSchema('./tests/data/manual_trigger.json')