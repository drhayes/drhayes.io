import { visit } from 'unist-util-visit';

function transformer(tree) {
  visit(tree, 'blockquote', visitor);

  // Trying to change this:
  // > It is the unofficial force—the Baker Street irregulars.
  // > -- Sherlock Holmes, Sign of Four
  // to this:
  // <figure class="quote">
  //   <blockquote>It is the unofficial force—the Baker Street irregulars.</blockquote>
  //   <figcaption>Sherlock Holmes, Sign of Four</figcaption>
  // </figure>
  function visitor(node, _, parent) {
    // Avoid recursive hell.
    if (parent && parent.type === 'figure') {
      return;
    }

    const data = node.data || (node.data = {});
    // Grab the last paragraph.
    const lastParagraph = node.children[node.children.length - 1];
    if (!lastParagraph || lastParagraph.type !== 'paragraph') {
      console.log('early exit', lastParagraph && lastParagraph.type);
      return;
    }
    // Grab the last text node in that paragraph.
    const lastText = lastParagraph.children[lastParagraph.children.length - 1];
    if (!lastText || lastText.type !== 'text') {
      console.log('early exit', lastText && lastText.type);
      return;
    }
    // Does it have a "\n–" in it?
    // Look for type:text nodes with a string that looks like "\n–" in them.
    // These are attributions.
    // Look out kids, that's an endash: – not a hyphen: -.
    const [quoteBit, attributionBit] = lastText.value.split('\n–');
    if (!attributionBit) {
      console.log('no attribution in this blockquote', quoteBit);
      return;
    }
    lastText.value = quoteBit;

    const newFigcaption = {
      type: 'figcaption',
      data: {
        hName: 'figcaption'
      },
      children: [{
        type: 'text',
        value: attributionBit.trim(),
      }],
    };

    const newNode = {
      type: 'figure',
      data: {
        ...data,
        hName: 'figure',
      },
      children: [
        Object.assign({}, node),
        newFigcaption,
      ]
    };
    // Base-case the recursive hell.
    node.parent = newNode;

    return Object.assign(node, newNode);
  }
}

function attributionPlugin() {
  return transformer;
}

export default attributionPlugin;
/**
 * {
  "type": "blockquote",
  "children": [
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "Editing a behaviour tree is similar to writing a computer program: you don’t specify the transitions from an instruction to another, since the transition is implied by the syntax of the programming language. This ",
          "position": {
            "start": {
              "line": 109,
              "column": 3,
              "offset": 8680
            },
            "end": {
              "line": 109,
              "column": 216,
              "offset": 8893
            }
          }
        },
        {
          "type": "strong",
          "children": [
            {
              "type": "text",
              "value": "programming analogy",
              "position": {
                "start": {
                  "line": 109,
                  "column": 218,
                  "offset": 8895
                },
                "end": {
                  "line": 109,
                  "column": 237,
                  "offset": 8914
                }
              }
            }
          ],
          "position": {
            "start": {
              "line": 109,
              "column": 216,
              "offset": 8893
            },
            "end": {
              "line": 109,
              "column": 239,
              "offset": 8916
            }
          }
        },
        {
          "type": "text",
          "value": " is the based idea that inspired the development of Panda Behaviour.\n-- Panda BT Documentation",
          "position": {
            "start": {
              "line": 109,
              "column": 239,
              "offset": 8916
            },
            "end": {
              "line": 110,
              "column": 28,
              "offset": 9012
            }
          }
        }
      ],
      "position": {
        "start": {
          "line": 109,
          "column": 3,
          "offset": 8680
        },
        "end": {
          "line": 110,
          "column": 28,
          "offset": 9012
        }
      }
    }
  ],
  "position": {
    "start": {
      "line": 109,
      "column": 1,
      "offset": 8678
    },
    "end": {
      "line": 110,
      "column": 28,
      "offset": 9012
    }
  }
}
 */
