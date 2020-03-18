import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../helper/stylesheets/AddMovie.css';

import {
    Container, Row, Col
} from 'reactstrap';
import {adminActions} from "../../action/admin/admin.action";
import AdminNavBar from "./AdminNavBar";
import {withRouter} from "react-router-dom";


class EditMovie extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.errorAlert=this.errorAlert.bind(this);

        this.state={
            _id:'',
            title:'',
            genre:'',
            characters:'',
            duration:0,
            ratingType:'',
            trailerLink:'',
            image:'',
            first:false,
        }
    }

    componentWillMount() {
        this.props.getMovie(this.props.match.params.movieId);
    }


    handleInputChange(e){
        e.preventDefault();
        if(e.target.id==="image") {
            this.setState({[e.target.id]: e.target.files[0]});
            console.log(e.target.files[0]);
            // console.log(e.target.files[0].name);
        }
        else
            this.setState({[e.target.id]:e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const {_id,title,genre,characters,duration,ratingType,trailerLink,image} = this.state;

        let formData = new FormData();
        formData.append('title', title?title:"");
        formData.append('genre', genre ?genre:"");
        formData.append('characters', characters?characters:"");
        formData.append('duration', duration?duration:"");
        formData.append('ratingType', ratingType?ratingType:"");
        formData.append('trailerLink', trailerLink?trailerLink:"");
        formData.append('image', image)

        this.props.editMovie(formData,_id);
        console.log(this.state);
    }

    errorAlert(){
        const {alert} = this.props;
        if(alert && alert.message){
            return(
                <aside className={`alert ${alert.type}`}>{alert.message}</aside>
            )
        }
    }

    componentDidUpdate() {


        if(!this.state.first && Object.keys(this.props.movie).length>0 ){
            this.setState({
                _id:this.props.movie._id,
                title:this.props.movie.title,
                genre:this.props.movie.genre,
                characters:this.props.movie.characters,
                duration:this.props.movie.duration,
                ratingType:this.props.movie.ratingType,
                trailerLink:this.props.movie.trailerLink,
                image:this.props.movie.image,
                first:true});

        }

    }


    render() {


        const {title,genre,characters,duration,ratingType,trailerLink,image} = this.state;

        return (



            <div className={''}>
                <AdminNavBar/>

                <Container fluid={true} style={{padding: 0}}>
                    <center><h3>Edit Movie</h3></center>


                    <Row noGutters={true} style={{margin: 25}}>

                        <Col sm="12" md={{size: 6, offset: 3}}>

                            <form onSubmit={this.handleSubmit}>

                                {this.errorAlert()}

                                <div className="form-group">
                                    <label htmlFor="title">Movie Title</label>
                                    <input type="text" className="form-control" id="title" value={title} onChange={this.handleInputChange} required />
                                </div>

                                <div className="form-group">
                                    <label>Movie Image</label>
                                    <br/>
                                    <img className="img-fluid  " src={image}/>

                                    <input type="file" className="form-control" id={"image"} onChange={this.handleInputChange}/>

                                </div>


                                <div className="form-group">
                                    <label htmlFor="genre">Genre</label>
                                    <input type="text" className="form-control" id={"genre"}  value={genre} onChange={this.handleInputChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="characters">Characters</label>
                                    <input type="text" className="form-control" id={"characters"} value={characters} onChange={this.handleInputChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="duration">Duration</label>
                                    <input type="number" className="form-control" id={"duration"} value={duration} onChange={this.handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ratingType">Rating Type</label>
                                    <select className="form-control" id="ratingType" value={ratingType} onChange={this.handleInputChange}>
                                        <option value="G">G</option>
                                        <option value="PG">PG</option>
                                        <option value="PG-13">PG-13</option>
                                        <option value="R">R</option>
                                        <option value="NC-17">NC-17</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="trailerLink">Youtube Trailer Link</label>
                                    <input type="text" className="form-control" id={"trailerLink"} value={trailerLink} onChange={this.handleInputChange}/>
                                </div>

                                <button className="btn btn-primary btn-block">Update Movie</button>
                            </form>
                        </Col>
                    </Row>

                </Container>
            </div>

        );
    }
}



function mapStateToProps(state) {

    const {user} = state;
    const {movie} = state.admin;
    const {alert} = state;
    return {
        user,
        alert,
        movie,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getMovie : (id) => dispatch(adminActions.getMovie(id)),
        editMovie : (movie,id) => dispatch(adminActions.editMovie(movie,id))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditMovie));