export const COMMAND_HELP = `Copies one or more files to another location.

Syntax:
COPY [-i] [-d] [-v] [-n] [-z] [-l] [-a | -b ] source [-a | -b]
     [+ source [-a | -b] [+ ...]] [destination [-a | -b]]

Comand help or help with one of flags:
COPY /H | -h | --help
COPY [/F | -f | --flag-name] /H | -h | --help

Flags are case insensitive.
Also they can be provided in unix style (-f of --flag) and msdos style (/F).

     source                       Specifies the file or files to be copied.
     destination                  Specifies the directory and/or filename
                                  for the new file(s).
     -e | /E | --enctypt          Indicates to encrypt destination file.
     -d | /D | --delete           Indicates to delete source files.
     -v | /V | --verify           Verifies that new files are
                                  written correctly.
     -o | /O | --overwrite        Don't answer for overwriting destination
                                  file (if exists) or not.
     -z | /Z | --network          Copies networked files in restartable mode.
     -l | /L | --link             If the source is a symbolic link, copy the
                                  link to the target instead of the actual file
                                  the source link points to.
     -h | /H | --help             Show comand help (this information).
     -i | /I | --interactive      Interactive mode.

For concating files specify multiple files:
file0, file1, ..., fileN
Where files from 0 to n-1 will be concatenated in fileN.

Basic example:
copy -a a.txt b.txt c.txt
copy -b 1.bin 2.bin 3.bin
copy my-file.txt -b my-file.bynaryExtension -a destinationFile.txt -a
`;
