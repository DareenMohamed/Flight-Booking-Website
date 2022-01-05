
import React, { useState } from "react";
//import Offer from "./Offer";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import Pagination from "@material-ui/lab/Pagination";
//import { getOffers, filteredOffers } from "../../actions/offerActions";
import ResultCardReturn from './ResultCardReturn'
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    //console.log(state.DetailsReducer.details.destination)
    return {
        details: state.DetailsReducer.details,
        returningOffers: state.DetailsReducer.details.returningOffers,
        allOffers: state.DetailsReducer.details.allOffers
    };
};




export default connect(mapStateToProps)(Paginations);
function Paginations({ allOffers, returningOffers, details }) {

    console.log("ANAAA ELOFFFFERRR: ", returningOffers)
    console.log("ANAAA ELDETAILSSSSS: ", details)
    console.log("ANAAA ELALLLLOFFFFERRR: ", allOffers)

    // this.state = {
    //     page: 1,
    // };
    const [page, setPage] = useState(1);

    const handleChange = (event, page) => {
        setPage(page)
    }




    // let offers = ""
    // this.setState({filtered:this.props.offers})
    // console.log("this.props.filtered: ", this.props.filtered)
    // console.log("this.props.offers: ", this.props.offers)

    // if (this.props.filtered.length === 0) {
    //   offers = this.props.offers;
    // }
    // else {
    //offers = this.props.filtered;
    //   }

    // console.log("offers", this.props.offers)
    // console.log("filtered", this.props.filtered)
    // console.log("filtered offers", this.props.filteredOffers)
    const currentPage = page;
    const offersPerPage = 1;
    const indexOfLastOffer = offersPerPage * currentPage;
    const indexOfFirstOffer = indexOfLastOffer - offersPerPage;

    // console.log("FUNCCCCTTTT", Math.ceil(allOffers.data.length / offersPerPage))
    // const currentArray = allOffers.slice(indexOfFirstOffer, indexOfLastOffer);
    console.log("OFFFFFF: ", allOffers)
    console.log("Detailss: ", allOffers.details)


    // const currentPage = page;
    // const offersPerPage = 1;
    // const indexOfLastOffer = offersPerPage * currentPage;
    // const indexOfFirstOffer = indexOfLastOffer - offersPerPage;

    // console.log("FUNCCCCTTTT", Math.ceil(details.returningOffers.length / offersPerPage))
    // // const currentArray = allOffers.slice(indexOfFirstOffer, indexOfLastOffer);
    // console.log("OFFFFFF: ", details.returningOffers)
    // console.log("Detailss: ", details.returningOffers.length)
    return (
        <div>
            <GridContainer >
                {/* {currentArray.map((offer) => { */}

                <GridItem xs={12} >

                    <ResultCardReturn />
                    {/* <ResultCard />
                    <ResultCard />
                    <ResultCard /> */}
                    {/* <ResultCard />
                    <ResultCard /> */}
                </GridItem>
                {/* );
                }
                )
                } */}
            </GridContainer>
            <GridContainer alignItems="center" justify="center">
                <GridItem xs style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <Pagination
                        //style={{ background: "#10404c ", color: "wheat" }}
                        style={{ marginLeft: "47%", color: "wheat" }}
                        //   count={Math.ceil(details.returningOffers.length / offersPerPage)}
                        // count={Math.ceil(allOffers.data.length / offersPerPage)}

                        //{Math.ceil(allOffers.data / offersPerPage)}
                        page={currentPage}
                        onChange={handleChange}
                        color="secondary"
                    />
                </GridItem>
            </GridContainer>
        </div>
    );
}


