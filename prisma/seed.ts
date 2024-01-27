import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import fs from 'node:fs/promises';

const prisma = new PrismaClient();

const TOTALSEED = 10000;
let ids: { [key: string]: string } = {};
const writeScript = async () => {
	let users: Array<User> = [];
	console.log('Seeding...');
	const startTime = new Date().getTime();
	for (let i = 0; i < TOTALSEED; i++) {
		const user = await prisma.user.create({
			data: {
				name: `Jill ${i + 1}`,
			},
		});
		ids[i.toString()] = user.id;
		console.log('Seeded user', i);
		users.push(user);
	}
	const endTime = new Date().getTime();
	const duration = endTime - startTime;
	const logWrite = await fs.open('./prisma/seed.log', 'a');
	logWrite.writeFile(`\nSeeding ${users.length} users in ${duration / 1000}s`);
	logWrite.close();
	console.log(`Seeding ${users.length} users in ${duration / 1000}s`);
};

const readScript = async () => {
	let users: Array<User> = [];
	console.log('Seeding...');
	const startTime = new Date().getTime();
	for (let i = 0; i < TOTALSEED; i++) {
		const user = await prisma.user.findUnique({
			where: {
				id: ids[i.toString()],
			},
		});
		if (!user) {
			break;
		}
		users.push(user);
		console.log('Read user', i);
	}
	const endTime = new Date().getTime();
	const duration = endTime - startTime;
	const logWrite = await fs.open('./prisma/seed.log', 'a');
	logWrite.writeFile(`\nRead ${users.length} users in ${duration / 1000}s`);
	logWrite.close();
	console.log(`Read ${users.length} users in ${duration / 1000}s`);
};

const init = async () => {
	await writeScript();
	await readScript();
};

const resolver = Promise.resolve(init());
