import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

type RouteParams = {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const conversion = await prisma.conversion.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!conversion) {
    return new NextResponse(JSON.stringify({ error: 'Not found' }), {
      status: 404,
    })
  }

  return NextResponse.json({ status: conversion.status })
}
