SCSS_FILES := $(shell find src -type f -name '*.scss')
SRC_IMAGE_FILES := $(shell find src -type f -name '*.png')
STATIC_IMAGE_FILES := $(subst src,static,$(SRC_IMAGE_FILES))

public: static/css/style.css $(STATIC_IMAGE_FILES)
	hugo

static/css/style.css: $(SCSS_FILES) node_modules
	mkdir -p static/css
	npm run sass

node_modules:
	npm install

static/images/%.png: src/images/%.png
	@mkdir -p "$(@D)"
	@cp $< $@

print-%  : ; @echo $* = $($*)


