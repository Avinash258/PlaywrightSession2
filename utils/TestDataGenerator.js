const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

class TestDataGenerator {
    constructor() {
        this.dataFilePath = path.join(__dirname, '../test-data/user-data.md');
        this.ensureDirectoryExists();
    }

    ensureDirectoryExists() {
        const dir = path.dirname(this.dataFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    generateUserData() {
        const userData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 10 }),
            company: faker.company.name(),
            address: faker.location.streetAddress(),
            country: faker.location.country(),
            state: faker.location.state(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(),
            mobileNumber: faker.phone.number(),
            birthDate: faker.date.birthdate().toISOString().split('T')[0]
        };

        this.saveUserData(userData);
        return userData;
    }

    saveUserData(userData) {
        const mdContent = `# Test User Data
## User Information
- **First Name:** ${userData.firstName}
- **Last Name:** ${userData.lastName}
- **Email:** ${userData.email}
- **Password:** ${userData.password}

## Address Information
- **Company:** ${userData.company}
- **Address:** ${userData.address}
- **Country:** ${userData.country}
- **State:** ${userData.state}
- **City:** ${userData.city}
- **Zipcode:** ${userData.zipcode}
- **Mobile Number:** ${userData.mobileNumber}
- **Birth Date:** ${userData.birthDate}

*Generated on: ${new Date().toLocaleString()}*
`;

        fs.writeFileSync(this.dataFilePath, mdContent);
    }

    loadUserData() {
        if (fs.existsSync(this.dataFilePath)) {
            const content = fs.readFileSync(this.dataFilePath, 'utf8');
            const data = {};
            
            const matches = {
                firstName: /First Name:\*\* (.*)/,
                lastName: /Last Name:\*\* (.*)/,
                email: /Email:\*\* (.*)/,
                password: /Password:\*\* (.*)/,
                company: /Company:\*\* (.*)/,
                address: /Address:\*\* (.*)/,
                country: /Country:\*\* (.*)/,
                state: /State:\*\* (.*)/,
                city: /City:\*\* (.*)/,
                zipcode: /Zipcode:\*\* (.*)/,
                mobileNumber: /Mobile Number:\*\* (.*)/,
                birthDate: /Birth Date:\*\* (.*)/
            };

            for (const [key, regex] of Object.entries(matches)) {
                const match = content.match(regex);
                if (match) {
                    data[key] = match[1];
                }
            }

            return data;
        }
        return null;
    }
}

module.exports = { TestDataGenerator };
