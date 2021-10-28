# Team America Slayers NFT Game

<<<<<<< HEAD
This is an NFT game built during the buildspace project
=======
Live Demo [here](https://wave-portal-client.joselvelez.repl.co/)

This dApp is a slight variation of the one built in the [buildspace](https://buildspace.so "buildspace") web3 project. The source for the original project is [here](https://gist.github.com/adilanchian/93fbd2e06b3b5d3acb99b5723cebd925 "here")

The original project kept all of the code in one file and stored a few pieces of state using the useState hook. I felt that in a more typical web3 dapp, a more robust approach to managing application state would be necessary. I wanted to get a better understanding of using other state management techiques while also refactoring most of the logic into seperate components.

Dealing with state in an application gets much trickier when introducing multiple components that need to share information. This is my first experience at designing and building a react application and I realized how fundamental (and hard) state management is.

Before participating in the [buildspace](https://buildspace.so "buildspace") web3 project, I tried to follow along on various web3 dapp tutorials and always walked away confused. In my opinion, an important part was always abstracted away and I struggled to make the connection - how state was managed between the connection to the network and the client.

Most of the dapp project examples I have seen use a state managment library like [web3-react](https://github.com/NoahZinsmeister/web3-react "web3-react") or a framework like [useDApp](https://github.com/EthWorks/useDApp "useDApp"), which I think is very cool. useDApp actually uses web3-react internaly as well.

The problem I ran into was that for someone like me who was new to react, solidity, web3 (all of it really), relying on a library like web3-react would mean that a very critical part of the application was being abstracted away and I was losing the opportunity to learn. I tried my best to pour over the web3-react code to understand what was happening internally, but it was overwhelming. The key takeaway in reading the web3-react docs was this:

> At a high level, web3-react is a state machine which ensures that certain key pieces of data (the user's current account, for example) relevant to your dApp are kept up-to-date.

With this in mind, I decided that I wanted to build my own "state machine", because it would force me to understand and apply the same concepts. Of course my idea and implementation of a state machine would be much more primitive and, outside of academic pursuits, I would just use an existing library or framework like the ones I mentioned above.

Building this was very challenging and frustrating, but also rewarding. Even after getting to a point where I am happy enough to move forward, I could easily spend more time optimizing/refactoring/debugging this. But that is not the point of this excercise. I just wanted to get exposure to the underbelly of state management before using a library or framework that abstracts it away from me.

As I continue to learn more react, I will probably come back to make improvements, as I still like the idea of using this as a sort of dapp skeleton for building simple dapps that are not meant for production environments.

Below is a summary of what I am using under the hood and how I would modify it for new projects.

## Basic Structure
This is basically a create-react-app project with a few additional folders and files.
* src directory
	* *contracts directory* - drop in the contract ABI(s) that your app will be interacting with.
	* *context directory* - files related to global state management. I am using useReducer for global state.
		* **app-actions.js** - a list of each dispacth action your reducer will use. This is to help the code editor autocomplete and avoid spelling issues.
		* **app-context.js** - a simple 3 line module that creates the context and exports it for use
		* **app-reducer.js** - the reducer function. This handles the actual logic for setting/updating the state
		* **AppStateprovider.js** - this is the component that will wrap a provider around the child components. Everything inside of this component will have access to the global state. This is where the reducer function is implemented and each of the various dispatch methods are called for setting the state.
	* *constants directory* - this is where I drop in constants that do not change but need to be provided to the app.
        * **networks.js** - a list of network objects that I use for checking what network the user's wallet is connected to
        * **contractConstants.js** - used to store the location of the contract ABI and the currently deployed contract address
    * *components directory* - where all of the components will live.

I hope other folks just getting into react/web3 might find this helpful. If you find issues or have suggestions, please let me know!
>>>>>>> 94eac47c372a24849c2f67a243a5ef70ccf1892a
