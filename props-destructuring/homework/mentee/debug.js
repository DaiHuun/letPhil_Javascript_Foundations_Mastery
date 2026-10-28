// ============================================================
// 🐛  PROPS + DESTRUCTURING  |  HOMEWORK DEBUG
// ============================================================

const team = [
  {
    name: "Alex Rivera",
    role: "Senior Engineer",
    dept: "Engineering",
    email: "alex@devstudio.com",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Building clean, fast interfaces one component at a time.",
  },
  {
    name: "Sofia Patel",
    role: "Lead Designer",
    dept: "Design",
    email: "sofia@devstudio.com",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Designing systems that feel invisible until you need them.",
  },
];

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Prop threading
// ----------------------------------------------------------
// TeamList is supposed to thread props.onContact down to each
// MemberCard. Instead, every card behaves the same way no
// matter what onContact you pass in. What's wrong?

// function TeamList(props) {
//   const container = document.createElement("div");
//   props.members.forEach(function (member) {
//     const card = MemberCard({
//       member: member,
//       onContact: function (email) {
//         console.log("Hardcoded:", email);
//       },
//     });
//     container.appendChild(card);
//   });
//   return container;
// }

// What's wrong ↓
// props.onContact isnt being utilized to, while the original code is passing the console.log
// Your fix ↓
function TeamList(props) {
  const container = document.createElement("div");
  props.members.forEach(function (member) {
    const card = MemberCard({
      member: member,
      onContact: props.onContact,
    });
    container.appendChild(card);
  });
  return container;
}

// ----------------------------------------------------------
// 🔴 DEBUG 2 — Rest pattern
// ----------------------------------------------------------
// This should log the first member's name, then everything
// else about them. Instead it throws a syntax error.

// const { name } = team[0], ...rest = team[0];
// console.log(name);
// console.log(rest);

// What's wrong ↓
// looking at the console.logs, rest should be inside the braces with name.

// Your fix ↓
// const {name, ...rest} = team[0];
