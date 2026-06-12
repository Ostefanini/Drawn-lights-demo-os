module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'tests-e2e-gherkin/support/**/*.ts',
      'tests-e2e-gherkin/steps/**/*.ts',
    ],
    paths: ['tests-e2e-gherkin/features/**/*.feature'],
    format: ['progress-bar', 'html:cucumber-report/index.html'],
    timeout: 60_000,
  },
};
