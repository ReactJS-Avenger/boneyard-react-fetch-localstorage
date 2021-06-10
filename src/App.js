import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state={
      isLoading: true,
      contact:[]
    }
  }


  componentDidMount(){
      const data = localStorage.getItem("timestamp")
      const contactDate = data && new Date(parseInt(data));
      const now = new Date();
      const dataAge = Math.round((now - contactDate)/ (1000 * 60)) // values in min
      const oldData = dataAge >=15;

    if(oldData){
        this.fetchPost()
    }else{
      console.log("fetching from local storage since the data is " + dataAge + " minutes old")
      this.setState({isLoading:false, contact: JSON.parse(localStorage.getItem("contact"))})
    }
  }

  shouldComponentUpdate(nextProp, nextState){
   localStorage.setItem("contact", JSON.stringify(nextState.contact))
   localStorage.setItem("timestamp", Date.now())
   return true;

}


  fetchPost=()=>{
    this.setState({
      isLoading: true,
      contact: []
    })

    fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json())
    .then((data)=> data.map((el)=>(
      {
        userId: `${el.userId}`,
        title: `${el.title}`  
      }
    )))
    .then((contact)=> this.setState({
      isLoading: false,
      contact
    }))
    .catch((error)=> console.log("falied to load the data", error))
  }

  render(){
    
    return(
      <div>
        {
          this.state.isLoading ? "Loading......": (
            !this.state.isLoading && this.state.contact.length > 0 ?
            <div>{this.state.contact.map((el, i)=> <li key={i}>{el.title}</li>)}</div> : null
          )
        }
      </div>
    )
  }
}
export default App;