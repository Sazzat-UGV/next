// "use client"
// import Form from "@/components/reuseable/from";
// import { FieldValues, useForm } from "react-hook-form";
// import ImageUploader from "../../reuseable/img-upload/img-upload";
// import { FromInputs } from "@/components/reuseable/from-inputs";
// import { FromTextAreas } from "@/components/reuseable/from-textareas";
// import TextEditor from "../../reuseable/text-editor";
// import { Button } from "@/components/ui";


// export default function EditBlog() {
//   const from = useForm({
//     // resolver: zodResolver(loginSchema),
//     defaultValues: {
//       title: "Blog title goes here.",
//       description: "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
//     },
//   });

//   const handleSubmit = async (values: FieldValues) => {
//     console.log("Login form:", values);
//   };
//   return (
//     <Form from={from} onSubmit={handleSubmit} className="space-y-7 py-5">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           <div className="space-y-10">
//             <ImageUploader title="Drag and drop your file here" />
//             <FromInputs
//               label="Title"
//               name="title"
//               placeholder="Enter your title"
//             />
//             <FromTextAreas
//               label="Description"
//               name="description"
//               placeholder="Enter your Description"
//               className="min-h-44 rounded-3xl"
//             />
//           </div>
//           <div>
//             <TextEditor
//               value=""
//               onChange={(v) => console.log(v)}
//               className="bg-body !min-h-[520px]"
//             />
//           </div>
//           <div className="col-span-2 flex justify-end">
//             <Button variant="primary" size="lg" className="rounded-full">
//               Submit
//             </Button>
//           </div>
//         </div>
//       </Form>
//   );
// }

import React from 'react'

export default function Blog() {
  return (
    <div>Blog</div>
  )
}
