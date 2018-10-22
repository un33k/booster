# Boostware

**A simple client for speeding up file downloads**

# How to install

```
$ git clone git@github.com:un33k/boostware.git
$ cd boostware
$ yarn install | npm install
```

# Setup Typescript and ts-node

```
# global scope
npm install -g ts-node
npm install -g typescript
```

# How to compile (transpile)

```bash
$ yarn prepare | npm run prepare

# Javascript and Typescritp definition files will be in `/lib`
```

# Options and params

```bash
# Run typescript
$ yarn multiget --help

# Run javascript
$ node lib/command.js --help
```

# Options (detailed)

```
node lib/command.js --help
Usage: command <url> [-b [-msc]] [-o] [-v]

Options:
  -V, --version                output the version number
  -o, --output <n>             Path to save file to
  -b, --boost                  Boost download multiple concurrent chunck fetch
  -m, --max-chunks <n>         Total number of chunks to fetch
  -s, --chunk-size <n>         Size of each chunk to fetch
  -c, --concurrent-chunks <n>  Number of chunks fetched concurrently
  -f, --force                  Overwrite if file already exists
  -v, --verbosity <n>          Log verbosity (1,2,3)
  -h, --help                   output usage information
```

# Example
```
yarn multiget http://neekware.com/data/test/a-z.txt -v 3 -f -m 1 -s 3 -c 3

File created (a-z.txt)
# .... async batch & fetch
Fetching chunk range: [9, 11]
Fetching chunk range: [3, 5]
Fetching chunk range: [0, 2]
Fetching chunk range: [6, 8]
Wrote [0, 2] to file.
Wrote [3, 5] to file.
Wrote [6, 8] to file.
Fetching chunk range: [21, 23]
Fetching chunk range: [18, 20]
Fetching chunk range: [24, 26]
Fetching chunk range: [15, 17]
Fetching chunk range: [12, 14]
Wrote [18, 20] to file.
Wrote [21, 23] to file.
Wrote [24, 26] to file.
Wrote [9, 11] to file.
Wrote [12, 14] to file.
Wrote [15, 17] to file.

```

# How it works

## boost (defaul: false)
If the `-b,--boost` option is not selected, the file will be downloaed in one request and all other concurrency options are ignored.

If the `-b --boost` is selected, then the command prepares itself for concurrent multi-chuck download.

The options can be combined to optimize or one or more of `memory`, `cpu`, `network`, `io` and more.

## concurrent fetch groups (defaul: 4)
For slower networks, `-c` option ensures that only <n> number of requests are made to the server, serving the file.

The chunk downloads are all or none. with `-c` option, up-to <n> chunks are schedualed to be fetched in parallel. Each request individually retries 3 times to compensate for jittery networks. Each retry is pushed off with increasing delay time to ensure the network banddwidth is not affected with multiple retries.

## chunk size (default: 1MB)
The `-s` option can be set for optimal chunk download speed.

## example
To download a 400 MB file, we can have the `-s` set to 2MB chunck each. Then we set `-c` to 4 concurrent chucks to be fetched at a time.  This way, the client, scheudals the first 4 chucks of 2 MB in paraller. Once all those requests are on their way, the second batch of 4 are schedualled and so on, till all the file has been requested in multiple chunks.

# What next ...

## Future roadmap
1. Tests
3. Code coverage
2. Continous Inegrations (CI)
3. Packaged and pushed to npm.js
4. More examples

# License

Released under a ([MIT](https://github.com/un33k/boostware/blob/master/LICENSE)) license.

# Version

X.Y.Z Version

    `MAJOR` version -- making incompatible API changes
    `MINOR` version -- adding functionality in a backwards-compatible manner
    `PATCH` version -- making backwards-compatible bug fixes
