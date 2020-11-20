.PHONY=deploy
build: dist dist/css/site.css

.PHONY=clean
clean:
	rm -rf notes
	rm -rf dist
	rm -rf src/notes

dist/css/site.css: css/site.css tailwind.config.js
	./node_modules/.bin/tailwindcss build $< -o $@
#   NODE_ENV=production ./node_modules/.bin/tailwindcss build $< -o $@

dist: src/notes
	npm run build

src/notes:
	mkdir -p src/notes
	cp scaffolding/notes.json src/notes
	cp scaffolding/notes-index.md src/notes/index.md
	exec bin/processNotes.js notes src/notes
