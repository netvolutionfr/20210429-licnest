import * as mongoose from "mongoose";

export const LivreSchema = new mongoose.Schema({
    auteur: String,
    genre: String,
    titre: String
});

export interface Livres extends mongoose.Document {
    id: string;
    auteur: string;
    genre: string;
    titre: string;
}
