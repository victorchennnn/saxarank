.PHONY: start deploy-dev deploy-prod

start:
	deno task start

deploy-dev:
	deployctl deploy --save-config

deploy-prod:
	deployctl deploy --save-config --prod

count:
	cloc --exclude-dir=node_modules .
