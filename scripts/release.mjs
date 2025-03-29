import { release } from './release.ts';

const arg = process.argv[2];
const valid = ['patch', 'minor', 'major'];
const type = valid.includes(arg) ? arg : 'patch';

release(type).catch((err) => {
   console.error('[release error]', err);
   process.exit(1);
});
