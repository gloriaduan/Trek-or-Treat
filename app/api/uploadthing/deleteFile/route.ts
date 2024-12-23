
import { NextRequest, NextResponse } from 'next/server';
import { utapi } from '../uploadthing';

export async function POST(req: NextRequest) {
    const { key } = await req.json();
  
    if (!key) {
      return NextResponse.json({ error: 'File key is required' }, { status: 400 });
    }
  
    try {
      await utapi.deleteFiles([key]);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error('Error deleting file:', error);
      return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
  }