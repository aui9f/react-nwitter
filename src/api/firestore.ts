

import { auth, db, collection, addDoc, storage, ref,  } from "../fBase";

export async function  CollectionInsert(table: string, payload: Record<string, unknown>){
  const docRef = await addDoc(collection(db, table), payload);

}