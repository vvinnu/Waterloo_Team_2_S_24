import React, { useState, useEffect } from 'react';
import Script from './Script/script.js';

function Team() {
  const [teamlist, setTeamList] = useState([]);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = () => {
    fetch('http://localhost:3001/getteam')
      .then(response => response.json())
      .then(data => {
        setTeamList(data);
      })
      .catch(error => {
        console.error('Error fetching team data:', error);
      });
  };

  return (
    <section id="team" className="team section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Team</h2>
          <p>Check our Team</p>
        </div>
        <div className="row">
          {teamlist.map((member, index) => (
            <div key={index} className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div className="member" data-aos="fade-up" data-aos-delay="100">
                <div className="member-img">
                  <img src={`http://localhost:3001/${member.t_image}`} className="img-fluid" alt={member.t_name} />
                </div>
                <div className="member-info">
                  <h4>{member.t_name}</h4>
                  <span>{member.t_work}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Script />
    </section>
  );
}

export default Team;
