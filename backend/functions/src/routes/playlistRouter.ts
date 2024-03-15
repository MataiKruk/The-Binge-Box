import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Playlist from "../models/Playlist";

const playlistRouter = express.Router();

const errorResponse = (error: any, res: any) => {
   console.error("FAIL", error);
   res.status(500).json({ message: "Internal Server Error" });
};

// get all playlists
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