
    module.exports = function (app) {
        const modelName = 'personal_information';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type: Schema.Types.ObjectId, ref: "users" },
fullName: { type:  String , required: true },
firstName: { type:  String , required: true },
surname: { type:  String , required: true },
Nationality: { type:  String , required: true },
NRIC: { type:  String , required: true },
DateofBirth: { type: Date, required: false },
Gender: { type: String, required: false , enum: ["male","female"] },
maritalStatus: { type: String, required: false , enum: ["Single","Married","Divorced","Engaged","Widow"] },
relegion: { type: String, required: false , enum: ["Buddhist","Christian","Hindu","Sikh","Muslim","Others"] },
race: { type: String, required: false , enum: ["Malay","Chinese","Indian","Bajau","Bidayuh","Dusun","Iban","Kadazan","Kadazandusun","Melanau","Murut","OrangAsli","OrangSungai","Punjabi","Sino-Kadazan","Others"] },
studentwithSpecialConditions: { type: Boolean, required: false },
formerSunwayStudent: { type: Boolean, required: false },

            
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