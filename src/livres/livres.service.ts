import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Livres} from "./livres.model";
import {Model} from "mongoose";

@Injectable()
export class LivresService {
    constructor(@InjectModel('Livre') private readonly livreModel: Model<Livres>) {}

    async getLivres() {
        const livres = await this.livreModel.find().exec();
        return livres.map( livre => ({
            id: livre.id,
            titre: livre.titre,
            auteur: livre.auteur,
            genre: livre.genre
        }));
    }

    async getLivre(id) {
        const livre = await this.findLivre(id);
        return livre;
    }

    async addLivre(titre: string, auteur:string, genre: string) {
        let newLivre = new this.livreModel({
            titre: titre,
            auteur: auteur,
            genre: genre
        });
        const result = newLivre.save();
        return result;
    }

    async deleteLivre(id: string) {
        const result = await this.livreModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Livre non trouvé');
        }
        return true;
    }

    private async findLivre(id: string) : Promise<Livres> {
        let livre;
        try {
            livre = await this.livreModel.findById(id).exec();
        }
        catch (e) {
            throw new NotFoundException('Livre non trouvé');
        }
        if (!livre) {
            throw new NotFoundException('Livre non trouvé');
        }
        return livre;
    }
}
