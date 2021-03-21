import { FilterQuery, ObjectId } from 'mongodb';
import MongoConnection from './connection';

export default abstract class BaseRepository<T> {

    connection: MongoConnection

    constructor(collectionName: string) {
        this.connection = new MongoConnection(collectionName);
        this.connection.Connect().then();
    }

    async GetByObjectId(id: ObjectId): Promise<T> {
        const result = await this.connection.GetByObjectId(id) as T;
        return result;
    }

    async GetById(id: string): Promise<T> {
        const result = await this.connection.GetById(id) as T;
        return result;
    }

    async All(): Promise<T[]> {
        const result = await this.connection.All() as T[];
        return result;
    }

    async Insert(document: T): Promise<T> {
        const result = await this.connection.Insert(document);
        return result;
    }
    
    async Many(mongoFind: any): Promise<T[]> {
        const result = await this.connection.collection.find(mongoFind).toArray();
        return result;
    }

    async Update(query: FilterQuery<T>, entity: T) {
        const result = await this.connection.collection.replaceOne(query, entity);
        return result;
    }
}