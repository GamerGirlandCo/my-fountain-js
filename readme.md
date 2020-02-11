Fountain-ts
===========

fountain-ts is a TypeScript based parser for the screenplay format [Fountain](http://fountain.io/). Based on Matt Daly's [fountain-js](https://github.com/mattdaly/Fountain.js). 

<!-- # Syntax Support

As of version 0.1.8 the full Fountain syntax is supported.

Currently fountain-js supports a limited range of key-value pairs for title pages - 

* Title, Credit, Author/s, Source, Notes, Draft date, Date, Contact, Copyright

Work is being done to make title page parsing friendlier, allowing custom key-value pairs, but as of version 0.1.0 only the above are supported.

Instructions
============

fountain-js accepts a string value to it's parse function, therefore opening or retrieving files is down to you - open the file, retrieve it's string contents and pass it to fountain-js. 

The parser doesn't simply change scripts lines in to html, it first splits the script down line by line and generates an array of tokens representing each script element. This tokenized array provides the opportunity to iterate over a script in it's raw state and do some analysis (e.g. we could search for every character element with the name STEEL, we could do this against the HTML using jQuery but it'd be a slower process). By default, fountain-js simply returns the generated html, but you can also gain access to those tokens if you ask for them (more on that below).

To use Fountain.js, either import it within an HTML page or require it as a module inside Node.js (it's available to both by default).

```
<script type="text/javascript" src="fountain.js"></script>
<script type="text/javascript">
  var file = ... open the file from somewhere and get it's string value ...
  var output = fountain.parse(file);
</script>
```

fountain-js supports both sync and async functionality, the function names remain the same. For async, simply attach a callback to the parse function and handle the result inside that callback.

```
<script type="text/javascript" src="fountain.js"></script>
<script type="text/javascript">
  var file = ... open the file from somewhere and get it's string value ...
  fountain.parse(file, function (output) {
    // do something
  });
</script>
```

The output provided by fountain-js is of a specific format. The output to both sync and async functions is an object literal of the format { title: '...', html: { title_page: '...', script: '...' } }. If a title was set in the original file the title property will be set to it (as plain text with formatting removed), the html.title_page property contains the html generated for any title page syntax definitions, and the html.script property contains the html generated for the rest of the script.

```
<script type="text/javascript" src="fountain.js"></script>
<script type="text/javascript">
  var file = ... open the file from somewhere and get it's string value ...
  fountain.parse(file, function (output) {
    // output.title - 'Big Fish'
    // output.html.title_page - '<h1>Big Fish</h1><p class="author">...'
    // output.html.script - '<h2><span class="bold">FADE IN:</span></h2>...'
  });
</script>
```

If you want access to the tokens that fountain-js generates, simply attach a true parameter to your parse calls. Requesting tokens adds a tokens property to the output generated by fountain-js. That tokens property is an array of object literals, each of the form { type: '...', text: '...' }, some elements have additional properties (e.g. the type 'scene_heading' also has a property called 'scene-number' if a scene number was attached to that specific scene heading). It should also be noted that fountain-js iterates the script from bottom to top, therefore requesting tokens requires reversing the array before fountain-js returns you the data, this might add a slight delay (milliseconds in most cases) on large scripts.

```
<script type="text/javascript" src="fountain.js"></script>
<script type="text/javascript">
  var file = ... open the file from somewhere and get it's string value ...
  fountain.parse(file, true, function (output) {
    // output.title - 'Big Fish'
    // output.html.title_page - '<h1>Big Fish</h1><p class="author">...'
    // output.html.script - '<h2><span class="bold">FADE IN:</span></h2>...'
    // output.tokens - [ ... { type: 'transition'. text: '<span class="bold">FADE IN:</span>' } ... ]
  });
</script>
```

The tokens for the Brick & Steel sample found on the fountain.io website would look as follows (just a small sample):

```
[ 
  ..., 
  { type="scene_heading", text="EXT. BRICK'S PATIO - DAY", scene_number="1"}, 
  { type="action", text="A gorgeous day. The su...emplating -- something."}, 
  { type="action", text="The SCREEN DOOR slides ...es with two cold beers."},  
  { type="dialogue_begin"}, 
  { type="character", text="STEEL"}, 
  { type="dialogue", text="Beer's ready!"}, 
  { type="dialogue_end"}, 
  { type="dialogue_begin"}, 
  { type="character", text="BRICK"}, 
  { type="dialogue", text="Are they cold?"}, 
  { type="dialogue_end"}, 
  { type="page_break"}, 
  { type="dialogue_begin"}, 
  { type="character", text="STEEL"}, 
  { type="dialogue", text="Does a bear crap in the woods?"}, 
  { type="dialogue_end"}, 
  { type="action", text="Steel sits. They laugh at the dumb joke."},
  { type="dialogue_begin"}, 
  { type="character", text="STEEL"}, 
  { type="parenthetical", text="(beer raised)"}, 
  { type="dialogue", text="To retirement."}, 
  { type="dialogue_end"}, 
  { type="dialogue_begin"}, 
  { type="character", text="BRICK"}, 
  { type="dialogue", text="To retirement."}, 
  { type="dialogue_end"}
  ...
```

As you can see fountain-js attaches some extra tokens, such as 'dialogue_begin' and 'dialogue_end'. These are used to block together sections, in the case of dialogue it allows fountain-js to attach a dual dialogue property to blocks of dialogue. -->
