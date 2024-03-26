

import { auth, db, collection, addDoc, getDocs, ref,  } from "../fBase";

export async function  CollectionInsert(table: string, payload: Record<string, unknown>){
  
  return await addDoc(collection(db, table), payload);

}