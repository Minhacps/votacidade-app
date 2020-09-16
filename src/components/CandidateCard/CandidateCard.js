import React from 'react';

const CandidateCard = ({ candidate }) => {
  return (
    <>
      <div className="card" style={{ width: '18rem' }}>
        <img className="card-img-top" src="..." alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">
            {candidate.name} <span>{candidate.answersCompleted}</span>
          </h5>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
};

export default CandidateCard;
