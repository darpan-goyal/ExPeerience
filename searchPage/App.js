import React from 'react';
import './App.css';
import searchData from './searchData';
import SearchItem from './components/SearchItem';

class App extends React.Component {
   constructor() {
      super()
      this.state = {
          search: '',
          input: '', 
          lists: searchData,
          haveSearchKeywords: false
      }

   }
   //handle input search field
   handleInput = (event) => {
      this.setState({input: event.target.value})  
   }

   //handle search click, search is based on "position name", can be changed
   handleClick = (event) => {
      if (this.state.input === null) {this.setState({haveSearchKeywords: false })}
      else {this.setState({haveSearchKeywords: true})}
      this.setState({search: this.state.input})
   }
   

   render() {
      let filteredResults = this.state.lists.filter(a => 
         a.position.toLowerCase().includes(this.state.search.toLowerCase()))
         
      let results =filteredResults.map(a => <SearchItem key = {a.id} position={a.position} teamName={a.teamName} projectDescription = {a.projectDescription} location = {a.location} isLoading = {this.state.haveSearchKeywords} /> )  

      return  (  
         <div> 
            <h1 className="logo"> Expeerience</h1>
            <div className = "search-field">
            <input  type ="text"
                    onChange = {this.handleInput} />
            </div>  
            <button onClick = {this.handleClick}> 
                    earch for opportunities!
            </button> 
            <div className="search-list">
                   {this.state.haveSearchKeywords?
                    results : null}  
            </div>
          </div>   
      )
   }
}  
export default App;
