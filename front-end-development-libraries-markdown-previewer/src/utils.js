import $ from "jquery";

function handleEditorClick() {
  if ($("#result").css("display") === "none") {
    $(".editor-container .resize").removeClass("fa-down-left-and-up-right-to-center");
    $(".editor-container .resize").addClass("fa-up-right-and-down-left-from-center");
    $("#editor").css({ minHeight: "200px" });
    $("#result").css("display", "block");
  } else {
    $("#editor").css({ minHeight: "800px" });
    $(".editor-container .resize").removeClass("fa-up-right-and-down-left-from-center");
    $(".editor-container .resize").addClass("fa-down-left-and-up-right-to-center");
    $("#result").css("display", "none");
  }
}

function handleResultClick() {
  if ($(".editor-container").css("display") === "none") {
    $("#result .resize").removeClass("fa-down-left-and-up-right-to-center");
    $("#result .resize").addClass("fa-up-right-and-down-left-from-center");
    $(".editor-container").css("display", "block");
  } else {
    $("#result .resize").removeClass("fa-up-right-and-down-left-from-center");
    $("#result .resize").addClass("fa-down-left-and-up-right-to-center");
    $(".editor-container").css("display", "none");
  }
}

let input = `# This is a React Markdown Previewer!

## It uses MarkedJS and PrismJS...
### You can edit this using the editor above.

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can make text **bold**, _italic_, **_both of them_**, or you can ~~cross stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> You can also use block quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

export { handleEditorClick, handleResultClick, input };