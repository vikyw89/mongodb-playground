import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
const prisma = new PrismaClient();

let users: Array<User> = [];

const seedScript = async () => {
	console.time('Seeding');
	for (let i = 0; i < 1000; i++) {
		const user = await prisma.user.create({
			data: {
				name: 'Jill',
			},
		});
		users.push(user);
	}
	console.time(`Seeding ${1000} users`);
};

seedScript();
