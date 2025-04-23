/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /classes/attempts.ts
//|| AuthAttempts Class - Logs and handles user authentication attempts (login, register, forgot password)
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
      //|| Interfaces
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import TwoFactorAttempt               from '../interfaces/twofactor.attempt';
      import TwoFactorHealthLog             from '../interfaces/twofactor.health.log';
      import TwoFactorConfig                from '../interfaces/twofactor.config';
      import CanAttemptResult               from '../interfaces/can.attempt.result';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
      //|| Class
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            export default class TwoFactorAttempts {
                  
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                  //|| Config Object
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

                  private config                : TwoFactorConfig;
                  private attempts              : Record<string, TwoFactorAttempt[]> = {};
                  private sends                 : Record<string, TwoFactorAttempt[]> = {};
                  private ips                   : Record<string, TwoFactorAttempt[]> = {};
                  private lockedIdentifiers     : Record<string, Date>  = {};
                  private lockedIPs             : Record<string, Date>  = {};
                  private healthLogs            : TwoFactorHealthLog[]  = [];

                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                  //|| Constructor
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

                  constructor(app : any, config : TwoFactorConfig) {
                        this.config             = config;
                        console.log(config);
                        app.watchdog('twofactor.health',   () => this.health(), config.intervals.health * 1000);
                        app.watchdog('twofactor.attempts', () => this.purge(), config.intervals.purge * 1000);
                  }

                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                  //|| Check if they can send 
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

                  can(action: 'send' | 'attempt', identifier: string, ip: string): CanAttemptResult {
                        const now = Date.now();
                        const configKey = action === 'send' ? 'sends' : 'attempts';
                        const intervalMs = this.config.intervals[configKey] * 1000;
                        const maxCount   = this.config.maximums[configKey];
                  
                        const lockDurationIdentifier = this.config.intervals.lockedIdentifiers * 1000;
                        const lockDurationIP         = this.config.intervals.lockedIPs * 1000;
                  
                        // Check identifier lock
                        const lockIdentifierUntil = this.lockedIdentifiers[identifier];
                        if (lockIdentifierUntil && now < new Date(lockIdentifierUntil).getTime()) {
                              return {
                                    allowed: false,
                                    reason: 'TF_LOCKID',
                                    expiresAt: new Date(lockIdentifierUntil)
                              };
                        }
                  
                        // Check IP lock
                        const lockIPUntil = this.lockedIPs[ip];
                        if (lockIPUntil && now < new Date(lockIPUntil).getTime()) {
                              return {
                                    allowed: false,
                                    reason: 'TF_LOCKIP',
                                    expiresAt: new Date(lockIPUntil)
                              };
                        }
                  
                        // Log the attempt before evaluating
                        this.logAction(action, identifier, ip);
                  
                        // Count recent identifier attempts
                        const logMap = action === 'send' ? this.sends : this.attempts;
                        const idLogs = (logMap[identifier] || []).filter(log =>
                              (now - new Date(log.timestamp).getTime()) <= intervalMs
                        );
                  
                        if (idLogs.length > maxCount) {
                              const expiresAt = new Date(now + lockDurationIdentifier);
                              this.lockedIdentifiers[identifier] = expiresAt;
                              return {
                                    allowed: false,
                                    reason: 'TF_RATEID',
                                    expiresAt
                              };
                        }
                  
                        // Count recent IP attempts
                        const ipLogs = (this.ips[ip] || []).filter(log =>
                              log.action === action && (now - new Date(log.timestamp).getTime()) <= intervalMs
                        );
                  
                        if (ipLogs.length > maxCount) {
                              const expiresAt = new Date(now + lockDurationIP);
                              this.lockedIPs[ip] = expiresAt;
                              return {
                                    allowed: false,
                                    reason: 'TF_RATEIP',
                                    expiresAt
                              };
                        }
                  
                        return { allowed: true };
                  }                  

                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
                  //|| LogAction
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

                  private logAction(action: 'send' | 'attempt', identifier: string, ip: string): void {
                        const entry = { action, ip, identifier, timestamp: new Date() };
                  
                        if (!this.ips[ip]) this.ips[ip] = [];
                        this.ips[ip].push(entry);
                  
                        const map = action === 'send' ? this.sends : this.attempts;
                        if (!map[identifier]) map[identifier] = [];
                        map[identifier].push(entry);
                  }                       
                  
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                  //|| Health
                  //|| Handle detection of bots/malicious users
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

                  health(): { data : TwoFactorHealthLog, threatLevel : number } {
                        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                        //|| Add a log of the current health
                        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                        const healthData : TwoFactorHealthLog = {
                              attempts          : Object.keys(this.attempts).length,
                              sends             : Object.keys(this.sends).length,
                              lockedIPs         : Object.keys(this.lockedIPs).length,
                              lockedIdentifiers : Object.keys(this.lockedIdentifiers).length,
                        }
                        this.healthLogs.push(healthData);
                        this.healthLogs = this.healthLogs.slice(-500);
                        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                        //|| Calculate the Threat Level
                        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                        const avg               = this.getAverages();
                        let threatLevel = 0;
                        if (healthData.attempts === 0 || healthData.sends === 0)                                                    threatLevel = threatLevel + 1;
                        if (this.checkDeviation(avg, healthData, 'attempts') > this.config.thresholds.attempts)                     threatLevel = threatLevel + 1;
                        if (this.checkDeviation(avg, healthData, 'lockedIPs') > this.config.thresholds.lockedIPs)                   threatLevel = threatLevel + 1;
                        if (this.checkDeviation(avg, healthData, 'lockedIdentifiers') > this.config.thresholds.lockedIdentifiers)   threatLevel = threatLevel + 1;
                        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                        //|| Report to Health
                        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                        return {
                              data : healthData,
                              threatLevel : threatLevel,
                        }
                  }  
                  
                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                  //|| Return the Health Log Averages
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
                  
                  getAverages(): TwoFactorHealthLog {
                        const logs = this.healthLogs;
                        const total = logs.reduce(
                              (acc, log) => ({
                                    attempts          : acc.attempts + log.attempts,
                                    sends             : acc.sends + log.sends,
                                    lockedIPs         : acc.lockedIPs + log.lockedIPs,
                                    lockedIdentifiers : acc.lockedIdentifiers + log.lockedIdentifiers,
                              }),
                              { 
                                    attempts          : 0, 
                                    sends             : 0, 
                                    lockedIPs         : 0, 
                                    lockedIdentifiers : 0 
                              }
                        );

                        const count = logs.length || 1;

                        return {
                              attempts          : total.attempts / count,
                              sends             : total.sends / count,
                              lockedIPs         : total.lockedIPs / count,
                              lockedIdentifiers : total.lockedIdentifiers / count,
                        };
                  }                        


                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                  //|| Function to calculate the deviation of health logs
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

                  checkDeviation( average : TwoFactorHealthLog, current : TwoFactorHealthLog, field   : keyof TwoFactorHealthLog ): number {
                        const avgValue     = average[field];
                        const currentValue = current[field];                  
                        const logAvg       = Math.log(avgValue + 1);
                        const logCurrent   = Math.log(currentValue + 1);
                        const deviation    = Math.abs(logCurrent - logAvg) * 100;
                        return deviation;
                  }

                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                  //|| Watchdog Cleanup
                  //|| Cleans up old attempts that are outside the defined interval
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

                  public purge(): void {
                        const now = Date.now();
                  
                        // Cleanup sends
                        for (const key in this.sends) {
                              this.sends[key] = this.sends[key].filter(attempt =>
                                    (now - new Date(attempt.timestamp).getTime()) <= this.config.intervals.sends * 1000
                              );
                              if (this.sends[key].length === 0) delete this.sends[key];
                        }
                  
                        // Cleanup attempts
                        for (const key in this.attempts) {
                              this.attempts[key] = this.attempts[key].filter(attempt =>
                                    (now - new Date(attempt.timestamp).getTime()) <= this.config.intervals.attempts * 1000
                              );
                              if (this.attempts[key].length === 0) delete this.attempts[key];
                        }
                  
                        // Cleanup IP logs
                        for (const ip in this.ips) {
                              this.ips[ip] = this.ips[ip].filter(attempt =>
                                    (now - new Date(attempt.timestamp).getTime()) <= this.config.intervals.attempts * 1000
                              );
                              if (this.ips[ip].length === 0) delete this.ips[ip];
                        }
                  
                        // Cleanup expired locked identifiers
                        for (const identifier in this.lockedIdentifiers) {
                              if (Date.now() > new Date(this.lockedIdentifiers[identifier]).getTime()) {
                                    delete this.lockedIdentifiers[identifier];
                              }
                        }

                        // Cleanup expired locked IPs
                        for (const ip in this.lockedIPs) {
                              if (Date.now() > new Date(this.lockedIPs[ip]).getTime()) {
                                    delete this.lockedIPs[ip];
                              }
                        }
                  }

                  /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-|| 
                  //|| EOC
                  //|| End of Class
                  //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            }
