/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one :: /abstract/users/select.ts
//|| Handles Generating Random Usernames
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| App
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      import app                                from '@babl.one/core';

      /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
      //|| Abstract Implementation 
      //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      export default class AbstractUsersFunc {

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Random Username Generator
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static usernameRandom(site: string): string { 
                  app.log("Generating Random Username for " + site, 'info');
                  const verbs = ['jumping', 'gliding', 'running', 'floating', 'sprinting', 'chilling', 'hiding', 'climbing', 'roaming', 'dancing', 'spinning', 'skipping', 'wandering', 'soaring', 'crawling', 'bouncing', 'zooming', 'rolling', 'dashing', 'twisting', 'twirling', 'sliding', 'strolling', 'galloping', 'flipping', 'tiptoeing', 'wading', 'hopping', 'drifting', 'charging', 'marching', 'jogging', 'leaping', 'slithering', 'trekking', 'lurking', 'ambling', 'slinking', 'bounding', 'darting', 'glimmering', 'prowling', 'stalking', 'shuffling', 'whirling', 'pacing', 'creeping', 'rambling', 'looping', 'skimming'];
                  const adjs  = ['quiet', 'brave', 'happy', 'curious', 'clever', 'silly', 'bold', 'gentle', 'zany', 'sharp', 'witty', 'chill', 'bright', 'fearless', 'mellow', 'playful', 'bubbly', 'cheerful', 'quirky', 'snappy', 'spirited', 'thoughtful', 'spunky', 'kind', 'radiant', 'cool', 'calm', 'daring', 'eager', 'funny', 'loyal', 'zesty', 'peppy', 'sunny', 'graceful', 'sassy', 'plucky', 'humble', 'jolly', 'laidback', 'neat', 'peachy', 'smooth', 'sprightly', 'sweet', 'tidy', 'vibrant', 'wholesome', 'zapped', 'glowing'];
                  const nouns = ['otter', 'panther', 'falcon', 'lizard', 'fox', 'turtle', 'whale', 'hawk', 'badger', 'wolf', 'duck', 'koala', 'ferret', 'sloth', 'weasel', 'lemur', 'stingray', 'beaver', 'puffin', 'penguin', 'jellyfish', 'manatee', 'mongoose', 'wombat', 'gecko', 'ibis', 'armadillo', 'crab', 'squid', 'shrimp', 'gnat', 'narwhal', 'alpaca', 'bat', 'koi', 'capybara', 'yak', 'corgi', 'shark', 'newt', 'toucan', 'donkey', 'platypus', 'quokka', 'seal', 'eel', 'boar', 'heron', 'badass'];
                  const verb  = verbs[Math.floor(Math.random() * verbs.length)]
                  const adj   = adjs[Math.floor(Math.random() * adjs.length)]
                  const noun  = nouns[Math.floor(Math.random() * nouns.length)]
                  const num   = Math.floor(Math.random() * 10000)            
                  return `${verb}_${adj}_${noun}_${num}`
            };

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Convert what status is stored in the database into the @babl.one/auth : AccountStatus
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

            static convertDBStatusToAccountStatus(status: string): string | null {
                  switch(status) {
                        case 'USER.OK'   : return 'OK';
                        case 'USER.PEND' : return 'PE';
                        case 'USER.PDRM' : return 'RM';
                        case 'USER.RMVD' : return 'XX';
                        case 'USER.BAND' : return 'BN';
                        case 'USER.REVW' : return 'RV';
                        default          : return null;
                  }
            }
      

            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| EOI
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

      }
