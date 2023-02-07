# Metamask insights and security solutions

This repo contains the codebase which proposes a new idea of visulaizing ongoing transanctions from the user wallet, using metamask snap. It also, proposes a machine learning model that analyses the smart contract which the user is interacting with. All of this happens in real-time.


## Code structure walkthrough

There are 4 major directories in the code, that comprises entire codebase.
1. [Frontend code](/packages/site/)
2. [Snap code](/packages/snap/)
3. [Backend code](/packages/backend)
4. [ML model and Flask server](/model)

Each of the directories contains a `README` file, which contains all the necessary information related with the corresponding repository.

## Starting the root repo

Clone the repo. Inside each of the [workspaces](/packages/), do a `yarn install` to make sure all the workspaces are using latest dependencies.
**Note** The [ML model](/model), is not a yarn package. To run it locally, please refer to its readme file.

After doing `yarn install` in all the workspaces, in the root directory of the repo, run the below command.

```shell
yarn install && yarn start
```

This should start the backend and the frontend servers locally.

## Starting the ML model
The ML model is currently not hosted on the cloud, as it requires a bit of preprocessing based on GPU to generate the result. To get the ML analysis, you'll need to start the server manually.
1. Go to the [model](/model/) pakcage
2. Make sure you have all the dependencies installed
3. Run `python app.py`. This will start a flask server on port `1234`. If this port is already in use, then please specify a free port in the [app.py](/model/app.py) file.

## Data flow visualization

<a href="https://drive.google.com/uc?export=view&id=1bLolFcmz8ogiKqkKNLLUk63qK2B_TBJa"><img src="https://drive.google.com/uc?export=view&id=1bLolFcmz8ogiKqkKNLLUk63qK2B_TBJa" style="width: 650px; max-width: 100%; height: auto" title="Click to enlarge picture" />

