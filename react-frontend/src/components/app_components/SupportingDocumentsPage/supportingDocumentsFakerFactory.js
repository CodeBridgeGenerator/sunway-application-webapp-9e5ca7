
import { faker } from "@faker-js/faker";
export default (user,count,nameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
passportPhoto: faker.lorem.sentence(1),
NRICCopy: faker.lorem.sentence(1),
educationLevel: "SecondaryStudies",
Qualification: faker.lorem.sentence(1),
School: faker.lorem.sentence(1),
academicDocuments: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
