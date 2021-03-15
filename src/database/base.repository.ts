import { MongoClient, ObjectId } from 'mongodb';
import { MongoConnection } from './connection';

export class BaseRepository<T> {

    connection: MongoConnection

    constructor(collectionName: string) {
        this.connection = new MongoConnection(collectionName);
        this.connection.Connect().then();
    }

    async GetByObjectId(id: ObjectId): Promise<T> {
        //await this.connection.Connect();
        const result = await this.connection.GetByObjectId(id) as T;
        //await this.connection.Close();
        return result;
    }

    async GetById(id: string): Promise<T> {
        //await this.connection.Connect();
        const result = await this.connection.GetById(id) as T;
        //await this.connection.Close();
        return result;
    }

    async All(): Promise<T[]> {
        //await this.connection.Connect();
        const result = await this.connection.All() as T[];
        //await this.connection.Close();
        return result;
    }

    async Insert(document: T): Promise<T> {
        //await this.connection.Connect();
        const result = await this.connection.Insert(document);
        //await this.connection.Close();
        return result;
    }
}