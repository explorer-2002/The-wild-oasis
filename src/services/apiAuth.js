import supabase from "./supabase"


export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: ""
            }
        }
    });

    if (error)
        throw new Error(error.message);

    return data;
}

export async function login({ email, password }) {

    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })


    if (error)
        throw new Error(error.message)

    console.log(data);
    return data;
}

export async function getCurrentUser() {
    // const {data:session} = await supabase.auth.getSession();

    // if(!session.session)
    //     return null;

    // const {data, error} = await supabase.auth.getUser();

    // if(error)
    //     throw new Error(error.message);

    // return data?.user;

}

export async function logout() {
    // const {error} = await supabase.auth.signOut();

    // if(error)
    //     throw new Error(error.message)
    window.location.href = `${import.meta.env.VITE_BASE_API_URL}/auth/logout`;

}

export async function updateCurrentUser({ updateData, id }) {
    console.log('Update data received in API auth: ');

    for (const pair of updateData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
    }
    // let updateData;

    // if(password)updateData = {password};

    // if(fullName)updateData = {data:{fullName}};

    // const {data, error} = await supabase.auth.updateUser(updateData);

    // if(error)
    //     throw new Error(error.message)

    // if(!avatar)return data;

    // const filename = `avatar-${data?.user.id}-${Math.random()}`;

    // const {error:storageError} = await supabase.storage.from('avatars').upload(filename, avatar);

    // if(storageError)
    //     throw new Error(storageError.message)

    // const {data:updatedUser, error:error2} = await supabase.auth.updateUser({
    //     data:{
    //         avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${filename}`
    //     }
    // })

    // if(error2)
    //     throw new Error(error2.message);
    let data;

    try{
    const result = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/user/${id}`, {
        method: 'PATCH',
        body: updateData
    });

    data = await result.json();
    }

    catch(err){
        data = [];
    }

    // if (!result.ok) {
    //     throw new Error(data.message || 'Failed to update user');
    // }
    return data;
}