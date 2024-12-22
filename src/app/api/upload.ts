// import multer from "multer";
// import os from "os";
// import { NextApiRequest, NextApiResponse } from "next";
// import { Readable } from "stream";

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const directory =
//       process.env.NODE_ENV === "production"
//         ? os.tmpdir()
//         : "./public/temporary";
//     cb(null, directory);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Middleware function to handle Multer
// const runMiddleware = async (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   fn: Function
// ) => {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: unknown) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// };

// // Disable body parsing to allow `multer` to process the request
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Main API handler
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       await runMiddleware(req, res, upload.single("file")); // Apply Multer middleware

//       // Access the uploaded file
//       const file = (req as any).file;

//       if (!file) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       res.status(200).json({
//         message: "File uploaded successfully",
//         fileName: file.originalname,
//         filePath: file.path,
//       });
//     } catch (error) {
//       console.error("Error during file upload:", error);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }
