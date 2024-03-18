import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    const updatedPlace = request.body;
    console.log("in api.. : ", updatedPlace);
    await Place.findByIdAndUpdate(id, updatedPlace);
    response.status(200).json({ status: "Place updated successfully." });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Place deleted successfully." });
  }
}
