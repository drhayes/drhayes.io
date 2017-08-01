SCSS_FILES := $(shell find src -type f -name '*.scss')
SRC_IMAGE_FILES := $(shell find src -type f -name '*.png')
STATIC_IMAGE_FILES := $(subst src,static,$(SRC_IMAGE_FILES))

public: static/css/style.css $(STATIC_IMAGE_FILES)
	hugo

static/css/style.css: $(SCSS_FILES)
	sass ./src/scss/style.scss ./static/css/style.css

static/images/%.png: src/images/%.png
	@mkdir -p "$(@D)"
	@cp $< $@

print-%  : ; @echo $* = $($*)


