const AWS = require("aws-sdk");
const express = require("express");
const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'ap-south-1',
});

router.post("/getPresignedUrl", async (req, res) => {
  const { fileName, fileType } = req.body;

  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `uploads/${fileName}`, 
    Expires: 60, 
    ContentType: fileType,
  };

  try {
    const presignedUrl = await s3.getSignedUrlPromise("putObject", s3Params);
    res.json({ url: presignedUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating presigned URL");
  }
});

module.exports = router;
