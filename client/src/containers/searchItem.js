import React  from 'react';

function searchItem(props)  {
  
     return (
      <div className="search-item">
          <h3> Position/Skills: {props.position} </h3>
          <h3> Project Description: {props.projectDescription}</h3>
          <p> Team Name: {props.teamName} </p>   
          <p> Location: {props.location} </p>
      </div>
     ) 
}
export default searchItem
