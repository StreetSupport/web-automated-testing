const outputDir = '_dist/'
const testDir = 'tests/**/*'
const api = [
  'https://dev-api-streetsupport.azurewebsites.net/v2/service-categories',
  'https://staging-api-streetsupport.azurewebsites.net/v2/service-categories',
  'https://live-api-streetsupport.azurewebsites.net/v2/service-categories'
]
const apiUri = api[0]

export {
  outputDir, testDir, apiUri
}
