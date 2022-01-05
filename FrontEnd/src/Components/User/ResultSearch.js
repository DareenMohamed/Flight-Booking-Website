
// import user from '../images/user.svg'
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import { NavDropdown } from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap';
// import { render } from '@testing-library/react';
// import { makeStyles } from '@material-ui/core/styles';
// import BookData from "../Data.json";
// import SearchTest from "../components/Searchbar"
// import SearchButton from "../components/SearchButton"
// import { connect } from "react-redux";

// import '../components/Result.css'
// // import React from 'react';
// import { Button } from './Button';
// import DatePicker from '../components/DatePicker.js'
// import BasicDateRangePicker from '../components/BasicDateRangePicker.js'
// import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
// import IconButton from "@material-ui/core/IconButton";
// import Counter from "../components/Counter";
// import Counter2 from "../components/Counter2";
// import React, { useState, setState } from "react";
// import Searchbar from "../components/Searchbar"
// import Where from "../components/Where"
// const useStyles = makeStyles((theme) => ({

//   root: {

//     margin: "8px",
//     marginLeft: 0,
//   },
//   selectors: {
//     display: "flex",
//     flexDirection: "row",
//     height: "30%",
//   },
//   searchDiv: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingRight: 16,
//   },
//   input1: {
//     display: "flex",
//     flexDirection: "row",
//     flex: 1,
//   },
//   calender: {
//     display: "flex",
//     flexDirection: "row",
//     flex: 1,

//   },
//   bottomSheet: {
//     display: "flex",
//     flexDirection: "column",
//     position: "absolute",
//     left: "222px",
//     top: "573px",
//   },
//   userbtn: {
//     // width: "7px",
//   },


// }));
// var option = ""
// var sum = 0;
// var t = "One way";

// const mapStateToProps = (state) => {
//   //console.log(state.DetailsReducer.details.destination)
//   return {
//     destination_name: state.DetailsReducer.details.destination_name,
//     destination: state.DetailsReducer.details.destination,
//     origin_name: state.DetailsReducer.details.origin_name,

//   };
// };
// const mapDispatchToState = (dispatch) => {
//   return {
//     setDestination: (destination) => {
//       dispatch({ type: 'setDestination', payload: destination });
//     },
//     setDestinationName: (destination_name) => {
//       dispatch({ type: 'setDestinationName', payload: destination_name });
//     },
//     setOriginName: (origin_name) => {
//       dispatch({ type: 'setOriginName', payload: origin_name });
//     },

//   };
// };
// export default connect(mapStateToProps, mapDispatchToState)(Result);

// function Result({ tripType, setTripType, destination_name, origin_name }) {
//   const classes = useStyles();

//   // let dropDownValue= "Round Trip";
//   // let classValue='Economy';
//   const [dropDownValue, setdropDownValue] = useState("Round Trip");
//   const [classValue, setclassValue] = useState('Economy');



//   const renderCalender = () => {
//     console.log("hiiiiii", option)
//     if (option.value === t) {
//       console.log("ana gwaaaa")
//       return <DatePicker />

//     }
//     else {

//       return <BasicDateRangePicker />
//     }
//   };
//   const changeValue = (text) => {
//     setdropDownValue(text)
//     // setTripType(dr)
//   }
//   const changeValueClass = (text) => {
//     setclassValue(text)
//   }



//   const handleOptions = (value) => {
//     option = { value }
//     console.log(option, "hhhh")
//   }
//   const someFunc = (value) => {
//     handleOptions(value);
//     changeValue(value);
//     renderCalender();
//   }

//   const Sum = () => {
//     return newcount1 + newcount2 + newcount3 + newcount4
//   }

//   // render() { 
//   const [newcount1, setnewCount1] = useState(0);
//   const [newcount2, setnewCount2] = useState(0);
//   const [newcount3, setnewCount3] = useState(0);
//   const [newcount4, setnewCount4] = useState(0);
//   const [Total, setTotal] = useState(newcount1 + newcount2 + newcount3 + newcount4);
//   return (

//     <div className="homecontent1">

//       <div className={classes.root}>

//         <div className={classes.selectors}>
//           <Dropdown >
//             <div className='selectedItem'>
//               <Dropdown.Toggle calssName="selected" variant="out-secontary" color='#818181'>
//                 {dropDownValue}

//               </Dropdown.Toggle></div>
//             <Dropdown.Menu>
//               <Dropdown.Item as='button'><div className="oneway" onClick={(e) => someFunc(e.target.textContent)}>One way</div>

//               </Dropdown.Item>
//               <Dropdown.Item as='button'><div className='round' onClick={(e) => someFunc(e.target.textContent)}>Round Trip</div>
//               </Dropdown.Item>
//               <Dropdown.Item as='button' ><div className='multi' onClick={(e) => someFunc(e.target.textContent)}>Multi-city</div>
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>





//           <Dropdown className={classes.userbtn} autoClose="outside">
//             <Dropdown.Toggle calssName="selected1" variant="outlined-secondary" >
//               <img src={user} alt="" />
//               {/* {Passerngers(newcount)} */}
//               {Sum()}
//             </Dropdown.Toggle>
//             <Dropdown.Menu className="DropDownResults">
//               <Dropdown.Item as='text'><div className="adult"> Adult</div>
//                 <Counter count={newcount1} setCount={setnewCount1} />

//               </Dropdown.Item>
//               {/* </Dropdown.Item>
//             <Dropdown.Item as='text'><div className="adult"> Children </div>

//                  <Button  className="addbtn"  sign="-"  count={this.state.count} updateCount={this.handleCount.bind(this)} />
//               {this.state.count}
//               <Button sign="+" count={this.state.count} updateCount={this.handleCount.bind(this)} />  */}

//               {/* </Dropdown.Item> */}

//               <Dropdown.Item as='text'><div className="adult"> Children </div>
//                 {/* <img src={add} onClick ={ }/> */}
//                 <Counter2 count={newcount2} setCount={setnewCount2} />
//               </Dropdown.Item>
//               <Dropdown.Item as='text'><div className="adult"> infants </div>
//                 {/* <img src={add} onClick ={ }/> */}
//                 <Counter3 count={newcount3} setCount={setnewCount3} />
//                 {/* <Button sign="+" count={this.state.count} updateCount={this.handleCount.bind(this)} />  */}


//               </Dropdown.Item>
//               <Dropdown.Item as='text'><div className="adult"> infants </div>
//                 {/* <img src={add} onClick ={ }/> */}
//                 <Counter4 count={newcount4} setCount={setnewCount4} />
//                 {/* <Button sign="+" count={this.state.count} updateCount={this.handleCount.bind(this)} />  */}


//               </Dropdown.Item>

//             </Dropdown.Menu>
//           </Dropdown>



//           <div className="class">
//             <Dropdown className="dropdownClass">
//               <Dropdown.Toggle calssName="selected" variant="outlined-secondary">

//                 {classValue}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item as='button'><div className="buss" onClick={(e) => changeValueClass(e.target.textContent)}>Economy</div>

//                 </Dropdown.Item>
//                 <Dropdown.Item as='button'><div className="eco" onClick={(e) => changeValueClass(e.target.textContent)}>Business</div>
//                 </Dropdown.Item>
//                 <Dropdown.Item as='button'><div className="fclass" onClick={(e) => changeValueClass(e.target.textContent)}>First Class</div>
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         </div>

//         <div className={classes.searchDiv}>


//           <div className={classes.input1}>
//             <SearchTest placeholder="From" data={BookData} />

//             <Where placeholder="To" data={BookData} />
//           </div>

//           <div className={classes.calender}>
//             {renderCalender()}
//           </div>
//         </div>
//       </div>



//     </div>






//     //2209
//   )
// }
