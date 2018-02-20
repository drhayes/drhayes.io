SCSS_FILES := $(shell find src -type f -name '*.scss')
SRC_IMAGE_FILES := $(shell find src -type f -name '*.png')
STATIC_IMAGE_FILES := $(subst src,static,$(SRC_IMAGE_FILES))
FILES=$(shell find content layouts static -type f)

public: $(FILES) public/images static/css/style.css config.toml
	hugo

public/images: $(STATIC_IMAGE_FILES)
	mkdir -p public/images
	cp -r static/images public/

watch:
	hugo server -w

static/css/style.css: $(SCSS_FILES)
	@echo 'creating css'
	@mkdir -p ./static/css
	sass ./src/scss/style.scss ./static/css/style.css

static/images/%.png: src/images/%.png
	@mkdir -p "$(@D)"
	@cp $< $@

clean:
	rm -rf public/
	rm -rf static/css
	rm -rf static/images

print-%  : ; @echo $* = $($*)

publish: public
	gsutil rsync -R public/ gs://drhayes.io

.PHONY: clean print-% publish
