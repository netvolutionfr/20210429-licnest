import {Connection} from "mongoose";
import {LivreSchema} from "./livres.model";

export const livresProviders = [
    {
        provide: 'LIVRE_MODEL',
        useFactory: (connection: Connection) => connection.model('Livre', LivreSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
