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

This should start the backend and the frontend servers locally. The backend is also deployed on the cloud. Currently, the frontend uses the cloud connection. To change the backend URL, please update the `.env` file in the backend workspace.

## Data flow visualization

<a href="https://drive.google.com/uc?export=view&id=1bLolFcmz8ogiKqkKNLLUk63qK2B_TBJa"><img src="https://drive.google.com/uc?export=view&id=1bLolFcmz8ogiKqkKNLLUk63qK2B_TBJa" style="width: 650px; max-width: 100%; height: auto" title="Click to enlarge picture" />

