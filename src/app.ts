type HookFn = () => Promise<void> | void;
type Plugin = { install(app: App): void } | ((app: App) => void);

export class App {
   private services: Map<string, any> = new Map();
   private initHooks: HookFn[] = [];
   private readyHooks: HookFn[] = [];
   private shutdownHooks: HookFn[] = [];
   private eventMap: Map<string, HookFn[]> = new Map();
   private plugins: Set<string> = new Set();
   private startedAt: number | null = null;

   public use(plugin: Plugin) {
      const name = typeof plugin === 'function' ? plugin.name : plugin.constructor.name;
      if (this.plugins.has(name)) return;
      this.plugins.add(name);

      if (typeof plugin === 'function') plugin(this);
      else if (typeof plugin.install === 'function') plugin.install(this);
   }

   public provide<T>(key: string, value: T): void {
      this.services.set(key, value);
   }

   public resolve<T>(key: string): T {
      if (!this.services.has(key)) throw new Error(`Service "${key}" not found`);
      return this.services.get(key);
   }

   public onInit(fn: HookFn): void {
      this.initHooks.push(fn);
   }

   public onReady(fn: HookFn): void {
      this.readyHooks.push(fn);
   }

   public onShutdown(fn: HookFn): void {
      this.shutdownHooks.push(fn);
   }

   public on(event: string, fn: HookFn): void {
      if (!this.eventMap.has(event)) this.eventMap.set(event, []);
      this.eventMap.get(event)!.push(fn);
   }

   public emit(event: string): void {
      this.eventMap.get(event)?.forEach(fn => fn());
   }

   public status() {
      return {
         active     : this.startedAt !== null,
         startedAt  : this.startedAt,
         registered : this.plugins.size,
         services   : this.services.size,
         uptime     : this.startedAt ? Date.now() - this.startedAt : 0,
      };
   }

   public async init() {
      this.startedAt = Date.now();
      for (const fn of this.initHooks) await fn();
      for (const fn of this.readyHooks) await fn();
   }

   public async shutdown() {
      for (const fn of this.shutdownHooks.reverse()) await fn();
      this.startedAt = null;
   }
}

// create a shared singleton instance
export const app = new App();
