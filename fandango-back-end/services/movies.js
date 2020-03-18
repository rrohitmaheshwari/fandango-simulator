const Movie = require('../database/mongo/model/movie');
const redis = require('../database/redis');
const {storeGetMovies,storeAddMovie,storeEditMovie,storeGetMovie} = require('./analytics');

function moviesAvgRating(movies,callback){

    movies.forEach(function(item){
        movieAvgRating(item);
    })

    callback();

}

function movieAvgRating(movie){

    let ans = 0.0;
    let count = 0;
    movie.reviews.forEach(function(item){
        ans+= item.rating? item.rating : 0;
        count++;
    })
    if(count>0)
        movie.rating=ans/count
    else
        movie.rating=0;
}

module.exports = {
    getAllMovies(req,cb){

        storeGetMovies(req);

        let res={}

        redis.client.get(redis.KEY_CONSTANTS.ALL_MOVIES,function(err,reply){
            if(err || !reply){
                Movie.find()
                    .lean(true)
                    .exec((err,movies)=>{
                        console.log(movies);
                        if(err){
                            res.code = 500;
                            res.value = {message:"There is some issue in server. Please try again later.",error:err};
                            cb(null,res);
                        }
                        else {
                            moviesAvgRating(movies,function(){
                                res.code=200;
                                res.value={movies:movies};
                                cb(null,res);

                                redis.client.set(redis.KEY_CONSTANTS.ALL_MOVIES,JSON.stringify(movies),'EX',redis.EXPIRE_TIME);
                            })

                        }
                    })

            }
            else{
                console.log('redis hit:'+redis.KEY_CONSTANTS.ALL_MOVIES)
                // console.log(reply)
                res.code=200;
                res.value={movies:JSON.parse(reply)};
                cb(null,res);
            }
        })



    },
    create(req, cb) {

        storeAddMovie(req);

        var res = {};

        if(!req.body){
            res.code = 500;
            res.value = { message: "There is some issue in server. Please try again later."};
            cb(null,res);
        }
        else if(req.body.title===''){
            res.code = 400;
            res.value = { message: "Cannot have empty title!"};
            cb(null,res);
        }
        else {

            let filePath="";
            if(req.file) {
                filePath="/images/"+req.file.filename;
                console.log('storing image')
            }

            let newMovie = {
                title: req.body.title,
                genre: req.body.genre,
                characters: req.body.characters,
                duration: req.body.duration,
                ratingType:req.body.ratingType,
                trailerLink:req.body.trailerLink
            }
            if(filePath!=="")
                newMovie.image=filePath;

            console.log(newMovie)

            new Movie(newMovie)
                .save()

                .then(movie => {
                    res.code = 201;
                    res.value = { message: "Movie created Successfully", movie:movie};
                    cb(null,res);

                    console.log('redis delete: '+ redis.KEY_CONSTANTS.ALL_MOVIES);
                    redis.client.del(redis.KEY_CONSTANTS.ALL_MOVIES);

                })
                .catch(error => {
                    res.code = 400;
                    res.value = { message: "There is some issue in server. Please try again later.",error:error }
                    cb(null,res);
                });
        }
    },
    update(req, cb) {

        storeEditMovie(req);

        var res = {};
        console.log("updating movie")

        if(!req.body){
            res.code = 500;
            res.value = { message: "There is some issue in server. Please try again later."};
            cb(null,res);
        }
        else if(req.body.title===''){
            res.code = 400;
            res.value = { message: "Cannot have empty title"};
            cb(null,res);
        }
        else {
            let filePath="";
            if(req.file) {
                filePath="/images/"+req.file.filename;
            }

            let newMovie = {
                title: req.body.title,
                genre: req.body.genre,
                characters: req.body.characters,
                duration: req.body.duration,
                ratingType:req.body.ratingType,
                trailerLink:req.body.trailerLink
            }

            if(filePath!=="")
                newMovie.image=filePath;

            Movie.findOneAndUpdate(
                {_id:req.params.movieId},
                newMovie,
                {new:true}
            )
            .then(movie => {
                res.code = 200;
                res.value = { message: "Movie updated Successfully", movie:movie};
                cb(null,res);

                console.log('redis delete: '+ redis.KEY_CONSTANTS.ALL_MOVIES);
                redis.client.del(redis.KEY_CONSTANTS.ALL_MOVIES);

            })
            .catch(error => {
                res.code = 500;
                res.value = { message: "There is some issue in server. Please try again later.",error:error }
                cb(null,res);
            });
        }
    },
    getMovie(req,cb){

        storeGetMovie(req);
        let res={}

        Movie.findById(req.params.movieId)
            .then(movie=>{
                // console.log(movie);
                res.code=200;
                res.value={movie:movie};
                cb(null,res);
            })
            .catch(error => {
                res.code = 500;
                res.value = { message: "There is some issue in server. Please try again later.",error:error }
                cb(null,res);
            });
    },
};