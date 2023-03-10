"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "employees",
      [
        {
          id: "94080008",
          name: "Angga",
          email: "angga@gmail.com",
          mobile: "082315153",
          birthDate: "1994-08-08",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "84080008",
          name: "Toni",
          email: "toni@gmail.com",
          mobile: "082315153",
          birthDate: "1984-08-08",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "93080008",
          name: "Tina",
          email: "Tina@gmail.com",
          mobile: "082311153",
          birthDate: "1993-08-08",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "90010008",
          name: "Irvan",
          email: "irvan@gmail.com",
          mobile: "082315153",
          birthDate: "1990-01-08",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "94080001",
          name: "Susi",
          email: "sui@gmail.com",
          mobile: "082515153",
          birthDate: "1994-08-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "90080008",
          name: "Anton",
          email: "anton@gmail.com",
          mobile: "082315153",
          birthDate: "1990-08-08",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "81080008",
          name: "Sumanto",
          email: "sumanto@gmail.com",
          mobile: "082315153",
          birthDate: "1981-08-08",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "92010004",
          name: "Kakam",
          email: "kakam@gmail.com",
          mobile: "082315153",
          birthDate: "1992-01-04",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "84070008",
          name: "Lala",
          email: "lala@gmail.com",
          mobile: "082315153",
          birthDate: "1984-07-08",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "99010001",
          name: "lukman",
          email: "lukman@gmail.com",
          mobile: "082315153",
          birthDate: "1999-01-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "95030003",
          name: "Asep",
          email: "Asep@gmail.com",
          mobile: "082415113",
          birthDate: "1995-03-03",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "88080008",
          name: "Asep Nurzaman",
          email: "asepnuzaman@gmail.com",
          mobile: "082315153",
          birthDate: "1988-08-08",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "94010004",
          name: "Ahmad",
          email: "ahmad@gmail.com",
          mobile: "08231515123",
          birthDate: "1994-04-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "79010012",
          name: "Sutisna",
          email: "sutisna@gmail.com",
          mobile: "082315153",
          birthDate: "1979-01-12",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "88120001",
          name: "Sepudin",
          email: "saepudin@gmail.com",
          mobile: "082315153",
          birthDate: "1988-12-01",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employees", null, {});
  },
};
