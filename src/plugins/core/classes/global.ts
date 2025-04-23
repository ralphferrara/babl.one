declare global {
      const instance    : any;
      const plugins     : Record<string, any> = {};
      const timers      : Record<string, any> = {};
      const configs     : Record<string, any> = {};
      const routes      : Record<string, any> = {};
      const sync        : Record<string, any> = {};
      const errors      : Record<string, any> = {};
      const locales     : Record<string, any> = {};
}