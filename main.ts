import { openReadFile } from './sources/functions/openReadFile';
import { Argument } from './sources/interfaces/arguments';
import { ArgumentsService } from './sources/services/arguments';
import { ConcatService } from './sources/services/files/concat';
import { WriteFile } from './sources/services/files/writeFile';
import { HelpService } from './sources/services/help';
import { existsSync } from 'fs';

async function main() {
  const argumentsService = new ArgumentsService();

  if (argumentsService.hasArgument(Argument.HELP)) {
    new HelpService().show();
    process.exit(0);
  }

  const { inputFiles, outputFile } = argumentsService;

  if (existsSync(outputFile) && !argumentsService.hasArgument(Argument.OVERWRITE)) {
    const timeToWait = 5000;
    console.log(`output file (${outputFile}), already exists`);
    console.log(`it will be overwirted, press ${process.platform === 'darwin' ? 'cmnd' : 'ctrl'} + c to stop`);
    console.log(`process is stopped for ${timeToWait} ms (${timeToWait / 1000} s)`);

    await new Promise(
      resolve => setTimeout(() => resolve(), timeToWait),
    );
  }

  const readersPromises = inputFiles.map(fileName => openReadFile(fileName));
  const readers = await Promise.all(readersPromises);
  const concat = new ConcatService(readers);
  const writer = new WriteFile(concat.concat(), outputFile);
  writer.write().subscribe(null, null, () => process.exit(0));
}

main();
