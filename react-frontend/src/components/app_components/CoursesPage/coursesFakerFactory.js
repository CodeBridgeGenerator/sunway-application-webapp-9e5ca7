
import { faker } from "@faker-js/faker";
export default (user,count,campusIds,locationIds,programmeLevelIds,intakeIds,schoolIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
campus: campusIds[i % campusIds.length],
location: locationIds[i % locationIds.length],
programmeLevel: programmeLevelIds[i % programmeLevelIds.length],
programme: faker.lorem.sentence(1),
intake: intakeIds[i % intakeIds.length],
school: schoolIds[i % schoolIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
