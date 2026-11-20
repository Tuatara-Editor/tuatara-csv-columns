# csv-columns

Read the manual:
[tuatara-editor.github.io/tuatara-csv-columns](https://tuatara-editor.github.io/tuatara-csv-columns/).

The columns of every record of a CSV or TSV file, rearranged as awk's `print`
does. One of the Tuatara project's packages, not part of the editor.

`C-c r a` in a CSV buffer asks for the columns you want, such as
`$0,$2,$1"text"`, and rewrites the file to hold them. Columns are counted from
0, as [csvdt](https://github.com/yardquit/csvdt) counts them. The manual says
what a column can be, how it is written and how large files are handled.

## What it needs

- Tuatara 0.90.13 or later.
- Nothing else.

## Installing it, step by step

1. **Open your init file**: in Tuatara press `C-x C-f`, type
   `~/.config/tuatara/init.lisp` and press `RET`.
2. **Add this line** to it:

   ```lisp
   (load-package "csv-columns" :source "https://github.com/Tuatara-Editor/tuatara-csv-columns")
   ```

3. **Save** with `C-x C-s`, **quit** with `C-x C-c`, and **start Tuatara
   again**. Answer `y` when it asks whether to load csv-columns; it asks once.
4. **Check it**: open a CSV file and press `C-c r a`.

## On a machine without internet

Tuatara compiles the package itself, so only fetching it needs the internet.
On a machine with internet:

```sh
git clone https://github.com/Tuatara-Editor/tuatara-csv-columns
git -C tuatara-csv-columns verify-tag "$(git -C tuatara-csv-columns describe --tags --abbrev=0)"
```

Copy the directory to the other machine, for instance to
`~/tuatara-packages/tuatara-csv-columns`, and name it in the init file:

```lisp
(load-package "csv-columns" :source "~/tuatara-packages/tuatara-csv-columns")
```

Carrying over the compiled files as well, so the other machine skips the
compiling, is in Tuatara's manual, chapter 19, "On a machine without
internet".

## Credits

- awk: columns rearranged as its `print` writes them.
- csvdt, by the same author: columns counted from 0 as it counts them.

## License

GPL-3.0-or-later; see `LICENSE` at the top of this repository.

## Working on it

```sh
tools/test.sh
```

runs its tests against a Tuatara source tree: `../tuatara` beside this
repository, or `../../tuatara` beside the directory it is in, unless
`TUATARA_SOURCE` names another. How a package is laid out and which of
Tuatara's names it may use are in Tuatara's
[HACKING.org](https://github.com/Tuatara-Editor/tuatara/blob/main/HACKING.org);
bug reports, ideas and how changes are made in
[CONTRIBUTING.md](CONTRIBUTING.md). The manual's source is in `doc/manual/`;
`tools/manual-html.sh` in a Tuatara tree, given this repository's directory,
makes its pages.
