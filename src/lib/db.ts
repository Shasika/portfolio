import { MongoClient } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  // For development/build without MongoDB, export a mock promise
  const mockClient = {
    db: () => ({
      collection: () => ({
        insertOne: () => Promise.resolve({ insertedId: 'mock' })
      })
    })
  };
  clientPromise = Promise.resolve(mockClient as unknown as MongoClient);
} else {
  const uri = process.env.MONGODB_URI;
  const options = {};

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the MongoClient is not repeatedly created
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, create a new MongoClient instance
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;