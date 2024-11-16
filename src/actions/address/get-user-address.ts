'use server';

import prisma from '@/lib/prisma';



export const getUserAddress = async( userId: string ) => {
  try {

    const address = await prisma.userAddress.findUnique({
      where: { userId }
    });

    if ( !address ) return null;

    const {  countryId, address2, region, comuna,postalCode, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : '',
      region: region ? region : '',
      comuna: comuna ? comuna : '',
      postalCode: postalCode ? postalCode : '',
    };


  } catch (error) {
    console.log(error);
    return null;
  }
}