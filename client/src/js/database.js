import {openDB} from 'idb';
import 'regenerator-runtime/runtime';

export const initDb = async () => {
    // creating a new IndexedDB database
    openDB('contact_db', 1, {
        upgrade(db) {
            // if this object store (db) already exists
            if (db.objectStoreNames.contains('contacts')) {
                console.log('contacts store exists');
            } else {
                db.createObjectStore('contacts', {
                    // objects will be keyed with the value 'id', which will auto-inc
                    keyPath: 'id',
                    autoIncrement: true
                });
                console.log('contacts store created');
            }
        }
    })
};