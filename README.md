# Custom LCU Client LOL

I'm making this just for fun.

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
- [] custom lobbys(from now it's static version of pracitce tool with available 9 bots)
- [] add better styles
- [] fix reloging
- [] remove their ux / headless
- [] choose runes
- [] swaps in drafts
- [] swaps cells in drafts
- some automation functions:
  - [x] auto accept
  - [] runes from opgg
  - these with optional options if afk
    (if mouse was not touched in some seconds in case when you know you will not come back from toilet too fast Kappa) - [] auto pick champ depends on choosen priority - [] auto bans (draft, rankeds)
