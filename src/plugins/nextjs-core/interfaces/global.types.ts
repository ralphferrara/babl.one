/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: globals
//|| Interface for globals
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import { DatasetConfig } from './dataset.config';

      export type GlobalSections = 'config' | 'routes' | 'deferred' | 'state' | 'plugins' | 'watchdogs' | 'errors' | 'http' | 'databases' | 'kysely' | 'sites' | 'cdns';
      export type GlobalDatasets = DatasetConfig;
