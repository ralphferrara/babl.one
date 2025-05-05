/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /interfaces/stash.entry.ts
//|| Stash Entry
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      interface StashEntry {
            path              : string;
            section           : string;
            area              : string; 
            keyName           : string;
            defaultValue      : string;
            timestamp         : Date;
            accessedAt        : Date;
            accessed          : Date;
            translated        : Record<string, string>
      };