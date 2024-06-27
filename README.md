# Custom LCU Client LOL

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

- i will find out if there any (of course they will occur)
