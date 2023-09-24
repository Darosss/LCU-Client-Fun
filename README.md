# Custom LCU Client LOL

_note: Project probbably will no be maintable just because react-nodegui it's not recently updated that frequently.<br>In feature probably this project will be cloned as new one client in C#/C or something others.<br>Features described in roadmap probably will be added to client soon.<br>Rather nothing more will NOT be added fe. shop, skins, emotes etc._

I'm making this just for fun.

# Built with

- react-node-gui
- league-connect(later change)

# Usage

It's working only on localhost as riot api says

# Instalation

To run this properly you need to read https://github.com/nodegui/react-nodegui#getting-started

You need some things like CMake, C++ build tools and so on. It's all in their docs

```
npm install
npm run dev             //- compile

npm run start           //- app
```

There is something else to work right now ( later i'll write my own http helper as replacement of league-connect dependecy https://github.com/matsjla/league-connect) after npm install you need to navigate to node_modules\league-connect\dist\index.js and change 250 line(I believe it wont change because no updates).

I dont know why but without react-node-gui it works perfectly but with it I needed to comment TextEncoder and pass just stringified data.

```js
if (options.body !== void 0) {
  const data = JSON.stringify(options.body);
  //const body = new TextEncoder().encode(data);
  request.write(data, "utf8");
}
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

- [] actions in champ select are not shown corectly
- [x] sometimes change spells buttons duplicate and are hard to read
- [] champ select - pick champion sometimes does not allow to pick bug
