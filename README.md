# SiloStaking Puzzle Event (powered by Vue)

## **Setup**

It does not have much complication, the usual flow, download the repository, install dependencies and serve


1. Clone/Download the repository.

2. You may have to install the packages with **NPM**.

```console
npm install
```

3. Serve to local.

```console
export NODE_OPTIONS=--openssl-legacy-provider

set -a; source .env.local; set +a

npm run serve
```

## **Deployment**

This is deployed with AWS amplify. All one has to do is push to the main brach of the github and it will automatically update.
The site is hosted at: https://main.d15dsrvslxvaqu.amplifyapp.com/ and https://puzzle.silostaking.io

To add Environment Variables, just visit: https://ap-northeast-2.console.aws.amazon.com/amplify/home?region=ap-northeast-2#/d15dsrvslxvaqu/settings/variables. Amplify -> silo-nft -> Hosting Env -> Environment Variables.

