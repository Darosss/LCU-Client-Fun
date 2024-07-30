# Custom LCU Client LOL

### --

#### Use at Your Own Risk

This project may violate Riot Games' terms of service. By using this project, you acknowledge that you do so at your own risk. The creators and contributors of this project are not responsible for any consequences that may arise from using this software, including but not limited to:

#### Account bans / Restrictions

Legal action from Riot Games
Riot Games' Terms of Service
Please refer to Riot Games' Terms of Service to understand the rules and regulations governing the use of their services and software. It is important to ensure that you are not violating their terms by using this project.

#### No Warranty

This project is provided "as is" without any warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

#### Contribution

By contributing to this project, you agree that your contributions do not violate any terms of service of Riot Games or any other third party.

#### Acknowledgment

By using this project, you acknowledge that you have read and understand this disclaimer and agree to use this project at your own risk.

### ---

_note: features described in roadmap probably will be added to client soon.<br>Rather nothing more will NOT be added fe. shop, skins, emotes etc._

I'm making this just for fun.

# Built with

- React (next.js)
- express
- socketIO
- league-connect(later change)

# Usage

It's working only on localhost as riot api says

# Instalation

```
npm install
npm run dev             //- compile

npm run start           //- app
```

# Roadmap

- [x] base manage by discord (champ select, ready check)
- [] champ select
  - [] chat
- [x] custom lobbys
- [] friends list:
  - [x] invite friends
  - [] remove friends
  - [] message friends
- [x] add better styles
- [x] remove their ux / headless
- [x] choose runes
- [] swaps in drafts
- [] swaps cells in drafts
- some automation functions:

  - [x] auto accept
  - [x] prototype auto pick champ:

    - [x] pick when auto pick is on
    - [x] pick only available champs(not banned, not picked)
      - [x] check if lol did 'disable' champ and remove form available
    - [x] possible to add champs depends on role utility, bottom, middle, jungle, top, other(blind, arams etc.)

      - [x] pioritze champs by buttons

    - [x] add option to change auto pick on time fe. at 10 sec before your time finish(for now it's static 5sec)
    - [] add options to with 'clever' auto pick. (only auto pick when your mouse didn't move by last 10 secs. this in case when you had turned on auto pick but didn't know what to pick and prevent program to pick it for you)

- [] global chat

# Known bugs

- _i will find out if there any (of course they will occur)_
- [] discord managing session is buggy with champ select (removing, edit messages sometimes will throw unexpected errors) - fix later
