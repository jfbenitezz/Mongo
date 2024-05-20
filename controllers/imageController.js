const { v4: uuidv4 } = require('uuid');
const path = require('node:path');
const sharp = require('sharp');

const Image = require('../models/imageModel');

const {s3} = require('../helpers/bucket');
const {PutObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");

const createImages = async (req, res) => {
  try {
    
    //Create unique id
    const uniqueId = uuidv4();
    const extension = path.extname(req.file.originalname);
    const uniqueKey = `${uniqueId}${extension}`;

    //Resize image
    const Buffer = await sharp(req.file.buffer)
    .resize({ height: 800, width: 600, fit: "contain" }).toBuffer()

    //Create command for s3 bucket
    const Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: uniqueKey,
      Body: Buffer,
      ContentType: req.file.mimetype
    }
    //Send command
    const command = new PutObjectCommand(Params);
    await s3.send(command);

     //Saver image reference to database
    const newImage = new Image({
      url: uniqueKey,
      altText: req.body.altText
    });

    await newImage.save();
    console.log('Image created:', newImage);
    res.status(201).json(newImage);
    
  } catch (error) {
    console.error(`Error saving new image: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getImages = async (req, res) => {
    try {
      let { ids } = req.query;
      ids = ids.split(",")
      console.log(ids)

      const images = await Image.find({ _id: { $in: ids } });
  
      if (images.length === 0) {
        return res.status(404).json({ error: 'Images not found' });
      }
  
      const region = process.env.BUCKET_REGION
      const bucketName = process.env.BUCKET_NAME
      const imagesWithUrls = images.map(image => {
        const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${image.url}`;
        return { ...image.toObject(), url: publicUrl };
      });
  
      res.status(200).json(imagesWithUrls);
    } catch (error) {
      console.error(`Error fetching images: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  };

  const deleteImages = async (req, res) => {
    try {
      let { ids } = req.query;
      ids = ids.split(",");
      if (ids.length === 0) {
        return res.status(400).json({ error: 'No image ids provided' });
      }
  

    // Fetch image URLs owned by the authenticated user
    const images = await Image.find({ _id: { $in: ids }});

    if (images.length === 0) {
      return res.status(404).json({ error: 'Images not found' });
    }

    const imageUrls = images.map(image => image.url);

    // Delete images from S3
    for (const imageUrl of imageUrls) {
      await deleteImageFromS3(imageUrl);
    }

    // Delete images from the database
    try {
        await Image.deleteMany({ _id: { $in: ids }});
    } catch (error) {
        console.error(`Error deleting images from  database: ${error.message}`);
        res.status(500).json({ error: error.message });
        return;
    }

      res.status(200).json({ message: 'Images deleted successfully' });
    } catch (error) {
      console.error(`Error deleting images: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteImageFromS3 = async (key) => {
    const deleteParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: key
    };
  
    try {
      await s3.send(new DeleteObjectCommand(deleteParams))
      console.log(`Successfully deleted ${key} from S3`);
    } catch (err) {
      console.error(`Error deleting ${key} from S3: ${err}`);
      throw err;
    }
  };
  
module.exports = { createImages, getImages, deleteImages };