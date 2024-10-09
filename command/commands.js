export default [
  {
    name: "birthday",
    description: "Birthday related stuff.",
    options: [
      {
        type: 1,
        name: "add",
        description: "Add a birthday",
        options: [
          {
            type: 3,
            name: "name",
            description: "enter the person's name",
            required: true,
          },
          {
            type: 3,
            name: "birthdate",
            description: "enter the person's birth date (MM/DD)",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "list",
        description: "Get your added birthdays list",
      },
    ],
  },
];
