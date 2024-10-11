export default [
  {
    name: 'birthday',
    description: 'Birthday related stuff.',
    options: [
      {
        type: 1,
        name: 'add',
        description: 'Add someone to your birthday list',
        options: [
          {
            type: 3,
            name: 'name',
            description: "The person's name",
            required: true
          },
          {
            type: 3,
            name: 'birthdate',
            description: "The person's birth date (MM/DD)",
            required: true
          }
        ]
      },
      {
        type: 1,
        name: 'list',
        description: 'Display your birthday list'
      },
      {
        type: 1,
        name: 'remove',
        description: 'Remove someone from your birthday list',
        options: [
          {
            type: 4,
            name: 'number',
            description:
              'The number in your birthday list of the birthday to remove',
            required: true
          }
        ]
      }
    ]
  }
]
