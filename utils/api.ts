const API_BASE_URL = "https://unica.vn/api";

const UNICA_CONFIG = {
  username: "tung.42@gmail.com",
  password: "lopcd2",
  aff_id: 360685,
  token: "eTg2dlAvSmJmREVHZktLWjI0enRuUT09",
};

export interface RawCourseData {
  id?: number;
  course_id?: number;
  title?: string;
  course_title?: string;
  name?: string;
  image?: string;
  course_image?: string;
  avatar?: string;
  thumbnail?: string;
  price?: number;
  course_price?: number;
  original_price?: number;
  discount_price?: number;
  sale_price?: number;
  promotion_price?: number;
  instructor?: string;
  teacher?: string;
  author?: string;
  teacher_name?: string;
  instructor_avatar?: string;
  teacher_avatar?: string;
  students_count?: number;
  student_count?: number;
  enrollments?: number;
  rating?: number;
  average_rating?: number;
  rate?: number;
  total_lessons?: number;
  lesson_count?: number;
  lectures_count?: number;
  total_time?: string;
  duration?: string;
  total_duration?: string;
  description?: string;
  short_description?: string;
  summary?: string;
  requirements?: string[];
  what_you_get?: string[];
  category_id?: number;
  category_name?: string;
  is_hot?: boolean;
  hot?: boolean;
  is_new?: boolean;
  new?: boolean;
  is_best_seller?: boolean;
  best_seller?: boolean;
  slug?: string;
  url_slug?: string;
  course?: RawCourseData;
}

export interface Course {
  id: number;
  title: string;
  image: string;
  price: number;
  discount_price?: number;
  original_price?: number;
  instructor: string;
  instructor_avatar?: string;
  students_count: number;
  rating: number;
  total_lessons: number;
  total_time: string;
  description: string;
  requirements?: string[];
  what_you_get?: string[];
  category_id?: number;
  category_name?: string;
  is_hot?: boolean;
  is_new?: boolean;
  is_best_seller?: boolean;
  slug?: string;
}

export interface Category {
  id: number;
  name: string;
  course_count?: number;
  icon?: string;
  slug?: string;
}

export interface RawCategoryData {
  id?: number;
  category_id?: number;
  name?: string;
  category_name?: string;
  course_count?: number;
  total_courses?: number;
  icon?: string;
  slug?: string;
  url_slug?: string;
}

class UnicaApi {
  private getToken(): string {
    return UNICA_CONFIG.token;
  }

  private async authenticatedRequest(
    endpoint: string,
    params: Record<string, unknown> = {}
  ) {
    const token = this.getToken();

    const queryParams = new URLSearchParams({
      aff_id: UNICA_CONFIG.aff_id.toString(),
      token: token,
      ...params,
    });

    const url = `${API_BASE_URL}${endpoint}?${queryParams}`;

    try {
      console.log(`🌐 Making API request to: ${endpoint}`);
      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ API response from ${endpoint}:`, data);

      if (data.status === "success") {
        return data.data || data;
      }

      if (Array.isArray(data) || (typeof data === "object" && data !== null)) {
        return data;
      }

      throw new Error("Invalid API response format");
    } catch (error) {
      console.error(`❌ API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  private async publicRequest(
    endpoint: string,
    params: Record<string, unknown> = {}
  ) {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const url = `${API_BASE_URL}${endpoint}${
      queryString ? `?${queryString}` : ""
    }`;

    try {
      console.log(`🌐 Making public API request to: ${endpoint}`);
      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Public API response from ${endpoint}:`, data);

      return data;
    } catch (error) {
      console.error(`❌ Public API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Courses
  async getFeaturedCourses(limit: number = 8): Promise<Course[]> {
    try {
      const data = await this.authenticatedRequest("/courses", {
        option: "hot",
        page: 0,
        limit,
      });
      return this.transformCourses(data);
    } catch (error) {
      console.error("Error getting featured courses:", error);
      return [];
    }
  }

  async getNewCourses(limit: number = 8): Promise<Course[]> {
    try {
      const data = await this.authenticatedRequest("/courses", {
        option: "new",
        page: 0,
        limit,
      });
      return this.transformCourses(data);
    } catch (error) {
      console.error("Error getting new courses:", error);
      return [];
    }
  }

  async getBestSellerCourses(limit: number = 8): Promise<Course[]> {
    try {
      const data = await this.authenticatedRequest("/courses", {
        option: "best-sell",
        page: 0,
        limit,
      });
      return this.transformCourses(data);
    } catch (error) {
      console.error("Error getting best seller courses:", error);
      return [];
    }
  }

  async getPopularCourses(limit: number = 6): Promise<Course[]> {
    try {
      const data = await this.authenticatedRequest("/courses", {
        option: "most-view",
        page: 0,
        limit,
      });
      return this.transformCourses(data);
    } catch (error) {
      console.error("Error getting popular courses:", error);
      return [];
    }
  }

  async getAllCourses(
    page: number = 0,
    option?: string
  ): Promise<{ courses: Course[]; total: number }> {
    try {
      const params: { page: number; option?: string } = { page };
      if (option) {
        params.option = option;
      }

      const data = await this.authenticatedRequest("/courses", params);
      return {
        courses: this.transformCourses(data),
        total: Array.isArray(data) ? data.length : 0,
      };
    } catch (error) {
      console.error("Error getting all courses:", error);
      return { courses: [], total: 0 };
    }
  }

  async getCourseDetail(courseId: number): Promise<Course | null> {
    try {
      const data = await this.authenticatedRequest("/getCourse", {
        id: courseId,
      });
      return this.transformCourse(data);
    } catch (error) {
      console.error("Error getting course detail:", error);
      return null;
    }
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const data = await this.publicRequest("/listCategory");
      return this.transformCategories(data);
    } catch (error) {
      console.error("Error getting categories:", error);
      return [];
    }
  }

  async getCoursesByCategory(
    categoryId: number,
    page: number = 0
  ): Promise<{ courses: Course[]; total: number }> {
    try {
      const data = await this.authenticatedRequest("/coursecategory", {
        category_id: categoryId,
        page,
      });
      return {
        courses: this.transformCourses(data),
        total: Array.isArray(data) ? data.length : 0,
      };
    } catch (error) {
      console.error("Error getting courses by category:", error);
      return { courses: [], total: 0 };
    }
  }

  // Search
  async searchCourses(
    keyword: string,
    page: number = 0
  ): Promise<{ courses: Course[]; total: number }> {
    try {
      const data = await this.authenticatedRequest("/coursesearch", {
        key: keyword,
        page,
      });
      return {
        courses: this.transformCourses(data),
        total: Array.isArray(data) ? data.length : 0,
      };
    } catch (error) {
      console.error("Error searching courses:", error);
      return { courses: [], total: 0 };
    }
  }

  // Course List (public)
  async getCourseList(fromCourseId?: number): Promise<Course[]> {
    try {
      const params: Record<string, number> = {};
      if (fromCourseId) {
        params.from_course_id = fromCourseId;
      }

      const data = await this.publicRequest("/getCourseList", params);
      return this.transformCourses(data);
    } catch (error) {
      console.error("Error getting course list:", error);
      return [];
    }
  }

  // Price changes
  async getPriceChanges(): Promise<unknown> {
    try {
      const data = await this.authenticatedRequest("/pricechange");
      return data;
    } catch (error) {
      console.error("Error getting price changes:", error);
      return [];
    }
  }

  // Order status
  async getOrderStatus(orderId: number): Promise<unknown> {
    try {
      const data = await this.authenticatedRequest("/getStatusOrder", {
        order_id: orderId,
      });
      return data;
    } catch (error) {
      console.error("Error getting order status:", error);
      return null;
    }
  }

  // Transformers
  private transformCourses(
    data: RawCourseData[] | RawCourseData | null | undefined
  ): Course[] {
    if (!data) return [];
    if (!Array.isArray(data)) {
      const course = this.transformCourse(data);
      return course ? [course] : [];
    }
    return data
      .map((item: RawCourseData) => this.transformCourse(item))
      .filter(Boolean) as Course[];
  }

  private transformCourse(item: RawCourseData): Course | null {
    if (!item) return null;

    const courseData = item.course || item;

    // Fallback placeholder image if no image is available
    const courseImage =
      this.getCourseImage(courseData) ||
      `https://placehold.co/300/200?text=${encodeURIComponent(
        courseData.title ||
          courseData.course_title ||
          courseData.name ||
          "Course"
      )}`;

    return {
      id: courseData.id || courseData.course_id || 0,
      title:
        courseData.title ||
        courseData.course_title ||
        courseData.name ||
        "Khóa học không có tiêu đề",
      image: courseImage,
      price:
        courseData.price ||
        courseData.original_price ||
        courseData.course_price ||
        0,
      discount_price:
        courseData.discount_price ||
        courseData.sale_price ||
        courseData.promotion_price,
      original_price: courseData.original_price || courseData.price || 0,
      instructor:
        courseData.instructor ||
        courseData.teacher ||
        courseData.author ||
        courseData.teacher_name ||
        "Unica",
      instructor_avatar:
        courseData.instructor_avatar || courseData.teacher_avatar,
      students_count:
        courseData.students_count ||
        courseData.student_count ||
        courseData.enrollments ||
        0,
      rating:
        courseData.rating ||
        courseData.average_rating ||
        courseData.rate ||
        4.5,
      total_lessons:
        courseData.total_lessons ||
        courseData.lesson_count ||
        courseData.lectures_count ||
        0,
      total_time:
        courseData.total_time ||
        courseData.duration ||
        courseData.total_duration ||
        "0 giờ",
      description:
        courseData.description ||
        courseData.short_description ||
        courseData.summary ||
        "",
      requirements: Array.isArray(courseData.requirements)
        ? courseData.requirements
        : [],
      what_you_get: Array.isArray(courseData.what_you_get)
        ? courseData.what_you_get
        : [],
      category_id: courseData.category_id,
      category_name: courseData.category_name,
      is_hot: courseData.is_hot || courseData.hot || false,
      is_new: courseData.is_new || courseData.new || false,
      is_best_seller:
        courseData.is_best_seller || courseData.best_seller || false,
      slug: courseData.slug || courseData.url_slug,
    };
  }

  private getCourseImage(courseData: RawCourseData): string {
    return (
      courseData.image ||
      courseData.course_image ||
      courseData.avatar ||
      courseData.thumbnail ||
      ""
    );
  }

  private transformCategories(data: unknown): Category[] {
    if (!data) return [];
    if (!Array.isArray(data)) return [];

    return data
      .map((item: RawCategoryData) => ({
        id: item.id || item.category_id || 0,
        name: item.name || item.category_name || "Danh mục",
        course_count: item.course_count || item.total_courses || 0,
        icon: item.icon,
        slug: item.slug || item.url_slug,
      }))
      .filter((cat: Category) => cat.id && cat.name);
  }

  // Test authentication
  async testAuthentication(): Promise<boolean> {
    try {
      // Test by making a simple API call
      const categories = await this.getCategories();
      console.log(
        "✅ Authentication test passed - Categories count:",
        categories.length
      );
      return true;
    } catch (error) {
      console.error("❌ Authentication test failed:", error);
      return false;
    }
  }

  // Get API configuration info (for debugging)
  getConfigInfo() {
    return {
      aff_id: UNICA_CONFIG.aff_id,
      has_token: !!UNICA_CONFIG.token,
      token_length: UNICA_CONFIG.token?.length || 0,
    };
  }
}

export const unicaApi = new UnicaApi();
