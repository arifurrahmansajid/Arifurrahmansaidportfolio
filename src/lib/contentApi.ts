export interface Blog {
  id?: string;
  _id?: string;
  slug: string;
  title: string;
  content: string;
  thumbnail?: string | null;
  tags?: string[];
  categories?: string[];
  status: string;
  views?: number;
  readTime?: number;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Project {
  id?: string;
  _id?: string;
  title: string;
  thumbnail?: string | null;
  description: string;
  features?: string[];
  technologies?: string[];
  githubLink?: string | null;
  liveSite?: string | null;
  status: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}


type MaybeString = FormDataEntryValue | null;

const normalizeStringArray = (values: string[]) =>
  values.map((value) => value.trim()).filter(Boolean);

const parseJsonArray = (value: string | null) => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? normalizeStringArray(parsed) : [];
  } catch {
    return [];
  }
};

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

export const parseRepeatedOrJsonArray = (
  formData: FormData,
  keys: string[]
) => {
  for (const key of keys) {
    const repeated = normalizeStringArray(
      formData.getAll(key).map((item) => String(item))
    );

    if (repeated.length > 0) {
      return repeated;
    }

    const single = formData.get(key);
    if (typeof single === "string" && single.trim()) {
      return parseJsonArray(single);
    }
  }

  return [];
};

export const parseNumberField = (value: MaybeString, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const buildBlogPayload = (formData: FormData) => {
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const status = String(formData.get("status") || "draft").trim();
  const categories = parseRepeatedOrJsonArray(formData, ["categories[]", "categories"]);
  const tags = parseRepeatedOrJsonArray(formData, ["tags[]", "tags"]);
  const seoKeywords = parseRepeatedOrJsonArray(formData, [
    "meta.seoKeywords[]",
    "meta.seoKeywords",
  ]);

  const rawMeta = formData.get("meta");
  let metaObject: Record<string, unknown> = {};
  if (typeof rawMeta === "string" && rawMeta.trim()) {
    try {
      metaObject = JSON.parse(rawMeta);
    } catch {
      metaObject = {};
    }
  }

  return {
    title,
    slug: createSlug(slugInput || title),
    content,
    status: status === "published" ? "published" : "draft",
    categories,
    tags,
    readTime: parseNumberField(
      formData.get("meta.readTime") || (metaObject.readTime as string | null),
      0
    ),
    seoTitle: String(
      formData.get("meta.seoTitle") || metaObject.seoTitle || ""
    ).trim(),
    seoDescription: String(
      formData.get("meta.seoDescription") || metaObject.seoDescription || ""
    ).trim(),
    seoKeywords,
    thumbnailFile: formData.get("file") as File | null,
  };
};

export const buildProjectPayload = (formData: FormData) => ({
  title: String(formData.get("title") || "").trim(),
  description: String(formData.get("description") || "").trim(),
  status:
    String(formData.get("status") || "draft").trim() === "published"
      ? "published"
      : "draft",
  features: parseRepeatedOrJsonArray(formData, ["features"]),
  technologies: parseRepeatedOrJsonArray(formData, ["technologies"]),
  githubLink: String(formData.get("githubLink") || "").trim(),
  liveSite: String(formData.get("liveSite") || "").trim(),
  thumbnailFile: formData.get("file") as File | null,
});

export const serializeBlog = (blog: Blog) => ({
  ...blog,
  _id: blog._id || blog.id,
  meta: {
    views: blog.views,
    readTime: blog.readTime,
    seoTitle: blog.seoTitle || "",
    seoDescription: blog.seoDescription || "",
    seoKeywords: blog.seoKeywords || [],
  },
});

export const serializeProject = (project: Project) => ({
  ...project,
  _id: project._id || project.id,
});
