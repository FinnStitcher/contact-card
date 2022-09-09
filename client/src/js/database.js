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

export const getDb = async () => {
    console.log('get');

    // connect to the database and create transaction
    const contactDb = await openDB('contact_db', 1);
    const tx = contactDb.transaction('contacts', 'readonly');

    // open up the object store
    const store = tx.objectStore('contacts');

    // get all data
    const request = store.getAll();

    // confirm
    const result = await request;
    return result;
};

export const postDb = async (name, email, phone, profile) => {
    console.log('post');

    const contactDb = await openDB('contact_db', 1);
    const tx = contactDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');

    const request = store.add({
        name: name,
        email: email,
        phone: phone,
        profile: profile
    });

    const result = await request;
    return result;
};

export const deleteDb = async (id) => {
    console.log('delete', id);

    const contactDb = await openDB('contact_db', 1);
    const tx = contactDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');

    const request = store.delete(id);

    const result = await request;
    return result;
}

export const editDb = async (id, name, email, phone, profile) => {
    console.log('update', id);

    const contactDb = await openDB('contact_db', 1);
    const tx = contactDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');

    const request = await store.put({id: id, name: name, email: email, phone: phone, profile: profile});
    const result = await request;
    return result;
}