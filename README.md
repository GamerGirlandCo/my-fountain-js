# Fountain-js

[NPM](https://www.npmjs.com/package/fountain-js)

A simple parser for [Fountain](http://fountain.io/), a markup language for formatting screenplays. Originally based on Matt Daly's [Fountain.js](https://github.com/mattdaly/Fountain.js).

Special thanks to [Nathan Hoad](https://www.npmjs.com/~nathanhoad) for the Fountain-js package namespace.

## Syntax Support

Supports up to `v 1.1` of the [Fountain syntax](https://www.fountain.io/syntax#section-changes).

Currently Fountain-js supports a limited range of key-value pairs for title pages -

* `Title`, `Credit`, `Author/s`, `Source`, `Notes`, `Draft date`, `Date`, `Contact`, `Copyright`

## Install

```none
npm install fountain-js
```

## How To

Import `Fountain` and create a new instance of it.

``` javascript
import { Fountain } from 'fountain-js';

let fountain = new Fountain();
```

An extended example.

``` javascript
import { Fountain } from 'fountain-js';
import * as assert from 'assert';

const text = `.OPENING TITLES

            > BRICK & STEEL <
            > FULL RETIRED <

            SMASH CUT TO:`;
        
let fountain = new Fountain();

let output = fountain.parse(text);
let actual = output.html.script;

const expected = '<h3>OPENING TITLES</h3><p class="centered">BRICK & STEEL <br /> FULL RETIRED</p><h2>SMASH CUT TO:</h2>';

assert.strictEqual(actual, expected);
```

### Output

The output provided by Fountain-js is an object literal in the format `{ title: '...', html: { title_page: '...', script: '...' } }`.

Fountain-js is natively written in Typescript, therefore a `Script` interface is also available:

```typescript
interface Script {
    title?: string,
    html: {
        title_page: string,
        script: string
    },
    tokens?: Token[]
}
```

## Parser Tokens

If you want access to the tokens that Fountain-js generates, simply attach a `true` parameter to your `parse` calls. Requesting tokens adds a `tokens` property to the output generated by Fountain-js.

``` javascript
let output = fountain.parse(script, true);
console.log(output.tokens);
```

Below is a small sample of the `tokens` output from [Brick & Steel](samples/brick%26steel.fountain).

``` javascript
[ 
  ..., 
  { type: "scene_heading", text: "EXT. BRICK'S PATIO - DAY", scene_number: "1"},
  { type: "action", text: "A gorgeous day. The su...emplating -- something."},
  { type: "action", text: "The SCREEN DOOR slides ...es with two cold beers."},
  { type: "dialogue_begin"},
  { type: "character", text: "STEEL"},
  { type: "dialogue", text: "Beer's ready!"},
  { type: "dialogue_end"},
  { type: "dialogue_begin"},
  { type: "character", text: "BRICK"},
  { type: "dialogue", text: "Are they cold?"},
  { type: "dialogue_end"},
  { type: "page_break"},
  { type: "dialogue_begin"},
  { type: "character", text: "STEEL"},
  { type: "dialogue", text: "Does a bear crap in the woods?"},
  { type: "dialogue_end"},
  { type: "action", text: "Steel sits. They laugh at the dumb joke."},
  { type: "dialogue_begin"},
  { type: "character", text: "STEEL"},
  { type: "parenthetical", text: "(beer raised)"},
  { type: "dialogue", text: "To retirement."},
  { type: "dialogue_end"},
  { type: "dialogue_begin"},
  { type: "character", text: "BRICK"},
  { type: "dialogue", text: "To retirement."},
  { type: "dialogue_end"}
  ...
]
```

As shown above, Fountain-js attaches some extra tokens, such as `'dialogue_begin'` and `'dialogue_end'` to block together dialogue sections.

In the case of dual dialogue, this allows Fountain-js to attach a `dual` property to blocks of dialogue at the `dialogue_begin` token to indicate page positioning.

```javascript
[
  ...
  { type: 'action', text: 'The men look at each other.' },
  { type: 'dual_dialogue_begin'},
  { type: 'dialogue_begin', dual: 'left'},
  { type: 'character', text: 'STEEL' },
  { type: 'dialogue', text: 'Screw retirement.' },
  { type: 'dialogue_end'},
  { type: 'dialogue_begin', dual: 'right'},
  { type: 'character', text: 'BRICK' },
  { type: 'dialogue', text: 'Screw retirement.' },
  { type: 'dialogue_end'},
  { type: 'dual_dialogue_end'},
  { type: 'transition', text: 'SMASH CUT TO:' }
  ...
]
```

Additionally, Fountain-js provides a Typescript interface for a `Token` as follows:

```typescript
interface Token {
    type: string,
    is_title?: boolean,
    text?: string,
    scene_number?: string,
    dual?: string,
    depth?: number
}
```

## Fountain.ts

For those looking for Fountain.ts, please note that this package has been deprecated in its original form and is now Fountain-js. Please source and upgrade packages from the [Fountain-js NPM package](https://www.npmjs.com/package/fountain-js) to receive all updates and fixes.
