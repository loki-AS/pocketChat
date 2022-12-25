export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      {
        name: 'userId',
        title: 'UserId',
        type: 'string',
      },
      {
        name: 'postedBy',
        title: 'PostedBy',
        type: 'postedBy',
      },
      {
        name: 'likes',
        title: 'Likes',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'user' }],
          },
        ],
      },
      {
        name: 'message',
        title: 'Message',
        type: 'array',
        of: [{ type: 'message' }],
      },
    ],
  };