
import { faker } from "@faker-js/faker";
export default (user,count,nameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
fullCorrespondenceAddress: faker.lorem.sentence(1),
city: faker.lorem.sentence(1),
postalCode: faker.lorem.sentence(1),
state: "undefined",
country: faker.lorem.sentence(1),
studentMobileNumber: faker.lorem.sentence(1),
homeContactNumber: faker.lorem.sentence(1),
studentEmail: faker.lorem.sentence(1),
permanentAddress: faker.lorem.sentence(1),
parentGuardianName: faker.lorem.sentence(1),
relationship: "Sister-in-Law",
parentGuardianMobileNumber: faker.lorem.sentence(1),
parentGuardianEmail: faker.lorem.sentence(1),
parentGuardianOfficeNumber: faker.lorem.sentence(1),
monthlyHouseholdIncome: "B40",
emergencyContactName: faker.lorem.sentence(1),
emergencyContactRelationship: "Aunt",
emergencyContactNumber: faker.lorem.sentence(1),
emergencyContactEmail: faker.lorem.sentence(1),
emergencyContactOfficeNumber: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
