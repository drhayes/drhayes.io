.PHONY=deploy
deploy: dist

.PHONY=clean
clean:
	rm -rf notes
	rm -rf dist
	rm -rf src/notes

dist: node_modules src/notes
	npm run build

notes:
	git clone git@github.com:drhayes/notes.git

src/notes: notes
	mkdir -p src/notes
	cp scaffolding/notes.json src/notes
	cp scaffolding/notes-index.md src/notes/index.md
	exec bin/processNotes.js notes src/notes

node_modules:
	npm install
