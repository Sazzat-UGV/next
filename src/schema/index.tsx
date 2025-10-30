import { z } from "zod";

export const salesSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z.string().nonempty("Phone is required"),
  email: z.string().nonempty("Email is required"),
  location: z.string().nonempty("Location is required"),
  photo: z
    .any()
    .refine((file) => file instanceof File, { message: "Photo is required" }),
});

// uploadVideo
export const uploadVideo = z.object({
  title: z.string().nonempty("Title is required"),
  states: z.string().nonempty("States is required"),
  city: z.string().nonempty("City is required"),
  tags: z.array(z.string()).nonempty("Tags is required"),
  visibility: z.string().nonempty("Visibility is required"),
  description: z.string().nonempty("Description is required"),
  category_id: z.string().nonempty("Category is required"),
  video: z
    .any()
    .refine((file) => file instanceof File, { message: "Video is required" }),
  thumbnail: z.any().refine((file) => file instanceof File, {
    message: "Thumbnail is required",
  }),
});

// linkSchema
export const linkSchema = z.object({
  link: z.string().nonempty("Link is required"),
  title: z.string().nonempty("Title is required"),
  states: z.string().nonempty("States is required"),
  city: z.string().nonempty("City is required"),
  tags: z.array(z.string()).nonempty("Tags is required"),
  visibility: z.string().nonempty("Visibility is required"),
  description: z.string().nonempty("Description is required"),
  category_id: z.string().nonempty("Category is required"),
  thumbnail: z.any().refine((file) => file instanceof File, {
    message: "Thumbnail is required",
  }),
});

// loginSchema
export const ForgotSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Invalid email address",
    }),
});

// contactSchema
export const contactSchema = ForgotSchema.extend({
  name: z.string().nonempty("Name is required"),
  subject: z.string().nonempty("Subject is required"),
  message: z.string().nonempty("Message is required"),
});
// loginSchema
export const loginSchema = ForgotSchema.extend({
  password: z
    .string()
    .nonempty("Password is required")
    .min(4, "Password must be at 4 characters"),
});
// signUp
export const SignUpSchema = loginSchema
  .extend({
    channel_name: z.string().nonempty("Channel is required"),
    full_name: z.string().nonempty("Full Name is required"),
    confirm_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((value) => value.password === value.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must be match.",
  });


export const onSideSchema = z
  .object({
    representative_secret_key: z.string().nonempty("Secret Key is required"),
    channel_name: z.string().nonempty("Channel Name is required"),
    full_name: z.string().nonempty("Full Name is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Invalid email address",
      }),
    password: z.string().nonempty("New Password is required"),
    confirm_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((value) => value?.password === value?.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must be match.",
  });

// /passwordSchema
export const passwordChangeSchema = z
  .object({
    current_password: z.string().nonempty("Current Password is required"),
    new_password: z.string().nonempty("New Password is required"),
    c_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((value) => value.new_password === value.c_password, {
    path: ["c_password"],
    message: "Passwords must be match.",
  });




  // forgot password
  export const passwordSchema11 = z
  .object({
    password: z.string().nonempty("Password is required"),
    c_password: z.string().nonempty("Confirm Password is required"),
  })
  .refine((value) => value.password === value.c_password, {
    path: ["c_password"],
    message: "Passwords must be match.",
  });


// blogSchema
  export const blogSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  image: z.any().refine((file) => file instanceof File, {
    message: "Image is required",
  }),
});