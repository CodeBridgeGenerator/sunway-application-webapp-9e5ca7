
    module.exports = function (app) {
        const modelName = 'courses';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            campus: { type: Schema.Types.ObjectId, ref: "campus" },
location: { type: Schema.Types.ObjectId, ref: "location" },
programmeLevel: { type: Schema.Types.ObjectId, ref: "programmelevel" },
programme: { type:  String , maxLength: 150, index: true, trim: true },
intake: { type: Schema.Types.ObjectId, ref: "intake" },
school: { type: Schema.Types.ObjectId, ref: "school" },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };