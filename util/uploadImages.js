const aws = require('aws-sdk');
//setting aws config
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region:'eu-west-1'
});
//getting the buvket name
const bucketName = process.env.BUCKET;
//initiating the S3 instance
const s3 = new aws.S3({
    params: {Bucket: bucketName}
});
//option to limit the file size
const options = {partSize: 1024*1024};
//"key" for the name of the file
//"Body" accepts the file
async function uploadImages(file, req){
    const params = {Bucket: bucketName,
        Key: function(req, file, cb) {
            console.log(file);
            const myFileName = "fwcsewkxglyx/public/" + req.auth.credentials.id.toString;
            console.log(myFileName);
            cb(null, myFileName);
        }, Body:file,
    };
    let fileResp = null;
    await s3.upload(params, options).promise().then((res)=>{
        fileResp = res;
    });
    return fileResp;
}

module.exports = uploadImages;