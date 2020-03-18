import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../helper/stylesheets/AdminHallSearch.css';
import NavBar from "../../components/user/NavBar";
import {Container, Row, Col, Button} from 'reactstrap';
import image_Flickity1 from '../../helper/images/HomePage/Flickity1.jpg'
import StarRatingComponent from 'react-star-rating-component';
import {adminActions} from "../../action/admin/admin.action";
import theater_Logo from '../../helper/images/Theater.png'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {alertActions} from "../../action/alert/alert.action";
import {hallAdminActions} from "../../action/halladmin/halladmin.action";
import HallNavBar from "./HallNavBar";





class HallAdminDashboard extends Component {

    constructor(props) {
        super(props);

        this.state={
            newMovieHall:{

            },
            passedDataToStateFromProps:false,
        }

        // this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleAddScreen=this.handleAddScreen.bind(this);
        this.handleScreenDelete=this.handleScreenDelete.bind(this);
        this.handleScreenMovieSelected=this.handleScreenMovieSelected.bind(this);
        this.handleScreenInputChange=this.handleScreenInputChange.bind(this);
        this.errorAlert=this.errorAlert.bind(this);

    }

    // handleChange = (selectedMovieHall) => {
    //     if(selectedMovieHall==null){
    //         this.setState({selectedMovieHall:{
    //
    //             },
    //             newMovieHall:{},
    //         });
    //     }
    //     else {
    //         let newMovieHall={...selectedMovieHall}
    //         this.setState({selectedMovieHall,newMovieHall});
    //     }
    //     console.log("Selected");
    //     console.log(selectedMovieHall);
    // }

    componentDidUpdate() {
        console.log("componentDidUpdate")

        // this.props.fetchHalls();
        // this.props.fetchMovies();

        const { passedDataToStateFromProps } = this.state;
        const {movieHall,loadingHall}=this.props;

        console.log(passedDataToStateFromProps)
        console.log(movieHall)
        console.log(loadingHall)


        if(!loadingHall && !passedDataToStateFromProps && Object.keys(movieHall).length!==0){
            console.log("in")
            console.log(movieHall)
            this.setState({passedDataToStateFromProps:true,newMovieHall:movieHall});
        }

    }

    handleScreenMovieSelected = (selectedMovie,screen) => {

        if(selectedMovie==null)
            selectedMovie={};

        let {screens} = this.state.newMovieHall;
        screens.map((item,index)=>{
            if(item.screenNumber==screen.screenNumber){
                screens[index]['movieId']=selectedMovie;
            }
        })

        this.setState({
            newMovieHall:{
                ...this.state.newMovieHall,
                screens:screens
            }
        })


        console.log("Selected Movie");
        console.log("screen:"+screen.screenNumber+":Selected Movie");
        console.log(selectedMovie);

    }

    componentWillMount() {

        this.props.fetchHallData();
        this.props.fetchMovies();

    }

    errorAlert(){
        const {alert} = this.props;
        if(alert && alert.message){
            return(
                <aside className={`alert ${alert.type}`}>{alert.message}</aside>
            )
        }
    }

    handleInputChange(e){
        e.preventDefault();
        const {newMovieHall} = this.state;
        if(e.target.id==="image") {
            newMovieHall[e.target.id]=e.target.files[0];
            console.log(e.target.files[0]);
        }
        else
            newMovieHall[e.target.id]=e.target.value;

        this.setState({newMovieHall});
    }

    handleAddScreen(e) {
        e.preventDefault();
        const {newMovieHall} = this.state;
        let maxScreenNumber=0;
        newMovieHall.screens.map((item)=>{
            if(maxScreenNumber<item.screenNumber)
                maxScreenNumber=item.screenNumber;
        })

        newMovieHall.screens.push({
            screenNumber                : ++maxScreenNumber,
            showTimings                 : [],
            movieId                     : '',
            ticketPrice                 : 0,
            totalSeats                  : 0,
        })

        this.setState({newMovieHall});
    }

    handleScreenInputChange(e,item) {
        e.preventDefault();
        console.log("screen update:"+item.screenNumber+":"+e.target.id);

        const {screens}= this.state.newMovieHall;

        for(let i=0;i<screens.length;i++){
            if(screens[i].screenNumber==item.screenNumber){
                if(e.target.id=="showTimings"){
                    screens[i][e.target.id] = e.target.value.split(',').map(item => item.trim());
                }
                else {
                    screens[i][e.target.id] = e.target.value;
                }
            }
        }

        this.setState({
            newMovieHall:{
                ...this.state.newMovieHall,
                screens:screens
            }
        })

    }

    handleScreenDelete(e,item) {
        e.preventDefault();
        console.log("screen delete:"+item.screenNumber);

        let {screens} = this.state.newMovieHall;
        let deleteIndex=-1;
        screens.map((screen,index)=>{
            if(item.screenNumber==screen.screenNumber)
                deleteIndex=index;
        })

        if(deleteIndex!=-1){
            screens.splice(deleteIndex,1);
        }

        this.setState({
            newMovieHall:{
                ...this.state.newMovieHall,
                screens:screens
            }
        })

    }

    handleSubmit(e){
        e.preventDefault();
        const {newMovieHall}=this.state;
        // this.props.addHall(this.state);
        if(Object.keys(newMovieHall).length===0){
            this.props.errorDisplay({message:"Please select a hall first!"});
        }
        else if(this.isValidScreenTime(newMovieHall.screens)===false){
            this.props.errorDisplay({message:"Screen times should be HH:MM 24 hr only"});
        }
        else if(this.isMovieSelected(newMovieHall.screens)===false){
            this.props.errorDisplay({message:"Select movie for the all screens!"});
        }
        else{
            this.props.errorClear();
            const {ownerEmail,ownerPassword,name,address,city,state,zip,phone,image,screens} = newMovieHall;
            let formData = new FormData();
            formData.append('ownerEmail', ownerEmail);
            formData.append('ownerPassword', ownerPassword ?ownerPassword:"");
            formData.append('name', name?name:"");
            formData.append('address', address?address:"");
            formData.append('city', city?city:"");
            formData.append('state', state?state:"AK");
            formData.append('zip', zip?zip:"");
            formData.append('phone', phone?phone:"");
            formData.append('image', image)
            //do stringify as formdata cannot send arrays or objects.sent only as strings
            //JSON.parse it on the server to use.
            formData.append('screens', JSON.stringify(screens));

            this.props.editHall(formData);
            console.log('update clicked');
            // console.log(newMovieHall._id);
        }
        console.log(this.state);
    }

    render() {

        const { newMovieHall } = this.state;
        const {movies,loadingMovies,movieHall,loadingHall}=this.props;
        const {ownerEmail,ownerPassword,name,address,city,state,zip,phone,screens,image} = this.state.newMovieHall;

        return (

            <div >
                <HallNavBar/>

                <Container>

                    <br/>
                    <Row>
                        <Col md={{size: 3, offset: 2}}>
                            <h3>Hall Admin</h3>
                        </Col>
                    </Row>
                </Container>

                <Container>


                    <Row noGutters={true} style={{margin: 25}}>

                        <Col sm="12" md={{size: 8, offset: 2}}>
                            <form onSubmit={this.handleSubmit}>

                                {this.errorAlert()}

                                <div className="form-group">
                                    <label htmlFor="ownerEmail">Email Address</label>
                                    <input type="email" className="form-control" id="ownerEmail" value={ownerEmail} onChange={this.handleInputChange}  disabled={true}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Password</label>
                                    <input type="password" className="form-control" id={"ownerPassword"} value={ownerPassword} onChange={this.handleInputChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id={"name"} value={name} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label>Screens</label>

                                    <Row>
                                        <Col md={"1"} className={"MovieHallEdit_screens_header_text"}>
                                            Number
                                        </Col>
                                        <Col md={"3"} className={"MovieHallEdit_screens_header_text"}>
                                            Movie
                                        </Col>
                                        <Col md={"3"} className={"MovieHallEdit_screens_header_text"}>
                                            Timings
                                        </Col>
                                        <Col md={"2"} className={"MovieHallEdit_screens_header_text"}>
                                            Ticket Price
                                        </Col>
                                        <Col md={"1"} className={"MovieHallEdit_screens_header_text"}>
                                            Seats
                                        </Col>

                                    </Row>
                                    <br/>
                                    {
                                        screens && screens.map((item)=>{
                                            return(
                                                <div>
                                                    <Row>
                                                        <Col md={"1"} className={"MovieHallEdit_screens_value_text"}>
                                                            {item.screenNumber}
                                                        </Col>
                                                        <Col md={"3"} className={"MovieHallEdit_screens_value_text"}>

                                                            <Select
                                                                name="screenMoviesSelect"
                                                                value={item.movieId._id}
                                                                onChange={(movie)=>this.handleScreenMovieSelected(movie,item)}
                                                                options={movies}
                                                                labelKey={'title'}
                                                                valueKey={'_id'}
                                                                isLoading={loadingMovies}
                                                                clearable={false}
                                                                matchPos={"start"}
                                                            />

                                                        </Col>
                                                        <Col md={"3"} className={"MovieHallEdit_screens_value_text"}>
                                                            <input type="text" className="form-control" id={"showTimings"} value={item.showTimings} onChange={(e)=>this.handleScreenInputChange(e,item)} required />
                                                        </Col>
                                                        <Col md={"2"} className={"MovieHallEdit_screens_value_text"}>
                                                            <input type="text" className="form-control" id={"ticketPrice"} value={item.ticketPrice} onChange={(e)=>this.handleScreenInputChange(e,item)} required />
                                                        </Col>
                                                        <Col md={"2"} className={"MovieHallEdit_screens_value_text"}>
                                                            <input type="text" className="form-control" id={"totalSeats"} value={item.totalSeats} onChange={(e)=>this.handleScreenInputChange(e,item)} required />
                                                        </Col>

                                                        <Col md={"1"} className={"MovieHallEdit_screens_value_text"}>
                                                            <button onClick={(e)=>this.handleScreenDelete(e,item)}>X</button>
                                                        </Col>

                                                    </Row>
                                                    <br/>
                                                </div>

                                            )
                                        })
                                    }
                                    {Object.keys(newMovieHall).length>0 && <button className="btn btn-primary btn-sm" onClick={this.handleAddScreen}>Add Screen</button>}
                                </div>

                                <div className="form-group">
                                    <label>Image</label>
                                    <br/>
                                    <img className="img-fluid  " src={image}/>

                                    <input type="file" className="form-control" id={"image"} onChange={this.handleInputChange}/>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id={"address"} value={address} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" className="form-control" id={"phone"} value={phone} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" id={"city"} value={city} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="zip">Zip Code</label>
                                    <input type="text" className="form-control" id={"zip"} value={zip} onChange={this.handleInputChange} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <select className="form-control" id="state" value={state} onChange={this.handleInputChange}>
                                        <option value="AK">Alaska</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DC">District of Columbia</option>
                                        <option value="DE">Delaware</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="IA">Iowa</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MD">Maryland</option>
                                        <option value="ME">Maine</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MT">Montana</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NY">New York</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VA">Virginia</option>
                                        <option value="VT">Vermont</option>
                                        <option value="WA">Washington</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WY">Wyoming</option>

                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">Update Hall</button>

                            </form>
                        </Col>
                    </Row>


                </Container>



            </div>

        );
    }

    isValidScreenTime = (screens) => {

        let time =[]
        screens.map((item)=>{
            time.push.apply(time, item.showTimings);
        })

        let ok=true;
        time.every((item)=>{
            ok = /^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])$/.test(item);
            return ok;
        })

        return ok;
    }

    isMovieSelected = (screens) => {

        let ok=true;
        screens.every((item)=>{
            ok = item.movieId!=="";
            return ok;
        })

        return ok;
    }


}



function mapStateToProps(state) {

    const {user} = state;
    const {alert} = state;
    const {movies}=state.hallAdmin;
    const {loadingMovies}=state.hallAdmin;
    const {movieHall} = state.hallAdmin;
    const {loadingHall} = state.hallAdmin;

    return {
        user,
        movies,
        alert,
        loadingMovies,
        movieHall,
        loadingHall,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // fetchHalls : () => dispatch(adminActions.getMovieHalls()),
        fetchMovies : () => dispatch(hallAdminActions.getMovies()),
        fetchHallData : () => dispatch(hallAdminActions.getHallData()),
        errorDisplay: (message)=>dispatch(alertActions.error(message)),
        errorClear: ()=>dispatch(alertActions.clear()),
        editHall: (hall)=>dispatch(hallAdminActions.editHall(hall)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HallAdminDashboard);