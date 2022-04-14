const memeModel = require("../models/memeModel");
const MessageBuilder = require("../utils/messageBuilder");

function FetchAssets(dbQuery, callback) {
  memeModel.find(dbQuery).exec((err, records) => {
    if (err || !records) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, records);
    }
  });
}

function QueryCreator(req) {
  var dbQuery = {};

  return dbQuery;
}

exports.getAllMemes = async (req, res) => {
  var count = await memeModel.countDocuments().exec();
  console.log(count);
  console.log("Max items: ", req.query.max_items);
  console.log("Page Number: ", req.query.page_number);

  if (req.query.max_items === undefined || req.query.page_number === undefined) {
    memeModel
    .find()
    .exec()
    .then((memeModel, err) => {
      console.log(memeModel);
      if (memeModel.length != 0) {
        return res
          .status(200)
          .json(
            MessageBuilder(
              memeModel,
              false,
              "Successfully returned the Memes"
            )
          );
      }
      return res
        .status(404)
        .json(MessageBuilder(null, false, "Meme not found"));
    })
    .catch((err) => {
      console.log(err);
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .json(MessageBuilder(null, true, "Meme not found"));
      }
      return res.status(500).json(MessageBuilder(null, true, err));
    });
  }
  else {
    var max_items_on_page = req.query.max_items;
    var pageNumber = req.query.page_number;
    var startIndex = (pageNumber - 1) * max_items_on_page;
  
    memeModel
      .find()
      // .sort({ updatedAt: -1 })
      .limit(max_items_on_page)
      .skip(startIndex)
      .exec()
      .then((memeModel, err) => {
        console.log(memeModel);
        if (memeModel.length != 0) {
          return res
            .status(200)
            .json(
              MessageBuilder(
                memeModel,
                false,
                "Successfully returned the Memes"
              )
            );
        }
        return res
          .status(404)
          .json(MessageBuilder(null, false, "Meme not found"));
      })
      .catch((err) => {
        console.log(err);
        if (err.kind === "ObjectId") {
          return res
            .status(404)
            .json(MessageBuilder(null, true, "Meme not found"));
        }
        return res.status(500).json(MessageBuilder(null, true, err));
      });
  }
};