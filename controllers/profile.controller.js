const ProfileModel = require("../models/profile.model");
const HttpStatus = require("../utils/https_statuses.util");


// get list of all profiles
module.exports.getAllProfiles = async (req, res, next) => {
    try {
      const page = Number.parseInt(req.query.page) || 1;
      const limit = Number.parseInt(req.query.limit) || 10;
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const totalProfiles = await ProfileModel.countDocuments();
      const totalPages = Math.ceil(totalProfiles / limit);
  
      let profiles = await ProfileModel.find().skip(startIndex).limit(limit).sort();
  
      res.status(HttpStatus.OK).json({
        success: true,
        data: {
            page,
            limit,
            totalPages,
            totalProfiles,
            profiles
        }
      });

    } catch (error) {
        next(error);
    }
};


//get profile by id
module.exports.getProfileById = async ( req, res, next) => {
    try {
        let profileId = req.params.profileId;
        let profile = await ProfileModel.findById(profileId);
        if(profile) {
            res.status(HttpStatus.OK).render('profile_template', {
                profile: profile,
            });
        }else {
            res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                message: `Profile with id ${profileId} was not found`
            });
        }
    } catch (error) {
        next(error);
    }
}

// create new profile
module.exports.createProfile = async (req, res, next) => {
    try {
        
        let profileData = req.body;
        let profile = await ProfileModel.create(profileData);

        if(profile) {
            res.status(HttpStatus.CREATED).json({
                success: true,
                data: profile
            });
        }else {
            res.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                message: `Profile not created`
            });
        }

    } catch (error) {
        next(error)
    }
}