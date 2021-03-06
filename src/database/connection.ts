import { Db, MongoClient, ObjectId } from 'mongodb';
import env from 'dotenv';
env.config();

const url = process.env.MONGOURL;
const dbName = process.env.MONGODATABASE;

export default class MongoConnection {
    instance: MongoClient;
    db: Db;
    private collecionName: string;

    constructor(collection: string) {
        this.instance = new MongoClient(url, { useUnifiedTopology: true });
        this.collecionName = collection;
    }

    async Connect() {
        this.instance = await this.instance.connect();
        this.db = this.instance.db(dbName);
    }

    async GetByObjectId<T>(id: ObjectId): Promise<T> {
        return await this.db.collection(this.collecionName).findOne(id) as T;
    }

    async GetById<T>(id: string): Promise<T> {
        return await this.db.collection(this.collecionName).findOne(new ObjectId(id)) as T;
    }

    async All<T>(): Promise<T[]> {
        return await this.db.collection(this.collecionName).find({}).toArray() as T[];
    }

    async Insert<T>(document: T): Promise<T> {
        var inserted = await this.db.collection(this.collecionName).insertOne(document);
        return await this.GetByObjectId(inserted.insertedId);
    }

    async Close() {
        await this.instance.close();
    }

    public get collection(){
        return this.db.collection(this.collecionName);
    }
}
