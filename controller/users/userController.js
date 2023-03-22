const {validationResult} = require('express-validator');
const UserModel = require('../../model/user.js');
const {hashedPassword,createToken,comparePassword} = require("../../services/authServices");




//@route POST/api(localhost:5000)/register
//access public
//description create user and return a token

module.exports.register= async (req,res)=>{
    const errors = validationResult(req);

    if(errors.isEmpty()){
        const {name,email,password} = req.body;
       try{
        const emailExists = await UserModel.findOne({email});
        if(!emailExists){
            const hash = await hashedPassword(password);
            const user = await UserModel.create({
                name,
                email,
                password:hash

            });
            const token = createToken({id:user._id, name:user.name});
            return res.status(201).json({msg:'Your account has been created successfully',token});

        }
        else{
            return res.status(401).json({errors:[{msg:`${email} is already taken`}]})
        }
       }
       catch(error){
        console.log(error.message);
        return res.status(500).json("Server Internal error");
       }
    }
    else{
        res.status(400).json({errors:errors.array()})
    }
}

//@route POST/api(localhost:5000)/login
//access public
//description user login

module.exports.login = async (req,res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {email,password} = req.body;
        try{
            const user = await UserModel.findOne({email});
            if(user){
                if(await comparePassword(password,user.password)){
                    const token = await createToken({id:user._id,name:user.name});
                    if(user.admin){
                        return res.status(201).json({token,admin:true})
                    }
                    else{
                        return res.status(201).json({token,admin:false})
                    }
                }
                else{
                    return res.status(401).json({errors:[{msg:'Password is wrong'}]});
                }
            }
            else{
                return res.status(401).json({errors:[{msg:`${email} is not found`}]})
            }


        }
        catch(error){
            console.log(error.message);
            return res.status(500).json("Server Internal error")
        }
    }
    else{
        return res.status(401).json({errors:errors.array()});
    }
}