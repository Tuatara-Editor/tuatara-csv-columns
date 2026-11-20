window.tuataraManualText = {"01-what-csv-columns-is":" what csv-columns is the package that rearranges the columns of a csv or tsv file as awk's print does. csv-columns adds one command to tuatara's csv mode. it reads a list of columns, such as $0,$2,$1\"text\" , and rewrites every record of the buffer to hold those columns, in that order. a column can be a field of the record, a piece of text, or the two joined. the package does not keep, delete, show or hide records by the value of a column. tuatara does that itself: c-x / k , c-x / d , c-x / f and c-x / h . they are in the editor's manual.","01-what-csv-columns-is#where-it-works":"1.1 where it works the command is bound in csv mode, and so in a buffer of a csv file or a tsv (tab-separated values) file. the separator is the one the mode found for the buffer, a comma or a tab. in any other buffer the command is not bound. a record is a line, as csv mode reads one. a quoted field does not run on over a line end.","01-what-csv-columns-is#counting-from-0":"1.2 counting from 0 columns are counted from 0, as csvdt counts them. $0 is the first column and $1 the second. $* is the whole record, as in csvdt, and $nf is the last column of each record.","01-what-csv-columns-is#the-key":"1.3 the key all the package's keys are under c-c r , which tuatara labels csv-columns in the key help. there is one key so far: c-c r a runs csv-rearrange-columns . chapter 4 lists it.","02-rearranging-columns":" rearranging columns asking for the columns, and what comes out. c-c r a ( csv-rearrange-columns ) asks columns from $0 ($0,$2,$1\"text\"): . type the columns as awk's print writes them, counted from 0, separated by commas, and press ret . an empty answer changes nothing. for example, this answer on a file of five columns: $0,$1,$3,$4\"cent\",\"hello\" leaves out the third column ( $2 ), joins cent to the value of the fifth column, and adds a sixth column, now the fifth, that holds hello : a,b,c,d,e -> a,b,d,ecent,hello","02-rearranging-columns#what-a-column-can-be":"2.1 what a column can be each column is made of one or more parts, written side by side with nothing between them. spaces between columns are ignored. $n is column n, counted from 0. $nf is the last column of each record. the last column is not the same number on every record, so $nf follows the record. $* is the whole record. alone, its columns stay its own, so the record is copied as it is. joined to other parts, it is one column that holds the record's text as written. \"text\" is text as it stands. inside it, \\\" is a quote and \\\\ is a backslash. parts side by side are joined into one column, as in $4\"cent\" or $2\" \"$0 , which puts the third column, a space and the first column in one column. an answer that is not understood stops the command with a message that says where in the answer it went wrong. nothing is changed. the messages are a $ needs a number, nf or * , a quote is left open and not understood .","02-rearranging-columns#how-a-column-is-written":"2.2 how a column is written a column made of one field alone is written exactly as it stood, with its quotes if it had them. a column joined from parts, or made of text, is written anew. it is put in quotes when it needs them: when it holds the separator, a quote or a line end, or begins or ends with a space. a quote inside it is doubled. a column that a record does not have is empty, as in awk. the record a,b with the answer $0,$3 comes out as a, . a byte-order mark at the start of the file stays at the start. it is not part of the first field.","02-rearranging-columns#which-lines":"2.3 which lines every line is rearranged, the header too, as awk would. with a selection, only the lines it touches are. a line that comes out as it was is left alone and is not counted as rearranged. when the command ends, the echo area says how many lines it rearranged. on an empty buffer, or a selection with no lines, it says no records to rearrange .","02-rearranging-columns#undoing":"2.4 undoing the whole command is one step to undo, whatever the number of lines. press u in modal editing, or the undo key of your editing style.","03-large-files-and-limits":" large files and limits how the command behaves on a big file, and what it will not do.","03-large-files-and-limits#large-files":"3.1 large files a large file is rearranged in the background, as a job, on all but two of the computer's cores, so the editor answers while it works. the letter p is lit in the mode line, and c-x j shows how far the job has got. the result is one step to undo, the same as for a small file. on a file of 11.5 gb with 100 million records, rearranging every record as in chapter 2 took 30 seconds.","03-large-files-and-limits#each-record-is-read-once":"3.2 each record is read once each record is read once and the new one is the only thing made. the package measures the new record first and then fills it, so a line of a large file costs no more than the line it becomes.","03-large-files-and-limits#limits":"3.3 limits a record is a line. a quoted field that runs on over a line end is not one field. up to 256 of a record's first fields are placed at once. fields further on are found one at a time, so a column number past 256 works, only more slowly. nothing in the settings changes the number. the package works only on csv and tsv buffers, and the columns are numbered from 0, never from 1.","04-every-command-and-setting":" every command and setting each command and setting of csv-columns, to look one up by name. the tables are made from the program each time this manual is made, so they never list a command or setting that csv-columns does not have. the first table has four columns. the first two are keys: the modal keys, which work only with modal editing on, and the non-modal keys, which work with it off too. a command with no key says m-x and its name in the second column, because you can only run it by its name. the third column is the name of the command and the fourth says what it does. to run a command by its name, press m-x , type a few letters of the name and press ret . to find a command from within the editor, press c-h f . to find the command that a key runs, press c-h k and then the key. the editor's own settings and commands are in chapters 21 and 22 of its manual. csv-columns has no settings of its own, so the second table is empty.","04-every-command-and-setting#every-command":"4.1 every command modal non-modal command what it does none c-c r a csv-rearrange-columns rearrange the columns of every record, the columns asked for counted from 0: $0,$1,$3,$4\"cent\",\"hello\" leaves out the third column, joins cent to the fifth's value and adds a column holding hello.","04-every-command-and-setting#every-setting":"4.2 every setting setting default values what it changes"};
// The manual's pages: filter the contents column to the headings whose title or
// text holds what is typed in its box, and change between light and dark
// colours (the choice kept in this browser for the next page). The entry for
// the part being read is marked as the page scrolls. The text of
// every section comes before this script, in window.tuataraManualText, made
// when the manual is built. Links are left alone. No address is ever loaded.
(function () {
  var root = document.documentElement;
  var key = "tuatara-manual-theme";
  var saved = null;
  try { saved = window.localStorage.getItem(key); } catch (e) { saved = null; }
  if (saved === "light" || saved === "dark") { root.setAttribute("data-theme", saved); }

  function dark() {
    var chosen = root.getAttribute("data-theme");
    if (chosen) { return chosen === "dark"; }
    return Boolean(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  var button = document.querySelector("button.theme");
  if (button) {
    var label = function () {
      button.textContent = dark() ? "Light" : "Dark";
      button.setAttribute("aria-label", dark() ? "Use light colours" : "Use dark colours");
    };
    button.hidden = false;
    label();
    button.addEventListener("click", function () {
      var next = dark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { window.localStorage.setItem(key, next); } catch (e) { /* kept for this page only */ }
      label();
    });
  }

  var nav = document.querySelector("nav.toc");
  var box = nav && nav.querySelector("input");
  if (!box) { return; }
  var texts = window.tuataraManualText || {};

  // The key of a section in the text: a chapter's page name without its
  // ending, then # and the heading's id. On the page of every chapter the
  // links are "10-directories.html#marks", on the whole manual "#10-directories--marks".
  function keyOf(href) {
    var parts = /^#?([0-9]+-[^#.]*?)(?:\.html)?(?:(?:#|--)(.*))?$/.exec(href || "");
    if (!parts) { return null; }
    return parts[2] ? parts[1] + "#" + parts[2] : parts[1];
  }

  // Show ITEM when its title or text holds WORDS, or any entry under it does.
  function show(item, words) {
    var link = item.querySelector(":scope > a");
    var title = link ? link.textContent.toLowerCase() : "";
    var text = (link && texts[keyOf(link.getAttribute("href"))]) || "";
    var hit = words === "" || title.indexOf(words) !== -1 || text.indexOf(words) !== -1;
    item.querySelectorAll(":scope > ol > li").forEach(function (inner) {
      if (show(inner, words)) { hit = true; }
    });
    item.classList.toggle("hidden", !hit);
    return hit;
  }

  box.addEventListener("input", function () {
    var words = box.value.trim().toLowerCase().replace(/\s+/g, " ");
    nav.classList.toggle("filtering", words !== "");
    nav.querySelectorAll("ol.chapters > li").forEach(function (item) { show(item, words); });
  });

  // The entry of the column for the part being read is marked, following as
  // the page is scrolled: the last heading that has reached the middle of
  // the window, and the entries it is under, so a section folded out of sight
  // leaves the section holding it marked. On the whole manual, where no chapter is marked as the one
  // shown, its chapter is unfolded too.
  var whole = !nav.querySelector("li.here");
  var here = location.pathname;
  var marks = [];
  nav.querySelectorAll("ol.chapters a").forEach(function (link) {
    var url = new URL(link.href, location.href);
    if (url.pathname !== here) { return; }
    var target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
                          : document.querySelector("main h1");
    if (target) { marks.push({ link: link, target: target, top: 0 }); }
  });
  if (marks.length === 0) { return; }
  var marked = null;

  function measure() {
    marks.forEach(function (mark) { mark.top = mark.target.getBoundingClientRect().top + window.scrollY; });
    marks.sort(function (a, b) { return a.top - b.top; });
  }

  // Mark or unmark the entry of MARK and every entry it is under.
  function light(mark, on) {
    for (var item = mark.link.closest("li"); item && nav.contains(item); item = item.parentElement.closest("li")) {
      item.querySelector(":scope > a").classList.toggle("in-view", on);
    }
  }

  // Keep LINK in view in whichever part of the column scrolls.
  function reveal(link) {
    [nav, nav.querySelector("ol.chapters")].forEach(function (box) {
      if (!box || box.scrollHeight <= box.clientHeight) { return; }
      var outer = box.getBoundingClientRect();
      var inner = link.getBoundingClientRect();
      if (inner.top < outer.top) { box.scrollTop -= outer.top - inner.top + 24; }
      else if (inner.bottom > outer.bottom) { box.scrollTop += inner.bottom - outer.bottom + 24; }
    });
  }

  // Mark the entry of the last heading at or above the middle of the
  // window, the first when none is: a search in the measured places, the
  // page changed only when the entry is another.
  function follow() {
    var line = window.scrollY + window.innerHeight / 2;
    var low = 0, high = marks.length - 1, found = marks[0];
    while (low <= high) {
      var middle = (low + high) >> 1;
      if (marks[middle].top <= line) { found = marks[middle]; low = middle + 1; } else { high = middle - 1; }
    }
    if (found === marked) { return; }
    if (marked) { light(marked, false); }
    marked = found;
    light(marked, true);
    if (whole) {
      var chapter = marked.link.closest("ol.chapters > li");
      nav.querySelectorAll("ol.chapters > li.here").forEach(function (item) {
        if (item !== chapter) { item.classList.remove("here"); }
      });
      if (chapter) { chapter.classList.add("here"); }
    }
    reveal(marked.link);
  }

  // Measure again when pictures have loaded or the window changed size.
  function again() {
    measure();
    if (marked) { light(marked, false); }
    marked = null;
    follow();
  }

  measure();
  follow();
  window.addEventListener("scroll", follow, { passive: true });
  window.addEventListener("resize", again);
  window.addEventListener("load", again);
}());
