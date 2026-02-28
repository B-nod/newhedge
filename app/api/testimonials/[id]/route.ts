import { NextRequest, NextResponse } from "next/server";
import AppDataSource from "../../../../lib/db";
import { Testimonial } from "../../../../lib/entities/Testimonial";

// Initialize the database connection
const initializeDb = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(Testimonial);
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const params = await request.json();
    // TODO: Add admin authentication
    // const session = await getServerSession(authOptions);
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    const id = parseInt((await params).id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid testimonial ID" },
        { status: 400 }
      );
    }

    const testimonialRepository = await initializeDb();
    const result = await testimonialRepository.delete(id);

    if (result.affected === 0) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
