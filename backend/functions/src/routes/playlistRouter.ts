import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Playlist from "../models/Playlist";
import { ShortMovie } from "../models/Movie";

const playlistRouter = express.Router();

const errorResponse = (error: any, res: any) => {
   console.error("FAIL", error);
   res.status(500).json({ message: "Internal Server Error" });
};

// const movies: ShortMovie[] = [
//   {
//     id: 129,
//     title: "Spirited Away",
//     poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
//     overview: "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family."
//   },
//   {
//     id: 4935,
//     title: "Howl's Moving Castle",
//     poster_path: "/6pZgH10jhpToPcf0uvyTCPFhWpI.jpg",
//     overview: "Sophie, a young milliner, is turned into an elderly woman by a witch who enters her shop and curses her. She encounters a wizard named Howl and gets caught up in his resistance to fighting for the king."
//   },
//   {
//     id: 128,
//     title: "Princess Mononoke",
//     poster_path: "/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
//     overview: "Ashitaka, a prince of the disappearing Emishi people, is cursed by a demonized boar god and must journey to the west to find a cure. Along the way, he encounters San, a young human woman fighting to protect the forest, and Lady Eboshi, who is trying to destroy it. Ashitaka must find a way to bring balance to this conflict."
//   },
//   {
//     id: 81,
//     title: "Nausicaä of the Valley of the Wind",
//     poster_path: "/tcrkfB8SRPQCgwI88hQScua6nxh.jpg",
//     overview: "After a global war, the seaside kingdom known as the Valley of the Wind remains one of the last strongholds on Earth untouched by a poisonous jungle and the powerful insects that guard it. Led by the courageous Princess Nausicaä, the people of the Valley engage in an epic struggle to restore the bond between humanity and Earth."
//   },
//   {
//     id: 10515,
//     title: "Castle in the Sky",
//     poster_path: "/41XxSsJc5OrulP0m7TrrUeO2hoz.jpg",
//     overview: "A young boy and a girl with a magic crystal must race against pirates and foreign agents in a search for a legendary floating castle."
//   },
//   {
//     id: 16859,
//     title: "Kiki's Delivery Service",
//     poster_path: "/Aufa4YdZIv4AXpR9rznwVA5SEfd.jpg",
//     overview: "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service."
//   }
// ];

// const ayeshasPlaylist: Playlist[] = [
//   {
//       playlist_name: "Ayesha's Ghibli Picks",
//       movies: movies
//   }
// ];

// const insertSampleData = async () => {
//     try {
//         const client = await getClient();
//         const db = client.db("playlists_db");
//         const result = await db.collection("playlists").insertMany(ayeshasPlaylist);
//         console.log(result);
//     } catch (error) {
//         console.log("Error in playlists");
//     }
// };
// insertSampleData();



playlistRouter.get("/playlists", async (req, res) => {
 try {
   const client = await getClient();
   const cursor = client.db().collection<Playlist>("playlists").find();
   const results = await cursor.toArray();
   res.status(200).json(results);
 } catch (err) {
   errorResponse(err, res);
 }
});

// get playlist by ID
playlistRouter.get("/playlists/:id", async (req, res) => {
 try {
   const _id: ObjectId = new ObjectId(req.params.id);
   const client = await getClient();
   const playlist = await client.db().collection<Playlist>("playlists")
       .findOne({ _id });
   if (playlist) {
     res.status(200).json(playlist);
   } else {
     res.status(404).json({message: "Not Found"});
   }
 } catch (err) { errorResponse(err, res); }
});

// create new playlist
playlistRouter.post("/playlists", async (req, res) => {
 try {
   const playlist: Playlist = req.body;
   const client = await getClient();
   await client.db()
       .collection<Playlist>("playlists")
       .insertOne(playlist);
   res.status(201).json(playlist);
 } catch (err) { errorResponse(err, res); }
});

// delete playlist by ID
playlistRouter.delete("/playlists/:id", async (req, res) => {
 try {
   const _id: ObjectId = new ObjectId(req.params.id);
   const client = await getClient();
   const result = await client.db().collection<Playlist>("playlists")
       .deleteOne({ _id });
   if (result.deletedCount) {
     res.sendStatus(204);
   } else {
     res.status(404).json({message: "Not Found"});
   }
 } catch (err) { errorResponse(err, res); }
});

// replace / update playlist by ID
playlistRouter.put("/playlists/:id", async (req, res) => {
 try {
   const _id: ObjectId = new ObjectId(req.params.id);
   const updatedPlaylist: Playlist = req.body;
   delete updatedPlaylist._id; // remove _id from body so we only have one.
   const client = await getClient();
   const result = await client.db().collection<Playlist>("playlists")
       .replaceOne({ _id }, updatedPlaylist);
   if (result.modifiedCount) {
     updatedPlaylist._id = _id;
     res.status(200).json(updatedPlaylist);
   } else {
     res.status(404).json({ message: "Not Found" });
   }
 } catch (err) { errorResponse(err, res); }
});

// shoutoutRouter.get("/students", async (req, res) => {
//   try {
//     const name: string | null = (req.query.name as string) || null;
//     const minYear: number | null = Number(req.query.minYear as string);
//     if(isNaN(minYear)) minYear = null;
//     const client = await getClient();
//     const results = await client.db()
//       .collection<Student>('students').find().toArray();
//     res.json(results); // send JSON results
//   } catch (err) {
//     console.error("ERROR", err);
//     res.status(500).json({message: "Internal Server Error"});
//   }
//  });

export default playlistRouter;