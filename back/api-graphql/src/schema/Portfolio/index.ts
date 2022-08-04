import { inputObjectType, objectType } from "nexus"
import { Context } from "../../utils/context"

export const Portfolio = objectType({
  name: 'Portfolio',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.string('Attribute1')
  },
})


