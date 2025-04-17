import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const contests = defineCollection({
  loader: glob({ base: "./src/content/contests", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    // 大会タイトル
    title: z.string(),
    // 開催された日付
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    // 順位
    result: z.string(),
    // 順位を目立たせるかどうか
    highlighted: z.boolean().optional(),
    // タグ
    tags: z.enum(["writeup"]).array(),
    members: z.array(reference("member")),
    // 投稿日時
    pubDate: z.coerce.date(),
    // heroImage
    heroImage: z.string().optional(),
    // 大会公式などのURL
    externalUrl: z.string().url().optional(),
  }),
});

const member = defineCollection({
  loader: glob({ base: "./src/content/members", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    // 名前 (表示用)
    name: z.string(),
    // 本名 (opt)
    realName: z.string().optional(),
    // 自己紹介 (opt)
    description: z.string().optional(),
    // スキル (opt)
    skills: z.string().array().optional(),
    // アイコン public/images/members/に置く
    image: z.string().startsWith("/").optional(),
    x_twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
  }),
});

export const collections = { blog, member, contests };
