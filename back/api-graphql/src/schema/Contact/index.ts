import { inputObjectType, objectType } from "nexus"
import { Context } from "../../utils/context"

export const Contact = objectType({
  name: 'Contact',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.string('address')
    t.string('phone')
    t.string('latitude')
    t.string('logitude')
  },
})


