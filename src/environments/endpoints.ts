import {Env} from "./env";

export const endpoints = {
 subscriptions:{
   listAll:Env.EndPoint+'allSubscription'
 },
  group:{
    create:Env.EndPoint+'createGroup'
  }
}
