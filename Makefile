install:
	npm install

start:
	npx nodemon --exec npx babel-node server/bin/slack.js

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint .

test-ci: lint test

publish:
	npm publish
