// import supabase from "./supabase"
// import { supabaseUrl } from "./supabase"

export async function getCabins() {

    const data = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/rooms`);
    const rooms = await data.json();

    console.log("data: ", data);
    console.log("rooms: ", rooms);

    // if (error) {
    //     console.log(error)
    //     throw new Error("Cabins could not be loaded")
    // }

    return rooms;
}

// id
export async function createEditCabin({ newCabin, id }) {
    // for (let [key, value] of newCabin.entries()) {
    //     console.log(key, value);
    // }
    // const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

    // const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")

    // const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    // let query = supabase.from('cabins')

    // if(!id){
    //     query = query.insert([{...newCabin, image: imagePath}])
    // }

    // if(id)
    //     query = query.update({...newCabin, image: imagePath}).eq("id",id)

    // const {data,error} = await query.select().single()

    // if(error){
    //     console.log(error)
    //     throw new Error("cabin could not be created")
    // }


    // const avatarFile = event.target.files[0]
    // if(hasImagePath)
    //     return data;

    // const { error: storageError } = await supabase
    // .storage
    // .from('cabin-images')
    // .upload(imageName, newCabin.image)

    // if(storageError){
    //     await supabase.from('cabins').delete().eq('id', data.id)
    // }

    try {
        let data;

        if (id) {
            console.log("newCabin: ", newCabin);
            console.log("Calling the patch api: ", );

             data = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/room/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(newCabin)
            });
        }

        else {
            data = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/room`, {
                method: 'POST',
                body: newCabin
            });
        }

        return data;

    }

    catch (error) {
        console.log("Error: ", error);
        return error;
    }

}

export async function deleteCabin(id) {

    // const { error } = await supabase
    //     .from('cabins')
    //     .delete()
    //     .eq('id', id)

    // if (error) {
    //     throw new Error("Error in deleting")
    // }

    const data = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/room/${id}`, {
        method: 'DELETE',
    });

    return data;
}