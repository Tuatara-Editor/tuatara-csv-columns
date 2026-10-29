# csv-columns

The columns of every record of a CSV or TSV file rearranged as awk's `print`
does. Keeping, deleting, showing and hiding records by a column is
Tuatara's own: `C-x / k`, `C-x / d`, `C-x / f` and `C-x / h`.

Columns are counted from 0, as [csvdt](https://github.com/yardquit/csvdt)
counts them: `$0` is the first column.

## Loading it, step by step

1. **Install what it needs.** Nothing.
2. **Open your init file**: in Tuatara press `C-x C-f`, type
   `~/.config/tuatara/init.lisp` and press `RET`.
3. **Add these lines** to it (the first line only once, whichever of the
   project's packages you load):

   ```lisp
   (load-package "csv-columns" :source "https://github.com/Tuatara-Editor/tuatara-csv-columns")
   ```

4. **Save** with `C-x C-s`, **quit** with `C-x C-c`, and **start Tuatara
   again**. Answer `y` when it asks whether to load csv-columns; it asks once.
5. **Check it**: open a CSV file; `C-c r a` rearranges its columns.

## Commands

In a CSV or TSV buffer, under `C-c r`:

| Key | Command | What it does |
|---|---|---|
| `C-c r a` | `csv-rearrange-columns` | Rearranges the columns of every line as awk's `print` would. |

### Rearranging columns

`C-c r a` asks for the columns as awk's `print` writes them, counted from 0:

```
$0,$1,$3,$4"cent","hello"
```

on five columns leaves out the third (`$2`), joins `cent` to the value of the
fifth and adds a sixth column, now the fifth, holding `hello`:

```
a,b,c,d,e   ->   a,b,d,ecent,hello
```

- `$N` is column N from 0, `$NF` the last column of each record, `$*` the
  whole record: alone, its columns stay its own; joined to other parts, it is
  one column holding the record's text as written.
- `"text"` is text as it is (`\"` a quote, `\\` a backslash). Parts side by
  side are joined: `$4"cent"`, `$2" "$0`.
- A column of one field alone is written exactly as it stood, its quotes
  kept. A column joined from parts is quoted when it needs to be (it holds
  the separator, a quote or a line end, or begins or ends with a space), a
  quote inside doubled.
- A column a record lacks is empty, as in awk.
- Every line is rearranged, the header too, as awk would; with a selection,
  only the lines it touches. A line that comes out as it was is left alone,
  and not counted as rearranged.

## Large files

Each command is one step to undo (`u`). A large file is done in the
background on all but two cores, `P` lit in the mode line (`C-x j` shows how far it
has got), the editor answering meanwhile. On an 11.5 GB file of 100 million records,
rearranging every record as above took 30 seconds.

A record is a line, as Tuatara's CSV mode reads one: a quoted field does not
run on over a line end.

## Credits

- awk: columns rearranged as its `print` writes them.
- csvdt, by the same author: columns counted from 0 as it counts them.

## Working on it

```sh
tools/test.sh
```

runs its tests against a Tuatara source tree: `../tuatara` beside this
repository, or `../../tuatara` beside the folder it is in, unless
`TUATARA_SOURCE` names another. How a package is laid out and which of
Tuatara's names it may use are in Tuatara's
[HACKING.org](https://github.com/Tuatara-Editor/tuatara/blob/main/HACKING.org);
bug reports, ideas and how changes are made in
[CONTRIBUTING.md](CONTRIBUTING.md).
