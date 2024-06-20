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

lint:
	npx eslint .	

fix:
	npx eslint . --fix

run:
	gendiff  './__fixtures__/file1.json' './__fixtures__/file2.json' 

.PHONY: test