import React  from 'react';

function SearchItem(props)  {
  
     return (
      <div className="search-item">
          <h2> Position: {props.position} </h2>
          <h3> Project Description: {props.projectDescription}</h3>
          <p> Team Name: {props.teamName} </p>   
          <p> Location: {props.location} </p>
      </div>
     ) 
}
export default SearchItem
