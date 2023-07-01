import { Prismaclient } from "@prisma/client";
import { data } from "autoprefixer";
const db = new Prismaclient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { image, title, description, price, guests, beds, baths } = req.body;
    await db.home
      .create({
        data: {
          image,
          title,
          description,
          price,
          guests,
          beds,
          baths,
        },
      })
      .then((home) => {
        return res.status(200).json(home);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
      });
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported` });
  }
}
