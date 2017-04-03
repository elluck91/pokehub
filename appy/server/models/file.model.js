'use strict';

module.exports = function (mongoose) {
  var modelName = "file";
  var Types = mongoose.Schema.Types;
  var Schema = new mongoose.Schema({
    name: {
      type: Types.String,
      required: true,
      unique: true
    },
    type: {
      type: Types.String,
      required: true
    },
    path: {
      type: Types.String,
      required: true
    }
  });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        users: {
          type: "MANY_MANY",
          model: "user"
        }
      }
    }
  };
  
  return Schema;
};