import fs from 'node:fs/promises';

const TOTALSEED = 10000

type User = {
    "id": string,
    "name": string
    "createdAt": Date,
    "updatedAt": Date
}
const writeScript = async () => {
	let users: Array<User> = [];
	console.log('Seeding...');
	const startTime = new Date().getTime();
	for (let i = 0; i < TOTALSEED; i++) {
        const user = {
            "id": i.toString(),
            "name": `Jill ${i + 1}`,
            "createdAt": new Date(),
            "updatedAt": new Date()
        }
		const file = await fs.open('./db.txt', 'a')
        await file.writeFile(JSON.stringify(user) + '\n')
		console.log('Seeded user', i);
		users.push(user);
	}
	const endTime = new Date().getTime();
	const duration = endTime - startTime;
	const logWrite = await fs.open('./prisma/seed.log', 'a');
	logWrite.writeFile(
		`\nSeeding ${users.length } users in ${duration / 1000}s`
	);
	await logWrite.close();
	console.log(`Seeding ${users.length } users in ${duration / 1000}s`);
};

const readScript = async () => {
	let users: Array<User> = [];
	console.log('Seeding...');
	const startTime = new Date().getTime();
	for (let i = 0; i < TOTALSEED; i++) {
        const file = await fs.open("./db.txt", "r")
		const user = await file.readFile()
        for (const text of user){
            console.log(text)
        }

        await file.close()
	}
	const endTime = new Date().getTime();
	const duration = endTime - startTime;
	const logWrite = await fs.open('./prisma/seed.log', 'a');
	logWrite.writeFile(
		`\nRead ${users.length } users in ${duration / 1000}s`
	);
	logWrite.close();
	console.log(`Read ${users.length } users in ${duration / 1000}s`);
};

const init = async () => {
    await writeScript();
    await readScript();
}

const resolver = Promise.resolve(init())
