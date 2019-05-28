install:
	npm install

start:
	npx nodemon --exec npx babel-node server/bin/slack.js

build:
	rm -rf dist
	babel server --out-dir dist --source-maps inline
	npx webpack -p --env production

test:
	jest

lint:
	npx eslint .

test-ci: lint test

publish:
	npm publish
