use('APID_DB')

// db.students.insertMany([
//     {
//     name: "Meghana",
//     age: 19,
//     regNo:"23BCB8978",
//     username: "Moon4164",
//     password: "Lokeshkumar",
//     email: "meghana19@gmail.com"
//   },
//     {
//     name: "Sneha",
//     age: 19,
//     regNo:"23BCB8978",
//     username: "TimeBomb464",
//     password: "Lokeshkumar",
//     email: "sneha19@gmail.com"
//   },
//   {
//     name: "Lokesh",
//     regNo:"23BCB8975",
//     age: 20,
//     username: "ShadowX20",
//     password: "superSecret",
//     email: "lokesh20@gmail.com"
//   },
//   {
//     name: "Arjun",
//     regNo:"23BCB8938",
//     age: 21,
//     username: "TechNova21",
//     password: "helloWorld",
//     email: "arjun21@gmail.com"
//   }
// ])

db.students.find({"name":"Kakashi"})