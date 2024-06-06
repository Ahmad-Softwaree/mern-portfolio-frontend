export const blogs = [];
export const skills = [
  {
    name: "React",
    image: "/images/skills/react.png",
    types: ["development"],
  },
  {
    name: "HTML",
    image: "/images/skills/html.png",
    types: ["development"],
  },
  {
    name: "Postgresql",
    image: "/images/skills/postgresql.png",
    types: ["development"],
  },
  {
    name: "CSS",
    image: "/images/skills/css.png",
    types: ["development"],
  },
  {
    name: "Sass",
    image: "/images/skills/scss.png",
    types: ["development"],
  },
  {
    name: "Node.js",
    image: "/images/skills/node.png",
    types: ["development"],
  },
  {
    name: "Github",
    image: "/images/skills/github.png",
    types: ["tool"],
  },
  {
    name: "Javascript",
    image: "/images/skills/js.png",
    types: ["development", "language"],
  },
  {
    name: "Typescript",
    image: "/images/skills/ts.png",
    types: ["development", "language"],
  },
  {
    name: "Java",
    image: "/images/skills/java.png",
    types: ["language"],
  },
  {
    name: "C#",
    image: "/images/skills/csharp.png",

    types: ["language"],
  },
  {
    name: "Firebase",
    image: "/images/skills/firebase.png",

    types: ["development"],
  },
  {
    name: "Socket.io",
    image: "/images/skills/socket.png",

    types: ["development"],
  },
  {
    name: "Netlify",
    image: "/images/skills/netlify.png",

    types: ["server", "host"],
  },
  {
    name: "Reilway",
    image: "/images/skills/reilway.png",

    types: ["server", "host"],
  },
  {
    name: "Namecheap",
    image: "/images/skills/namecheap.png",

    types: ["domain"],
  },
  {
    name: "Chakra UI",
    image: "/images/skills/chakra.png",

    types: ["development"],
  },
  {
    name: "Bootstrap",
    image: "/images/skills/bootstrap.png",

    types: ["development"],
  },
  {
    name: "JWT",
    image: "/images/skills/jwt.png",

    types: ["development"],
  },
  {
    name: "npm",
    image: "/images/skills/npm.png",

    types: ["development"],
  },
  {
    name: "Redux",
    image: "/images/skills/redux.png",

    types: ["development"],
  },
  {
    name: "React Router",
    image: "/images/skills/react-router.png",

    types: ["development"],
  },
  {
    name: "MongoDB",
    image: "/images/skills/mongo.png",

    types: ["development"],
  },
  {
    name: "MySQL",
    image: "/images/skills/mysql.png",

    types: ["development"],
  },
  {
    name: "Tailwind",
    image: "/images/skills/tailwind.png",

    types: ["development"],
  },
  {
    name: "Vue.js",
    image: "/images/skills/vue.png",

    types: ["development"],
  },
  {
    name: "Express.js",
    image: "/images/skills/express.png",

    types: ["development"],
  },
  {
    name: "appwrite",
    image: "/images/skills/appwrite.webp",

    types: ["development"],
  },
  {
    name: "Shadcn",
    image: "/images/skills/shadcn.png",

    types: ["development"],
  },
  {
    name: "Auth0",
    image: "/images/skills/auth0.png",

    types: ["development"],
  },
  {
    name: "Sanity",
    image: "/images/skills/sanity.png",

    types: ["development"],
  },
  {
    name: "Uploadthing",
    image: "/images/skills/uploadthing.png",

    types: ["development"],
  },
  {
    name: "React Query",
    image: "/images/skills/react-query.avif",

    types: ["development"],
  },
  {
    name: "Zod",
    image: "/images/skills/zod.png",
    types: ["development"],
  },
  {
    name: "Supabase",
    image: "/images/skills/supabase.webp",

    types: ["development"],
  },
  {
    name: "React Native",
    image: "/images/skills/react.png",

    types: ["development"],
  },
  {
    name: "Knex.js",
    image: "/images/skills/knex.png",

    types: ["development"],
  },
  {
    name: "PostgreSql",
    image: "/images/skills/postgresql.png",

    types: ["development"],
  },
  {
    name: "Vite",
    image: "/images/skills/vite.svg",

    types: ["server"],
  },
  {
    name: "Next.js",
    image: "/images/skills/next.png",

    types: ["development", "development"],
  },
  {
    name: "Unity",
    image: "/images/skills/unity.jpg",

    types: ["development"],
  },
  {
    name: "Material UI",
    image: "/images/skills/material.jpg",

    types: ["development"],
  },
  {
    name: "Postman",
    image: "/images/skills/postman.svg",

    types: ["development", "tool"],
  },
  {
    name: "VS Code",
    image: "/images/skills/vscode.png",

    types: ["tool"],
  },
  {
    name: "Intellej",
    image: "/images/skills/intellj.png",

    types: ["tool"],
  },
  {
    name: "Git",
    image: "/images/skills/git.png",

    types: ["tool"],
  },
  {
    name: "Aceternity UI",
    image: "/images/skills/aceternity.webp",

    types: ["development"],
  },
  {
    name: "Socket",
    image: "/images/skills/socket.png",

    types: ["development"],
  },
];
export const projects = [
  {
    id: 1,
    title: "Kurdface",
    desc: "Kurdish Social Medial web application , it's facebook clone, include most of the functionalities hosted.",
    links: [
      {
        url: "https://kurdface.ahmad-software.com",
        name: "Website",
      },
    ],
    gits: [
      {
        git: "https://github.com/Ahmad-Softwaree/facebook-development",
        name: "Kurdface development",
      },
      {
        git: "https://github.com/Ahmad-Softwaree/facebook-api",
        name: "Kurdface api",
      },
      {
        git: "https://github.com/Ahmad-Softwaree/facebook-socket",
        name: "Kurdface socket",
      },
    ],
    contributor: "",
    image: "/images/projects/facebook.png",
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "MongoDB",
        "Socket",
        "Firebase",
        "Javascript",
        "React Query",
        "Redux",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["Website"],
  },
  {
    id: 2,

    title: "Bester Group",
    desc: "A business website for my group (Bester Group), include all the services and works, with nice UI/UX.",
    links: [
      {
        url: "https://bester-group.com",
        name: "Website",
      },
    ],
    gits: [],
    contributor: "",
    image: "/images/projects/bester.png",
    stacks: skills.filter((val) =>
      ["React", "Javascript", "Shadcn", "Redux", "Chakra UI", "Vite"].includes(
        val.name
      )
    ),
    types: ["Website"],
  },
  {
    id: 3,

    title: "Janan group",
    desc: "A website for a kurdish notebook brand, contain the features and products, you can see every products description and order them via social medias.",
    links: [
      {
        url: "https://janan-group.com",
        name: "Website",
      },
    ],
    gits: [],
    contributor: "Bester Group",

    image: "/images/projects/janan.png",
    stacks: skills.filter((val) =>
      [
        "Vue.js",
        "Node.js",
        "MongoDB",
        "Firebase",
        "Javascript",
        "Vite",
      ].includes(val.name)
    ),
    types: ["Website"],
  },
  {
    id: 4,

    title: "Kurdferga",
    desc: "An academic website for student in Iraqi kurdistan, which include all subjects and teachers with courses.\nIt include extra features like todo list and timer, also a user can make a pro account so he/she can access more features.",
    links: [
      {
        url: "https://kurdferga.net",
        name: "Website",
      },
    ],
    gits: [],
    contributor: "",

    image: "/images/projects/kurdferga.png",
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "MongoDB",
        "Firebase",
        "Javascript",
        "React Query",
        "Redux",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["Website"],
  },
  {
    id: 5,

    title: "Kurdidioms",
    desc: "A Kuridsh website like dictionary , including all the english idioms translated wisely to kurdish and give the exact meaning of it, user can create account and upload idioms, then admins can see it and approve it, there are much more featrues there , check it out.",
    links: [
      {
        url: "https://kurdidioms.bester-group.com",
        name: "Website",
      },
    ],
    gits: [],
    contributor: "Bester Group",

    image: "/images/projects/idiom.png",
    stacks: skills.filter((val) =>
      [
        "React",
        "Firebase",
        "Javascript",
        "React Query",
        "Redux",
        "Vite",
      ].includes(val.name)
    ),
    types: ["Website"],
  },
  {
    id: 6,

    title: "Kallpost",
    desc: "Full-stack web system for maintain and post delivery action, include more than 30 different part, different roles for manager and seller, each one have it's own feature and UI, managing posts and shop, access history and see increase money, how the user can access? , via 2 applications, 1 for user that can access shop and request post from all Iraq, 2 for driver that connect with kallapost company, and much more features.",
    links: [
      {
        url: "https://play.google.com/store/apps/details?id=com.kalla.kallapost",
        name: "Mobile Application (Android)",
      },
      {
        url: "https://apps.apple.com/us/app/kalla-post/id6450989657",
        name: "Mobile Application (Apple)",
      },
    ],
    gits: [],
    contributor: "Bester Group",

    image: "/images/projects/kalla.png",
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "Postgresql",
        "knex.js",
        "Firebase",
        "Javascript",
        "React Query",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["System", "Application"],
  },
  {
    id: 7,

    title: "Baiwesht Company",
    desc: "Brand website that show the user brands of snacks in Iraq, products and it's feature, also events that the company make, what certificate they have, and other information.\nThe best part is this website is full stack, it have admin panel where they can play with the data however they want.",
    links: [
      {
        url: "https://baiweshtcompany.com",
        name: "Website",
      },
    ],
    gits: [],
    contributor: "Bester Group",

    image: "/images/projects/baiwesht.png",
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "MongoDB",
        "Socket",
        "Firebase",
        "Javascript",
        "React Query",
        "Redux",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["Website"],
  },
  {
    id: 8,
    title: "Tile Vania",
    desc: "A very simple game made with unity and C#, like mario.\nIt has 3 levels and A boss level, you can collect coins and you have to kill monsters in your way to the end, also there are a lot's of trap you have to aviod, have fun!!",
    links: [
      {
        url: "https://ahmadsoftware.itch.io/myfirstgame",
        name: "Game",
      },
    ],
    gits: [],
    contributor: "",

    image: "/images/projects/unity.jpg",
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "MongoDB",
        "Socket",
        "Firebase",
        "Javascript",
        "React Query",
        "Redux",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["Game"],
  },
  {
    id: 9,

    title: "Kurd Todo",
    desc: "A full stack web application where you can modify and organize your day, you can add todo and have collection of them , you have profile and can see your success of week and day.",
    links: [
      {
        url: "https://kurd-todo.netlify.app",
        name: "Website",
      },
    ],
    gits: [
      {
        git: "https://github.com/Ahmad-Softwaree/React-todo-front",
        name: "Front Todo",
      },
      {
        git: "https://github.com/Ahmad-Softwaree/React-todo-api",
        name: "Todo api",
      },
    ],
    contributor: "",

    image: "/images/projects/todo.png",
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "MongoDB",
        "Socket",
        "Firebase",
        "Javascript",
        "React Query",
        "Redux",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["Website"],
  },
  {
    id: 10,

    title: "Farmuda",
    desc: "A website to serve the hadiths of the Prophet (peace be upon him), as well as a special platform for legitimate questions and answers",
    links: [
      {
        url: "https://farmudaa.com",
        name: "Website",
      },
    ],
    gits: [],
    contributor: "Sayay Farmuda",

    image: "/images/projects/saya.png",
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "MongoDB",
        "Socket",
        "Firebase",
        "Javascript",
        "React Query",
        "Redux",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["Website"],
  },
  {
    id: 11,

    title: "Meera Post",
    desc: 'Meera Post" is a full-stack web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It serves as a platform for users to create, share, and interact with posts. Users can register and log in to the platform, allowing them to create new posts, view posts from other users, like, comment, and share posts. The application features a responsive and intuitive user interface built with React.js on the development, providing a seamless user experience across devices. The development, powered by Node.js and Express.js, handles user authentication, post management, and interactions with the MongoDB development. "Meera Post" aims to provide a user-friendly and engaging environment for users to connect, share their thoughts, and engage with others in a community-driven setting.',
    links: [],
    image: "/images/projects/meera.png",
    gits: [],
    contributor: "Bester Group",

    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "MongoDB",
        "Socket",
        "Firebase",
        "Javascript",
        "React Query",
        "Redux",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["System"],
  },
  {
    id: 12,

    title: "GCommerce",
    desc: "GCommerce is a robust web application meticulously crafted with React and Laravel, offering a seamless fusion of cutting-edge development and powerful development technologies. This comprehensive platform embodies the complete suite of functionalities essential for a thriving e-commerce venture. From intuitive user interfaces to secure payment gateways, GCommerce delivers an unparalleled shopping experience for both customers and administrators. Elevate your online business with GCommerce and unlock endless possibilities in the digital marketplace.",
    links: [],
    contributor: "Gigant TEchnology",

    image: "/images/projects/gcommerce.png",
    gits: [],
    stacks: skills.filter((val) =>
      [
        "React",
        "Firebase",
        "Javascript",
        "React Query",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["Website"],
  },
  {
    id: 13,

    title: "Refinery Management System",
    desc: "Our Refinery Management System is a comprehensive solution designed to streamline refinery operations efficiently. Developed using React, Tailwind CSS, Node.js, PostgreSQL, and Knex.js, it encompasses functionalities such as bank transactions, inventory management of oils, machinery tracking, employee records, managerial tasks, delivery logistics, storage management, and order processing. The system provides real-time monitoring, resource optimization, integrated communication features, and robust security protocols. Customizable and scalable, it caters to refineries of all sizes, offering a user-friendly interface for enhanced productivity and decision-making.",
    links: [],
    contributor: "",

    image: "/images/projects/refinery.png",
    gits: [
      {
        git: "https://github.com/Ahmad-Softwaree/refinery_system_front",
        name: "Refinery Front",
      },
      {
        git: "https://github.com/Ahmad-Softwaree/refinery_system_server",
        name: "Refinery Server",
      },
    ],
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "Firebase",
        "Javascript",
        "React Query",
        "Postgresql",
        "Knex.js",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["System"],
  },
  {
    id: 14,

    title: "Pet Management System",
    desc: "Our Pet Management System, developed with React, Tailwind CSS, Node.js, PostgreSQL, and Knex.js, is a comprehensive solution for efficient pet care and business management. From tracking pet records to managing appointments, inventory, and customer interactions, our system simplifies every aspect of running a pet-related business. With dedicated sections for employees, managers, doctors, pets, products, clinic operations, customers, and high-level managers, it's the ultimate tool for streamlining operations and enhancing customer satisfaction.",
    links: [],
    contributor: "",

    image: "/images/projects/pet.png",
    gits: [
      {
        git: "https://github.com/Ahmad-Softwaree/pet_system_front",
        name: "Pet Front",
      },
      {
        git: "https://github.com/Ahmad-Softwaree/pet_system_server",
        name: "Pet Server",
      },
    ],
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "Javascript",
        "React Query",
        "Postgresql",
        "Knex.js",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["System"],
  },
  {
    id: 15,

    title: "Absence Management System",
    desc: "Our Absence Management System, built with React, Tailwind CSS, Node.js, PostgreSQL, and Knex.js, simplifies the process of tracking employee absences. With dedicated interfaces for managers and employees, the system allows seamless communication and transparency regarding absences. The intuitive absence submission page enables employees to file requests easily, while managers can efficiently review, approve, or reject them. Robust filtering and search functionalities make it effortless to find and manage absence records. With this system, businesses can effectively monitor and manage employee attendance, ensuring smooth operations and optimal workforce management.",
    links: [],
    contributor: "",

    image: "/images/projects/absence.png",
    gits: [
      {
        git: "https://github.com/Ahmad-Softwaree/absence_system_front",
        name: "Absence Front",
      },
      {
        git: "https://github.com/Ahmad-Softwaree/absence_system_server",
        name: "Absence Server",
      },
    ],
    stacks: skills.filter((val) =>
      [
        "React",
        "Node.js",
        "Postgresql",
        "Knex.js",
        "Javascript",
        "React Query",
        "Chakra UI",
        "Vite",
      ].includes(val.name)
    ),
    types: ["System"],
  },
];

export const certificates = [
  {
    title: "Modern Javascript Course",
    desc: "A modern Javascript Course That include All the new Features of Javascirpt , async await and es6 modules and much more.",
    url: "https://www.udemy.com/course/modern-javascript-from-the-beginning/",
    image: "/images/certificates/js.jpg",
  },
  {
    title: "Full-stack Web Development",
    desc: "Udemy Certification About Full-stack Web Development, Covered a lot concepts and programming languages with help of Frameworks and Libraries",
    url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    image: "/images/certificates/web.jpg",
  },
  {
    title: "MERN Stack Web Development",
    desc: "Udmey MERN Stack course, One of the best, include any library and packages you need to know for developing fast and better UI/UX websites with new technologies",
    url: "https://www.udemy.com/course/mern-stack-front-to-back/",
    image: "/images/certificates/mern.jpg",
  },
  {
    title: "Mongodb",
    desc: "A certificate about mongodb in detail, include all the extra features and queries of mongodb, used in different apis and different Frameworks, also included modern queries.",
    url: "https://netninja.dev/courses/enrolled/1714198",
    image: "/images/certificates/mongo.png",
  },
  {
    title: "React Router",
    desc: "A very simple course about react router wich include everything you have to know about it, it's simple but covers a lot, how to make routes secure and authorized for users, and much more.",
    url: "https://netninja.dev/courses/enrolled/1966403",
    image: "/images/certificates/react-router.png",
  },
  {
    title: "React & Typescript",
    desc: "Completed an advanced React and TypeScript course on Udemy, delving deep into the intricacies of both technologies. Through hands-on projects, mastered the seamless integration of TypeScript's static typing with React's powerful component-based architecture. Developed five real-world projects, honing skills in state management, routing, and complex component interactions, elevating proficiency in modern web development.",
    url: "https://www.udemy.com/course/react-typescript-the-practical-guide/",
    image: "/images/certificates/Typescript.jpg",
  },
  {
    title: "Certificate Of Appreciation",
    desc: "This Certificate of Appreciation acknowledges Ahmad Salah for their outstanding contribution to Kallapost at Salahaddin University. Through innovative thinking, dedication, and hard work, Ahmad Salah has played a pivotal role in the successful execution of the project, demonstrating exceptional leadership and teamwork skills. Their commitment to excellence and creativity has greatly enriched the academic environment and inspired fellow students and faculty members alike. This certificate is a testament to their remarkable achievements and the positive impact they have made within the university community.",
    url: " ",
    image: "/images/certificates/software.png",
  },
  {
    title: "Kurdferga Certificate Of Appreciation",
    desc: "This Certificate of Appreciation celebrates Ahmad Salah's dedicated service to Kurdferga, a pioneering Kurdish organization dedicated to empowering youth through education. Over the past year, Ahmad Salah has demonstrated unwavering commitment and passion in advancing the organization's mission, contributing significantly to its growth and impact. Through their innovative ideas, tireless efforts, and exceptional leadership, Ahmad Salah has inspired positive change and helped shape the futures of countless young individuals. This certificate serves as a heartfelt acknowledgment of Ahmad Salah's invaluable contributions to Kurdferga and its vital work in nurturing the next generation of leaders in Kurdistan.",
    url: "https://kurdferga.net",
    image: "/images/certificates/kurdferga.png",
  },
];

export const works = [
  {
    url: "https://bester-group.com/",
    company: "Bester",
    image: "/images/works/bester.svg",
  },
  {
    url: "https://kurdferga.net/",
    company: "Kurdferga",
    image: "/images/works/kurdferga.png",
  },
  {
    url: "https://informatic-co.com/",
    company: "Informatic",
    image: "/images/works/informatic.svg",
  },
  {
    url: "https://gigant.tech/",
    company: "Gigant",
    image: "/images/works/gigant.png",
  },
  // {
  //   url: "https://peshawa.tech/",
  //   company: "Peshawa Group",
  //   image: "/images/works/peshawa.avif",
  // },
  // {
  //   url: "https://ap-soft.tech/",
  //   company: "AP Soft",
  //   image: "/images/works/apsoft.jpg",
  // },
  {
    url: "https://farmudaa.com/",
    company: "Sayay Farmuda",
    image: "/images/works/farmuda.png",
  },
];
