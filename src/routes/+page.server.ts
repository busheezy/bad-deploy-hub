import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const packs = await prisma.pack.findMany();

  return {
    packs,
  };
};
