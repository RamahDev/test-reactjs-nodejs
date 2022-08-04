import { inputObjectType, objectType } from "nexus"
import { Context } from "../../utils/context"

export const Produit = objectType({
  name: 'Produit',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.string('name')
    t.string('description')
    t.string('prix')
    t.string('images')
  },
})


