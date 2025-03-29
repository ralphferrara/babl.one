import { release } from './release.ts';

if (import.meta.url === `file://${process.argv[1]}`) {
   const arg = process.argv[2];
   const type = ['patch', 'minor', 'major'].includes(arg) ? arg : 'patch';
   release(type).catch((err) => {
      console.error('[release error]', err);
      process.exit(1);
   });
}