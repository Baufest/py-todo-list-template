require('dotenv').config();
process.env.DATAMANAGER_BASE_URL =
    'https://datamanager.globaldevtools.bbva.com/data-manager-api/namespaces/ivanesteban.coronel.contractor.gdevtools.com';
exports.config = {
  baseUrl: 'https://wscalidad.arg.igrupobbva/',
  
  reporters: [
    ['allure', {
      outputDir: './results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter:true
      }
    ],
  ]

};
