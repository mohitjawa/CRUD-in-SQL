const dbQuery = require('../db/query')
const codeAndMessage = require('../helper/error-code-message/error-code-message')
const Utility = require('../helper/utilities/common')
var jwt = require('jsonwebtoken');

exports.singup = async (req, res) => {
    try {
        const isUserExist = await dbQuery.checkEmail(req.body.email)
       if (isUserExist.length > 0) {
            return res.status(codeAndMessage.successOk).json({
                code: codeAndMessage.successOk,
                httpCode: codeAndMessage.successOk,
                message: codeAndMessage.emailExistErr,
               
            });
        }
        const hashPassword = await Utility.encryptPassword(req.body.password)
        const result = await dbQuery.createUser(req.body.name, req.body.email, hashPassword, req.body.address, req.body.mobile,req.body.id)
        res.status(200).json({
            message: 'success',
            data:result
        })
    } catch (error) {
        return res.status(codeAndMessage.successOk).json({
            code: codeAndMessage.badRequestCode,
            httpCode: codeAndMessage.badRequestHttpCode,
            message: codeAndMessage.badRequestMessage,
        });
    }
}

exports.login = async (req, res) => {
    try {
        const UserExist = await dbQuery.checkEmail(req.body.email)
        if (UserExist.length == 0) {
            return res.status(codeAndMessage.successOk).json({
                code: codeAndMessage.successOk,
                httpCode: codeAndMessage.successOk,
                message: codeAndMessage.emailNotFound,
            });
        }

        const hashPassword = await Utility.validatePassword(req.body.password, UserExist[0].password)
        if (!hashPassword) {
            return res.status(codeAndMessage.successOk).json({
                code: codeAndMessage.successOk,
                httpCode: codeAndMessage.successOk,
                message: codeAndMessage.incorrectPass,
            });
        }

        const checkPassword = await dbQuery.checkEmailPassword(req.body.email, UserExist[0].password)
       const token = jwt.sign({
            data: checkPassword[0].id
        }, process.env.JWTPASS, {
            expiresIn: '5h'
        });

        return res.status(codeAndMessage.successOk).json({
            code: codeAndMessage.successOk,
            httpCode: codeAndMessage.successOk,
            message: codeAndMessage.successMessage,
            data: checkPassword[0],
            token: token
        });

    } catch (error) {
        return res.status(codeAndMessage.successOk).json({
            code: codeAndMessage.badRequestCode,
            httpCode: codeAndMessage.badRequestHttpCode,
            message: codeAndMessage.badRequestMessage,
        });
    }

}

exports.RemoveUser = async (req, res) => {
    try {
        await dbQuery.DeleteUser(req.query.userId)
        return res.status(codeAndMessage.successOk).json({
            code: codeAndMessage.successOk,
            httpCode: codeAndMessage.successOk,
            message: codeAndMessage.successOk,
        });
    } catch (error) {
        console.log(error);
        return res.status(codeAndMessage.successOk).json({
            code: codeAndMessage.badRequestCode,
            httpCode: codeAndMessage.badRequestHttpCode,
            message: codeAndMessage.badRequestMessage,
        });
    }
}
exports.ReviseUser = async (req, res) => {
    try {
        await dbQuery.UpdateUser(req.userId, req.body.name, req.body.email, req.body.address, req.body.mobile)
        return res.status(codeAndMessage.successOk).json({
            code: codeAndMessage.successOk,
            httpCode: codeAndMessage.successOk,
            message: codeAndMessage.successOk,
        });
    } catch (error) {
        console.log(error);
        return res.status(codeAndMessage.successOk).json({
            code: codeAndMessage.badRequestCode,
            httpCode: codeAndMessage.badRequestHttpCode,
            message: codeAndMessage.badRequestMessage,
        
        });
    }
}
exports.GetUserImage = async (req, res) => {
    try {
        const Data = await dbQuery.GetImage(req.query.userId)
        return res.status(codeAndMessage.successOk).json({
            code: codeAndMessage.successOk,
            httpCode: codeAndMessage.successOk,
            message: codeAndMessage.successOk,
            data:Data,
        });
    } catch (error) {
       
        return res.status(codeAndMessage.successOk).json({
            code: codeAndMessage.badRequestCode,
            httpCode: codeAndMessage.badRequestHttpCode,
            message: codeAndMessage.badRequestMessage,
        });
    }
}
