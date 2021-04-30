import {Body, Controller, Delete, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {LivresService} from "./livres.service";

@Controller('livres')
export class LivresController {
    constructor(private readonly livresService: LivresService) {
    }

    @Get()
    async getAllLivres() {
        const livres = await this.livresService.getLivres();
        return livres;
    }

    @Get(':id')
    async getLivre(@Param('id') livreId: string) {
        const livre = await this.livresService.getLivre(livreId);
        return livre;
    }

    @Post()
    async addLivre(
        @Body('titre') titre: string,
        @Body('auteur') auteur: string,
        @Body('genre') genre: string
    ) {
        const livre = await this.livresService.addLivre(titre, auteur, genre);
        return {
            statusCode: HttpStatus.OK,
            message: 'Livre ajouté correctement',
            data: livre
        };
    }

    @Delete(':id')
    async deleteLivre(@Param('id') id: string) {
        const isDeleted = this.livresService.deleteLivre(id);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Livre supprimé'
            }
        }
    }
}
