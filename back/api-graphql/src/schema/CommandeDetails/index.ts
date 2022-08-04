import { inputObjectType, objectType } from "nexus"
import { Context } from "../../utils/context"

export const CommandeDetails = objectType({
  name: 'CommandeDetails',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.string('user')
    t.string('produit')
    t.string('commande')
  },
})


