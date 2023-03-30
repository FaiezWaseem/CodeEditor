if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service_worker.js');

}


(async () => {
  let opt;
  let lang;
  [["chrome","Chrome"],["clouds","Clouds"],["crimson_editor","Crimson Editor"],["dawn","Dawn"],["dreamweaver","Dreamweaver"],["eclipse","Eclipse"],["github","GitHub"],["iplastic","IPlastic"],["katzenmilch","KatzenMilch"],["kuroir","Kuroir"],["solarized_light","Solarized Light"],["sqlserver","SQL Server"],["textmate","TextMate"],["tomorrow","Tomorrow"],["xcode","XCode"],["ambiance","Ambiance"],["chaos","Chaos"],["clouds_midnight","Clouds Midnight"],["cobalt","Cobalt"],["dracula","Dracula"],["gob","Greeon on Black"],["gruvbox","Gruvbox"],["idle_fingers","idle Fingers"],["kr_theme","krTheme"],["merbivore","Merbivore"],["merbivore_soft","Merbivore Soft"],["mono_industrial","Mono Industrial"],["monokai","Monokai"],["pastel_on_dark","Pastel on Dark"],["solarized_dark","Solarized Dark"],["terminal","Terminal"],["tomorrow_night","Tomorrow Night"],["tomorrow_night_blue","Tomorrow Night Blue"],["tomorrow_night_bright","Tomorrow Night Bright"],["tomorrow_night_eighties","Tomorrow Night 80s"],["twilight","Twilight"],["vibrant_ink","Vibrant Ink"]].forEach(function (e) {
    opt += `<option value="${e[0]}">${e[1]}</option>`
  });
  ["abap", "abc", "actionscript", "ada", "alda", "apache_conf", "apex", "aql", "asciidoc", "asl", "assembly_x86", "autohotkey", "batchfile", "bibtex", "c_cpp", "c9search", "cirru", "clojure", "cobol", "coffee", "coldfusion", "crystal", "csharp", "csound_document", "csound_orchestra", "csound_score", "css", "curly", "d", "dart", "diff", "dockerfile", "dot", "drools", "edifact", "eiffel", "ejs", "elixir", "elm", "erlang", "forth", "fortran", "fsharp", "fsl", "ftl", "gcode", "gherkin", "gitignore", "glsl", "gobstones", "golang", "graphqlschema", "groovy", "haml", "handlebars", "haskell", "haskell_cabal", "haxe", "hjson", "html", "html_elixir", "html_ruby", "ini", "io", "ion", "jack", "jade", "java", "javascript", "jexl", "json", "json5", "jsoniq", "jsp", "jssm", "jsx", "julia", "kotlin", "latex", "latte", "less", "liquid", "lisp", "livescript", "log", "logiql", "logtalk", "lsl", "lua", "luapage", "lucene", "makefile", "markdown", "mask", "matlab", "maze", "mediawiki", "mel", "mips", "mixal", "mushcode", "mysql", "nginx", "nim", "nix", "nsis", "nunjucks", "objectivec", "ocaml", "partiql", "pascal", "perl", "pgsql", "php_laravel_blade", "php", "pig", "powershell", "praat", "prisma", "prolog", "properties", "protobuf", "puppet", "python", "qml", "r", "raku", "razor", "rdoc", "red", "rhtml", "robot", "rst", "ruby", "rust", "sac", "sass", "scad", "scala", "scheme", "scrypt", "scss", "sh", "sjs", "slim", "smarty", "smithy", "snippets", "soy_template", "space", "sparql", "sql", "sqlserver", "stylus", "svg", "swift", "tcl", "terraform", "tex", "text", "textile", "toml", "tsx", "turtle", "twig", "typescript", "vala", "vbscript", "velocity", "verilog", "vhdl", "visualforce", "wollok", "xml", "xquery", "yaml", "zeek", "django"].forEach(function (e) {
    lang += `<option value="${e}">${e}</option>`
  });
  await import('https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js').catch((error) => console.log('Loading failed' + error))
  document.getElementById("sidebar").appendChild(Object.assign(document.createElement("select"), { id: "themes", innerHTML: opt }))
  document.getElementById("sidebar").appendChild(Object.assign(document.createElement("select"), { id: "modes", innerHTML: lang }))
  // document.getElementById("sidebar").innerHTML += (`<a onclick='codeEditor.previousDir()'>Goback<a>`)
  document.getElementById("sidebar").innerHTML += (`<div class="file-options">
    <a onclick='codeEditor.previousDir()'>Goback<a>
    <div>
    <img src="./src/images/file.png" alt="icon" data-target="#modal2" />
    <img src="./src/images/open-folder.png" alt="icon" data-target="#modal1" />
    <img src="./src/images/Button-Refresh-icon.png" alt="icon" onclick='codeEditor.reload()'  />
    <div>
    <div>`)
  document.getElementById("sidebar").innerHTML += (`<ul id="files"></ul>`)
  var editor = await ace.edit('editor')
  window.editor = editor;
  editor.currentfile = null;
  ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/')
  editor.setOptions({
    theme: 'ace/theme/tomorrow_night',
    mode: 'ace/mode/javascript',
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  })
  themes.addEventListener('change', function (e) {
    editor.setOptions({
      theme: 'ace/theme/' + e.target.value
    })
  })
  modes.addEventListener('change', function (e) {
    editor.setOptions({
      mode: 'ace/mode/' + e.target.value
    })
  })
})()




import codeEditor from "./init.js"
window.codeEditor = codeEditor
window.setTimeout(() => {
  window.codeEditor.init()
}, 1500)