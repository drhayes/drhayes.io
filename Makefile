.PHONY=deploy
build: dist dist/css/site.css

.PHONY=clean
clean:
	rm -rf dist

dist:
	npm run build

dist/css/site.css:
	npm run build:css
