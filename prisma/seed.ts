import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	await prisma.pack.create({
		data: {
			name: 'Pack 1'
		}
	});

	await prisma.pack.create({
		data: {
			name: 'Pack 2'
		}
	});

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})

	.catch(async (e) => {
		console.error(e);

		await prisma.$disconnect();

		process.exit(1);
	});
