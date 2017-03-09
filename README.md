# TodoList Dapp

## Required dependencies

### A running node

You must run a node on your computer, whether its a real or virtual one. For development speed reasons, the best choice is to use testrpc because you have as much ether as you want and don't need to mine transactions.

#### Install instructions

##### Mac & Linux

```js
sudo npm install -g ethereumjs-testrpc
```

##### Windows

[The ethereumjs-testrpc package needs much more things to be installed on your machine to work on Windows.](https://github.com/ethereumjs/testrpc/wiki/Installing-TestRPC-on-Windows)

If you can't afford this, we've covered you with [*Vagrant*](https://www.vagrantup.com/). This piece of software allows you to run a lightweight linux virtual machine in the terminal. Thus, it uses much less power than a full VM and you can still enjoy your Windows environment and tools you are used to, while providing you linux compatibility for terminal tools.

To do so, it's as easy as:

- [**Downloading and installing Vagrant**](https://releases.hashicorp.com/vagrant/1.9.2/vagrant_1.9.2.msi?_ga=1.13795955.512399365.1487957654)
- Run ```vagrant up``` in a terminal opened at the project root. It may take some time as it must download an ubuntu ISO the first time it runs.
- Then run ```vagrant ssh```. If it doesn't work (it probably won't in fact) you can use **Git bash** if you already have it on your computer. If you don't, [follow those instructions](http://tech.osteel.me/posts/2015/01/25/how-to-use-vagrant-on-windows.html).

And that's it ! Now you can run ```testrpc``` and you should see your node running.

### Truffle - Compile & Migrate contracts to the blockchain

```
sudo npm install -g truffle
```

## Instructions

### Run your ethereum node

#### With testrpc

In a terminal (or in vagrant ssh on Windows, see above), run ```testrpc```

### Deploy the smart contracts to the node

In another terminal, run ```truffle compile``` and then ```truffle migrate```

### Setting up the project

With your node running and the smart contracts deployed to it, run in terminal ```npm install``` then ```npm start```.

You're done !

## FAQ

* __Why is there both a truffle.js file and a truffle-config.js file?__

    Truffle requires the truffle.js file be named truffle-config on Windows machines. Feel free to delete the file that doesn't correspond to your platform.

* __Where is my production build?__

    The production build will be in the build_webpack folder. This is because Truffle outputs contract compilations to the build folder.

* __Where can I find more documentation?__

    All truffle boxes are a marriage of [Truffle](http://truffleframework.com/) and a React setup created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start!