import React from "react";
import "./createcard.css";

const creatorsData = [
  {
    designation: "Project Manager",
    name: "SANTHOSH KUMAR KARRA",
    image: "./images/santhu.jpg",

    description:
      "As a project lead for this initiative, my role is multifaceted and crucial for the success of the project. Here are some key responsibilities - Visionary Leadership, Project Planning and Management , Team Coordination , Quality Assurance , Communication and Collaboration , Evaluation and Feedback.    Overall, as the project lead, I played a pivotal role in driving the project forward, overcoming challenges, and delivering a successful digital platform that enhances student engagement and facilitates resource sharing within the college community.",
    linkedin: "https://www.linkedin.com/in/santhosh-kumar-k-a8a8b823a/",
  },
  {
    designation: "FrontEnd Developer",
    name: "KOTLA ESWAR",
    image: "./images/epraha.jpg",

    description:
      "As the frontend developer for this project, my role is crucial in bringing the digital platform to life with an intuitive and visually appealing user interface. Here are the key responsibilities - User Interface Design , Frontend Development , Performance Optimization , Integration with Backend Services , Testing and Debugging , Documentation and Maintenance.  Overall, as the frontend developer, I played a critical role in creating an engaging and user-friendly digital platform that fulfills the requirements of the project, enhances student engagement, and facilitates resource sharing within the college community.",
    linkedin: "https://www.linkedin.com/in/kotla-eswar/",
  },
  {
    designation: "BackEnd Developer",
    name: "GHANTA SAHITHI",
    image: "./images/sahi.jpg",

    description:
      "As the backend developer for this project, my role is pivotal in building the core functionality and infrastructure of the digital platform. Here are the key responsibilities - Server-Side Development , API Development , Integration with External Services , Security Implementation , Error Handling and Logging , Testing and Quality Assurance.  Overall, as the backend developer, I played a critical role in building the robust and scalable infrastructure of the digital platform, enabling seamless communication, resource sharing, and community engagement within the college ecosystem.",
    linkedin: "https://www.linkedin.com/in/sahi123/",
  },
  {
    designation: "BackEnd Developer",
    name: "PRASANNA KANUMURI",
    image: "./images/prasu.jpg",

    description:
      "As the backend developer for this project, my role is pivotal in building the core functionality and infrastructure of the digital platform. Here are the key responsibilities - Server-Side Development , API Development , Integration with External Services , Security Implementation , Error Handling and Logging and Testing and Quality Assurance.  Overall, as the backend developer, I played a critical role in building the robust and scalable infrastructure of the digital platform, enabling seamless communication, resource sharing, and community engagement within the college ecosystem.",
    linkedin: "https://www.linkedin.com/in/prasanna-kanumuri-7a1372236/",
  },

  {
    designation: "DataBase Developer",
    name: "KANTAMANENI SATYA LAHARI",
    image: "./images/lorry.jpg",

    description:
      "As the database developer for this project, my role is focused on designing, implementing, and maintaining the database system that will store and manage the data for the digital platform. Here are the key responsibilities - Database Design , Data Modeling , Database Implementation , Data Migration and Transformation , Backup and Recovery , Database Administration and Documentation.  Overall, as the database developer, I played a critical role in ensuring the reliability, performance, and security of the database system that forms the foundation of the digital platform. My expertise in database design, implementation, and administration is essential for the success of the project.",
    linkedin: "https://www.linkedin.com/in/lahari149/",
  },
];

function CreatorCard({ creator }) {
  return (
    <div className="creator-card-body">
    <div className="card">
      <div className="cre-pic">
        <img src={creator.image} alt={creator.name} />
      </div>
      <div className="cre-cont">
        <center>
          <center>
            <p className="par">
              <i>{creator.name}</i>
            </p>
          </center>
          <div className="card-title">
            <i>{creator.designation}</i>
          </div>
          <div className="detail">
            <p>
              <i>{creator.description}</i>
            </p>
            <br />
            <br />
            <a href={creator.linkedin} target="_blank" rel="noopener" className="linke">
  Click here for Linkedin Profile &rarr;
</a>

          </div>
        </center>
      </div>
    </div>
    </div>
  );
}

function App() {
  return (
    <div className="diffSection" id="team_section">
      <div className="section-cont">
        <center>
          <p className="section-title">We're the Creators</p>
        </center>
      </div>
      <div className="totalcard">
        {creatorsData.map((creator, index) => (
          <CreatorCard key={index} creator={creator} />
        ))}
      </div>
    </div>
  );
}

export default App;
