import { Mutation } from './mutation'
import { Query } from './query'
import { Subscription } from './subscription'
import Input from './input'

import { User } from './User'
import { Comments } from './Comments'
import { Contact } from './Contact'
import { Commande } from './Commande'
import { Portfolio } from './Portfolio'
import { Produit } from './Produit'
import { CommandeDetails } from './CommandeDetails'


export const types = [
  ...Input,
  ...Query,
  ...Mutation,
  ...Subscription,
  User,
Comments,
Contact,
Commande,
Portfolio,
Produit,
CommandeDetails,

]
