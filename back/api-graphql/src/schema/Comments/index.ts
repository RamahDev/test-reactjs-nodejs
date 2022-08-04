import { inputObjectType, objectType } from "nexus"
import { Context } from "../../utils/context"

export const Comments = objectType({
  name: 'Comments',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.comments.findUnique({
          where: { id: parent.id }
        }).author()
      }
    })
    t.string('text')
    t.string('images')
  },
})


