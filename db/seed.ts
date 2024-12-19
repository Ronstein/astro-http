import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO

	await db.insert(Clients).values([
		{ id: 1, name: 'Kasim', age: 35, isActive: true },
		{ id: 2, name: 'Feña', age: 34, isActive: false },
		{ id: 3, name: 'Roro', age: 44, isActive: true },
		{ id: 4, name: 'Gabi', age: 30, isActive: true },
		{ id: 5, name: 'Juan', age: 32, isActive: false },
	]);

	const posts = await getCollection('blog');
	await db.insert(Posts).values(
		posts.map(p => ({
			id: p.id,
			title: p.data.title,
			likes: Math.round(Math.random() * 100),
		}))
	)

	console.log('Seed Executed');
}
