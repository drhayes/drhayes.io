.PHONY=deploy
build: dist

.PHONY=clean
clean:
	rm -rf notes
	rm -rf dist
	rm -rf src/notes

dist: src/notes
	npm run build

src/notes:
	mkdir -p src/notes
	cp scaffolding/notes.json src/notes
	cp scaffolding/notes-index.md src/notes/index.md
	exec bin/processNotes.js notes src/notes
