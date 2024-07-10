import {Env} from "./env";

export const endpoints = {
 subscriptions:{
   listAll:Env.EndPoint+'allSubscription',
   getPurchaseLink:Env.EndPoint+'subscriptionPurchaseLink',
 },
  group:{
    create:Env.EndPoint+'createGroup'
  },
  user:{
   updateStts:Env.EndPoint+'updateUserStts'
  },
  report:{
    create:Env.EndPoint+'reportCreate'
  }
}
