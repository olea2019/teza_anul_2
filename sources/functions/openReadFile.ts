import { query } from 'windows-shortcuts';

import { ReadFile } from '../interfaces/readFile';
import { ReadFileFS } from '../services/files/read/readFileFS';
import { ReadFileFTP } from '../services/files/read/readFileFTP';
import { ReadShortcut } from '../services/files/read/readShortcut';

export async function openReadFile(source: string): Promise<ReadFile> {
  if (isURL(source)) {
    return new ReadFileFTP(source);
  }

  if (await isLink(source)) {
    return new ReadShortcut(source);
  }

  return new ReadFileFS(source);
}

function isLink(source: string): Promise<boolean> {
  return new Promise<boolean>(
    resolve => query(source, error => resolve(error === null))
  );
}

function isURL(source: string): boolean {
  return /http(s)?:\/\//.test(source.slice(0, 8));
}
