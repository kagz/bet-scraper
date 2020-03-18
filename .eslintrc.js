'use strict';

module.exports = {
  root: true,
  extends: 'airbnb-base',
  parserOptions: { sourceType: 'script' },
  env: { node: true },
  rules: {
		strict: [2, 'global'],
		'no-console': 0,
		'arrow-parens': [2, 'as-needed'],
	},
	overrides: [
		{
			files: ['**/*.spec.js', '**/__mocks__/*.js'],
			env: { jest: true },
		},
	],
};
