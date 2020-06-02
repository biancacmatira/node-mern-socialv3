import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const DUMMY_USERS = [
    {
      id: Math.random(),
      username: "Maki",
      image:
        "https://i.imgur.com/v1NWhLG.jpg",
      places: 3,
    },
    {
      id: Math.random(),
      username: "Pepero",
      image:
        "https://lh3.googleusercontent.com/ko_FrkL3fY1bScY537UuzCu9qFjxKL3k-30p64DE_Z5XE2NKPjFjNkMpo2dk_eAU5e09OmB1iciOYgK-rJyRXaoi3bXa5FmN=w1200-h630-rj-pp-e365",
      places: 0,
    },
    {
      id: Math.random(),
      username: "Pocky",
      image:
        "https://upload.wikimedia.org/wikipedia/en/e/e5/Pocky_logo.png",
      places: 3,
    },
    {
      id: Math.random(),
      username: "Tohato",
      image:
        "https://images.japancentre.com/images/pics/11621/original/IMG_0042-3707.jpg?1548762823",
      places: 3,
    },
    {
      id: Math.random(),
      username: "Chiroru",
      image:
        "https://lh3.googleusercontent.com/proxy/hrkZWDqk5iQkKFIIotZ5lCoHunAS8hK6IpMq0b87tMdFT_4Kidq8s0aKVSl43P5_RdWdLrjD1ZfL6m4qEgmCK-cPQr1QAvSELdF4Tu5QhJlvASuEjrAQVMsvqvxnJsbk8njLZZw1AOJZHq_qW8qp3_5987vadPlYDkQt2P6t4_I-Sg",
      places: 3,
    },
    {
      id: Math.random(),
      username: "ChocoBaby",
      image:
        "https://www.quirkspace.com/boo/images/Choco_Baby_Mascot.jpg",
      places: 3,
    },
    {
      id: Math.random(),
      username: "Milky",
      image:
        "https://i.pinimg.com/originals/08/a4/ac/08a4ace9afa5624d69b330d752172b67.png",
      places: 3,
    },
    {
      id: Math.random(),
      username: "Konpeito",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Kompeito_konpeito.JPG/1200px-Kompeito_konpeito.JPG",
      places: 3,
    },
    {
      id: Math.random(),
      username: "CoffeeBeat",
      image: "https://i.pinimg.com/236x/3d/04/21/3d04216926e29207200576ca95907d54.jpg",
      places: 1
    }
  ];

  return (
    <div className="container">
      <UsersList items={DUMMY_USERS} />
    </div>
  );
};

export default Users;
