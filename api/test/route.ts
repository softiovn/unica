import { NextResponse } from "next/server";
import { unicaApi } from "@/utils/api";

export async function GET() {
  try {
    const isAuthenticated = await unicaApi.testAuthentication();

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    const [categories, featuredCourses] = await Promise.all([
      unicaApi.getCategories(),
      unicaApi.getFeaturedCourses(2),
    ]);

    return NextResponse.json({
      authenticated: true,
      categoriesCount: categories.length,
      featuredCoursesCount: featuredCourses.length,
      sampleCategory: categories[0],
      sampleCourse: featuredCourses[0],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "API test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
