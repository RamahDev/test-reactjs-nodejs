import { inputObjectType, objectType } from "nexus"
import { Context } from "../../utils/context"

export const Commande = objectType({
  name: 'Commande',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.string('user')
    t.string('commandeDetails')
    t.string('total')
  },
})


