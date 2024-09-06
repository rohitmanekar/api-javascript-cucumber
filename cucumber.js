export default {
    default: [
      '--import features/step_definitions/*.js',
      '--import features/support/*.js',
      '--format json:reports/cucumber_report.json',
      '--format html:reports/cucumber_report.html'
    ]
  };