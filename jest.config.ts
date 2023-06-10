import type { Config } from '@jest/types'

const jestConfig: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    '.+\\.(t|j)s$': ['ts-jest', { tsconfig: './tsconfig.json' }]
  },
  collectCoverageFrom: ['**/*.controller.ts', '**/*.service.ts', '**/*.strategy.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  preset: 'ts-jest/presets/js-with-ts',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '#node-web-compat': './node-web-compat-node.js'
  },

  coverageReporters: ['html', 'json-summary']
}

export default jestConfig
