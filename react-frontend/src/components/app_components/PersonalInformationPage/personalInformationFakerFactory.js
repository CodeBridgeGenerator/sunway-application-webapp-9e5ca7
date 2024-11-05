
import { faker } from "@faker-js/faker";
export default (user,count,nameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
fullName: faker.lorem.sentence(1),
firstName: faker.lorem.sentence(1),
surname: faker.lorem.sentence(1),
Nationality: faker.lorem.sentence(1),
NRIC: faker.lorem.sentence(1),
DateofBirth: faker.lorem.sentence(1),
Gender: "male",
maritalStatus: "Widow",
relegion: "Others",
race: "Chinese",
studentwithSpecialConditions: faker.lorem.sentence(1),
formerSunwayStudent: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
