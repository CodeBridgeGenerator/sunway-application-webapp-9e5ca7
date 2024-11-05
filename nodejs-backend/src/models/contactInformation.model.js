
    module.exports = function (app) {
        const modelName = 'contact_information';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type: Schema.Types.ObjectId, ref: "users" },
fullCorrespondenceAddress: { type:  String , required: true, maxLength: null },
city: { type:  String , required: true },
postalCode: { type:  String , required: true },
state: { type: Schema.Types.Mixed, required: false, default: {"0":"Johor","1":"Kedah","2":"Kelantan","3":"Melaka","4":"NegeriSembilan","5":"Pahang","6":"Penang","7":"Perak","8":"Perlis","9":"Sabah","10":"Sarawak","11":"Selangor","12":"Terengganu","13":"KualaLumpur"} },
country: { type:  String , required: true },
studentMobileNumber: { type:  String , required: true },
homeContactNumber: { type:  String , maxLength: null },
studentEmail: { type:  String , required: true, maxLength: null },
permanentAddress: { type:  String , required: true, maxLength: null },
parentGuardianName: { type:  String , required: true, maxLength: null },
relationship: { type: String, required: false , enum: ["Mother","Father","Sister","Brother","Grandfather","Grandmother","Aunt","Uncle","Cousin","Husband","Wife","Guardian","Brother-in-Law","Sister-in-Law","Others"] },
parentGuardianMobileNumber: { type:  String , required: true, maxLength: null },
parentGuardianEmail: { type:  String , required: true, maxLength: null },
parentGuardianOfficeNumber: { type:  String , maxLength: null },
monthlyHouseholdIncome: { type: String, required: false , enum: ["B40","M40","T20"] },
emergencyContactName: { type:  String , required: true, maxLength: null },
emergencyContactRelationship: { type: String, required: false , enum: ["Mother","Father","Sister","Brother","Grandfather","Grandmother","Aunt","Uncle","Cousin","Husband","Wife","Guardian","Brother-in-Law","Sister-in-Law","Others"] },
emergencyContactNumber: { type:  String , required: true, minLength: null, maxLength: null },
emergencyContactEmail: { type:  String , required: true, maxLength: null },
emergencyContactOfficeNumber: { type:  String , required: true, maxLength: null },

            
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