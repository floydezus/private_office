install: install-deps

start-full:
	npm run start & npx json-server --watch server/db.json --port 8080

install-deps:
	npm ci