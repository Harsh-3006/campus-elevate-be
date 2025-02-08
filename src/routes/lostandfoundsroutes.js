const express = require('express');
const LostItem = require('../../module/LostItem.js');
const FoundItem = require('../../module/FoundItem.js');
// const protectedRoutes=require('../../middleware/protectedRoutes.js');
const {protectRoute} = require('../../middleware/protectedRoutes.js');
const upload=require('../../middleware/multerConfig.js')


const router = express.Router();

// // Get all found items
// router.get('/founded',protectRoute, async (req, res) => {
//   try {
//     const foundItems = await FoundItem.find();
//     if(!foundItems||foundItems.length===0){
//       return res.status(202).json({message:"No items to display"})
//     }
//     res.status(200).json({foundItems});
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error:"Internal server error" });
//   }
// });

// // Create a new found item
// router.post('/newfound',protectRoute,async (req, res) => {
//   try {
//     const {title,description,image,date,place,ownerName}=req.body
//     console.log(title,description,image,date,place,ownerName)
//     if(!title||!description||!ownerName){
//       return res.status(400).json({error:"tile description ownername required"})
//     }
//     const foundItem = await FoundItem.create({title,description,image,date,place,ownerName});
//     await foundItem.save()
//     res.status(200).json({message:"Data saved"})
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({error:"Login first"})
//   }
// });





// // Get all lost items
// router.get('/losted',protectRoute ,async (req, res) => {
//   try {
//     const lostItems = await LostItem.find();
//     if(!lostItems||lostItems.length===0){
//       return res.status(202).json({message:"No items to display"})
//     }
//     res.status(200).json({lostItems});
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error:"Internal server error" });
//   }
// });

// // Create a new lost item
// router.post('/newlost', protectRoute, async (req, res) => {
//   const {title,description,image,date,place,ownerName}=req.body
//   console.log(title,description,image,date,place,ownerName)
//   if(!title||!description||!ownerName){
//     return res.status(400).json({error:"tile description ownername id reuired"})
//   }
//   const lostItem = await LostItem.create({title,description,image,date,place,ownerName});
//   await lostItem.save()
//   res.status(200).json({message:"Data saved"})
// });



// module.exports = router;







router.get('/founded', protectRoute, async (req, res) => {
  try {
    const foundItems = await FoundItem.find();
    if (!foundItems || foundItems.length === 0) {
      return res.status(202).json({ message: 'No items to display' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const itemsWithImages = foundItems.map(item => ({
      ...item._doc,
      image: item.image ? `${baseUrl}/${item.image}` : null
    }));

    res.status(200).json({ foundItems: itemsWithImages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/newfound', protectRoute, upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, place, founderName } = req.body;
    console.log("bodt",req.body)

    if (!title || !description || !founderName) {
      return res.status(400).json({ error: 'Title, description, and ownerName are required' });
    }

    const foundItem = await FoundItem.create({
      title,
      description,
      image: req.file ? req.file.path : null,
      date,
      place,
      founderName
    });

    res.status(200).json({ message: 'Data saved', foundItem });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error saving found item' });
  }
});

router.get('/losted', protectRoute, async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    // console.log('lost Item',lostItems)
    if (!lostItems || lostItems.length === 0) {
      return res.status(202).json({ message: 'No items to display' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const itemsWithImages = lostItems.map(item => ({
      ...item._doc,
      image: item.image ? `${baseUrl}/${item.image}` : null
    }));

    res.status(200).json({ lostItems: itemsWithImages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/newlost', protectRoute, upload.single('image'), async (req, res) => {
  try {
    const { title, description, date, place, ownerName } = req.body;
    console.log("req.body",req.body)

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    if (!title || !description || !ownerName) {
      return res.status(400).json({ error: 'Title, description, and ownerName are required' });
    }

    const lostItem = await LostItem.create({
      title,
      description,
      image: req.file ? req.file.path : null,
      date,
      place,
      ownerName
    });
    console.log('req.file',req.file)
    console.log("lostItem",lostItem)
    res.status(200).json({ message: 'Data saved', lostItem });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error saving lost item' });
  }
});

module.exports = router;