import { inputObjectType, objectType } from "nexus"
import { Context } from "../../utils/context"

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.string('access_token')
    t.field('comments', {
      type: 'Comments',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user.findUnique({
          where: { id: parent.id }
        }).comments()
      }
    })
    t.string('name')
    t.string('email')
    t.string('password')
  },
})


