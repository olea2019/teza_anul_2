import { HELP } from '../constants/help';
import { Argument } from '../interfaces/arguments';
import { ArgumentsService } from './arguments';

export class HelpService {

  public show(commands: string[] = new ArgumentsService().allArguments): this {
    if (commands.length === 1) {
      console.log(HELP.COMMAND);
      return this;
    }

    commands
      .filter(command => command !== Argument.HELP)
      .forEach(command => console.log(HELP[command]));
    if (commands.filter(command => command === Argument.HELP).length > 1) {
      console.log(HELP[Argument.HELP]);
    }
    return this;
  }

}
