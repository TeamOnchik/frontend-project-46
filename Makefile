install:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

run:
	gendiff  './__fixtures__/file1.json' './__fixtures__/file2.json' 

.PHONY: test